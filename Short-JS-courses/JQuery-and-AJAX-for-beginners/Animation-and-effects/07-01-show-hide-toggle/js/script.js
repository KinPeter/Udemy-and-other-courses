$(document).ready(function() {
	$('.item-box').on('click', 'a.info-link', function(event){
		event.preventDefault();

		//hide(), show(), toggle()
		$(this).closest('.item-box').find('.more-info').toggle('slow', function(){ //callback function - happens when animation is finished
			alert('finished'); 
		});
	});
});