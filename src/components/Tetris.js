// Out of the box imports
import React, { useState } from 'react';
// Custom imports
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';
import { checkCollision, movePiece, releaseTimer, startGame } from '../services/gameService';
import { useInterval } from '../hooks/useInterval';
import { useStage } from '../hooks/useStage';
import { useTetromino } from '../hooks/useTetromino';
import { useGameStatus } from '../hooks/useGameStatus';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null),
        [gameOver, setGameOver] = useState(false),
        [tetromino, rotateTetromino, updateTetromino, resetTetromino] = useTetromino(),
        [stage, setStage, rowsCleared] = useStage(tetromino, resetTetromino),
        [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    useInterval(() => {
        let position = { x: 0, y: 1, collided: false };
        if (!checkCollision(tetromino, stage, position)) {
            updateTetromino(position);
            return;
        }

        // Collision up-here means game over
        if (tetromino.pos.y < 1) {
            setGameOver(true);
            setDropTime(null);
        }

        position = { x: 0, y: 0, collided: true };
        updateTetromino(position);
    }, dropTime);

    return (
        <StyledTetrisWrapper
            role={'button'}
            tabIndex={'0'}
            onKeyUp={(e) => releaseTimer(e, gameOver, setDropTime, rows, level, setLevel)}
            onKeyDown={(e) =>
                movePiece(e, gameOver, setGameOver, setDropTime, rotateTetromino, updateTetromino, tetromino, stage)
            }
        >
            <StyledTetris>
                <Stage stage={stage} />

                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text={'Game Over'} />
                    ) : (
                        <div>
                            <Display text={`Score: ${score}`} />
                            <Display text={`Rows: ${rows}`} />
                            <Display text={`Level: ${level}`} />
                        </div>
                    )}

                    <StartButton
                        callback={() =>
                            startGame(setStage, setGameOver, setDropTime, setScore, setRows, setLevel, resetTetromino)
                        }
                    />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;
