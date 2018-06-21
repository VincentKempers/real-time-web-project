var socket = io();
var input = document.getElementById('input');
var preview = document.getElementById('content');
var h1 = document.querySelector("h1");


// location
var loc = window.location.pathname;
var thisLocation = loc.split('/')[2];

h1.innerHTML = `Welcome to this room: ${thisLocation}`

input.addEventListener(
	'input',
	event => {
		var totalOnPage = {
			markedTekst: input.value,
			roomId: thisLocation,
		};

		// send the new value and thislocation/roomid
		socket.emit('sendText', totalOnPage);
	},
	true
);

// On enter room emit event to join room
socket.emit('joinRoom', thisLocation);

// Receive latest text on joining a room
socket.on('invigorateFirstText', latestTekst => {
	console.log(latestTekst);

	input.value = latestTekst;
});

socket.on('updatedTekst', content => {
	console.log(content);
	input.value = content;
	preview.innerHTML = marked(input.value);
});
