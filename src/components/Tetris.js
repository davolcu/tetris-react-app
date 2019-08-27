// Out of the box imports
import React, {useState} from "react";
// Custom imports
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import {createStage, movePiece} from "../services/gameService";
import {StyledTetris, StyledTetrisWrapper} from "./styles/StyledTetris";
import {usePlayer} from "../hooks/usePlayer";
import {useStage} from "../hooks/useStage";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null),
        [gameOver, setGameOver] = useState(false),
        [player] = usePlayer(), [stage, setStage] = useState(player);

    return (
        <StyledTetrisWrapper role={"button"} tabIndex={"0"} onKeyDown={e => movePiece(e, gameOver)}>
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

                    < StartButton/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;