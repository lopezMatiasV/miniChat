const socket = io();

socket.on("connect", () => {
	console.log("Conectado");
});

/* socket.emit("msg", "Hola back"); */

/* socket.on("msg", (data) => {
	console.log(data);
}); */

socket.on("chat", (data) => {
	console.log(data);
	let msgChat = "";
	data.forEach(({nombre, msg}) => {
        msgChat += `${nombre} : ${msg}` + "<br>"
    });
    //console.log(msgChat);
    document.querySelector("#chat").innerHTML = msgChat;
})

let enviar = document.querySelector("#enviar");

enviar.addEventListener("click", () => {
	let nombre = document.querySelector("#nombre").value;
	let msg = document.querySelector("#msg").value;
	socket.emit("msgChat", { nombre, msg });
});
