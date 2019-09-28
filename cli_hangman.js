// node requires
var fs = require("fs");
var inquirer = require("inquirer");
var Letter = require("./letter.js");
var Word = require("./word.js");

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
    word.printWord();
    word.guess("a");
    word.printWord();
}

getWords();