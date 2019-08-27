// Out of the box imports
import {useState} from "react";
// Custom imports
import {createStage} from "../services/gameService";

export const useStage = () => {
    const [stage, setStage] = useState(createStage());

    return [stage, setStage];
};