var assert = require('assert')

import Gobblet from "../src/classes/Gobblet"
import Color from "../src/enums/Color"

describe('Three in a row', function () {
    it(`Accurately describes 3 in a row in the SW direction`, () => {
        let gobblet = new Gobblet()
        gobblet.move({
            source: null,
            destination: {x: 1, y: 1},
            size: 1,
            color: Color.white
        })
        gobblet.move({
            source: null,
            destination: {x: 0, y: 0},
            size: 1,
            color: Color.black
        })
        
        assert.strictEqual(false, gobblet.threeInARowAtLocation({x: 1, y: 1}, Color.white))

        gobblet.move({
            source: null,
            destination: {x: 2, y: 2},
            size: 1,
            color: Color.white
        })
        gobblet.move({
            source: null,
            destination: {x: 0, y: 1},
            size: 1,
            color: Color.black
        })
        assert.strictEqual(false, gobblet.threeInARowAtLocation({x: 1, y: 1}, Color.white))

        gobblet.move({
            source: null,
            destination: {x: 3, y: 3},
            size: 1,
            color: Color.white
        })
        assert.strictEqual(true, gobblet.threeInARowAtLocation({x: 1, y: 1}, Color.white))
    })
})