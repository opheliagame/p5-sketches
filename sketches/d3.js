import Transformer from '../utils/transformer';
import {
  range
} from '../utils/utils';

const Sketch = (W, H) => (p) => {
  let { 
    // Constants
    RADIANS,
    PI, 
    HALF_PI: PI_2,
    QUARTER_PI: PI_4,
    TWO_PI,

    // Time
    year, month, day, hour, minute, second, millis,
  } = p

  const MSG1 = 'तल'
  const MSG2 = 'ताल'
  let w1, w2, t
  let cols, rows
  let taal, level = 0

  p.setup = () => {
    p.createCanvas(W, H)
    p.textAlign(p.LEFT, p.CENTER)
    p.textSize(15)
    w1 = p.textWidth(MSG1)
    w2 = p.textWidth(MSG2)
    cols = p.floor(p.width/w1)
    rows = p.floor(p.height/15)
    // rows = 6
    // currRow = rows-2
    
    taal = Array.from(Array(rows), () => new Array(cols).fill(0))
    // noLoop()
    p.frameRate(30)
  }


  p.draw = () => {
    p.background(255);
    t = p.millis()/1000
    // randomSeed(20)
    
    for(let j = 0; j < p.height; j+=15) {
      let i = 0
      while(i < p.width) {
        let col = p.floor(i/p.width*cols)
        let row = p.floor(j/p.height*rows)
        let msg = taal[row][col] === 0 ? MSG1 : MSG2
        let xdiff = taal[row][col] === 0 ? w1 : w2
        let amp = p.map(j, 0, p.height, 30, 2)
        
        let ydiff = p.sin(p.radians(i)+t) * amp
        p.push()
        p.translate(i, j+ydiff)
        if(msg === MSG1) {
          p.fill(0)
          
        } else {
          p.fill(0, 0, 255)
          
        }
        p.text(msg, 0, 0) 
        p.pop()
        
        i+=xdiff
      }
    }
      
    if(p.frameCount % 10 === 0) {
      // taal[currRow] = [...taal[currRow+1]]
      for(let j = 0; j < rows; j++) {
        if (j > rows-8) {
          seedLastRow(j, 3)
        } else {
          let currRow = j
          let spread = p.map(currRow, 0, rows, 1.0, 0.2)
          if(currRow > p.floor(level)) taal[currRow] = new Array(cols).fill(0)
          for(let i = 1; i < cols-1; i++) {
            if(taal[currRow+1][i] === 1 && p.random() < spread) {
              taal[currRow][i-1] = 1
              taal[currRow][i+1] = 1
            } else {
              // taal[currRow][i] = 0
              // taal[currRow][i+2] = 0
            }
          }
        }
        
      }
      level += 0.1
      // currRow = abs(currRow - 1) % (rows-1)
    }
  }

  function seedLastRow(row, N) {
    taal[row] = new Array(cols).fill(0)
    for(let n = 0; n < N; n++) {
      let col = p.floor(p.random(cols))
      taal[row][col] = 1
    }
  } 
}
export default Sketch