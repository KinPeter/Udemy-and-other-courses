function marvinTheConverter() {
  var celsius = prompt('What is the temperature outside, in °C?');
  var fahrenheit = celsius * 9 / 5 + 32;
  alert('Nice! Did you know that this is a swell ' + fahrenheit + ' degrees in Fahrenheit?');
  return;
}

function nivramTheConverter() {
  var fahrenheit = prompt('What is the temperature outside, in °F?');
  var celsius = (fahrenheit - 32) * 5 / 9;
  alert('Nice! Did you know that this is a swell ' + celsius + ' degrees in Celsius?');
  return;
}

function rosieTheFortuneTeller() {
  var name = prompt('Hi, dear! My name is Rosie and I am an expert fortune teller. What is your name?');
  
  var choice = prompt('Yes, I have seen that you would come to me, ' + name + '. Now please, choose one from the following and type it in the box: turtle, rose, teacup, moon.');
  
  alert('Hmm... ' + choice + '. Excellent choice. Let us see what your future holds.');
  
  if (choice == 'turtle') {
    alert('Here is your fortune: Don\'t panic.');
  } 
  else if (choice == 'rose') {
    alert('Here is your fortune: You will find a thing. It may be important.');
  }
  else if (choice == 'teacup') {
    alert('Here is your fortune: The end is near, might as well have dessert.');
  }
  else if (choice == 'moon') {
    alert('Here is your fortune: Look before you leap. Or wear a parachute.');
  }
  else {
    alert('I am sorry, ' + name + '. I do not think I understand you correctly. Are you sure you typed in one of the offered possibilities?')
  }
  return;
}

function oscarTheLifetimeSupplier() {
  var age = prompt('How old are you?');
  var expectedAge = prompt('What is your expected maximum age?');
  var favSnack = prompt('What is your favourite snack?');
  var favSnackPerWeek = prompt('How much of ' + favSnack + ' do you eat a week?');
  var supply = ((expectedAge - age) * 52) * favSnackPerWeek;
  alert('You will need to buy ' + supply + ' packs of ' + favSnack + ' for it to be enough until you become ' + expectedAge + ' years old.');
  return;
}

function bernardTheLetterCounter() {
  var text = prompt('Please write a sentence here:');
  var char = prompt('Which character do you want to count in your sentence?');
  var counter = 0;
  
  for (var i = 0; i <= text.length; i++) {
    if (text[i] == char) {
      counter++;
    }
  }
  
  alert('The letter ' + char + ' occurs ' + counter + ' times in this sentence.');
}


//marvinTheConverter();

//nivramTheConverter();

//rosieTheFortuneTeller();

//oscarTheLifetimeSupplier();

//bernardTheLetterCounter();