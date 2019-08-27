// Out of the box imports
import React from "react";
//Custom imports
import Cell from "./Cell";
import {StyledStage} from "./styles/StyledTetris";

const Stage = ({stage}) => (
    <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map(row => row.map((cell, index) =>
            <Cell key={index} type={cell[0]}/>
        ))}
    </StyledStage>
);

export default Stage;