(()=>{"use strict";class e{#e="http://127.0.0.1:8080/roomBookingServer-1.0-SNAPSHOT/api";getRooms(){return fetch(this.#e+"/Rooms")}getRoom(e){return fetch(this.#e+"/Rooms/"+e)}createRoom(e){return fetch(this.#e+"/Rooms",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}updateRoom(e,t){return fetch(this.#e+`/Rooms/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}}window.onload=()=>{const t=document.querySelector("#room-title"),o=document.querySelector("#room-price"),r=document.querySelector("#room-seats"),n=document.querySelector("#room-description"),s=document.querySelector("#error-message"),c=document.querySelector("#create-button"),i=new e;c.addEventListener("click",(()=>{i.createRoom({title:t.value,description:n.value,price:o.value,seats:r.value}).then((e=>{200===e.status?document.location.href="../index.html":s.innerHTML="Nelze vytořit místnost. Zkontrolujte zadané údaje"})).catch((e=>s.innerHTML="Nelze vytořit místnost. Chyba serveru"))}))}})();