const API_URL = 'https://api.gameofthronesquotes.xyz/v1';
let houses = [];

const modalWrapperDOM = document.querySelector('.modal__wrapper');
modalWrapperDOM.onclick = (event) => {
    if (event.target == modalWrapperDOM) modalWrapperDOM.classList.remove('showed');
}



function getHousesWithMembers() {
    return fetch(`${API_URL}/houses`).then(response => response.json());
}

getHousesWithMembers().then(houses => {
    const housesDOM = document.querySelector('.houses');
    houses.forEach(house => {
        housesDOM.appendChild(generateHouseDOM(house));
    });

});



function generateHouseDOM(house) {
    const houseMoreTitleRowDOM = document.createElement('div');
    houseMoreTitleRowDOM.className = 'members__title-row';

    const houseNameDOM = document.createElement('h2');
    houseNameDOM.innerText = house.name;


    houseMoreTitleRowDOM.appendChild(houseNameDOM);


    const houseDOM = document.createElement('div.house');
    houseDOM.appendChild(houseMoreTitleRowDOM);
    houseDOM.innerHTML += `<div class="list"></div>`


    const membersDOM = houseDOM.querySelector('.list');
    house.members.forEach(member => {
        membersDOM.appendChild(generateHouseMember(member));
    })

    return houseDOM;
}


function generateHouseMember(member) {
    const memberDOM = new DOMParser().parseFromString(`<button class="list-item">${member.name}</button>`, "text/html").getElementsByTagName('button')[0];
    memberDOM.onclick = () => openModalWindowHandler(member);
    return memberDOM;
}

function openModalWindowHandler(data) {
    modalWrapperDOM.classList.add('showed');
    const modalTitleDOM = modalWrapperDOM.querySelector('.modal-title');
    modalTitleDOM.innerText = data.name;
    const modalQuotesDOM = modalWrapperDOM.querySelector('.modal-quotes');
    console.log(modalQuotesDOM)
    modalQuotesDOM.innerText = 'Загрузка...';
    fetch(`${API_URL}/character/${data.slug}`).then(response => response.json().then(data => {
        modalQuotesDOM.innerHTML = '';
        data[0].quotes.forEach(el => {
            const quote = document.createElement('span');
            quote.className = 'modal-quote';
            quote.innerText = el;
            modalQuotesDOM.appendChild(quote);
        });
    }
    ))
}