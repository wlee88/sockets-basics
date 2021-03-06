var name = getQueryVariable('name') || 'Anon';
var room = getQueryVariable('room') || 'General';
var socket = io();

socket.on('connect', function() {
  console.log('connected to socket.io server!');
  socket.emit('joinRoom', {
    name: name,
    room: room
  });
});

socket.on('message', function(message) {
  var momentTimestamp = moment.utc(message.timestamp);
  var $messages = $('.messages');
  var $message = $('<li class="list-group-item"></li>')
  console.log('New Message: ' + message.text);

  $message.append("<p><strong>" + message.name + ' ' + momentTimestamp.local().format("h:mm a") + "</strong></p>");
  $message.append("<p>" + message.text + "</p>");

  $messages.append($message);
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
});

$roomTitle = $(".room-title");
$roomTitle.text(room);
