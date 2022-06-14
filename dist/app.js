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
var Player = /** @class */ (function () {
    function Player(name, sign) {
        this.isComputer = false;
        this.name = name;
        this.sign = sign;
    }
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.getSign = function () {
        return this.sign;
    };
    Player.prototype.toggleComputer = function () {
        if (this.isComputer === false) {
            this.isComputer = true;
            console.log("Computer Mode activated");
        }
        else {
            this.isComputer = false;
            console.log("Computer Mode deactivated");
        }
    };
    return Player;
}());
/**
 * The DisplayController controls the HTML/CSS Elements and returns
 * the indices for later checks
 */
var DisplayController = /** @class */ (function () {
    function DisplayController() {
        this.sectionContent = document.querySelectorAll('.grid-child');
        this.index = -1;
    }
    DisplayController.prototype.getSections = function () {
        return this.sectionContent;
    };
    // not necessarily a setter going by TS standards, so no set keyword here
    DisplayController.prototype.setSections = function (sign, index) {
        if (this.sectionContent[index].textContent !== "X" || "O") {
            this.sectionContent[index].textContent = sign;
            if (this.sectionContent[index].textContent === "X") {
                this.sectionContent[index].classList.add("crossed");
            }
            else {
                this.sectionContent[index].classList.add("ooed");
            }
        }
    };
    DisplayController.prototype.getIndex = function () {
        return this.index;
    };
    DisplayController.prototype.setIndex = function (index) {
        this.index = index;
    };
    DisplayController.prototype.resetSections = function () {
        this.sectionContent.forEach(function (gridItem) {
            gridItem.textContent = "";
            gridItem.classList.remove("ooed");
            gridItem.classList.remove("crossed");
        });
    };
    DisplayController.prototype.getModal = function (ti, pa) {
        var modal = document.getElementById("modal");
        var title = modal === null || modal === void 0 ? void 0 : modal.querySelector("h2");
        title.textContent = ti;
        var paragraph = document.createElement("p");
        paragraph.textContent = pa;
        modal === null || modal === void 0 ? void 0 : modal.append(title, paragraph);
        // this function exists, but throws an error due to the way TS currently is.
        //@ts-ignore
        modal.show();
    };
    return DisplayController;
}());
var gameRules = /** @class */ (function () {
    //initialize th string array with nine fields. Destructuring "" i can' atm
    function gameRules() {
        this.array = [];
        this.playerTurn = true;
        this.rounds = 0;
        for (var index = 0; index < 9; index++) {
            this.array.push("");
        }
        console.log(this.array);
    }
    gameRules.prototype.getArray = function () {
        return this.array;
    };
    gameRules.prototype.setArray = function (array) {
        this.array = array;
    };
    gameRules.prototype.toggleTurn = function () {
        if (this.playerTurn === true) {
            this.playerTurn = false;
        }
        else {
            this.playerTurn = true;
        }
    };
    // only insert into the array, if the given index is not already filled
    gameRules.prototype.insertSign = function (player, index) {
        if (this.array[index] !== "X" || "O") {
            this.array[index] = player.getSign();
        }
    };
    gameRules.prototype.incrementRound = function () {
        this.rounds++;
    };
    gameRules.prototype.getRounds = function () {
        return this.rounds;
    };
    // There coul just be one check and return either a 1 or o at the end.
    gameRules.prototype.resultChecker = function () {
        // +10
        if ( //vertical
        this.array[0] === "X" && this.array[1] === "X" && this.array[2] === "X" ||
            this.array[3] === "X" && this.array[4] === "X" && this.array[5] === "X" ||
            this.array[6] === "X" && this.array[7] === "X" && this.array[8] === "X" ||
            //horizontal
            this.array[0] === "X" && this.array[3] === "X" && this.array[6] === "X" ||
            this.array[1] === "X" && this.array[4] === "X" && this.array[7] === "X" ||
            this.array[2] === "X" && this.array[5] === "X" && this.array[8] === "X" ||
            // diagonal
            this.array[0] === "X" && this.array[4] === "X" && this.array[8] === "X" ||
            this.array[6] === "X" && this.array[4] === "X" && this.array[2] === "X") {
            return 1;
            // -10
        }
        else if (this.array[0] === "O" && this.array[1] === "O" && this.array[2] === "O" ||
            this.array[3] === "O" && this.array[4] === "O" && this.array[5] === "O" ||
            this.array[6] === "O" && this.array[7] === "O" && this.array[8] === "O" ||
            //horizontal
            this.array[0] === "O" && this.array[3] === "O" && this.array[6] === "O" ||
            this.array[1] === "O" && this.array[4] === "O" && this.array[7] === "O" ||
            this.array[2] === "O" && this.array[5] === "O" && this.array[8] === "O" ||
            // diagonal
            this.array[0] === "O" && this.array[4] === "O" && this.array[8] === "O" ||
            this.array[6] === "O" && this.array[4] === "O" && this.array[2] === "O") {
            return 2;
        }
        else if (!this.array.includes("")) {
            return 3;
        }
        return 0;
    };
    // probably have to move this to the display contrller
    gameRules.prototype.handleResult = function (result, display) {
        switch (result) {
            case 1:
                console.log("Player one wins!");
                console.log("Cleaning the screen and resetting");
                this.resetArray();
                display.getModal("Playe One Won", "Repeat? Refresh");
                display.resetSections();
                this.gameOverScreen();
                this.rounds = 0;
                return true;
            case 2:
                console.log("Player two wins!");
                console.log("Cleaning the screen and resetting");
                this.resetArray();
                display.getModal("Player Two Won", "Repeat the game");
                display.resetSections();
                this.rounds = 0;
                return true;
            case 3:
                console.log("Draw!");
                console.log("Cleaning the screen and resetting");
                this.resetArray();
                display.getModal("DRAW", "Repeat the game?");
                display.resetSections();
                this.rounds = 0;
                return true;
            default:
                break;
        }
    };
    gameRules.prototype.resetArray = function () {
        for (var index = 0; index < this.array.length; index++) {
            this.array[index] = "";
        }
    };
    gameRules.prototype.gameOverScreen = function () {
        var modal = document.getElementById("modal");
    };
    return gameRules;
}());
/**
 * this is for the steps that need to be taken
 */
