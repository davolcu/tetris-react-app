// Out of the box imports
import {useState, useCallback} from "react";
// Custom imports
import {randomTetrominos, STAGE_WIDTH} from "../services/gameService";

export const useTetromino = () => {
    const [tetromino, setTetromino] = useState({
        pos: {x: 0, y: 0},
        tetromino: randomTetrominos().shape,
        collided: false
    });

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

    return [tetromino, updateTetromino, resetTetromino];
};