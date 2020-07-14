// =================== login scripts ===================

let NumberOfUsers = 0;
let MaxNumberOfUsers = 4;

// Constructor function for User objects
function Person(name, pswd) {
    this.name = name;
    this.pswd = pswd;
}

// Create Person objects
var projAdmin = new Person("abcd", "1234");
var user1 = new Person("Sara", "1111");
var user2 = new Person("Avital", "2222");
var user3 = new Person("Oded", "3333");

var UsersList = [];

function setUsers(user) {
    UsersList[NumberOfUsers++] = user;
}

// for(let i = NumberOfUsers; i < MaxNumberOfUsers; i++)
// initialize users
function TemporarySet() {
    setUsers(projAdmin);
    setUsers(user1);
    setUsers(user2);
    setUsers(user3);
}

// validate username & password then proceed to level screen
function checkUser() {
    TemporarySet();
    let userName = document.getElementById('userName').value;
    let userPswd = document.getElementById('Password').value;
    for (let currUser of UsersList) {
        if (currUser.name == userName) { // check if existe user name 
            if (currUser.pswd == userPswd) {  // check if password is correct for chosen user 
                console.log("got login:\nuser - " + currUser.name + '\npassword - ' + currUser.pswd);

                // hide login page
                document.getElementById("loginContainer").hidden = true;

                // show levels page
                document.getElementById("levelContainer").hidden = false;

                // call level function
                setupLevelPage();

                // end function
                return;
            }
            else {
                if (NumberOfTries++ < 3) { // extra try for insert password
                    alert(" The password is incorrect! Try Again.");
                    // Password.style.border = "1px solid red";
                    // document.getElementById('Password').style.color = "red";
                    // document.getElementById('Password').value = '';
                    console.log(NumberOfTries);
                    return;
                }
                else {
                    NumberOfTries = 0;
                    alert(" Press: Forget your Password");
                    return;
                }

            }
        }
    }
    alert("The User Name is incorrect! Try Again");  // if not existing user name in list of users
    return;
}

// =================== level scripts ===================

var userName;
var curLevel = "easy";

// print username
function setupLevelPage() {

    // get userName
    userName = document.getElementById("userName").value;

    // add userName to welcome header
    document.getElementById("welcomeHeader").innerHTML += " " + userName;
}

// initilize game level chosen and proceed to game
function setLevel(level) {

    // set global level
    curLevel = level;

    // print level to console
    console.log("Current level chosen: " + curLevel);

    // hide levels
    document.getElementById("levelContainer").hidden = true;

    // show Sudoku
    document.getElementById("gameContainer").hidden = false;

    // generate game
    generateSudoku();
}

// =================== game scripts ===================