var gameLogic = /** @class */ (function () {
    function gameLogic() {
        this.gameOver = false;
        this.playerOne = new Player("One", "X");
        this.playerTwo = new Player("Two", "O");
        this.playerTwo.toggleComputer();
        this.display = new DisplayController();
        this.rules = new gameRules();
    }
    // -_- part of the code should be in displayController
    gameLogic.prototype.play = function () {
        var _this = this;
        // get the info
        var sectionsContainer = this.display.getSections()[0].closest("section");
        sectionsContainer === null || sectionsContainer === void 0 ? void 0 : sectionsContainer.addEventListener("click", function (event) {
            _this.rules.incrementRound();
            var target = event.target;
            // only runs this part, if the dataset- attribute isn't empty and the given target.dataset, nested inside, has no
            // other textContent than ""
            if (_this.gameOver === false) {
                if (target.dataset.nr !== undefined) {
                    if (target.textContent === "") {
                        _this.display.setIndex(parseInt(target.dataset.nr));
                        // only call it, if the player is on. The player is odd
                        if (_this.rules.getRounds() % 2 === 1) {
                            _this.rules.insertSign(_this.playerOne, _this.display.getIndex());
                            _this.display.setSections(_this.playerOne.getSign(), _this.display.getIndex());
                        }
                        //} else { this is a test
                        _this.rules.incrementRound();
                        if (_this.rules.getRounds() % 2 === 0 && _this.rules.getRounds() < 9) {
                            //check if computer is turned on, that is when the setting is turned to minimizing
                            do {
                                _this.display.setIndex(Math.floor(Math.random() * 9));
                            } while (_this.rules.getArray()[_this.display.getIndex()] !== ""); // wh
                            _this.rules.insertSign(_this.playerTwo, _this.display.getIndex());
                            _this.display.setSections(_this.playerTwo.getSign(), _this.display.getIndex());
                        }
                        // check the conditions, the null/undefined will never happen because it falls through in the handleResult function
                        setTimeout(function () {
                            _this.gameOver = _this.rules.handleResult(_this.rules.resultChecker(), _this.display);
                        }, 1000);
                    }
                }
            }
        });
    };
    return gameLogic;
}());
var game = new gameLogic();
game.play();
