// word constructor for letter constructors to make things easier
module.exports = function(array) {
    this.letters = array;
    this.printWord = function() {
        var string = "";
        for (var i = 0; i < this.letters.length; i++) {
            if (i === this.letters.length - 1) {
                // don't add a space if it's the last character
                string += this.letters[i].printLetter();
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
    }
}