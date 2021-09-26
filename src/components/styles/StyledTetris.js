// Out of the box imports
import styled from 'styled-components';
// Custom imports
import backgroundImage from './../../img/bg.png';

// Styles for Cell component
export const StyledCell = styled.div`
    width: auto;
    background: rgba(${(props) => props.color}, 0.8);
    border: ${(props) => (props.type === 0 ? 'none' : '5px solid')};
    border-bottom-color: rgba(${(props) => props.color}, 0.1);
    border-left-color: rgba(${(props) => props.color}, 0.3);
    border-top-color: rgba(${(props) => props.color}, 1);
    border-right-color: rgba(${(props) => props.color}, 1);
`;

// Styles for Tetris component
export const StyledTetris = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 40px;
    margin: 0 auto;
    max-width: 900px;

    aside {
        width: 100%;
        max-width: 200px;
        padding: 0 20px;
        display: block;
    }
`;

// Styles for Tetris wrapper
export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: url(${backgroundImage}) #000;
    background-size: cover;
    overflow: hidden;
`;

// Styles for Stage component
export const StyledStage = styled.div`
    display: grid;
    grid-template-rows: repeat(${(props) => props.height}, calc(25vw / ${(props) => props.width}));
    grid-template-columns: repeat(${(props) => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #333;
    width: 100%;
    max-width: 25vw;
    background: #111;
`;

// Styles for Display component
export const StyledDisplay = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 0 0 20px 0;
    padding: 20px;
    border: 5px solid #333;
    min-height: 30px;
    width: 100%;
    border-radius: 20px;
    color: ${(props) => (props.gameOver ? 'red' : '#999')};
    background: #000;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
`;

// Styles for Start Button component
export const StyledStartButton = styled.div`
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    min-height: 30px;
    width: 100%;
    display: flex;
    border-radius: 20px;
    border: none;
    color: white;
    background: #333;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    justify-content: center;
`;
