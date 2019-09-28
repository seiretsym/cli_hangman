// node requires
var fs = require("fs");
var inquirer = require("inquirer");
var Letter = require("./letter.js");
var Word = require("./word.js");

// global variables
var guessedLetters = "";
var correctLetters = 0;
var remainingGuesses = 10;

// read from words.txt and generate an array of words to choose from
function getWords() {
    fs.readFile("./words.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var wordArray = data.split("\r\n");
            // do something after creating wordArray
            pickWord(wordArray);
        }
    })
}

// pick a random word from the array
function pickWord(array) {
    var index = Math.floor(Math.random() * array.length) + 1;
    var randomWord = array[index];
    // build letters and push into an array
    var wordArray = [];
    for (var i = 0; i < randomWord.length; i++) {
        var letter = new Letter(randomWord[i]);
        wordArray.push(letter);
    }
    // push the letters into a word construct
    var word = new Word(wordArray);
    playGame(word);
}

// let's play!
function playGame(word) {
    // check if there are any remaining guesses left
    if (remainingGuesses > 0) {
        // spacer
        console.log("\n\n");
        // print word
        word.printWord();

        console.log("\nRemaining Guesses: " + remainingGuesses + "\n");

        // prompt user for input
        inquirer.prompt([
            {
                type: "input",
                message: "Guess a letter:",
                name: "guess",
                validate: function(input) {
                    // create string to check character is alphabet
                    var alpha = "abcdefghijklmnopqrstuvwxyz";

                    // check if input is only 1 char
                    if (input.length !== 1) {
                        return "One letter at a time!";
                    }
                    // check if input is alphabet
                    else if (alpha.indexOf(input.toLowerCase()) === -1) {
                        return "That's not an alphabet!";
                    }
                    // check if letter has been guessed
                    else if (guessedLetters.indexOf(input.toLowerCase()) !== -1) {
                        return "You've already guessed that letter!";
                    } else {
                        return true;
                    }
                }
            }
        ]).then(function(response) {
            // convert response input to lowercase
            var letter = response.guess.toLowerCase();
            // run word.guess() to check all letters if there's a match
            word.guess(response.guess);
            // add letter to guessedLetters
            guessedLetters += letter;
            
            // check if all letters are guessed
            if (correctLetters === word.letters.length) {
                // run win function
                winGame(word);
            }
            else if (correctLetters === word.correctLetters) {
                // run correctGuess function
                correctGuess(letter);
            } else {
                // run wrongGuess function
                wrongGuess(letter);
            }
        })
    } else {
        // you lose
        loseGame(word);
    }
}

// letting you know you're doing something right
function correctGuess(letter) {
    console.log("\n" + letter + " was found in the word!")
    // guess again by looping playGame()
    playGame();
}

// letting you know you're doing something wrong
function wrongGuess(letter) {
    console.log("\n" + letter + " was not found in the word!")
    // deduct remaining guesses
    remainingGuesses--;
    // guess again by looping playGame()
    playGame();
}

// you won!
function winGame(word) {
    // run word.win() function
    word.win();
    // play again?
    playAgain();
}

// you lost :(
function loseGame(word) {
    // run word.lose
    word.lose();
    // play again?
    playAgain();
}

getWords();