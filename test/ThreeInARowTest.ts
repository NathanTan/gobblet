var assert = require('assert')

import Gobblet from "../src/classes/Gobblet"
import Color from "../src/enums/Color"
import MoveHelper from "./MoveHelper"

describe('Three in a row', function () {
    it(`Accurately describes 3 in a row in the SW direction`, () => {
        let gobblet = new Gobblet()
        let moveResults = true
        moveResults = moveResults && gobblet.move(MoveHelper(1, 1, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.black, 1))
        
        assert.strictEqual(false, gobblet.threeInARowAtLocation({x: 1, y: 1}, Color.white))

        moveResults = moveResults && gobblet.move(MoveHelper(2, 2, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(0, 1, Color.black, 1))

        assert.strictEqual(false, gobblet.threeInARowAtLocation({x: 1, y: 1}, Color.white))

        moveResults = moveResults && gobblet.move(MoveHelper(3, 3, Color.white, 1))

        assert.strictEqual(true, gobblet.threeInARowAtLocation({x: 1, y: 1}, Color.white))
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })
})