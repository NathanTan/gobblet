import Color from "../src/enums/Color"
import Size from "../src/enums/Size"
import Move from "../src/interfaces/Move"
import Position from "../src/interfaces/Position"

const MoveHelper = (destX: number, destY: number, color: Color, size?: Size, sourceX?: number, sourceY?: number): Move => {
    const source = {
        x: sourceX,
        y: sourceY
    } as Position
    const dest = {
        x: destX,
        y: destY
    } as Position

    return {
        source: (sourceX >= 0) ? source : null,
        destination: dest,
        size: size,
        color: color
    }
}

export default MoveHelper