// put the whole code to an IIFE so it will not interfere with other code if inserted elsewhere
(function() { 
    // function constructor object:
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    // display method added to Question object prototype
    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    // check answer method added to Question object prototype
    Question.prototype.checkAnswer = function(answer, callback) {
        var score;
        if (answer === this.correct) {
            console.log('Correct answer!');
            score = callback(true); // the keepScore variable with the score() function!
        } else {
            console.log('Wrong answer. Please try again.')
            score = callback(false);
        }
        //display the score right after checking the answer
        this.displayScore(score);
    }
    
    // display score method added to Question object prototype
    Question.prototype.displayScore = function(score) {
        console.log('Your current score is: ' + score);
        console.log('------------------------------------------------')
    }

    // questions: 
    var q1 = new Question(
        'Is JavaScript the coolest programming language in the world?', 
        ['Yes', 'No'], 
        0
    );

    var q2 = new Question(
        'What is the name of this course\'s teacher?', 
        ['John', 'Michael', 'Jonas'], 
        2
    );22

    var q3 = new Question(
        'What does best describe coding?', 
        ['Boring', 'Hard', 'Fun', 'Tedius'], 
        2
    );

    // put the questions to an array 
    var questions = [q1, q2, q3];
    
    // function returning function to keep the score of the user
    function score() {
        var score = 0;
        return function(ifCorrect) {
            if (ifCorrect) {
                score++;
            }
            return score;
        }
    }
    var keepScore = score();
    
    // function to actually run the game
    function nextQuestion() {
        //get a random question
        var n = Math.floor(Math.random() * questions.length);

        //display a random question
        questions[n].displayQuestion();

        //promt for answer
        var answer = prompt('Please select the correct answer');

        //check answer and call the next question again IF user don't want to EXIT
        if (answer !== 'exit') {
            
            //check the question
            questions[n].checkAnswer(parseInt(answer), keepScore);
            
            nextQuestion();
        }
    }
    
    //initially call the game
    nextQuestion();
})();    





