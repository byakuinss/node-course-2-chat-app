require('./config/config.js');

const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
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

	socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
	
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	socket.on('createMessage', (newMessage, callback) => {
		console.log('createMessage', newMessage);
		io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', () => {
		console.log('disconnected from client.');
	});
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
