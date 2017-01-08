require('./config/config.js');

const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//assign default website view engine path
app.use(express.static(publicPath));

//register connection
io.on('connection', (socket) => {
	console.log('New user connected');

	//emit is similar to listen
	// socket.emit('newEmail', {
	// 	from: 'thor@asgard.com',
	// 	text: 'Where are u?',
	// 	createAt: 123
	// });

	// socket.on('createEmail', (newEmail) => {
	// 	console.log('createEmail', newEmail);
	// });

	socket.emit('newMessage', {
		from: 'thor',
		text: 'hey',
		createdAt: 123
	});

	socket.on('createMessage', (newMessage) => {
		console.log('createMessage', newMessage);
	});

	socket.on('disconnect', () => {
		console.log('disconnected from client.');
	});
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
