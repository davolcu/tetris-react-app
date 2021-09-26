// Out of the box imports
import React from 'react';
// Custom imports
import { StyledStartButton } from './styles/StyledTetris';

const StartButton = ({ callback }) => <StyledStartButton onClick={callback}> Start Game </StyledStartButton>;

export default StartButton;
