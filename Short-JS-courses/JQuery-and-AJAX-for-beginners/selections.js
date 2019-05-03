//selecting multiple classes
$(document).ready(function() {
	$('.class1, .class2').addClass('highlighted');
});

//selecting descendants
$(document).ready(function() {
	$('#listing li').addClass('highlighted'); //all
	$('#listing > li').addClass('highlighted'); //only direct
});

//selecting with attributes
$(document).ready(function() {
	$('input[required]').addClass('highlighted'); //has the attribute
	$('input[placeholder=Email]').addClass('highlighted'); //has the attribute and exactly that value
	$('input[placeholder*=Name]').addClass('highlighted'); //has the attribute and contains that value
});

//selecting with DOM traversing - find
$(document).ready(function() {
	
	//CSS selectors
	var result = $('#animals .creature');
	console.log(result);

	//DOM traversing (more efficient)
	result = $('#animals').find('.creature');
	console.log(result);
});

//selecting with DOM traversing - children
$(document).ready(function() {

	//CSS selector
	var result = $('#animals > .creature');
	console.log(result);

	//DOM traversing
	result = $('#animals').children('.creature');
	console.log(result);
});

//selecting with DOM traversing - first, last, prev, next
$(document).ready(function() {
	//first(), last()
	var result = $('#animals').children().first()
		.children('.creature').last();
	console.log(result);

	//prev()
	result = $('#animals').children().first()
		.children().last().prev().prev();
	console.log(result);

	//next()
	var result = $('#animals').children().first()
		.children('.creature').first().next();
	console.log(result);
});

//selecting PARENTS with DOM traversing - parent, parents, closest
$(document).ready(function() {
	//parent()
	var result = $('#cat').parent();
	console.log(result);

	//parents()
	result = $('#cat').parents('.category');
	console.log(result);

	//closest()
	result = $('#cat').closest('.category');
	console.log(result);
});

















