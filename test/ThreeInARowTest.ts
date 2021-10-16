var assert = require('assert')

import Gobblet from "../src/classes/Gobblet"
import Color from "../src/enums/Color"
import Position from "../src/interfaces/Position"
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

    it(`Accurately describes 3 in a row in the E direction`, () => {
        let gobblet = new Gobblet()
        let moveResults = true
        const origin = {x: 0, y: 1} as Position

        for (let i = 0; i < 3; i++) {
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x, origin.y + i, Color.white, 1))
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x + 1, origin.y + i, Color.black, 1))

            if (i < 2)
                assert.strictEqual(false, gobblet.threeInARowAtLocation(origin, Color.white))
        }

        assert.strictEqual(true, gobblet.threeInARowAtLocation(origin, Color.white))
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })

    it(`Accurately describes 3 in a row in the S direction`, () => {
        let gobblet = new Gobblet()
        let moveResults = true
        const origin = {x: 0, y: 1} as Position

        for (let i = 0; i < 3; i++) {
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x + i, origin.y, Color.white, 1))
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x + i, origin.y + 1, Color.black, 1))

            if (i < 2)
                assert.strictEqual(false, gobblet.threeInARowAtLocation(origin, Color.white))
        }

        assert.strictEqual(true, gobblet.threeInARowAtLocation(origin, Color.white))
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })

    it(`Accurately describes 3 in a row in the SE direction`, () => {
        let gobblet = new Gobblet()
        let moveResults = true
        const origin = {x: 0, y: 1} as Position

        for (let i = 0; i < 3; i++) {
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x + i, origin.y + i, Color.white, 1))
            if (i < 2)
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x + i, origin.y + i + 1, Color.black, 1))

            if (i < 2)
                assert.strictEqual(false, gobblet.threeInARowAtLocation(origin, Color.white))
        }

        assert.strictEqual(true, gobblet.threeInARowAtLocation(origin, Color.white))
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })

    it(`Accurately describes 3 in a row in the W direction`, () => {
        let gobblet = new Gobblet()
        let moveResults = true
        const origin = {x: 1, y: 2} as Position

        for (let i = 0; i < 3; i++) {
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x, origin.y - i, Color.white, 1))
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x + 1, origin.y -i, Color.black, 1))

            if (i < 2)
                assert.strictEqual(false, gobblet.threeInARowAtLocation(origin, Color.white))
        }

        assert.strictEqual(true, gobblet.threeInARowAtLocation(origin, Color.white))
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })

    it(`Accurately describes 3 in a row in the SE direction`, () => {
        let gobblet = new Gobblet()
        let moveResults = true
        const origin = {x: 0, y: 0} as Position

        for (let i = 0; i < 3; i++) {
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x + i, origin.y + i, Color.white, 1))
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x + i + 1, origin.y + i, Color.black, 1))

            if (i < 2)
                assert.strictEqual(false, gobblet.threeInARowAtLocation(origin, Color.white))
        }

        assert.strictEqual(true, gobblet.threeInARowAtLocation(origin, Color.white))
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })

    
    it(`Accurately describes 3 in a row in the SW direction`, () => {
        let gobblet = new Gobblet()
        let moveResults = true
        const origin = {x: 0, y: 2} as Position

        for (let i = 0; i < 3; i++) {
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x + i, origin.y - i, Color.white, 1))
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x + i + 1, origin.y - i, Color.black, 1))

            if (i < 2)
                assert.strictEqual(false, gobblet.threeInARowAtLocation(origin, Color.white))
        }

        assert.strictEqual(true, gobblet.threeInARowAtLocation(origin, Color.white))
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })

    it(`Accurately describes 3 in a row in the NW direction`, () => {
        let gobblet = new Gobblet()
        let moveResults = true
        const origin = {x: 2, y: 0} as Position

        for (let i = 0; i < 3; i++) {
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x - i, origin.y + i, Color.white, 1))
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x - i + 1, origin.y + i, Color.black, 1))

            if (i < 2)
                assert.strictEqual(false, gobblet.threeInARowAtLocation(origin, Color.white))
        }

        assert.strictEqual(true, gobblet.threeInARowAtLocation(origin, Color.white))
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })

    it(`Accurately describes 3 in a row in the N direction`, () => {
        let gobblet = new Gobblet()
        let moveResults = true
        const origin = {x: 2, y: 0} as Position

        for (let i = 0; i < 3; i++) {
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x - i, origin.y, Color.white, 1))
            moveResults = moveResults && gobblet.move(MoveHelper(origin.x - i, origin.y + 1, Color.black, 1))

            if (i < 2)
                assert.strictEqual(false, gobblet.threeInARowAtLocation(origin, Color.white))
            gobblet.printBoard()
        }

        assert.strictEqual(true, gobblet.threeInARowAtLocation(origin, Color.white))
        assert.strictEqual(true, moveResults) // All moves were successfully completed
    })
})