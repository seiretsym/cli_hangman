// node requires
var fs = require("fs");
var inquirer = require("inquirer");
var Letter = require("./letter.js");
var Word = require("./word.js");
var guessedLetters = "a";
var correctLetters = 0;

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
    // spacer
    console.log("\n\n");
    // print word
    word.printWord();

    console.log("\n");

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
        // run word.guess() to check all letters if there's a match
        word.guess(response.guess);
        // add letter to guessedLetters
        guessedLetters += response.guess.toLowerCase();
        
        // check if all letters are guessed
        if (correctLetters === word.letters.length) {
            // run win function
            win();
        }
        else if (correctLetters === word.correctLetters) {
            // run correctGuess function
            correctGuess();
        } else {
            // run wrongGuess function
            wrongGuess();
        }
    })
}

getWords();