const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let gameend = false;

class Field {
  constructor(arrayField) {
    this.arrayField = arrayField;
    this.playerPosition = [0,0];
  }

  print() {
    this.arrayField.forEach(array => {
      let row = ""
      array.forEach(char => {
        //console.log(char)
        row+=char;
      })
      console.log(row);
      row="";
    
    })
  }

  static generateField(height, width) {
    let total = height*width;

    //multidimentional array after filled up.

    let field = [];
    const spaces = [fieldCharacter, hole];
    for (let j = 0; j < height; j++) {    
        let row = [];
        for (let i = 0; i < width; i++) {
            let tile = spaces[Math.floor((Math.random()*spaces.length))];
            row.push(tile);
        }
        field.push(row);
    }
    //Make start square the * token

    field[0][0] = '*';

    let squareHeight = squareSelector(height);
    let squareWidth = squareSelector(width);
    //Insert hat with above square values
    let hatSpace = field[squareHeight][squareWidth];
    if (squareHeight == 0 && squareWidth == 0) {
      squareHeight = 1;
    }
    field[squareHeight][squareWidth] = hat;
    return field;
  } 
}

function squareSelector(num) {
  let topNumber = num-1;
  return Math.floor(Math.random()*topNumber);
}


const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

function checkForHole(field) {
    let space = field.arrayField[field.playerPosition[1]][field.playerPosition[0]];
    if (space == 'O') {
        console.log("You fell in a whole you stupid bitch");
        gameend=true;
    }

}

//PROGRAM START


let height = prompt('height?');
let width = prompt('width?');


myField.arrayField = Field.generateField(height,width);

myField.print();

while (!gameend) {
let direction = prompt("Which way would you like to move");

/***
 * arrayField is Y,X in the arrayField meaning Y is the top level axis of the multidimentional array
 */
switch (direction) {
  case "d":
    myField.playerPosition[1]+=1;
    if (myField.playerPosition[1] == height) {
        gameend=true;
        break;
    }

    //Check to find hat
    if (myField.arrayField[myField.playerPosition[1]][myField.playerPosition[0]] == hat) {
      console.log("Wow you found your hat!");
      gameend=true;
      break;
    }

    if (myField.playerPosition[1] != height) {
        checkForHole(myField);
        myField.arrayField[myField.playerPosition[1]][myField.playerPosition[0]] = "*";
    }

    break;
  case "u":
    myField.playerPosition[1]-=1;
    if (myField.playerPosition[1] == -1) {
        gameend=true;
        break;
    }

    //Check to find hat
    if (myField.arrayField[myField.playerPosition[1]][myField.playerPosition[0]] == hat) {
      console.log("Wow you found your hat!");
      gameend=true;
      break;
    }    

    if (myField.playerPosition[1] != -1) {
        checkForHole(myField);
        myField.arrayField[myField.playerPosition[1]][myField.playerPosition[0]] = "*";
    }

    break;
  case "r":
    myField.playerPosition[0]+=1;
    if (myField.playerPosition[0] == width) {
        gameend=true;
        break;
    }

    //Check to find hat
    if (myField.arrayField[myField.playerPosition[1]][myField.playerPosition[0]] == hat) {
      console.log("Wow you found your hat!");
      gameend=true;
      break;
    }
    
    if (myField.playerPosition[0] != width) {
        checkForHole(myField);
        myField.arrayField[myField.playerPosition[1]][myField.playerPosition[0]] = "*";
    }
    break;
  case "l":
    myField.playerPosition[0]-=1;
    if (myField.playerPosition[0] == -1) {
        gameend=true;
        break;
    }

    //Check to find hat
    if (myField.arrayField[myField.playerPosition[1]][myField.playerPosition[0]] == hat) {
      console.log("Wow you found your hat!");
      gameend=true;
      break;
    }    
    
    if (myField.playerPosition[0] != -1) {
        checkForHole(myField);
        myField.arrayField[myField.playerPosition[1]][myField.playerPosition[0]] = "*";
    }
    break;

}
console.log(myField.playerPosition);
myField.print();

}

console.log("Game Over")