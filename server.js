const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

//IMPLEMENTACION
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(port, () => console.log("SERVER ON"));

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile("index.html", { root: __dirname });
});

/* SOCKETS */
const chat = [];

io.on("connect", (socket) => {
	let nombre;
	socket.on("msg", (data) => {
		nombre = data;
	});

	socket.on("msgChat", (data) => {
		chat.push({ ...data, nombre });

    io.sockets.emit("chat", chat);
	});
});
