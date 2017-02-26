require('./config/config.js');

const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

//assign default website view engine path
app.use(express.static(publicPath));

//register connection
io.on('connection', (socket) => {
    console.log('New user connected: ', socket.id);

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');            
        }

        //make room case insentitive
        params.room = params.room.toLowerCase();

        socket.join(params.room);

        //check username is existed
        var check_username = users.isUserExist(params.name, params.room);
        if (check_username) {
           console.log('username is existed.');
            return callback('username is existed.');
        }        

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();

    });

    socket.on('createMessage', (newMessage, callback) => {
        var user = users.getUser(socket.id);
        
        if(user && isRealString(newMessage.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));            
        }

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));            
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));            
        }
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
