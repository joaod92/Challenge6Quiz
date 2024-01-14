console.log('Logic.js file loaded');

document.addEventListener('DOMContentLoaded', function () {
  // Listing global variables for later use in the code - setting question index and score to zero to start with
  var timerInterval;
  var timeLeft;
  var currentQuestionIndex = 0;
  var score = 0;

  // DOM elements
  var startButton = document.getElementById('start');
  var timerElement = document.getElementById('time');
  var questionTitleElement = document.getElementById('question-title');
  var choicesElement = document.getElementById('choices');
  var endScreenElement = document.getElementById('end-screen');
  var finalScoreElement = document.getElementById('final-score');
  var initialsInput = document.getElementById('initials');
  var submitButton = document.getElementById('submit');

  // Array of questions (5)
  var questions = [
    {
      title: 'What does HTML stand for?',
      choices: ['Hyper Text Markup Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
      correctAnswer: 'Hyper Text Markup Language',
    },
    {
      title: 'In networking, what does the acronym LAN stand for?',
      choices: ['Link Access Node', 'Long Array Node', 'Logical Access Node', 'Local Area Network'],
      correctAnswer: 'Local Area Network',
    },
    {
      title: 'What does Central Processing Unit stand for?',
      choices: ['Central Processing Unit', 'Central Processor Unit', 'Computer Peripheral Unit', 'Central Peripheral Unit'],
      correctAnswer: 'Central Processing Unit',
    },
    {
      title: 'What is the purpose of the CSS (Cascading Style Sheets) language in web development?',
      choices: ['To define the structure and layout of a web page', 'To specify the visual presentation of a web page', 'To handle server-side scripting', 'To manage database connections'],
      correctAnswer: 'To specify the visual presentation of a web page',
    },
    {
      title: 'Which data structure follows the Last In, First Out (LIFO) principle?',
      choices: ['Queue', 'Stack', 'Linked List', 'Tree'],
      correctAnswer: 'Stack',
    }
  ];

  // Event listener for start button
  startButton.addEventListener('click', startQuiz);

  // Event listener for choices (delegated to the choices container)
  choicesElement.addEventListener('click', function (event) {
    if (event.target.matches('button')) {
      checkAnswer(event.target.textContent);
      showNextQuestion();
    }
  });

  // Event listener for submit button
  submitButton.addEventListener('click', saveHighscore);

  // Function to start the quiz
  function startQuiz() {
    // Reset score to zero for the next game
    score = 0;

    timeLeft = 60;
    timerInterval = setInterval(function () {
      timeLeft--;
      timerElement.textContent = timeLeft;

      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);

    startButton.parentElement.classList.add('hide');
    endScreenElement.classList.add('hide');
    document.getElementById('questions').classList.remove('hide');

    showNextQuestion();
  }

  // Function to show the next question
  function showNextQuestion() {
    if (currentQuestionIndex < questions.length) {
      var currentQuestion = questions[currentQuestionIndex];
      questionTitleElement.textContent = currentQuestion.title;
      choicesElement.innerHTML = '';

      for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choiceButton = document.createElement('button');
        choiceButton.textContent = currentQuestion.choices[i];
        choicesElement.appendChild(choiceButton);
      }

      currentQuestionIndex++;
    } else {
      endQuiz();
    }
  }

  // Function to check the selected answer
  function checkAnswer(selectedAnswer) {
    var currentQuestion = questions[currentQuestionIndex - 1];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      score += 10;
    } else {
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
    }
  }

  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    timerElement.textContent = 0;

    document.getElementById('questions').classList.add('hide');
    endScreenElement.classList.remove('hide');
    finalScoreElement.textContent = score;
  }

  // Function to save highscore
  function saveHighscore() {
    console.log('Save highscore function called');

    var initials = initialsInput.value.trim().toUpperCase();

    if (initials !== '') {
      // Retrieve existing high scores from localStorage
      var highscores = JSON.parse(localStorage.getItem('highscores')) || [];

      // Add the current score and initials to the highscores array
      highscores.push({ initials: initials, score: score });

      // Sort the highscores in descending order based on the score
      highscores.sort(function (a, b) {
        return b.score - a.score;
      });

      // Save the updated highscores back to localStorage
      localStorage.setItem('highscores', JSON.stringify(highscores));

      // After saving the highscore, you can redirect the user or perform other actions
      window.location.href = 'highscores.html';

      // Log the highscores for debugging
      console.log('Highscores:', highscores);
    }
  }
});