// contains all ready game tables
var sudokuTabels = [
    [	
        [	9	,	6	,	7	,	4	,	3	,	1	,	8	,	5	,	2	]	,		
        [	8	,	4	,	1	,	5	,	6	,	2	,	9	,	3	,	7	]	,		
        [	5	,	2	,	3	,	7	,	9	,	8	,	4	,	1	,	6	]	,		
        [	4	,	1	,	9	,	3	,	8	,	7	,	6	,	2	,	5	]	,		
        [	7	,	3	,	5	,	2	,	4	,	6	,	1	,	8	,	9	]	,		
        [	6	,	8	,	2	,	1	,	5	,	9	,	3	,	7	,	4	]	,		
        [	3	,	9	,	6	,	8	,	7	,	5	,	2	,	4	,	1	]	,		
        [	2	,	7	,	4	,	6	,	1	,	3	,	5	,	9	,	8	]	,		
        [	1	,	5	,	8	,	9	,	2	,	4	,	7	,	6	,	3	]	,	
    ]	,

    [	
        [	3	,	8	,	6	,	7	,	9	,	2	,	5	,	1	,	4	]	,	
        [	4	,	7	,	2	,	1	,	5	,	6	,	8	,	3	,	9	]	,	
        [	5	,	1	,	9	,	8	,	4	,	3	,	2	,	6	,	7	]	,	
        [	8	,	2	,	7	,	4	,	6	,	9	,	1	,	5	,	3	]	,	
        [	1	,	9	,	5	,	2	,	3	,	8	,	7	,	4	,	6	]	,	
        [	6	,	3	,	4	,	5	,	1	,	7	,	9	,	8	,	2	]	,	
        [	2	,	4	,	3	,	9	,	8	,	1	,	6	,	7	,	5	]	,	
        [	7	,	5	,	1	,	6	,	2	,	4	,	3	,	9	,	8	]	,	
        [	9	,	6	,	8	,	3	,	7	,	5	,	4	,	2	,	1	]	
    ]	,
																					
    [	
        [	5	,	2	,	6	,	9	,	1	,	8	,	7	,	3	,	4	]	,	
        [	7	,	3	,	1	,	2	,	4	,	5	,	6	,	9	,	8	]	,	
        [	9	,	4	,	8	,	3	,	7	,	6	,	5	,	2	,	1	]	,	
        [	1	,	9	,	4	,	5	,	6	,	2	,	8	,	7	,	3	]	,	
        [	8	,	5	,	2	,	7	,	3	,	4	,	1	,	6	,	9	]	,	
        [	6	,	7	,	3	,	8	,	9	,	1	,	4	,	5	,	2	]	,	
        [	3	,	8	,	7	,	4	,	5	,	9	,	2	,	1	,	6	]	,	
        [	2	,	1	,	9	,	6	,	8	,	7	,	3	,	4	,	5	]	,	
        [	4	,	6	,	5	,	1	,	2	,	3	,	9	,	8	,	7	]	
    ]	,
                                                                                        
    [	
        [	9	,	1	,	8	,	3	,	4	,	5	,	7	,	2	,	6	]	,	
        [	2	,	5	,	4	,	9	,	7	,	6	,	3	,	1	,	8	]	,	
        [	6	,	3	,	7	,	8	,	1	,	2	,	5	,	9	,	4	]	,	
        [	8	,	4	,	6	,	1	,	3	,	7	,	9	,	5	,	2	]	,	
        [	3	,	2	,	5	,	4	,	6	,	9	,	8	,	7	,	1	]	,	
        [	1	,	7	,	9	,	5	,	2	,	8	,	6	,	4	,	3	]	,	
        [	7	,	6	,	3	,	2	,	5	,	4	,	1	,	8	,	9	]	,	
        [	5	,	8	,	2	,	6	,	9	,	1	,	4	,	3	,	7	]	,	
        [	4	,	9	,	1	,	7	,	8	,	3	,	2	,	6	,	5	]	
    ]	,
                                                                                        
    [	
        [	2	,	1	,	8	,	4	,	6	,	3	,	7	,	9	,	5	]	,	
        [	6	,	7	,	4	,	5	,	9	,	1	,	2	,	3	,	8	]	,	
        [	5	,	9	,	3	,	8	,	7	,	2	,	1	,	6	,	4	]	,	
        [	3	,	5	,	2	,	9	,	1	,	7	,	8	,	4	,	6	]	,	
        [	8	,	6	,	7	,	3	,	5	,	4	,	9	,	2	,	1	]	,	
        [	9	,	4	,	1	,	6	,	2	,	8	,	3	,	5	,	7	]	,	
        [	1	,	8	,	6	,	2	,	4	,	9	,	5	,	7	,	3	]	,	
        [	7	,	2	,	5	,	1	,	3	,	6	,	4	,	8	,	9	]	,	
        [	4	,	3	,	9	,	7	,	8	,	5	,	6	,	1	,	2	]	
    ]	,
                                                                                        
    [	
        [	8	,	1	,	2	,	3	,	5	,	4	,	7	,	9	,	6	]	,	
        [	3	,	4	,	7	,	6	,	8	,	9	,	5	,	1	,	2	]	,	
        [	9	,	6	,	5	,	2	,	7	,	1	,	4	,	3	,	8	]	,	
        [	6	,	8	,	4	,	7	,	9	,	3	,	1	,	2	,	5	]	,	
        [	7	,	2	,	1	,	8	,	6	,	5	,	3	,	4	,	9	]	,	
        [	5	,	9	,	3	,	1	,	4	,	2	,	6	,	8	,	7	]	,	
        [	4	,	7	,	8	,	9	,	1	,	6	,	2	,	5	,	3	]	,	
        [	1	,	3	,	6	,	5	,	2	,	8	,	9	,	7	,	4	]	,	
        [	2	,	5	,	9	,	4	,	3	,	7	,	8	,	6	,	1	]	
    ]
]

