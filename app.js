/*
Tic-Tac-Toe
Gameboard as Arrays
Players as Objects
ruleChecker object
maybe also an gameplan
*/

const playerFactory = (name, sign) => {
    return { name, sign };
}


const displayController = (() => {
    const gameBoard = []
    const gameBoardDraw = document.querySelectorAll('.grid-child')
    const gameBoardArrayAndBoardManipulation = (sign, index) => {
        // if the index is -1, turn the whole array to empty strings and the
        // gameboard to "" as well.
        if (index === -1) {
            gameBoardDraw.forEach(element => {
                element.textContent = "";
                gameBoard.pop();
            })
            // if the player is entering an x or o, then simply enter it in the  respective place.
        } else if (sign === "X" || sign === "O") {
            gameBoard[index] = sign;
            gameBoardDraw[index].textContent = sign;
        }
    }
    return { gameBoard, gameBoardDraw, gameBoardArrayAndBoardManipulation }
})()

/**
 * The following mechanics will be checked:
 * Check if it is a new game: empty field <- let's see if we even need that, sounds unnecessary
 * Check if the field is full: determine the outcome
 * Check if the field is already being filled. at least one sign.
 *  Then check if the clicked fields are already given an x or o. 
 */
const gameRules = (() => {
    // raise the round number, when each player has done their part
    let roundCount = 0;
    const roundIncrementer = () => {
        console.log(`Round: ${roundCount}`)
        roundCount++;
    }
    // check if the field is full, returns false if not, else true
    const fullFieldChecker = (gameBoard) => {
        let count = 0
        gameBoard.forEach(element => {
            if (element.textContent != "") {
                count++;
            }
        });
        if (count == 9) console.log("the field is full");
        else console.log("The field is not full")
    }

    const oneFieldChecker = (player, dataSetNr) => {
        if (displayController.gameBoard[datasetNr] !== "") return;
        displayController.gameBoardArrayAndBoardManipulation(player.sign, dataSetNr);
    }

    // rules for winning are, 3 crosses, or else check if the field is full, therefore a draw.
    const winConditionChecker = (gameBoard) => {
        // check if three rounds have been already played, else skip
        if (roundCount > 3) {
            if (// line
                gameBoard[0] == "X" && gameBoard[1] == "X" && gameBoard[2] == "X" ||
                gameBoard[3] == "X" && gameBoard[4] == "X" && gameBoard[5] == "X" ||
                gameBoard[6] == "X" && gameBoard[7] == "X" && gameBoard[8] == "X" ||
                // column
                gameBoard[0] == "X" && gameBoard[3] == "X" && gameBoard[6] == "X" ||
                gameBoard[1] == "X" && gameBoard[4] == "X" && gameBoard[7] == "X" ||
                gameBoard[2] == "X" && gameBoard[5] == "X" && gameBoard[8] == "X" ||
                //diagonal
                gameBoard[0] == "X" && gameBoard[4] == "X" && gameBoard[8] == "X" ||
                gameBoard[0] == "X" && gameBoard[1] == "X" && gameBoard[2] == "X"
            ) {
                // we can add a modal here instead
                return 1
            }
            else if (
                gameBoard[0] == "O" && gameBoard[1] == "O" && gameBoard[2] == "O" ||
                gameBoard[3] == "O" && gameBoard[4] == "O" && gameBoard[5] == "O" ||
                gameBoard[6] == "O" && gameBoard[7] == "O" && gameBoard[8] == "O" ||
                // column
                gameBoard[0] == "O" && gameBoard[3] == "O" && gameBoard[6] == "O" ||
                gameBoard[1] == "O" && gameBoard[4] == "O" && gameBoard[7] == "O" ||
                gameBoard[2] == "O" && gameBoard[5] == "O" && gameBoard[8] == "O" ||
                //diagonal
                gameBoard[0] == "O" && gameBoard[4] == "O" && gameBoard[8] == "O" ||
                gameBoard[0] == "O" && gameBoard[1] == "O" && gameBoard[2] == "O"

            ) {
                // sae as above
                return 2
            } else {
                return 0
            }
        }
    }
    return {winConditionChecker, oneFieldChecker, fullFieldChecker, roundIncrementer}
})()
/**
 * Get all these things together.
 * 1. Clear the room, for new game
 * 2. check whose turn it is
 * 3. start the insertion
 */
const game= (() => {
    let section = document.querySelector('section')
    // if first player's turn, then say true. else false
    let whoseTurn = true;

    // just a simple turnchanger
    let changeturn = ()  => {
        if (whoseTurn == false) {
            whoseTurn = true;
        }else {
            whoseTurn = false
        }
    }

    let clear = () => {displayController.gameBoardArrayAndBoardManipulation("", -1)}
    // we can start here, only run this from the comfort of the value
    let gameStart = () => {
        // first create two players
        let playerOne = playerFactory("One", "X");
        let playerTwo = playerFactory("Two", "O")
        // we do NOT need a while loop. THIS is our while loop. My god I absolutely forgot that.
        // I also need to extract some code from here when I am done
        section.onclick = (event) => { 
            // get the necessary html event
            let gridItem = event.target;
            // get the data-attribute
            let index = parseInt(gridItem.dataset.nr)
            console.log(index)
            // this is actually not necessary, I am just too defensive about this
            if (index >= 0 && index <= 8 ) {
                //check if the grid is empty. if it is, it should change it.
                gameRules.oneFieldChecker(player, index);
                changeturn();


            } else {
                console.log("field full: ", displayController.gameBoard[index])
            }
        }
    }

    let steps = (player, datasetNr) => {
        if(whoseTurn == true){
            if(player.sign !=="X") return
            displayController.gameBoardArrayAndBoardManipulation(player, datasetNr)
        }
    }

     return {clear, gameStart, changeturn
     }
})()

game.gameStart()







/**
 * Needs to be expanded upon when I am done with the basic functionality above.
 * Looking forward and scare of the minmax implementation.
 */
const computer = () => {
    const { sign, name } = Person(sign, name);

}