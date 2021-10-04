var assert = require('assert')

import Gobblet from "../src/classes/Gobblet"
import Color from "../src/enums/Color"

describe('Board Printer', function () {
    it(`Displays the board with a starting position from white's perspective.`, () => {
        let gobblet = new Gobblet()
        gobblet.printBoard()
        gobblet.move({
            source: null,
            destination: {x: 1, y: 1},
            size: 1,
            color: Color.white
        })

        gobblet.printBoard()
        
        gobblet.move({
            source: null,
            destination: {x: 2, y: 2},
            size: 1,
            color: Color.white
        })
        gobblet.move({
            source: null,
            destination: {x: 3, y: 3},
            size: 1,
            color: Color.white
        })
        gobblet.printBoard()
    })
})