// constructor to hide, mask letters
module.exports = function(letter) {
    this.letter = letter;
    this.guessed = false;
    this.printLetter = function() {
        // return letter if guessed is true, "_" if false
        if (this.guessed) {
            return this.letter;
        } else {
            return "_";
        }
    }
    this.guessLetter = function(letter) {
        // compare guess to this.letter
        if (letter.toLowerCase() === this.letter.toLowerCase()) {
            // set guessed to true if it is
            this.guessed = true;
        }
    }
}