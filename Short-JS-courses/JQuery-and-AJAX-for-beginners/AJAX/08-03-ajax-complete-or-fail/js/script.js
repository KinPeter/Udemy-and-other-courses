$(document).ready(function() {
	$('#example').on('click', 'button.switch', function() {
		$.ajax('result22222.html', {
			beforeSend: function() {
				$('#status').text('Cargando..');
			}
		})
		.done(function(response){
			$('#result').html(response);
		})
		.fail(function(request, errorType, errorMessage){
			//timeout, error, abort, parseerror
			alert(errorMessage);
			console.log(errorType);
		})
		.always(function(){
			$('#status').text('Completado');
		});		
	});	
});