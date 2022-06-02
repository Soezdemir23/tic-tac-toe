/*
Tic-Tac-Toe
Gameboard as Arrays
Players as Objects
ruleChecker object
maybe also an gameplan
*/



const displayController = (() =>{
    const gameBoard = []
    const gameBoardDraw = document.querySelectorAll('.grid-child')
    const gameBoardArrayManipulation = (sign, index) => {
        // if the index is -1, turn the whole array to empty strings and the
        // gameboard to "" as well.
        if (index === -1) {
            gameBoardDraw.forEach(element => {
                element.textContent = "";
                gameBoard.pop();
            })
        // if the player is entering an x or o, then simply enter it in the  respective place.
        } else if (sign === "X" || sign === "O" ){
            gameBoard[index] = sign;
            gameBoardDraw[index].textContent = sign;
        } 
    }
    return {gameBoard,gameBoardDraw, traverseBoard, gameBoardArrayManipulation}
})()

/**
 * The following mechanics will be checked:
 * Check if it is a new game: empty field <- let's see if we even need that, sounds unnecessary
 * Check if the field is full: determine the outcome
 * Check if the field is already being filled. at least one sign.
 *  Then check if the clicked fields are already given an x or o. 
 */
const gameRules = (() => {
    const fullFieldChecker = (gameBoard) {
        let count = 0
        gameBoard.forEach(element => {
            if ()
        });
    }
})


const playerFactory = (name, sign) =>{
    return {name, sign};
}






const computer = () => {
    const {sign, name} = Person(sign, name);
    const
}