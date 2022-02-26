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
}