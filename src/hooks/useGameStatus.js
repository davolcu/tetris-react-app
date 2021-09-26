import { useEffect, useState, useCallback } from 'react';

export const useGameStatus = (rowsCleared) => {
    const [score, setScore] = useState(0),
        [rows, setRows] = useState(0),
        [level, setLevel] = useState(0),
        linePoints = [40, 100, 300, 1200],
        calcScore = useCallback(() => {
            // We have score
            if (rowsCleared > 0) {
                // Original tetris recipe
                setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
                setRows((prev) => prev + rowsCleared);
            }
        }, [level, linePoints, rowsCleared]);

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score]);

    return [score, setScore, rows, setRows, level, setLevel];
};
