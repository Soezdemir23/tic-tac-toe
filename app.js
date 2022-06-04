/*
Tic-Tac-Toe
Gameboard as Arrays
Players as Objects
ruleChecker object
maybe also an gameplan
*/



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
    return { gameBoard, gameBoardDraw, traverseBoard, gameBoardArrayAndBoardManipulation }
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
                console.log("player one won")
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
                gameBoard[0] == "O" && gameBoard[4] == "O" && gameBoard[8] == "o" ||
                gameBoard[0] == "O" && gameBoard[1] == "O" && gameBoard[2] == "O"

            ) {
                // sae as above
                console.log("player two won")
            } else {
                console.log("Game is running sstill")
            }
        }
    }
})()
/**
 * Get 
 */
const game= (() => {
    for 
}




const playerFactory = (name, sign) => {
    return { name, sign };
}






const computer = () => {
    const { sign, name } = Person(sign, name);
    const
}