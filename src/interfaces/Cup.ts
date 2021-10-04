import Position from "./Position"
import Size from "../enums/Size"
import Color from "../enums/Color"

interface Cup {
    position?: Position
    size: Size
    color: Color
}

export default Cup