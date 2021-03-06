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
let turnText = document.getElementById('turn')
function turnBoard(){
    if(turn === 2){
        turnText.innerHTML = `<h4>It's Black's turn</h4>`

    }else if(turn === 1){
        turnText.innerHTML = `<h4>It's Red's turn</h4>`
    }


}

turnBoard()


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
        turnBoard()
        winState()
        winStateText()
        isTie()
        tieText()

    }else if(turn === 1){
        column[cell] = 1
        turn = 2
        turnBoard()
        winState()
        winStateText()
        isTie()
        tieText()

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
    if(winState()=== undefined || isTie () === undefined){
        renderDisc(column)
        generateGrid(twoDArray)
    }else if( winState()=== true || isTie() === true){
        endGrid(board)
     }
    
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

const edgeX = board[0].length - 3;
const edgeY = board.length - 3;

let horizontal = function () {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < edgeX; x++) {
      let cell = board[y][x];
      if (cell !== 0) {
        if (cell === board[y][x + 1] && cell === board[y][x + 2] && cell === board[y][x + 3]) {
          // console.log("3 in a row vertical found at " + (x + 1) + ":" + (y + 1))
          return cell
        }
      }
    }
  }
}

let vertical = function () {
  for (let y = 0; y < edgeY; y++) {
    for (let x = 0; x < board[0].length; x++) {
      cell = board[y][x];
      if (cell !== 0) {
        if (cell === board[y + 3][x] && cell === board[y + 2][x] && cell === board[y + 1][x]) {
          // console.log("3 in a row horizontal found at " + (x + 1) + ":" + (y + 1))
          return cell
        }
      }
    }
  }
}

let downRight = function () {
  for (let y = 0; y < edgeY; y++) {
    for (let x = 0; x < edgeX; x++) {
      cell = board[y][x];
      if (cell !== 0) {
        if (cell === board[y + 1][x + 1] && cell === board[y + 2][x + 2] && cell === board[y + 3][x + 3]) {
          // console.log("3 in a row down-right found at " + (x + 1) + ":" + (y + 1))
          return cell
        }
      }
    }
  }
}

let downLeft = function () {
  for (let y = 3; y < board.length; y++) {
    for (let x = 0; x < edgeX; x++) {
      cell = board[y][x];
      if (cell !== 0) {
        if (cell === board[y - 1][x + 1] && cell === board[y - 2][x + 2] && cell === board[y - 3][x + 3]) {
          // console.log("3 in a row down-left found at " + (x + 1) + ":" + (y + 1))
          return cell
        }
      }
    }
  }
}


let isTie = function () {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < edgeX; x++) {
      cell = board[y][x];
      if (cell === 0) {
        return false
      }
    }
  }
  return true
  
}

let player

let winState = function () {

  if (vertical() === 1) {
    player = 1
  } else if (vertical() === 2) {
    player = 2
  } if (horizontal() === 1) {
    player = 1
  } else if (horizontal() === 2) {
    player = 2
  } if (downRight() === 1) {
    player = 1
  } else if (downRight() === 2) {
    player = 2
  } if (downLeft() === 1) {
    player = 1
  } else if (downLeft() === 2) {
    player = 2
  } if (player) {
   
    return true
    // alert(`Player: ${player} wins!`)

  }
}


function winStateText(){
    if(winState()=== true){
        endGameScreen(`Player: ${player} wins!` )
    } else{
        return
    }
}
function tieText(){
    if(isTie()=== true){
        endGameScreen(`It's a tie!` )
    } else{
        return
    }
}




let reset = function () {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < edgeX; x++) {
        board[y][x] = 0
      }
    }
    resetGrid(board)
    turn = 1
    turnBoard()
    let endText = document.querySelector('.end-game')
    endText.remove()
    generateGrid(board)
  }
  

let resetButton = document.getElementById('ResetButton')
resetButton.addEventListener('click', reset)





