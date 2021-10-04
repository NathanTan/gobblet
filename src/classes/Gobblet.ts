import { GameState} from "../interfaces/GameState"
import Size from "../enums/Size"
import Color from "../enums/Color"
import Move  from "../interfaces/Move"
import Position from "../interfaces/Position"
import Cup from "../interfaces/Cup"

const findPieceAtLocation = (cup:  Cup, pos: Position) => {

}

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
            turn: "w",
            cups: cups,
            debug: (config) ? config.debug : false
        }

        this.state = state
    }


    move(move: Move) {
        // Check if move is valid

        // Apply move
        this.state.cups.find(c => (c.color === move.color && 
            c.size === move.size && 
            c.position === move.source)).position = move.destination

        // Check if game is over

    }

    moveIsValid(move: Move): boolean {
        // Types of moves
        // Cover another piece "attack"
        // Add to the board
        // Uncover

        // Check all the pieces to see if there is a piece at the destination
        const shrodingersCup = this.getCupAtLocation(move.destination)
        // const shrodingersCup = this.state.cups.filter(cup => cup.position != null && cup.position.x === move.destination.x
            // && cup.position.y === move.destination.y)

        /* Case where the piece starts from off the board */
        if (move.source === null) {


            if(shrodingersCup) {
                // If there is a piece at the location, check the size
                if (move.size > shrodingersCup[0].size) {
                    /* Special Case: Covering another piece here is only allowed if there is 3 in a row */
                    // return this.threeInARowAtLocation(move.destination, move.color, 0)
                    return true
                } else {
                    return false // Piece in dest is too big to cover
                }

            } else {
                return true // No Piece in destination, move is valid
            }
        } else {
            /* Case where the piece starts from on the board */
            if(shrodingersCup) {
                // If there is a piece at the location, check the size
                if (move.size > shrodingersCup[0].size) {
                    return true // Covering a small piece, move is valid
                } else {
                    return false // Piece in dest is too big to cover
                }

            } else {
                return true // No Piece in destination, move is valid
            }
        }
    }



    // Gets a cup from a location. Null is returned if no cup is there
    public getCupAtLocation(location: Position): Cup {
        const possibleCup = this.state.cups.filter(cup => cup.position != null && cup.position.x === location.x
            && cup.position.y === location.y)[0]
        return possibleCup ? possibleCup : null
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
        return this.checkCupInDirection(location, color, {x: 1, y: 1})
        // this.checkCupInDirection(location, color, {x: 0, y: 1}) ||
        // this.checkCupInDirection(location, color, {x: 1, y: 0}) ||
        // this.checkCupInDirection(location, color, {x: 0, y: 0}) ||
        // this.checkCupInDirection(location, color, {x: -1, y: 1}) ||
        // this.checkCupInDirection(location, color, {x: -1, y: -1}) ||
        // this.checkCupInDirection(location, color, {x: 0, y: -1}) ||
        // this.checkCupInDirection(location, color, {x: -1, y: 0})

    }

    public printBoard() {
        const dots = '-------------' 
        console.log(dots)
        for (let i = 0; i < 4; i++) {
            let line = "|"
            for (let j = 0; j < 4; j++) {
                if (this.getCupAtLocation({x: i, y: j}) === null) {
                    line += "  |"
                } else {
                    const cup = this.getCupAtLocation({x: i, y: j})
                    const colorForPrinting = cup.color === Color.white ? "W" : "B"
                    line += `${colorForPrinting}${cup.size}|`
                }

            }
            console.log(line)
            console.log(dots)
        }
    }

    private checkCupInDirection(location: Position, color: Color, direction: Position): boolean {
        let inspectionPoint = {...location}
        let threeInARow = false
        for (let i = 0; i < 3; i++) {
            if (this.state.debug) console.log(`inspectionPoint:`)
            if (this.state.debug) console.log(inspectionPoint)
            const shrodingersCup = this.getCupAtLocation(inspectionPoint)
            if (!shrodingersCup)
                return false
            if (shrodingersCup === null || shrodingersCup.color !== color) 
                threeInARow = false || threeInARow
            inspectionPoint.x += direction.x
            inspectionPoint.y += direction.y
            threeInARow = true || threeInARow
        }
        return threeInARow
    }
}


export default Gobblet