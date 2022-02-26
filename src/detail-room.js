import {RoomsService} from "./RoomsService";

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    const service = new RoomsService()

    const titleBox = document.querySelector('#title-box')
    const descriptionBox = document.querySelector('#description-box')
    const priceBox = document.querySelector('#price-box')
    const seatsBox = document.querySelector('#seats-box')

    const reservationsBox = document.querySelector('#reservations-box')

    service.getRoom(id).then(res => {
        if(res.status === 200) res.json().then(room => {
            titleBox.innerHTML = room.title
            descriptionBox.innerHTML = room.description
            priceBox.innerHTML = room.price
            seatsBox.innerHTML = room.seats

            room.reservations.forEach(reservation => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                <td>${reservation.email}</td>
                <td>${reservation.firstName}</td>
                <td>${reservation.lastName}</td>
                <td>${new Date(reservation.from).toLocaleDateString()} ${new Date(reservation.from).toLocaleTimeString()}</td>
                <td>${new Date(reservation.to).toLocaleDateString()} ${new Date(reservation.to).toLocaleTimeString()}</td>
                `
                reservationsBox.appendChild(tr)
            })

        }).catch(e => document.location.href = '../index.html')
        else {
            document.location.href = '../index.html'
        }
    })
}