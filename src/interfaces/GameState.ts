import Color from "../enums/Color";
import Cup from "./Cup"

interface GameState {
    cups: Array<Cup>
    turn: Color
    gameIsOver: boolean
    winner?: Color
    debug?: boolean
}

export { GameState as GameState };