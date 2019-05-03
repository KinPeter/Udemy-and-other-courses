//simple click event 
$(document).ready(function() {
	$('#example').on('click', function(){
		console.log(this); // this: html element
		console.log($(this)); //this: jquery object

		$(this).toggleClass('highlighted');
	});
});

//event delegation
/*  <div id="example">   
        <button class="switch">Click me</button> 	
    </div>*/
$(document).ready(function() {
	$('#example').on('click', 'button.switch', function() { //we're targeting the container but we listen to events on the button inside it
		console.log($(this));

		$(this).parent().toggleClass('highlighted'); //modifing the parent container
	})
});

//handling data from a dropdown and from data-xy attributes
$(document).ready(function() {
	$('#example').on('click', 'button', function(){
		var selected = $('#place option:selected'); //selected option from the dropdown
		var value = selected.val();
		var price = selected.data('price'); //html "data-price" attribute

		if(price) {
			$('#result').html(value + ' ' + price);
		}	
	});
});


//change event
//same job as above, but without a button... it changes the content once the dropdown's value has been changed - with the CHANGE event
/*
<div id="example" class="container">   
    <select id="place">
        <option value="">Pick your destination</option>
        <option value="santiago" data-price="100">Santiago</option>
        <option value="madrid" data-price="180">Madrid</option>
        <option value="yakarta" data-price="300">Yakarta</option>
        <option value="istambul" data-price="150">Istambul</option>
        <option value="tokyo" data-price="200">Tokyo</option>
    </select>
</div>
<div id="result"  class="container"></div>
*/
$(document).ready(function() {
	$('#example').on('change', 'select', function(){
		var selected = $(this).find('option:selected');
		var value = selected.val();
		var price = selected.data('price');

		if(price) {
			$('#result').html(value + ' ' + price);
		}
	});
});

//keyup and keydown events
/*
<div id="example" class="container">   
    <input type="text" />
</div>
<div id="result"  class="container"></div>
*/
$(document).ready(function() {
	//keydown, keyup
	$('#example').on('keyup', 'input', function() {
		$('#result').html('Your name is: ' + $(this).val());
	});
});


//preventDefault and stopPropagation
$(document).ready(function() {
	$('#example').on('click', 'a', function(e) {
		e.preventDefault();	//prevents the link to take us to an other page
		e.stopPropagation(); //stops event delegation, so click will not go over to the parent element	
		console.log('hello');
	});

	$('#example').on('click', function(e) {
		console.log('hello container');
	});
});

