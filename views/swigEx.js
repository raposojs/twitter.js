var swig = require('swig');

var locals = {
	title: 'An example',
	people: [
		{name: 'Gandalf'},
		{name: 'Frodo'},
		{name: 'Harry Potter'}
	]
};

swig.renderFile(__dirname + '/index.html', locals, function(err,output){
	if (err){
		throw err;
	} else {
		console.log(output);
	}
})