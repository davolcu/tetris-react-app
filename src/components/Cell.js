// Out of the box imports
import React from "react";
// Custom imports
import {StyledCell} from "./styles/StyledTetris";
import {TETROMINOS} from "../services/gameService";

const Cell = ({type}) => (
    <StyledCell type={type} color={TETROMINOS[type].color}/>
);

export default Cell;