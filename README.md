# CLI Hangman

## Summary
A program written in javascript to run on node. It prompts the user for input to guess the letters in the word. This program parses words from a .txt file and randomly picks one, then it splits the letters in the word into single objects via a constructor and places it into another constructor.

### **Highlights:**
- Node.js
- Git Bash
- Constructors
- Accounts for special characters and spaces in the words

## Dependencies
- Inquirer

## Technologies Used
- Node.js
- Javascript
- Git
- GitHub
- VSCode

## Goals
- Draw the poor man hanging in ascii for better UX

## Learning Experience
- Learned to export constructors
- Learned to write constructors
- Learned to use Inquirer

## Demo Video
Demo: https://www.youtube.com/watch?v=mgkyPhL3ATE

## Code Snippets
This snippet is an exported constructor used to store letter data for words

```
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
```

This function begins gameplay after picking a random word. It also showcases the use of constructors and their property values and functions
```// let's play!
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
            
            // check if letter was correct
            if (correctLetters < word.correctLetters) {
                // update correctLetters count
                correctLetters = word.correctLetters;
                // if all letters are guessed
                if (correctLetters === word.letters.length) {
                    // winner!
                    winGame(word);
                } else {
                    // let em know it was right
                    correctGuess(letter, word);
                }
            } else {
                // let em know it was wrong
                wrongGuess(letter, word);
            }
        })
    } else {
        // you lose
        loseGame(word);
    }
}
```
## Links
LinkedIn: https://www.linkedin.com/in/kerwinhy/<br>
GitHub: https://github.com/seiretsym<br>
