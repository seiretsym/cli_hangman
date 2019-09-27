// node requires
var fs = require("fs");
var inquirer = require("inquirer");

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
    var word = array[index];
    // build letters and push into an array
    var wordArray = [];
    for (var i = 0; i < word.length; i++) {
        var letter = new Letter(word[i]);
        wordArray.push(letter);
    }
    // do something from here
    printWord(wordArray);
}

// constructor to hide, mask letters
function Letter(letter) {
    this.letter = letter;
    this.guessed = false;
    this.printLetter = function() {
        if (this.guessed) {
            return this.letter;
        } else {
            return "_";
        }
    }
}

// call the printLetter function from array
function printWord(array) {
    var string = "";
    array.forEach(function(letter) {
        string += letter.printLetter() + " ";
    })
    console.log(string);
}
getWords();