(()=>{"use strict";class e{#e="http://127.0.0.1:8080/roomBookingServer-1.0-SNAPSHOT/api";getRooms(){return fetch(this.#e+"/Rooms")}getRoom(e){return fetch(this.#e+"/Rooms/"+e)}createRoom(e){return fetch(this.#e+"/Rooms",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}updateRoom(e,t){return fetch(this.#e+`/Rooms/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}}window.onload=()=>{const t=new URLSearchParams(window.location.search).get("id"),o=new e,r=document.querySelector("#room-title"),n=document.querySelector("#room-price"),a=document.querySelector("#room-seats"),i=document.querySelector("#room-description"),s=document.querySelector("#error-message"),c=document.querySelector("#update-button");o.getRoom(t).then((e=>{200===e.status?e.json().then((e=>{r.value=e.title,i.value=e.description,n.value=e.price,a.value=e.seats})):document.location.href="../index.html"})).catch((e=>document.location.href="../index.html")),c.addEventListener("click",(()=>{o.updateRoom(t,{title:r.value,description:i.value,price:n.value,seats:a.value}).then((e=>{200===e.status?document.location.href="./detail-room.html?id="+t:s.innerHTML="Nelze upravit místnost. Zkontrolujte zadané údaje"})).catch((e=>s.innerHTML="Nelze upravit místnost. Chyba serveru"))}))}})();