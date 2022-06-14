/**
 * 1. Control Display
 *  1. Control the modal
 *  2. Control the grid items
 *  3. Sense the board and call respective thinks
 *  4. Create the modal when called from logic
 * 2. GameRules
 *  1. Check whose turn it is
 *  2. Check if anybody won
 *  3. Check if it's draw
 * 3. Players DONE
 *  1. Check if it is a computer player
 *  2. Have a name
 *  3. Have a sign assigned
 * 4. Logic
 *  1. Weave it all together
 */

/**
 * Player class, also some variables to toggle for Computer player
 */
class Player {
    private name: string
    private sign: string
    private isComputer: boolean = false;
    constructor(name: string, sign: string) {
        this.name = name;
        this.sign = sign;
    }


    public getName(): string {
        return this.name
    }


    public getSign(): string {
        return this.sign
    }

    public toggleComputer(): void {
        if (this.isComputer === false) {
            this.isComputer = true;
            console.log("Computer Mode activated")
        } else {
            this.isComputer = false
            console.log("Computer Mode deactivated")
        }
    }
}
/**
 * The DisplayController controls the HTML/CSS Elements and returns 
 * the indices for later checks
 */
class DisplayController {
    private sectionContent = document.querySelectorAll('.grid-child')
    private index = -1;
    public getSections(): NodeListOf<Element> {
        return this.sectionContent
    }

    // not necessarily a setter going by TS standards, so no set keyword here
    public setSections(sign: string, index: number) {
        if (this.sectionContent[index].textContent !== "X" || "O") {
            this.sectionContent[index].textContent = sign;
            if (this.sectionContent[index].textContent === "X") {
                this.sectionContent[index].classList.add("crossed")
            } else {
                this.sectionContent[index].classList.add("ooed")
            }
        }
    }

    public getIndex() {
        return this.index
    }

    public setIndex(index: number) {
        this.index = index
    }

    public resetSections() {
        this.sectionContent.forEach(gridItem => {
            gridItem.textContent = ""
            gridItem.classList.remove("ooed")
            gridItem.classList.remove("crossed")
        })

    }

    public getModal(ti: string, pa: string) {
        let modal = document.getElementById("modal") as HTMLDialogElement
        let title = modal?.querySelector("h2")
        title!.textContent = ti;
        let paragraph = document.createElement("p")
        paragraph.textContent = pa;
        
        modal?.append(title!, paragraph);
        // this function exists, but throws an error due to the way TS currently is.
        //@ts-ignore
        modal.show()
    }

    


}

class gameRules {
    private array: string[] = []
    private playerTurn = true;
    private rounds = 0;
    //initialize th string array with nine fields. Destructuring "" i can' atm
    constructor() {
        for (let index = 0; index < 9; index++) {
            this.array.push("")
        }
        console.log(this.array)
    }

    public getArray(): string[] {
        return this.array
    }

    public setArray(array: string[]) {
        this.array = array;
    }

    public toggleTurn(): void {
        if (this.playerTurn === true) {
            this.playerTurn = false
        } else {
            this.playerTurn = true
        }
    }
    // only insert into the array, if the given index is not already filled
    public insertSign(player: Player, index: number): void {
        if (this.array[index] !== "X" || "O") {
            this.array[index] = player.getSign()
        }
    }

    public incrementRound() {
        this.rounds++;
    }