// active game board
var matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// saves current random board
var randomBoard = [];

// saves the matrix beginning board after printing by level
var startMatrix = [];

// finis game board including user input
var finishBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Set new board
function generateSudoku() {
    
    var gamePart;

    // log start game
    console.log("*** game started ***");

    // game header + username
    document.getElementById("gameHeader").innerHTML = "Good Luck <strong>" + document.getElementById("userName").value + "</strong> ! :)";

    // get game difficulty
    document.getElementById("infoDifficulty").innerHTML = "Difficulty: " + curLevel;

    // set show game precentage
    switch( curLevel ){
        case "easy":
            gamePart = 0.75;
            break;
        case "medium":
            gamePart = 0.5;
            break;
        case "hard":
            gamePart = 0.25;
            break;
    }

    // print game
    printGame(gamePart);
}

// show random boeard by chosen level
function printGame(gamePart){
    
    // variables
    var randomIndex, cellsCount = 0, row, col;

    // reset matrix & table 
    resetGameBoard();

    // get random board
    randomIndex = getRandomInt( 0, sudokuTabels.length )
    randomBoard = sudokuTabels[randomIndex];
    console.log("Random board index: " + randomIndex);
    console.log(randomBoard);
    

    // while cellCount < total cells needed to print, continue printing
    do{
        // get random row & col
        row = getRandomInt( 0, matrix.length );
        col = getRandomInt( 0, matrix.length );

        // print & lock cell
        matrix[row][col] = randomBoard[row][col];
        document.querySelector("input[data-row=\'" + row + "\'][data-col=\'" + col +"\']").value = randomBoard[row][col];
        document.querySelector("input[data-row=\'" + row + "\'][data-col=\'" + col +"\']").disabled = true;

        // add to count 
        cellsCount++;

    }while( cellsCount < ( gamePart * 81 ))

    // save 
    startMatrix = matrix;

    // log success
    console.log("Printed cells: " + cellsCount);
    console.log("Done !")

}

// reset matrix & board to 0
function resetGameBoard(){
    for( let row = 0; row < matrix.length; row++ ){
        for( let col = 0; col < matrix[row].length; col++ ){
            matrix[row][col] = 0;
            document.querySelector("input[data-row=\'" + row + "\'][data-col=\'" + col +"\']").value = '';
            document.querySelector("input[data-row=\'" + row + "\'][data-col=\'" + col +"\']").disabled = false;

        }
    }
}

// return to level screen
function changeLevel(){
    
    // hide Sudoku
    document.getElementById("gameContainer").hidden = true;
    
    // show levels
    document.getElementById("levelContainer").hidden = false;
}

// delete user input
function deleteUserInput(){
    for( let row = 0; row < startMatrix.length; row++ ){
        for( let col = 0; col < startMatrix[row].length; col++ ){

            matrix[row][col] = startMatrix[row][col];

            if( startMatrix[row][col] == 0 ){

                document.querySelector("input[data-row=\'" + row + "\'][data-col=\'" + col +"\']").value = "";
                document.querySelector("input[data-row=\'" + row + "\'][data-col=\'" + col +"\']").disabled = false;
            }
            else{
                document.querySelector("input[data-row=\'" + row + "\'][data-col=\'" + col +"\']").value = startMatrix[row][col];
                document.querySelector("input[data-row=\'" + row + "\'][data-col=\'" + col +"\']").disabled = true;
            }
        }
    }
}

