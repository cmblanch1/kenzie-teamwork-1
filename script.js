const board = [
    [0, 0, 0, 0, 0, 0], // Each inner array is a COLUMN of the game board
    [0, 0, 0, 0, 0, 0], // Board[0] is the left-most column
    [0, 0, 0, 0, 0, 0], // Board[0][0] is the top-left corner cell
    [0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];


//Turn holding variable to switch between colors
let turn = 1

//Initialization of variables to break apart the board into columns
let column1 = board[0]
let column2 = board[1]
let column3 = board[2]
let column4 = board[3]
let column5 = board[4]
let column6 = board[5]
let column7 = board[6]



const grid = document.getElementById("grid");

// Draws the grid to the page, adds discs based on data model
function generateGrid(twoDArray) {
    grid.innerHTML = "";
    for (let i = 0; i < twoDArray.length; i++) {
        let innerArray = twoDArray[i];
        let col = document.createElement("div");
        col.id = `col${i+1}`;

        for (let j = 0; j < innerArray.length; j++) {
            let currentValue = innerArray[j];
            if (currentValue === 0) {
                col.innerHTML += `<div class="cell" onclick='columnClick(column${i+1}, board)'></div>`;
            } else if (currentValue === 1) {
                col.innerHTML += `<div class="cell" onclick='columnClick(column${i+1}, board)'><div class="disc red"></div></div>`;
            } else if (currentValue === 2) {
                col.innerHTML += `<div class="cell" onclick='columnClick(column${i+1}, board)'><div class="disc black"></div></div>`;
            }
        }
        
        grid.append(col);
    }
   
}

// End grid rendering (removes event listeners)
function endGrid(twoDArray) {
    grid.innerHTML = "";
    for (let i = 0; i < twoDArray.length; i++) {
        let innerArray = twoDArray[i];
        let col = document.createElement("div");
        col.id = `col${i+1}`;

        for (let j = 0; j < innerArray.length; j++) {
            let currentValue = innerArray[j];
            if (currentValue === 0) {
                col.innerHTML += `<div class="cell"></div>`;
            } else if (currentValue === 1) {
                col.innerHTML += `<div class="cell"><div class="disc red"></div></div>`;
            } else if (currentValue === 2) {
                col.innerHTML += `<div class="cell"><div class="disc black"></div></div>`;
            }
        }
        
        grid.append(col);
    }
}

// Resets the board
function resetGrid(twoDArray) {
    for (let i = 0; i < twoDArray.length; i++) {
        let innerArray = twoDArray[i];
        for (let j = 0; j < innerArray.length; j++) {
            innerArray[j] = 0;
        }
    }
    generateGrid(twoDArray);
}

generateGrid(board);



// Rendering Disc
function renderDisc(column, divCol){
    let cell = columnCheck(column)
    
    //console.log(cell)

    if(turn === 2){
        column[cell] = 2
        turn = 1

    }else if(turn === 1){
        column[cell] = 1
        turn = 2

    }

}

//Check to see if column already has game pieces inside column
function columnCheck(column){
    let i = 0
   
    for (i = column.length - 1; i >= 0; i--) {
        if (column[i] === 0){break; }
        //If rendering is broken uncomment this
        //console.log('test')
    }

    return i
}

function columnClick(column, twoDArray){
    renderDisc(column)
    generateGrid(twoDArray)
}

// Displays text parameter over grid, fades out the grid
function endGameScreen(winText) {
    let winElement = document.createElement("h1");
    winElement.innerHTML = `${winText}`;
    winElement.className = "end-game";
    grid.style.opacity = 0.2;
    document.body.append(winElement);
}

/*let btn = document.getElementById('test')

btn.onclick = function(){
    columnClick(column1, board)
}*/

