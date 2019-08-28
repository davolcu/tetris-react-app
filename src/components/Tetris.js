// Out of the box imports
import React, {useState} from "react";
// Custom imports
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import {StyledTetris, StyledTetrisWrapper} from "./styles/StyledTetris";
import {movePiece, startGame} from "../services/gameService";
import {useStage} from "../hooks/useStage";
import {useTetromino} from "../hooks/useTetromino";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null),
        [gameOver, setGameOver] = useState(false),
        [tetromino, updateTetromino, resetTetromino] = useTetromino(),
        [stage, setStage] = useStage(tetromino);

    return (
        <StyledTetrisWrapper role={"button"} tabIndex={"0"}
                             onKeyDown={e => movePiece(e, gameOver, updateTetromino)}>
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

                    <StartButton callback={() => startGame(setStage, resetTetromino)}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;