// show solution
function solveGame(){
    for( let row = 0; row < randomBoard.length; row++ ){
        for( let col = 0; col < randomBoard[row].length; col++ ){
            matrix[row][col] = randomBoard[row][col];
            document.querySelector("input[data-row=\'" + row + "\'][data-col=\'" + col +"\']").value = randomBoard[row][col];;
            document.querySelector("input[data-row=\'" + row + "\'][data-col=\'" + col +"\']").disabled = true;

        }
    }
}

// check finish board
function finisheGame(){

    console.log("*** Checking board *** ")

    var isLegalBoard = false;

    // get current finish board
    for( let row = 0; row < matrix.length; row++ ){
        for( let col = 0; col < matrix.length; col++ ){

            let curValue = document.querySelector("input[data-row=\'" + row + "\'][data-col=\'" + col +"\']").value

            if( curValue == '' ) finishBoard[row][col] = 0;
            else finishBoard[row][col] = parseInt(curValue);
        }
    }

    console.log(finishBoard);

    // check rows
    if ( !checkNumbers() ) alert("Found not legal number :(")
    else if ( !checkIfEmpty() ) alert("Found empty cell :(")
    else if ( !checkRows() ) alert("Rows not good :(")
    else if ( !checkColumns()) alert("Columns not good :(")
    else if ( !checkBoxes() ) alert("Boxes not good :(")
    else {
        alert("You won !! :)");
        isLegalBoard = true;
    }

    // hide game and show levels
    if( isLegalBoard ) changeLevel();
}

// ================ finis validations ================

function checkRows(){

    //                  1  2  3  4  5  6  7  8  9
    var countArr = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

    // check each row
    for( let row = 0; row < finishBoard.length; row++ ){

        // count number from columns
        for( let col = 0; col < finishBoard.length; col++ ){

            // set value found
            countArr[finishBoard[row][col]] = 1;
        }

        // check if legal count
        if( !compareArr(countArr, [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1 ])) {
            console.log("not legal row: " + row)
            return false;
        }

        // reset countArr
        countArr = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }

    return true;
}

function checkColumns(){
    //                  1  2  3  4  5  6  7  8  9
    var countArr = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

    // check each row
    for( let col = 0; col < finishBoard.length; col++ ){
        
        // count number from columns
        for( let row = 0; row < finishBoard.length; row++ ){

            // set value found
            countArr[finishBoard[row][col]] = 1;
        }

        // check if legal count
        if( !compareArr(countArr, [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1 ])) {
            console.log("not legal col: " + col);
            return false;
        }

        // reset countArr
        countArr = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }

    return true;
}

function checkBoxes(){

    //                  1  2  3  4  5  6  7  8  9
    var countArr = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

    // run on 3 row boxes
    for( let boxRow = 0; boxRow < 9; boxRow += 3 ){
        for( let boxCol = 0; boxCol < 9; boxCol +=3 ){

            // run on each box
            for( let row = boxRow; row < boxRow +3; row++ ){
                for( let col = boxCol; col < boxCol + 3; col++ ){
                    // set value found
                    countArr[finishBoard[row][col]] = 1;
                }
            }

            // check if legal count
            if( !compareArr(countArr, [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1 ])) {
                console.log("not legal box: [" + boxRow + "][" + boxCol + "]");
                return false;
            }
        }
    }

    return true;
}

function checkIfEmpty(){

    // check each row
    for( let row = 0; row < finishBoard.length; row++ ){

        // count number from columns
        for( let col = 0; col < finishBoard.length; col++ ){

            if( finishBoard[row][col] == 0) {
                console.log("Empty cell: [" + row + "][" + col + "]");
                return false;
            }
        }
    }

    return true;
}

function checkNumbers(){

    // check each row
    for( let row = 0; row < finishBoard.length; row++ ){

        // count number from columns
        for( let col = 0; col < finishBoard.length; col++ ){

            if( !finishBoard[row][col] == 0 && (finishBoard[row][col] < 0 || finishBoard[row][col] >= 10) ) {
                console.log("Not legal number: [" + row + "][" + col + "]");
                return false;
            }
        }
    }

    return true;
}

// ================ global functions ================

// get random int from min ( included ) to max ( not included )
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// compare one demension arrays
function compareArr(arr1, arr2) {

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}