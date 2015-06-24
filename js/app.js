// --------------------------
// Who property for the sender 0 me 1 other

// Example array with chats
var _arrayConversations = [
// Converstaion 1
	{
		'uuid': 'aaa-bbb-ccc-1',
		'messages': [
			{ 
				'who': 0,
				'message': 'Hello!',
				'time': '12:02pm'
			},
			{ 
				'who': 1,
				'message': 'how you doing?',
				'time': '12:03pm'
			},
			{ 
				'who': 0,
				'message': 'just waking up',
				'time': '12:03pm'
			}						
		]
	},
	{
		'uuid': 'aaa-bbb-ccc-2',
		'messages': [
			{ 
				'who': 1,
				'message': 'how you doing? ads das das das',
				'time': '12:03pm'
			},
			{ 
				'who': 0,
				'message': 'Hello! dasd asd',
				'time': '12:02pm'
			},
			{ 
				'who': 0,
				'message': 'Hello! dasd asd',
				'time': '12:02pm'
			},
			{ 
				'who': 1,
				'message': 'how you doing? ads das',
				'time': '12:03pm'
			},
			{ 
				'who': 0,
				'message': 'just waking up das das das',
				'time': '12:03pm'
			}						
		]
	},
	{
		'uuid': 'aaa-bbb-ccc-3',
		'messages': [
			{ 
				'who': 0,
				'message': ' 123 1231 23Hello!',
				'time': '12:02pm'
			},
			{ 
				'who': 1,
				'message': ' 3123123 how you doing?',
				'time': '12:03pm'
			},
			{ 
				'who': 0,
				'message': ' 312312312 31just waking up',
				'time': '12:03pm'
			}						
		]
	},		
];

function searhConversation(uuid) {
	for (var i = 0; i < _arrayConversations.length; i++) {
		console.log(_arrayConversations[i].uuid);
		console.log(uuid);
		if ( _arrayConversations[i].uuid == uuid ) return i;
	}
	return null;
};

function render(messages){
	var htmlMessages = ''
	var message;
	for (var i = 0; i < messages.length; i++) {
		if (messages[i].who === 0)
			message = $('#bubble-me').html();
		else 
			message = $('#bubble-other').html();

		var template = Handlebars.compile(message);
		var context = messages[i];
		htmlMessages += template(context);
		
		// console.log(htmlMessage);
	}

	$('#box-main').html(htmlMessages);
};

$('.list-group-item').click( function(event) {
	var _uuid = $(this).data().uuid

	// Just validating
	if (event.currentTarget === this){
		// console.log(_uuid);
		var id = searhConversation(_uuid);

		var messages = _arrayConversations[id].messages;
		
		// Render heree
		render(messages);

	}

});