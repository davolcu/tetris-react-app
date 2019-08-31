// Out of the box imports
import React, {useState} from "react";
// Custom imports
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import {StyledTetris, StyledTetrisWrapper} from "./styles/StyledTetris";
import {checkCollision, movePiece, startGame} from "../services/gameService";
import {useInterval} from "../hooks/useInterval";
import {useStage} from "../hooks/useStage";
import {useTetromino} from "../hooks/useTetromino";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null),
        [gameOver, setGameOver] = useState(false),
        [tetromino, rotateTetromino, updateTetromino, resetTetromino] = useTetromino(),
        [stage, setStage] = useStage(tetromino, resetTetromino);

    useInterval(() => {
        let position = {x: 0, y: 1, collided: false};
        if (!checkCollision(tetromino, stage, position)) {
            updateTetromino(position);
        } else {
            // Collision up-here means game over
            if (tetromino.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }

            position = {x: 0, y: 0, collided: true};
            updateTetromino(position)
        }
    }, dropTime);

    return (
        <StyledTetrisWrapper role={"button"} tabIndex={"0"}
                             onKeyDown={e => movePiece(e, gameOver, setGameOver, setDropTime, rotateTetromino,
                                 updateTetromino, tetromino, stage)}>
            <StyledTetris>
                <Stage stage={stage}/>

                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text={"Game Over"}/>
                    ) : (
                        <div>
                            < Display text={"Score"}/>
                            < Display text={"Rows"}/>
                            < Display text={"Level"}/>
                        </div>
                    )}

                    <StartButton callback={() => startGame(setStage, setGameOver, setDropTime, resetTetromino)}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;