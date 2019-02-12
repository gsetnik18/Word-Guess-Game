//Possible answers
var horrorMovie = [
    'alien',
    'amityville',
    'evildead',
    'ring',
    'finaldestination',
    'omen',
    'panslabyrinth',
    'cube',
];
//Possible letter choices
var possibleLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];
var numOfWins = 0;
var numOfLosses = 0;
var guessesLeft = 10;
var horrorMovieGuesses = "";
var lettersInTitle = [];
var blanks = 0;
var blanksAndCorrectGuesses = [];
var wrongGuesses = [];
var correctCounter = 0;
var delayReset = 2000;

function reset()
{
    horrorMovieGuesses = horrorMovie[Math.floor(Math.random() * horrorMovie.length)];
    letterInTitle = horrorMovieGuesses.split('');
    blanks = lettersInTitle.length;

    letterGuess = 0;

    correctCounter = 0;

    guessesLeft = 10;

    wrongGuesses = [];

    blanksAndCorrectGuesses = [];

    possibleLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

    test=false;
    startGame();
}
//game selects a random horror movie title from the array, with the var "horrorMovieGuess"
function startGame()
{
    horrorMovieGuesses = horrorMovie[Math.floor(Math.random() * horrorMovie.length)];
//breaks the movie title string into individual characters
    lettersInTitle = horrorMovieGuesses.split('');
//counts the characters in the string, then replaces them with underscores (blanks)
    blanks = lettersInTitle.length;

    correctCounter = 0;

    guessesLeft = 10;

    wrongGuesses =[];
//total number of underscores and correctly guessed letters
    blanksAndCorrectGuesses = [];

    possibleLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

    for(var i = 0; i < blanks; i++)
    {
        blanksAndCorrectGuesses.push('_');
        document.getElementById('movieTitle').innerHTML = blanksAndCorrectGuesses;
    }

    document.getElementById('movieTitle').innerHTML = blanksAndCorrectGuesses.join(' ');
    document.getElementById('guessCount').innerHTML = guessesLeft;
    document.getElementById('winCount').innerHTML = numOfWins;
    document.getElementById('lossCount').innerHTML = numOfLosses;
    document.getElementById('wrongGuesses').innerHTML = wrongGuesses;

    console.log(horrorMovieGuesses);
    console.log(lettersInTitle);
    console.log(blanks);
    console.log(blanksAndCorrectGuesses);
}

function compareLetters(userKey)
{
    console.log('working');

    if(horrorMovieGuesses.indexOf(userKey) > -1)
    {

        for(var i = 0; i < blanks; i++)
        {
            if(lettersInTitle[i] === userKey)
            {
            correctCounter++;
            blanksAndCorrectGuesses[i] = userKey;
            document.getElementById('movieTitle').innerHTML = blanksAndCorrectGuesses.join(' ');
            }
        }
        console.log(blanksAndCorrectGuesses);
    }
    else
    {
        wrongGuesses.push(userKey);
        guessesLeft--;
        document.getElementById('guessCount').innerHTML = guessesLeft;
        document.getElementById('wrongGuesses').innerHTML = wrongGuesses;
        console.log('Wrong Letters = ' + wrongGuesses);
        console.log('Remaining guesses: ' +guessesLeft);
    }

}
function winLose()
{
    if(correctCounter === blanks)
    {
        numOfWins++;
        document.getElementById('winCount').innerHTML = numOfWins;
        console.log('You are safe from the beast...for now...');
        document.getElementById('win-message').style.color = "#ffffff";
        setTimeout(function(){
            document.getElementById('win-message').style.color = "#000000"}, delayReset
        )
        //display win-message for a few seconds before resetting the game
        
        reset();
    }

    else if(guessesLeft === 0)
    {
        numOfLosses++;
        document.getElementById('lossCount').innerHTML = numOfLosses;
        console.log('You are dead');
        //display jumper image for a few seconds before resetting
        function showJumper(){
        var x = document.getElementById("jumper");
        if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
        }
        reset();
    }};


startGame();

document.onkeyup = function(event)
{
    test = true;
    var letterGuess = event.key;
    for(var i = 0; i < possibleLetters.length; i++)
    {
        if(letterGuess === possibleLetters[i] && test === true)
        {
            var combinedWord = possibleLetters.splice(i,1);
            console.log('possible letters: ' + possibleLetters[i])
            console.log('combined word: ' + combinedWord);
            compareLetters(letterGuess);
            winLose();
        }
    }
}