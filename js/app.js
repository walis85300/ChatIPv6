var Chat = require('chatty');
var client = new Chat.Client();
var clientCacheInterval = undefined;
client.findServer();

client.on('listening', function(){

	clientCacheInterval = setInterval(function(){

		client.updateClientCache();
		client.cleanClientCache();

	}, 1000);

});

client.on('chat-message', function(uuid){

	console.log(uuid);

	if(uuid === _context.uuidContext)
		renderMessages(uuid);
});

client.on('group-message', function(sender, time, group_uuid, message){

	if(group_uuid === _context.uuidContext)
		renderMessages(group_uuid);

})

client.on('client-cache-update', updateConversations);

client.on('group-create', function(){
	console.log('group created');
	client.updateGroupCache();
});

client.on('group-cache-update',function(){
	// client.updateGroupCache();
	renderGroupConversations(client.getGroupCache());
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
	'uuidContext': 'aaa-bbb-ccc-1',
	'group': false
}

function searhConversation(uuid) {
	for (var i = 0; i < _arrayConversations.length; i++) {
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
	$('#box-main').scrollTop($('#box-main')[0].scrollHeight + 200);
};

function renderGroupMessage(){

}

function renderConversations(conversations){
	var html = $('#conversations');
	$('#box-conversations').html(_render({'conversations':conversations}, html));
};
function renderGroupConversations(conversations){
	var html = $('#group-conversations');
	$('#box-group-conversations').html(_render({'conversations':conversations}, html));
};
// --------------------
//
// 		UI 
//
// --------------------

function createGroup(name){

	client.createGroup(name);

};

function updateConversations() {

	// client.cleanClientCache();

	renderConversations(client.getClientCache());
	// renderGroupConversations(client.getGroupCache());
	removeEventClick();
	addEventClick();
};

function addEventClick() {
	$('.list-group-item').click(function(event) {
		var _uuid = $(this).data().uuid,
		 _isGroup = $(this).data().group;

		// Change context(
				_context.uuidContext = _uuid;
				_context.group = _isGroup;
		if (_isGroup)
			client.joinGroup(_uuid);
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

function clickSend(){
	var message = $('#input-message').val();
	$('#input-message').val('');
	if (message){
		if (!_context.group)
			client.sendMessage(_context.uuidContext, message);
		else
			client.sendGroupMessage(_context.uuidContext, message);

		console.log(message);

		renderMessages(_context.uuidContext);
	}
	
}

$('#btn-send').click(clickSend);
$('.form-group').keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
    clickSend();
    return false;  
  }
});   

removeEventClick();
addEventClick();





// $('#MyModal').modal('show');
