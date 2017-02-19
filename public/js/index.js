var socket = io();

socket.on('connect', function() {
    console.log('Connected to server.');

    // socket.emit('createEmail', {
    // 	to: 'Loki@earth.com',
    // 	text: 'You can not find me, you idiot.'
    // });

});
socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

// socket.on('newEmail', function(email) {
// 	console.log('New Email', email);
// });

socket.on('newMessage', function(message){
	console.log('New Message', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current location</a>');


	li.text(`${message.from}: `);
	a.attr('href', message.url);

	li.append(a);
	jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function(data) {
		console.log('Got it: ', data, jQuery('[name=message]').val());
	});

});

//button send-location
var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
	console.log('click the send-location button.');
	if(!navigator.geolocation){
		return alert('Geolocation not support by your browser.');
	} 

	navigator.geolocation.getCurrentPosition(function(position){
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function(){
		alert('Unable to fetch location.');
	});


});