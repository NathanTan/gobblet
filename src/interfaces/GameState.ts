import Cup from "./Cup"

interface GameState {
    cups: Array<Cup>
    turn: string
    gameIsOver: boolean
    winner?: string
    debug?: boolean
}

export { GameState as GameState };