// Out of the box imports
import {useCallback, useState} from "react";
// Custom imports
import {checkCollision, randomTetrominos, STAGE_WIDTH, TETROMINOS} from "../services/gameService";

export const useTetromino = () => {
    const [tetromino, setTetromino] = useState({
        pos: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    const rotatePiece = (matrix, dir) => {
        // First transpose the tetromino
        const transTetro = matrix.map((_, index) =>
            matrix.map(col => col[index])
        );

        // Reverse the transposed matrix depending on the direction
        if (dir > 0) return transTetro.map(row => row.reverse());
        return transTetro.reverse();
    };

    const rotateTetromino = (stage, dir = 1) => {
        // Shadow clone of the local tetromino object so it can be modified without triggering any state mutation
        const clonedTetromino = JSON.parse(JSON.stringify(tetromino));
        clonedTetromino.tetromino = rotatePiece(clonedTetromino.tetromino, dir);

        //After the rotation save its X pos
        const position = clonedTetromino.pos.x;
        let offset = 1;

        //Loop that checks if the rotation can be done properly
        while (checkCollision(clonedTetromino, stage, {x: 0, y: 0})){
            clonedTetromino.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > clonedTetromino.tetromino[0].length) {
                rotatePiece(clonedTetromino, -dir);
                clonedTetromino.pos.x = position;
                return;
            }
        }

        setTetromino(clonedTetromino);
    };

    const updateTetromino = ({x, y, collided}) => {
        setTetromino(prev => ({
            ...prev,
            pos: {x: prev.pos.x += x, y: prev.pos.y += y},
            collided
        }));
    };

    const resetTetromino = useCallback(() => {
        setTetromino({
            pos: {x: STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: randomTetrominos().shape,
            collided: false
        });
    }, []);

    return [tetromino, rotateTetromino, updateTetromino, resetTetromino];
};