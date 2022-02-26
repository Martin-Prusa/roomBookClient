import {RoomsService} from "./RoomsService";

window.onload = () => {
    const roomsContainer = document.querySelector('#rooms-container')
    const service = new RoomsService()

    service.getRooms().then(res => res.json()).then(rooms => {
        rooms.forEach(room => {
            const card = document.createElement('div')
            card.className = 'card room-card m-2'

            const cardBody = document.createElement('div')
            cardBody.className = 'card-body'
            cardBody.innerHTML = `
                <h5 class="card-title">${room.title}</h5>
                <p class="card-text">${room.description}</p>
            `

            const button = document.createElement('button')
            button.className = 'btn btn-primary'
            button.innerText = 'Detail'
            button.addEventListener('click', () => {
                document.location.href = `./pages/detail-room.html?id=${room.id}`
            })

            cardBody.appendChild(button)

            card.appendChild(cardBody)
            roomsContainer.appendChild(card)
        })
    })
}