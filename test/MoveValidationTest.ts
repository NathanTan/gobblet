var assert = require('assert')

import Gobblet from "../src/classes/Gobblet"
import Color from "../src/enums/Color"

describe('Move Validation', function () {
    it(`Prevents Black from moving first`, () => {
        let gobblet = new Gobblet()
        gobblet.move({
            source: null,
            destination: {x: 1, y: 1},
            size: 1,
            color: Color.black
        })
    
        assert.strictEqual(Color.white, gobblet.getTurn())
    })

    it(`Moves alternate in color`, () => {
        let gobblet = new Gobblet()
        gobblet.move({
            source: null,
            destination: {x: 1, y: 1},
            size: 1,
            color: Color.white
        })
        assert.strictEqual(Color.black, gobblet.getTurn())

        gobblet.move({
            source: null,
            destination: {x: 0, y: 1},
            size: 1,
            color: Color.black
        })
        assert.strictEqual(Color.white, gobblet.getTurn())

        gobblet.move({
            source: null,
            destination: {x: 2, y: 1},
            size: 1,
            color: Color.white
        })
    
        assert.strictEqual(Color.black, gobblet.getTurn())
    })

    it(`Prevents placing a piece off the grid - x too large`, () => {
        const gobblet = new Gobblet()
        const result = gobblet.move({
            source: null,
            destination: {x: 15, y: 1},
            size: 1,
            color: Color.black
        })
    
        assert.strictEqual(false, result)
    })

    it(`Prevents placing a piece off the grid - x too small`, () => {
        const gobblet = new Gobblet()
        const result = gobblet.move({
            source: null,
            destination: {x: -1, y: 1},
            size: 1,
            color: Color.black
        })
    
        assert.strictEqual(false, result)
    })

    it(`Prevents placing a piece off the grid - y too large`, () => {
        const gobblet = new Gobblet()
        const result = gobblet.move({
            source: null,
            destination: {x: 1, y: 15},
            size: 1,
            color: Color.black
        })
    
        assert.strictEqual(false, result)
    })

    it(`Prevents placing a piece off the grid - y too small`, () => {
        const gobblet = new Gobblet()
        const result = gobblet.move({
            source: null,
            destination: {x: 1, y: -1},
            size: 1,
            color: Color.black
        })
    
        assert.strictEqual(false, result)
    })

    it(`Capture is allowed`, () => {
        const gobblet = new Gobblet()
        let result = true
        result = result && gobblet.move({
            source: null,
            destination: {x: 1, y: 1},
            size: 1,
            color: Color.white
        })

        result = result && gobblet.move({
            source: null,
            destination: {x: 0, y: 0},
            size: 3,
            color: Color.black
        })

        result = result && gobblet.move({
            source: null,
            destination: {x: 2, y: 2},
            size: 1,
            color: Color.white
        })

        result = result && gobblet.move({
            source: {x: 0, y: 0},
            destination: {x: 1, y: 1},
            size: 3,
            color: Color.black
        })
        gobblet.printBoard()

        assert.strictEqual(true, result)
    })
})