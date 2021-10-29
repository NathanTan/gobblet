var assert = require('assert')

import Gobblet from "../src/classes/Gobblet"
import Color from "../src/enums/Color"
import MoveHelper from "./MoveHelper"

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

        assert.strictEqual(true, result)
    })

    it(`Capture is allowed of the same color from off the board`, () => {
        const config = { debug: false }
        let gobblet = new Gobblet(config)
        let moveResults = true

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(0, 1, Color.black, 3))

        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.white, 2))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())
        assert.strictEqual(true, moveResults)
    })

    // TODO: Fix this test to check for the number of pieces on the board to make sure it is equal to 3
    it(`Capture is allowed of the same color from on the board`, () => {
        const config = { debug: false }
        let gobblet = new Gobblet(config)
        let moveResults = true

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.white, 3))
        moveResults = moveResults && gobblet.move(MoveHelper(0, 1, Color.black, 3))

        moveResults = moveResults && gobblet.move(MoveHelper(1, 1, Color.white, 2))
        moveResults = moveResults && gobblet.move(MoveHelper(0, 2, Color.black, 3))

        gobblet.printBoard()
        moveResults = moveResults && gobblet.move(MoveHelper(1, 1, Color.white, 3, 0, 0))
        gobblet.printBoard()

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())
        assert.strictEqual(true, moveResults)
    })

    it(`Capture is not allowed if cups are the same size`, () => {
        const config = { debug: false }
        let gobblet = new Gobblet(config)
        let moveResults = true

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(0, 1, Color.black, 3))

        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.white, 1))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())
        assert.strictEqual(false, moveResults)
    })

    it(`Allows for capture from off the board when 3 in a row.`, () => {
        const config = { debug: false }
        let gobblet = new Gobblet(config)
        let moveResults = true

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(1, 0, Color.black, 3))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(1, 1, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(0, 1, Color.black, 1))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(2, 2, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(2, 2, Color.black, 3))

        // Check if the game is over
        // assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(3, 3, Color.white, 2))

        // Check if the game is over
        // assert.strictEqual(false, gobblet.isGameOver())
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })

    it(`Does not allow for capture from off the board when not 3 in a row.`, () => {
        const config = { debug: false }
        let gobblet = new Gobblet(config)
        let moveResults = true

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.black, 3))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())
        assert.strictEqual(false, moveResults) // All moves were successfully completed
    })
})