document.addEventListener('DOMContentLoaded', function () {
    // Retrieve highscores from localStorage
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];

    // Display highscores in the highscores ol element
    var highscoresList = document.getElementById('highscores');

    // Loop through highscores and create li elements
    highscores.forEach(function (entry) {
        var listItem = document.createElement('li');
        listItem.textContent = entry.initials + ': ' + entry.score;
        highscoresList.appendChild(listItem);
    });

    // Add event listener to clear highscores
    var clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', function () {
        // Clear highscores from localStorage
        localStorage.removeItem('highscores');

        // Clear the displayed highscores on the page
        highscoresList.innerHTML = '';
    });
});
