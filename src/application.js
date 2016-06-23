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

function showAndSendAverage(avg) {
    console.log('Score: ' + avg);
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
    //var max = Math.max.apply(this, mv);
    //var move = mv.indexOf(max);
    window.gameManager.inputManager.emit('move', Math.floor(mv));
}

function tryAgain() {
    window.gameManager.restart();
}

var delay = 2;

// For stat analysis
var avgs = [];

var env = {};
env.getNumStates = function () {
    return 16;
};
env.getMaxNumActions = function () {
    return 4;
};

// create the DQN agent

var spec = {};
spec.update = 'qlearn'; // qlearn | sarsa
spec.gamma = 0.9; // discount factor, [0, 1)
spec.epsilon = 0.2; // initial epsilon for epsilon-greedy policy, [0, 1)
spec.alpha = 0.01; // value function learning rate
spec.experience_add_every = 5; // number of time steps before we add another experience to replay memory
spec.experience_size = 10000; // size of experience
spec.learning_steps_per_iteration = 5;
spec.tderror_clamp = 1.0; // for robustness
spec.num_hidden_units = 1000; // number of neurons in hidden layer
agent = new RL.DQNAgent(env, spec);

var bestTile = 0;

function run() {
    window.gameManager.actuator.clearMessage();
    var action = agent.act(getGrid());
    var previousScore = window.gameManager.score;
    move(action);
    var currentScore = window.gameManager.score;
    if (window.gameManager.isGameTerminated()) {
        var currentBestTile = getBestTileFromGrid(getGrid());
        bestTile = Math.max(bestTile, currentBestTile);
        avgs.push(window.gameManager.score);
        showAndSendAverage(window.gameManager.score);
        tryAgain();
    }
    agent.learn(currentScore - previousScore);
    setTimeout(run, delay);
}
setTimeout(run, 200);
