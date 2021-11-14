# Gobblet

### A state manager for the Gobblet board game.

## Download
```
npm install --save gobblet
```
Link to NPM page: https://www.npmjs.com/package/gobblet

## Using Gobblet
```
const Gobblet = require("gobblet")

let game = new Gobblet.Gobblet()   // Uses default config object

/************************
 * Execute a move
 ************************/

// White's first move
game.move({
    source: null,
    destination: {x: 1, y: 1},
    size: 1,
    color: Color.white
})

// Black's first move 
gobblet.move({
    source: null,
    destination: {x: 0, y: 1},
    size: 1,
    color: Color.black
})

// Print out an ascii representation of the board.
game.printBoard()
```

## Methods
### move()
Executes a move.

Parameters: 

### getTurn()
Returns `0` if it's whites turn and returns `1` if it's blacks turn. If you are using typesript please refer to the `Colors` interface.

Parameters: None

Example:
```
> game.getTurn()
```

### getCupsAtLocation()
Returns an array of cups, both black and white, for a given location.

Parameters: A location object that represents a spot on the board with a range of 0 through 3.

Usage Example:
```
> game.getCupsAtLocation({ x: 3, y: 3})
```

### getTopCupAtLocation()

Parameters: 

### isGameOver()
Returns a boolean indicating if the game is over or not.

Parameters: None

Example:
```
> game.isGameOver()
```


### printBoard()

Parameters: None



## Notes
This library has no dependencies for use.

Base repository location: https://github.com/NathanTan/Gobblet