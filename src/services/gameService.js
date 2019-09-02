// Constant dimensions for stage
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// Tetris pieces object template
export const TETROMINOS = {
    0: {shape: [[0]], color: "0, 0, 0"},
    "I": {
        shape: [
            [0, "I", 0, 0],
            [0, "I", 0, 0],
            [0, "I", 0, 0],
            [0, "I", 0, 0]
        ],
        color: "80, 227, 230"
    },
    "J": {
        shape: [
            [0, "J", 0],
            [0, "J", 0],
            ["J", "J", 0]
        ],
        color: "223, 173, 36"
    },
    "L": {
        shape: [
            [0, "L", 0],
            [0, "L", 0],
            [0, "L", "L"]
        ],
        color: "36, 95, 223"
    },
    "O": {
        shape: [
            ["O", "O"],
            ["O", "O"]
        ],
        color: "223, 217, 36"
    },
    "S": {
        shape: [
            [0, "S", "S"],
            ["S", "S", 0],
            [0, 0, 0]
        ],
        color: "48, 211, 56"
    },
    "Z": {
        shape: [
            ["Z", "Z", 0],
            [0, "Z", "Z"],
            [0, 0, 0]
        ],
        color: "227, 78, 78"
    },
    "T": {
        shape: [
            [0, 0, 0],
            ["T", "T", "T"],
            [0, "T", 0],
        ],
        color: "132, 61, 198"
    },
};

// Arrow function in order to create a stage with the default dimensions
export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, "clear"])
    );

// Gets a random piece from the tetrominos template
export const randomTetrominos = () => {
    const tetrominos = "IJLOSZT";
    // Gets a random character from the string and selects that entry from the tetrominos template
    return TETROMINOS[tetrominos[Math.floor(Math.random() * tetrominos.length)]];
};

// Starts/Resets a game
export const startGame = (setStage, setGameOver, setDropTime, setScore, setRows, setLevel, resetTetromino) => {
    setStage(createStage());
    setDropTime(1200);
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
    resetTetromino();
};

// It decides how to move a piece
export const movePiece = ({keyCode}, gameOver, setGameOver, setDropTime, rotateTetromino, updateTetromino, tetromino, stage) => {
    if (!gameOver) {
        let position;

        switch (keyCode) {
            case 65:
            case 37:
                // Check the collision before the movement before the left movement
                position = {x: -1, y: 0};
                if (!checkCollision(tetromino, stage, position)) {
                    updateTetromino(position);
                }
                break;
            case 68:
            case 39:
                // Check the collision before the movement before the right movement
                position = {x: 1, y: 0};
                if (!checkCollision(tetromino, stage, position)) {
                    updateTetromino(position);
                }
                break;
            case 83:
            case 40:
                //Disable the timer first of all
                setDropTime(null);

                // Check the collision before the movement before the bottom movement
                position = {x: 0, y: 1, collided: false};
                if (!checkCollision(tetromino, stage, position)) {
                    updateTetromino(position);
                } else {
                    // Collision up here means game over
                    if (tetromino.pos.y < 1) {
                        setGameOver(true);
                        setDropTime(null);
                    }

                    position = {x: 0, y: 0, collided: true};
                    updateTetromino(position)
                }
                break;
            case 87:
            case 38:
                rotateTetromino(stage);
                break;
        }
    }
};

// It decides if a piece can be moved
export const checkCollision = (tetromino, stage, {x: moveX, y: moveY}) => {
    // For is used because is a little bit faster than map
    for (let y = 0; y < tetromino.tetromino.length; y++) {
        for (let x = 0; x < tetromino.tetromino[y].length; x++) {
            // First we check that we are in an actual cell
            if (tetromino.tetromino[y][x] !== 0) {
                switch (true) {
                    // We are moving out of the game area (y)
                    case !stage[y + moveY + tetromino.pos.y]:
                    // We are moving out of the game area (x)
                    case !stage[y + moveY + tetromino.pos.y][x + moveX + tetromino.pos.x]:
                    // We are moving to an occupied position
                    case stage[y + moveY + tetromino.pos.y][x + moveX + tetromino.pos.x][1] !== "clear":
                        return true;
                }
            }
        }
    }
};

export const releaseTimer = ({keyCode}, gameOver, setDropTime, rows, level, setLevel) => {
    if (!gameOver && (keyCode === 83 || keyCode === 40)) {
        if (rows >  (level + 1) * 10)
            setLevel(prev => prev + 1);
        setDropTime(1000 / (level + 1) + 200);
    }
};
