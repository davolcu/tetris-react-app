// Out of the box imports
import {useState} from "react";
// Custom imports
import {randomTetrominos} from "../services/gameService";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        piece: randomTetrominos().shape,
        collided: false
    });

    return [player];
};