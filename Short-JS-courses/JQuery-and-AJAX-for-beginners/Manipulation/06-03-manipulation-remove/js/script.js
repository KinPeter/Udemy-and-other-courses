$(document).ready(function() {
	$('#add-container').on('click', 'button', function(){
		var value = $('#add-container input').val();

		var html = '<div class="item">\
			<div class="remove">X</div>' + value + '</div>';

		$('#places-container').append(html);
	});

	// this doesn't work for new elements!!
	/*$('#places-container .remove').on('click', function(){
		$(this).parent().remove();
	});*/

$('#places-container').on('click', '.remove', function(){
		$(this).parent().remove();
	});
});