var source = $('#template-box-messages').html();

var template = Handlebars.compile(source);
var context = { 'messages': 'holaaa'};

// message 1 

var message1 = $('#buble-me').html();
var template = Handlebars.compile(message1);
var context = { 'message': 'Hi!'};
var htmlMessage1 = template(context)

var html = template(context);



var arrayConversations = [
	{

	},
	{

	}
]

[ 'hola', 'como estas'. 'bien','chao']