const board = [
    [0, 0, 0, 0, 0, 0], // Each inner array is a COLUMN of the game board
    [0, 0, 0, 0, 0, 0], // Board[0] is the left-most column
    [0, 0, 0, 0, 0, 0], // Board[0][0] is the top-left corner cell
    [0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];

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