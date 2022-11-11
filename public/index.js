const socket = io();
let nombre = prompt('Como es tu nombre')
socket.on("connect", () => {
	console.log(`${socket.id} entro a la sala de chat`);
});

socket.emit("msg",  nombre);

socket.on("chat", (data) => {
	let msgChat = "";
	data.forEach(({nombre, msg}) => {
        msgChat += `${nombre} : ${msg}` + "<br>"
    });
    document.querySelector("#chat").innerHTML = msgChat;
})

let enviar = document.querySelector("#enviar");

enviar.addEventListener("click", () => {
	let msg = document.querySelector("#msg").value;
	socket.emit("msgChat", { nombre, msg });
});