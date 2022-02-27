import {RoomsService} from "./RoomsService";

window.onload = () => {
    let reservationId

    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    const service = new RoomsService()

    const titleBox = document.querySelector('#title-box')
    const descriptionBox = document.querySelector('#description-box')
    const priceBox = document.querySelector('#price-box')
    const seatsBox = document.querySelector('#seats-box')

    const reservationsBox = document.querySelector('#reservations-box')

    const editBtn = document.querySelector('#edit-button')
    editBtn.addEventListener('click', () => {
        document.location.href = `./edit-room.html?id=${id}`
    })

    const deleteBtn = document.querySelector('#delete-button')
    deleteBtn.addEventListener('click', () => {
        service.deleteRoom(id).then(res => {
            if(res.status === 204) document.location.href = '../index.html'
        })
    })

    const emailInput = document.querySelector('#reservation-email')
    const firstInput = document.querySelector('#reservation-first')
    const lastInput = document.querySelector('#reservation-last')
    const fromInput = document.querySelector('#reservation-from')
    const toInput = document.querySelector('#reservation-to')

    const reservationError = document.querySelector('#reservation-error')

    const modal = new bootstrap.Modal(document.querySelector('#reservation-modal'))
    const openModalBtn = document.querySelector('#open-modal')

    const reservationBtn = document.querySelector('#reservation-button')
    const updateReservationBtn = document.querySelector('#reservation-update-button')

    openModalBtn.addEventListener('click', () => {
        modal.show()
        updateReservationBtn.style.display = 'none'
        reservationBtn.style.display ='block'
        reservationError.innerHTML = ''
        emailInput.value = ''
        firstInput.value = ''
        lastInput.value = ''
        fromInput.value = ''
        toInput.value = ''
    })

    reservationBtn.addEventListener('click', () => {
        try {
            service.createReservation(id, {
                email: emailInput.value,
                firstName: firstInput.value,
                lastName: lastInput.value,
                from: new Date(fromInput.value).toISOString().slice(0, -1),
                to: new Date(toInput.value).toISOString().slice(0, -1),
            }).then(res => {
                if(res.status === 200) {
                    modal.hide()
                    redraw()
                } else {
                    reservationError.innerHTML = 'Nelze zarezervovat. Zkontrolujte zadané údaje.'
                }
            }).catch(e => reservationError.innerHTML = 'Nelze zarezervovat. Chyba serveru.')
        } catch (e) {
            reservationError.innerHTML = 'Nelze zarezervovat. Zkontrolujte zadané údaje.'
        }

    })

    updateReservationBtn.addEventListener('click', () => {
        service.updateReservation(id, reservationId, {
            email: emailInput.value,
            firstName: firstInput.value,
            lastName: lastInput.value,
            from: new Date(fromInput.value).toISOString().slice(0, -1),
            to: new Date(toInput.value).toISOString().slice(0, -1),
        }).then(res => {
            if(res.status === 200) {
                modal.hide()
                redraw()
            } else {
                reservationError.innerHTML = 'Nelze upravit. Zkontrolujte zadané údaje.'
            }
        }).catch(e => reservationError.innerHTML = 'Nelze upravit. Chyba serveru.')
    })

    const redraw = () => {
        reservationsBox.innerHTML = ''
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
                    const del = document.createElement('td')
                    del.className = 'pointer'
                    del.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
                    del.addEventListener('click', () => {
                        service.deleteReservation(id, reservation.id).then(res => {
                            if(res.status === 204) {
                                redraw()
                            }
                        })
                    })

                    const updt = document.createElement('td')
                    updt.className = 'pointer'
                    updt.innerHTML = '<i class="fa-solid fa-pen-clip"></i>'
                    updt.addEventListener('click', () => {
                        modal.show()
                        reservationId = reservation.id
                        updateReservationBtn.style.display = 'block'
                        reservationBtn.style.display ='none'
                        reservationError.innerHTML = ''
                        emailInput.value = reservation.email
                        firstInput.value = reservation.firstName
                        lastInput.value = reservation.lastName
                        let from = new Date(reservation.from)
                        from.setMinutes(from.getMinutes() - from.getTimezoneOffset())
                        fromInput.value = from.toISOString().slice(0,16)
                        let to = new Date(reservation.to)
                        to.setMinutes(to.getMinutes() - to.getTimezoneOffset())
                        toInput.value = to.toISOString().slice(0, 16)
                    })

                    tr.appendChild(del)
                    tr.appendChild(updt)

                    reservationsBox.appendChild(tr)
                })

            }).catch(e => document.location.href = '../index.html')
            else {
                document.location.href = '../index.html'
            }
        })
    }

    redraw()
}