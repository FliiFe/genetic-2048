/* eslint-disable no-undef */
// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
    window.gameManager = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});

function getGrid() {
    var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < window.gameManager.grid.cells.length; i++) {
        for (var j = 0; j < window.gameManager.grid.cells[i].length; j++) {
            var tile = window.gameManager.grid.cells[i][j];
            if (!tile) continue;
            grid[4 * tile.y + tile.x] = tile.value;
        }
    }
    return grid;
}

function showAndSendAverage(avg){
    console.log('Average: ' + avg);
    //If stats server is not running, socket is an object with emit being an empty function.
    socket.emit('avgs', JSON.stringify(avgs));
}

// Might be hacky, but works.
function arraysEquality(a1, a2, a3) {
    return JSON.stringify(a1) === JSON.stringify(a2) && JSON.stringify(a1) === JSON.stringify(a3);
}

function getBestTileFromGrid(grid) {
    return Math.max.apply(this, grid);
}

// Array. Biggest number's index defines the movement.
// 0 = up, 2 = down
// 1 = right, 3 = left
function move(mv) {
    var max = Math.max.apply(this, mv);
    var move = mv.indexOf(max);
    window.gameManager.inputManager.emit('move', Math.floor(move));
}

function tryAgain() {
    window.gameManager.restart();
}

var delay = 4;

// For stat analysis
var avgs = [];

function run() {
    setTimeout(run, delay);
}
setTimeout(run, 200);
