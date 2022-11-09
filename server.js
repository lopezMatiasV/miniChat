//https://socket.io/docs/v4/server-initialization/
const express = require("express");
const app = express();

//IMPLEMENTACION
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(3000, () => console.log("SERVER ON"));

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile("index.html", { root: __dirname });
});

/* SOCKETS */
const chat = [];

io.on("connect", (socket) => {
	/* socket.on("msg", (data) => {
		console.log(data);
	}); */

	/* socket.emit("msg", "hola front"); */

	socket.on("msgChat", (data) => {
		chat.push({ ...data });

    io.sockets.emit("chat", chat);
	});
});
