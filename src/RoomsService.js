export class RoomsService {
    #url = 'http://127.0.0.1:8080/roomBookingServer-1.0-SNAPSHOT/api'

    getRooms() {
        return fetch(this.#url+"/Rooms")
    }

    getRoom(id) {
        return fetch(this.#url+"/Rooms/"+id)
    }

    createRoom(room) {
        return fetch(this.#url+"/Rooms", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        })
    }

    updateRoom(id, room) {
        return fetch(this.#url+`/Rooms/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        })
    }

    deleteRoom(id) {
        return fetch(this.#url+'/Rooms/'+id, {
            method: 'DELETE'
        })
    }

    createReservation(id, reservation) {
        return fetch(this.#url+`/Rooms/${id}/Reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservation)
        })
    }

    updateReservation(id, reservationId, reservation) {
        return fetch(this.#url+`/Rooms/${id}/Reservations/${reservationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservation)
        })
    }

    deleteReservation(id, reservationId) {
        return fetch(this.#url+`/Rooms/${id}/Reservations/${reservationId}`, {
            method: 'DELETE'
        })
    }
}