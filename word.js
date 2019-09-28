// word constructor for letter constructors to make things easier
module.exports = function(array) {
    this.letters = array;
    this.correctLetters = 0;
    this.printWord = function() {
        var string = "";
        for (var i = 0; i < this.letters.length; i++) {
            if (i === this.letters.length - 1) {
                // don't add a space if it's the last character
                string += this.letters[i].printLetter();
            } else if (this.letters[i].letter === " ") {
                // account for spaces
                string += " ";
            } else {
                string += this.letters[i].printLetter() + " ";
            }
        }
        console.log(string)
    }
    this.guess = function(guess) {
        // run the guessLetter function for every single letter in the word
        this.letters.forEach(function(letter) {
            letter.guessLetter(guess);
        })
        this.countCorrectLetters();
    }
    this.countCorrectLetters = function() {
        var count = 0;
        this.letters.forEach(function(letter) {
            if (letter.guessed) {
                count++
            }
        })
        this.correctLetters = count;
    }
    this.setSpaceToTrue = function() {
        // check the entire letter array for spaces
        this.letters.forEach(function(letter) {
            if (letter.letter === " ") {
                // set it to true if it is
                letter.guessed = true;
            }
        })
    }
    this.win = function() {
        var word = "";
        this.letters.forEach(function(letter) {
            word += letter.letter;
        })
        console.log("\nGood job! You've corrected guessed all the letters in: " + word);
    }
    this.lose = function() {
        var word = "";
        this.letters.forEach(function(letter) {
            word += letter.letter;
        })
        console.log("\nSorry. Better luck next time. The word was: " + word);
    }
}