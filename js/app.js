var Chat = require('./node-chat-ipv6/lib/Chat');
var client = new Chat.Client();
var clientCacheInterval = undefined;

client.on('listening', function(){

	clientCacheInterval = setInterval(function(){

		client.updateClientCache();


	}, 1000);

});


client.on('client-cache-update', function(){

	renderConversations(client.getClientCache());
	removeEventClick();
	addEventClick();

});



client.on('chat-message', function(uuid){

	console.log(uuid);

	if(uuid === _context.uuidContext)
		renderMessages(uuid);

	

});

// --------------------------
// Copyright
// Who property for the sender 0 me 1 other

// --------------------
//
// 		Utils
//
// --------------------
var _context = {
	'uuidContext': 'aaa-bbb-ccc-1'
}
function searhConversation(uuid) {
	for (var i = 0; i < _arrayConversations.length; i++) {
		console.log(_arrayConversations[i].uuid);
		console.log(uuid);
		if ( _arrayConversations[i].uuid == uuid ) return i;
	}
	return null;
};

function _render(context, htmlTarget){
	var source = htmlTarget.html();
	var template = Handlebars.compile(source);
	return template(context);

};

function renderMessages(uuid){


	messages = client.message_history;
	messages = messages[uuid];

	var htmlMessages = ''
	var message;

	if (messages){
		for (var i = 0; i < messages.length; i++) {
			if (messages[i].sender.uuid === client._uuid)
				message = $('#bubble-me');
			else 
				message = $('#bubble-other');
			htmlMessages += _render(messages[i],message);		
		}

		$('#box-main').html(htmlMessages);
	} else {
		$('#box-main').html("<h1 class='text-muted text-center'>No messages here :(</h1>");
	}
};

function renderConversations(conversations){
	var html = $('#conversations');
	$('#box-conversations').html(_render({'conversations':conversations}, html));
};

// --------------------
//
// 		UI 
//
// --------------------

function addEventClick() {
	$('.list-group-item').click(function(event) {
		var _uuid = $(this).data().uuid

		// Change context
		_context.uuidContext = _uuid;

		// Just validating
		if (event.currentTarget === this){
			
			// Render heree
			// messages = client.message_history;
			renderMessages(_uuid);

		}

	});
};

function removeEventClick() {
	$('.list-group-item').off();
};

$('#btn-send').click(function(event){
	var message = $('#input-message').val();
	$('#input-message').val('');
	
	// renderConversations(_arrayConversations);

	client.sendMessage(_context.uuidContext, message);
	console.log(message);

	renderMessages(_context.uuidContext);
	
});

removeEventClick();
addEventClick();





// $('#MyModal').modal('show');