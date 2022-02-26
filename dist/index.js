(()=>{"use strict";class e{#e="http://127.0.0.1:8080/roomBookingServer-1.0-SNAPSHOT/api";getRooms(){return fetch(this.#e+"/Rooms")}getRoom(e){return fetch(this.#e+"/Rooms/"+e)}createRoom(e){return fetch(this.#e+"/Rooms",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}updateRoom(e,t){return fetch(this.#e+`/Rooms/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}deleteRoom(e){return fetch(this.#e+"/Rooms/"+e,{method:"DELETE"})}createReservation(e,t){return fetch(this.#e+`/Rooms/${e}/Reservations`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}updateReservation(e,t,o){return fetch(this.#e+`/Rooms/${e}/Reservations/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})}deleteReservation(e,t){return fetch(this.#e+`/Rooms/${e}/Reservations/${t}`,{method:"DELETE"})}}window.onload=()=>{const t=document.querySelector("#rooms-container");(new e).getRooms().then((e=>e.json())).then((e=>{e.forEach((e=>{const o=document.createElement("div");o.className="card room-card m-2";const n=document.createElement("div");n.className="card-body",n.innerHTML=`\n                <h5 class="card-title">${e.title}</h5>\n                <p class="card-text">${e.description}</p>\n            `;const r=document.createElement("button");r.className="btn btn-primary",r.innerText="Detail",r.addEventListener("click",(()=>{document.location.href=`./pages/detail-room.html?id=${e.id}`})),n.appendChild(r),o.appendChild(n),t.appendChild(o)}))}))}})();