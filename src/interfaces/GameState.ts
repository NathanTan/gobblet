import Color from "../enums/Color";
import Cup from "./Cup"

interface GameState {
    cups: Array<Cup>
    turn: Color
    gameIsOver: boolean
    winner?: string
    debug?: boolean
}

export { GameState as GameState };