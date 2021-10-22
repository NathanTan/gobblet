import { GameState} from "../interfaces/GameState"
import Size from "../enums/Size"
import Color from "../enums/Color"
import Move  from "../interfaces/Move"
import Position from "../interfaces/Position"
import Cup from "../interfaces/Cup"


class Gobblet {
    private state: GameState

    constructor(config?) {
    
        // Initalize all the cups
        const cups: Array<Cup> = []
        
        for (let i = 0; i < 3; i++) {
            // @ts-ignore
            for (let cupSize in Object.values(Size).filter(k => (parseInt(k) >= 0))) {
                cups.push({
                    size: parseInt(cupSize),
                    position: null,
                    color: Color.white
                })
                cups.push({
                    size: parseInt(cupSize),
                    position: null,
                    color: Color.black
                })
            }
        }

        // Initialize the state
        const state = {
            gameIsOver: false,
            winner: null,
            turn: Color.white,
            cups: cups,
            debug: (config) ? config.debug : false
        }

        this.state = state
    }


    move(move: Move) {
        if (this.state.debug) console.log(`[DEBUG] move: ${JSON.stringify(move)}`)

        // Check if move is valid
        if (!this.moveIsValid(move)) {
            if (this.state.debug) console.log(`[DEBUG] Invalid move: ${JSON.stringify(move)}`)

            return false
        }


        // Apply move

        // If the move comes from off the board
        if (!move.source) {
            this.state.cups.find(c => (c.color === move.color && 
                c.size === move.size && 
                c.position === move.source)).position = move.destination
        }
        else {
            let c = this.state.cups.filter(cup => cup.position != null && cup.position.x === move.source.x
                && cup.position.y === move.source.y).reduce((prev, cur) => { if (cur.size > prev.size) return cur; else return prev})
            c.position = move.destination
        }

        // Update whose turn it is
        this.state.turn = (this.state.turn === Color.white) ? Color.black : Color.white

        // Check if game is over
        this.state.winner = (this.isGameOver()) ? this.state.turn : null

        // True if the move was successfully executed
        if (this.state.debug) console.log(`[DEBUG] Move() Move is completed`)
        return true

    }

    moveIsValid(move: Move): boolean {
        // Check if it's the players turn
        if (move.color !== this.state.turn) 
            return false

        // Make sure source and dest is on the board
        if (move.source && (move.source.x < 0 || move.source.x > 3))
            return false // Error move source is invalid
        if (move.destination.y < 0 || move.destination.y > 3)
            return false // Error, dest is invalid
        
        // Types of moves
        // Cover another piece "attack"
        // Add to the board
        // Uncover

       
        // const shrodingersCup = this.state.cups.filter(cup => cup.position != null && cup.position.x === move.destination.x
            // && cup.position.y === move.destination.y)

        /* Case where the piece starts from off the board */
        if (move.source === null) {
            const shrodingersCup = this.getCupAtLocation(move.destination)

            if(shrodingersCup) {
                // If there is a piece at the location, check the size
                if (move.size > shrodingersCup.size) {
                    /* Special Case: Covering another piece here is only allowed if there is 3 in a row */
                    return this.xInARowAtLocation(move.destination, this.getOppositeColor(move.color), 3)
                } else {
                    return false // Piece in dest is too big to cover
                }

            } else {
                return true // No Piece in destination, move is valid
            }
        } else {
            /* Case where the piece starts from on the board */
            const sourceCup = this.getTopCupAtLocation(move.source)
            if (!sourceCup) return false // No source cup to capture with

            const shrodingersCup = this.getTopCupAtLocation(move.destination)

            // If we are gobling a piece up
            if(shrodingersCup) {
                if (this.state.debug) console.log(`[DEBUG] sourceCup - ${JSON.stringify(sourceCup)} destCup - ${JSON.stringify(shrodingersCup)}`)
                // If there is a piece at the location, check the size
                if (sourceCup.size > shrodingersCup.size) {
                    return true // Covering a small piece, move is valid
                } else {
                    return false // Piece in dest is too big to cover
                }

            } else {
                return true // No Piece in destination, move is valid
            }
        }
    }

    private getOppositeColor(color: Color): Color {
        if (color === Color.white)
            return Color.black
        return Color.white
    }

    public getTurn() {
        return this.state.turn
    }



    // Gets a cup from a location. Null is returned if no cup is there
    public getCupAtLocation(location: Position): Cup {
        const possibleCup = this.state.cups.filter(cup => cup.position != null && cup.position.x === location.x
            && cup.position.y === location.y)[0]
        return possibleCup ? possibleCup : null
    }

    // Gets all cups from a location. Null is returned if no cup is there
    public getCupsAtLocation(location: Position): Array<Cup> {
        const possibleCup = this.state.cups.filter(cup => cup.position != null && cup.position.x === location.x
            && cup.position.y === location.y)
        return possibleCup ? possibleCup : null
    }

