// --------------------------
// Copyright
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
				'message': 'how you doing? ads das das das',
				'time': '12:03pm'
			},
			{ 
				'who': 0,
				'message': 'just waking up das das das',
				'time': '12:03pm'
			},
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
				'message': 'how you doing? ads das das das',
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
	{
		'uuid': 'aaa-bbb-ccc-4',
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
				'message': 'how you doing? ads das das das',
				'time': '12:03pm'
			},
			{ 
				'who': 0,
				'message': 'just waking up das das das',
				'time': '12:03pm'
			}						
		]
	},		
];
// --------------------
//
// 		Utils
//
// --------------------
var _context = {
	'uuidContext': ''
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

function renderMessages(messages){
	var htmlMessages = ''
	var message;

	for (var i = 0; i < messages.length; i++) {
		if (messages[i].who === 0)
			message = $('#bubble-me');
		else 
			message = $('#bubble-other');
		htmlMessages += _render(messages[i],message);		
	}

	$('#box-main').html(htmlMessages);
};

// --------------------
//
// 		UI 
//
// --------------------

$('.list-group-item').click(function(event) {
	var _uuid = $(this).data().uuid

	// Change context
	_context.uuidContext = _uuid;

	// Just validating
	if (event.currentTarget === this){
		// console.log(_uuid);
		var id = searhConversation(_uuid);

		var messages = _arrayConversations[id].messages;
		
		// Render heree
		renderMessages(messages);

	}

});

$('#btn-send').click(function(event){
	var message = $('#input-message').text();
	$('#input-message').val('');

	alert(_context.uuidContext);
});