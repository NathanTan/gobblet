import Color from "../enums/Color";
import Size from "../enums/Size";
import Position from "./Position";

interface Move {
    source: Position
    destination: Position
    size: Size
    color: Color
}


export default Move