    // Gets the largest cup from a location. Null is returned if no cup is there
    public getTopCupAtLocation(location: Position): Cup {
        try {
            const possibleCup = this.state.cups.filter(cup => cup.position != null && cup.position.x === location.x
                && cup.position.y === location.y).reduce((prev, cur) => { if (cur.size > prev.size) return cur; else return prev})
                
                return possibleCup ? possibleCup : null
            }
        catch (e) {
            return null
        }
    }

    public isGameOver(): boolean {
        let gameIsOver = false
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                gameIsOver = this.xInARowAtLocation({x: i, y: j}, Color.white, 4)
                if (gameIsOver) return true
                gameIsOver = this.xInARowAtLocation({x: i, y: j}, Color.black, 4)
                if (gameIsOver) return true
            }
        }

        return gameIsOver
    }

    // Returns true if there is 3 in a row from a particular location else false
    public xInARowAtLocation = (location: Position, color: Color, count: number): boolean => {
        const shrodingersCup = this.getTopCupAtLocation(location)
        if (this.state.debug) console.log(`[DEBUG] Checking for ${count} in a row from position ${JSON.stringify(location)}, color: ${color}`)
        

        // If no cup or the wrong colored cup at location there is no 3 in a row
        if (shrodingersCup === null || shrodingersCup.color !== color) 
            return false
        
        // Check SW
        return this.checkCupInDirection(location, color, {x: 1, y: 1}, count) || // SE
            this.checkCupInDirection(location, color, {x: 0, y: 1}, count) || // E
            this.checkCupInDirection(location, color, {x: 1, y: 0}, count) || // S
            this.checkCupInDirection(location, color, {x: 0, y: -1}, count) || // W
            this.checkCupInDirection(location, color, {x: 1, y: -1}, count) || // SW
            this.checkCupInDirection(location, color, {x: -1, y: 1}, count) || // NE
            this.checkCupInDirection(location, color, {x: -1, y: -1}, count) || // NW
            this.checkCupInDirection(location, color, {x: -1, y: 0}, count) // N

    }

    // Returns true if there is 3 in a row from a particular location else false
    public threeInARowAtLocation = (location: Position, color: Color): boolean => {
        const shrodingersCup = this.getCupAtLocation(location)

        if (this.state.debug) console.log("shrodingersCup")
        if (this.state.debug) console.log(shrodingersCup)

        // If no cup or the wrong colored cup at location there is no 3 in a row
        if (shrodingersCup === null || shrodingersCup.color !== color) 
            return false
        
        // Check SW
        return this.checkCupInDirection(location, color, {x: 1, y: 1}, 3) || // SE
            this.checkCupInDirection(location, color, {x: 0, y: 1}, 3) || // E
            this.checkCupInDirection(location, color, {x: 1, y: 0}, 3) || // S
            this.checkCupInDirection(location, color, {x: 0, y: -1}, 3) || // W
            this.checkCupInDirection(location, color, {x: 1, y: -1}, 3) || // SW
            this.checkCupInDirection(location, color, {x: -1, y: 1}, 3) || // NE
            this.checkCupInDirection(location, color, {x: -1, y: -1}, 3) || // NW
            this.checkCupInDirection(location, color, {x: -1, y: 0}, 3) // N

    }

    public printBoard() {
        const dots = '-------------' 
        console.log(dots)
        for (let i = 0; i < 4; i++) {
            let line = "|"
            for (let j = 0; j < 4; j++) {
                if (this.getTopCupAtLocation({x: i, y: j}) === null) {
                    line += "  |"
                } else {
                    const cup = this.getTopCupAtLocation({x: i, y: j})
                    const colorForPrinting = cup.color === Color.white ? "W" : "B"
                    line += `${colorForPrinting}${cup.size}|`
                }

            }
            console.log(line)
            console.log(dots)
        }
    }

    private checkCupInDirection(location: Position, color: Color, direction: Position, count: number): boolean {
        let inspectionPoint = {...location}
        let threeInARow = false
        for (let i = 0; i < count; i++) {
            const shrodingersCup = this.getTopCupAtLocation(inspectionPoint)

            if (this.state.debug) console.log(`[DEBUG] checking ${JSON.stringify(inspectionPoint)} from location ${JSON.stringify(location)}, count: ${count}`)

            // Return null if we stop seeing cups or the top cup is the wrong color.
            if (!shrodingersCup || (shrodingersCup === null || shrodingersCup.color !== color))
                return false
            
            inspectionPoint.x += direction.x
            inspectionPoint.y += direction.y
            threeInARow = true || threeInARow
        }
        return threeInARow
    }
}


export default Gobblet