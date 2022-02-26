import {RoomsService} from "./RoomsService";

window.onload = () => {
    const titleInput = document.querySelector('#room-title')
    const priceInput = document.querySelector('#room-price')
    const seatsInput = document.querySelector('#room-seats')
    const descriptionInput = document.querySelector('#room-description')

    const errorEl = document.querySelector('#error-message')

    const createBtn = document.querySelector('#create-button')

    const service = new RoomsService()

    createBtn.addEventListener('click', () => {
        service.createRoom({
            title: titleInput.value,
            description: descriptionInput.value,
            price: priceInput.value,
            seats: seatsInput.value
        }).then(res => {
            if(res.status === 200) document.location.href = "../index.html"
            else errorEl.innerHTML = 'Nelze vytořit místnost. Zkontrolujte zadané údaje'
        }).catch(e => errorEl.innerHTML = 'Nelze vytořit místnost. Chyba serveru')
    })
}