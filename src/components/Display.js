// Out of the box imports
import React from 'react';
import { StyledDisplay } from './styles/StyledTetris';

const Display = ({ gameOver, text }) => <StyledDisplay gameOver={gameOver}> {text} </StyledDisplay>;

export default Display;
