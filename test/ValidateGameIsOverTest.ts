var assert = require('assert')

import Gobblet from "../src/classes/Gobblet"
import Color from "../src/enums/Color"
import Position from "../src/interfaces/Position"
import MoveHelper from "./MoveHelper"

describe('Game is Over', function () {
    it(`Game completes successfully with a vertical 4 in a row, white`, () => {
        const config = { }
        let gobblet = new Gobblet(config)
        let moveResults = true

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 1, Color.white, 3))
        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.black, 3))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(1, 1, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(2, 2, Color.black, 1))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(2, 1, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(3, 3, Color.black, 1))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(3, 1, Color.white, 1))

        // Check if the game is over
        assert.strictEqual(true, gobblet.isGameOver())
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })

    it(`Game completes successfully with a vertical 4 in a row, black`, () => {
        const config = { }
        let gobblet = new Gobblet(config)
        let moveResults = true

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 1, Color.white, 3))
        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.black, 3))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(1, 1, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(1, 0, Color.black, 1))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(2, 1, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(2, 0, Color.black, 1))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(3, 3, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(3, 0, Color.black, 1))

        // Check if the game is over
        assert.strictEqual(true, gobblet.isGameOver())
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })

    it(`Game completes successfully with a horizontal 4 in a row, white`, () => {
        const config = { }
        let gobblet = new Gobblet(config)
        let moveResults = true

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.white, 3))
        moveResults = moveResults && gobblet.move(MoveHelper(1, 0, Color.black, 3))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 1, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(1, 1, Color.black, 1))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 2, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(1, 2, Color.black, 1))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 3, Color.white, 1))

        // Check if the game is over
        assert.strictEqual(true, gobblet.isGameOver())
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })

    it(`Game completes successfully with a horizontal 4 in a row, black`, () => {
        const config = { }
        let gobblet = new Gobblet(config)
        let moveResults = true

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.white, 3))
        moveResults = moveResults && gobblet.move(MoveHelper(1, 0, Color.black, 3))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 1, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(1, 1, Color.black, 1))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 2, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(1, 2, Color.black, 1))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(2, 3, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(1, 3, Color.black, 1))

        // Check if the game is over
        assert.strictEqual(true, gobblet.isGameOver())
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })

    it(`Game completes successfully with a diagonal 4 in a row, white`, () => {
        const config = { }
        let gobblet = new Gobblet(config)
        let moveResults = true

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(0, 0, Color.white, 3))
        moveResults = moveResults && gobblet.move(MoveHelper(1, 0, Color.black, 3))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(1, 1, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(0, 1, Color.black, 1))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(2, 2, Color.white, 1))
        moveResults = moveResults && gobblet.move(MoveHelper(1, 2, Color.black, 1))

        // Check if the game is over
        assert.strictEqual(false, gobblet.isGameOver())

        moveResults = moveResults && gobblet.move(MoveHelper(3, 3, Color.white, 1))

        // Check if the game is over
        assert.strictEqual(true, gobblet.isGameOver())
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })

})