    public getRounds() {
        return this.rounds;
    }
    // There coul just be one check and return either a 1 or o at the end.
    public resultChecker(): number | undefined {
        // +10
        if (//vertical
            this.array[0] === "X" && this.array[1] === "X" && this.array[2] === "X" ||
            this.array[3] === "X" && this.array[4] === "X" && this.array[5] === "X" ||
            this.array[6] === "X" && this.array[7] === "X" && this.array[8] === "X" ||
            //horizontal
            this.array[0] === "X" && this.array[3] === "X" && this.array[6] === "X" ||
            this.array[1] === "X" && this.array[4] === "X" && this.array[7] === "X" ||
            this.array[2] === "X" && this.array[5] === "X" && this.array[8] === "X" ||
            // diagonal
            this.array[0] === "X" && this.array[4] === "X" && this.array[8] === "X" ||
            this.array[6] === "X" && this.array[4] === "X" && this.array[2] === "X"
        ) {
            return 1
            // -10
        } else if (
            this.array[0] === "O" && this.array[1] === "O" && this.array[2] === "O" ||
            this.array[3] === "O" && this.array[4] === "O" && this.array[5] === "O" ||
            this.array[6] === "O" && this.array[7] === "O" && this.array[8] === "O" ||
            //horizontal
            this.array[0] === "O" && this.array[3] === "O" && this.array[6] === "O" ||
            this.array[1] === "O" && this.array[4] === "O" && this.array[7] === "O" ||
            this.array[2] === "O" && this.array[5] === "O" && this.array[8] === "O" ||
            // diagonal
            this.array[0] === "O" && this.array[4] === "O" && this.array[8] === "O" ||
            this.array[6] === "O" && this.array[4] === "O" && this.array[2] === "O"
        ) {
            return 2;
        } else if (!this.array.includes("")) {
            return 3;
        } return 0
    }
    // probably have to move this to the display contrller
    public handleResult(result: number, display: DisplayController): boolean | undefined {
        switch (result) {
            case 1:
                console.log("Player one wins!")
                console.log("Cleaning the screen and resetting")
                this.resetArray();
                display.getModal("Playe One Won", "Repeat? Refresh")
                display.resetSections()
                this.gameOverScreen()
                this.rounds = 0;
                return true;
            case 2:
                console.log("Player two wins!")
                console.log("Cleaning the screen and resetting")
                this.resetArray();
                display.getModal("Player Two Won", "Repeat the game")
                display.resetSections()
                this.rounds = 0
                return true
            case 3:
                console.log("Draw!")
                console.log("Cleaning the screen and resetting")
                this.resetArray();
                display.getModal("DRAW", "Repeat the game?")
                display.resetSections()
                this.rounds = 0;
                return true
            default:
                break;
        }
    }

    public resetArray() {
        for (let index = 0; index < this.array.length; index++) {
            this.array[index] = ""

        }
    }

    public gameOverScreen() {
        let modal = document.getElementById("modal");
    }
}

/**
 * this is for the steps that need to be taken
 */
class gameLogic {
    private playerOne
    private playerTwo
    private display
    private rules
    private gameOver: boolean| undefined = false;

    constructor() {
        this.playerOne = new Player("One", "X");
        this.playerTwo = new Player("Two", "O")
        this.playerTwo.toggleComputer()
        this.display = new DisplayController()
        this.rules = new gameRules()
    }
    // -_- part of the code should be in displayController
    public play() {

        // get the info
        const sectionsContainer = this.display.getSections()[0].closest("section")

        sectionsContainer?.addEventListener("click", (event: MouseEvent) => {
            this.rules.incrementRound()
            let target = event.target as HTMLElement;
            // only runs this part, if the dataset- attribute isn't empty and the given target.dataset, nested inside, has no
            // other textContent than ""
            if(this.gameOver === false){
            if (target.dataset.nr !== undefined) {
                if (target.textContent === "") {
                    this.display.setIndex(parseInt(target.dataset.nr))
                    // only call it, if the player is on. The player is odd
                    if (this.rules.getRounds() % 2 === 1) {
                        this.rules.insertSign(this.playerOne, this.display.getIndex())
                        this.display.setSections(this.playerOne.getSign(), this.display.getIndex())
                    }
                    //} else { this is a test
                    this.rules.incrementRound()
                    if (this.rules.getRounds() % 2 === 0 && this.rules.getRounds() < 9) {
                        //check if computer is turned on, that is when the setting is turned to minimizing


                        do {
                            this.display.setIndex(Math.floor(Math.random() * 9))
                        } while (this.rules.getArray()[this.display.getIndex()] !== "");// wh
                        this.rules.insertSign(this.playerTwo, this.display.getIndex())
                        this.display.setSections(this.playerTwo.getSign(), this.display.getIndex())
                    }
                    // check the conditions, the null/undefined will never happen because it falls through in the handleResult function
                    setTimeout(() => {
                        this.gameOver = this.rules.handleResult(this.rules.resultChecker()!, this.display)

                    }, 1000);
                    
                }
            } 
        }
        })
    }


}
const game = new gameLogic()
game.play()