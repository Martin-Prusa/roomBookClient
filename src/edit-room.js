import {RoomsService} from "./RoomsService";

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    const service = new RoomsService()

    const titleInput = document.querySelector('#room-title')
    const priceInput = document.querySelector('#room-price')
    const seatsInput = document.querySelector('#room-seats')
    const descriptionInput = document.querySelector('#room-description')

    const errorEl = document.querySelector('#error-message')

    const updateBtn = document.querySelector('#update-button')

    service.getRoom(id).then(res => {
        if(res.status === 200) res.json().then(room => {
            titleInput.value = room.title
            descriptionInput.value = room.description
            priceInput.value = room.price
            seatsInput.value = room.seats
        })
        else document.location.href = '../index.html'
    }).catch(e => document.location.href = '../index.html')

    updateBtn.addEventListener('click', () => {
        service.updateRoom(id, {
            title: titleInput.value,
            description: descriptionInput.value,
            price: priceInput.value,
            seats: seatsInput.value
        }).then(res => {
            if(res.status === 200) document.location.href = "./detail-room.html?id="+id
            else errorEl.innerHTML = 'Nelze upravit místnost. Zkontrolujte zadané údaje'
        }).catch(e => errorEl.innerHTML = 'Nelze upravit místnost. Chyba serveru')
    })
}