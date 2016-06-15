/* eslint-disable no-undef */
// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
    window.gameManager = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});

function getGrid(){
    var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(var i=0; i<window.gameManager.grid.cells.length; i++){
        for(var j=0; j<window.gameManager.grid.cells[i].length; j++){
            var tile = window.gameManager.grid.cells[i][j]
            if(!tile) continue;
            grid[4*tile.y+tile.x] = tile.value;
        }
    }
    return grid;
}

var network = new Brainwave.Network(16, 1, 2, 6);

