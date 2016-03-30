var name = getQueryVariable('name') || 'Anon';
var room = getQueryVariable('room');
var socket = io();

socket.on('connect', function() {
  console.log('connected to socket.io server!');
});

socket.on('message', function(message) {
  var momentTimestamp = moment.utc(message.timestamp);
  var $messages = $('.messages');
  console.log('New Message:');
  console.log(message.text);

  $messages.append("<p><strong>" + message.name + ' ' + momentTimestamp.local().format("h:mm a") + "</strong></p>");
  $messages.append("<p>" + message.text + "</p>");
});

// Handles submitting of new message

var $form = $('#message-form');

$form.on('submit', function(event) {
  event.preventDefault();
  $message = $form.find('input[name=message]');

  socket.emit('message', {
    name: name,
    text: $message.val()
  });
  $message.val('');
})
