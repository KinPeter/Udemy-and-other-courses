$(document).ready(function() {
	
	$('.item-box').on('click', '.info-link', function(event) {
		event.preventDefault();
		//fadeIn(), fadeOut(), fadeToggle()
		$(this).closest('.item-box').find('.more-info').fadeToggle('slow');
	});
});