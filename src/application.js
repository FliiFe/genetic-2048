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

// Might be hacky, but works.
function arraysEquality(a1, a2, a3) {
    return JSON.stringify(a1) === JSON.stringify(a2) && JSON.stringify(a1) === JSON.stringify(a3);
}

function getBestTileFromGrid(grid) {
    return Math.max.apply(this, grid);
}

// Movement from 0 to 3 (inclusive). Will be floored.
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
var popSize = 40;
var networks = [];
var genetics = undefined;

function initializePopulation() {

    for (var i = 0; i < popSize; i++) {
        networks.push(new Brainwave.Network(16, 4, 50, 100));
    }

    genetics = new Brainwave.Genetics(popSize, networks[0].getNumWeights());

    for (var j = 0; j < popSize; j++) {
        networks[j].importWeights(genetics.population[j].weights);
    }
}

function evolve() {


    genetics.epoch(genetics.population);

    for (var n = 0; n < popSize; n++) {
        networks[n].importWeights(genetics.population[n].weights);
    }
}

initializePopulation();

var networkIndex = 0;
var generation = 0;
var previousThreeGrids = [0, 1, 2];
var bestTile = 0;
var bestGenome = undefined;
// For stat analysis
var avgs = [];

function run() {
    if (window.gameManager.isGameTerminated() || (arraysEquality(previousThreeGrids[0], previousThreeGrids[1], previousThreeGrids[2]))) {
        genetics.population[networkIndex].fitness = window.gameManager.score;
        bestTile = Math.max(bestTile, getBestTileFromGrid(getGrid()));
        //bestGenome = genetics.sortGenomes(genetics.population)[0];
        //console.log('Individual ' + networkIndex + ' of generation ' + generation + ', with fitness ' + window.gameManager.score);
        networkIndex++;
        tryAgain();
    }
    if (networkIndex >= popSize) {
        genetics.calcStats();
        var avg = genetics.averageFitness;
        console.log('Average: ' + avg);
        avgs.push(avg);
        evolve();
        networkIndex = 0;
        generation++;
    }
    var movement = networks[networkIndex].run(getGrid()).map(function (m) {
        return 4 * m;
    });
    move(movement);
    previousThreeGrids.splice(0, 1);
    previousThreeGrids.push(getGrid());
    setTimeout(run, delay);
}
setTimeout(run, 200);
