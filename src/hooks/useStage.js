// Out of the box imports
import { useState, useEffect } from 'react';
// Custom imports
import { createStage } from '../services/gameService';

export const useStage = (tetromino, resetTetromino) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = (newStage) =>
            newStage.reduce((ack, row) => {
                if (row.findIndex((cell) => cell[0] === 0) === -1) {
                    setRowsCleared((prev) => prev + 1);
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return ack;
                }

                ack.push(row);
                return ack;
            }, []);
        setStage((prev) => {
            //Flush the stage first
            const newStage = prev.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

            // Then re-draw the tetromino
            tetromino.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + tetromino.pos.y][x + tetromino.pos.x] = [
                            value,
                            tetromino.collided ? 'merged' : 'clear',
                        ];
                    }
                });
            });

            // Finally check if tetromino has collided
            if (tetromino.collided) {
                resetTetromino();
                return sweepRows(newStage);
            }

            return newStage;
        });
    }, [tetromino, resetTetromino]);

    return [stage, setStage, rowsCleared];
};
