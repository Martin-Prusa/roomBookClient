export class RoomsService {
    #url = 'http://127.0.0.1:8080/roomBookingServer-1.0-SNAPSHOT/api'

    getRooms() {
        return fetch(this.#url+"/Rooms")
    }
}