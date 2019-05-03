$(document).ready(function() {
	//$('#container').text('<strong>Hello World</strong>');
	$('#container').html('<strong>Hello World</strong>');

	console.log($('#container').html());

	//$('#container').empty();

	$('#container').attr('new-attribute', 123);
	console.log($('#container').attr('new-attribute'));
});