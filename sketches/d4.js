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

  const MSG1 = ['ठ', 'ह', 'रा', 'व']
  const MSG2 = ['स', 'म', 'य']
  let w1, w2, t, radius = 0

  p.setup = () => {
    p.createCanvas(W, H)
    p.textAlign(p.CENTER, p.CENTER)
    p.textSize(15)
    w1 = p.textWidth(MSG1)
    w2 = p.textWidth(MSG2)
  }

  p.draw = () => {
    p.background(255);
    t = p.millis()/1000
    
    for(let j = 6; j < p.height; j+=15) {
      let count = 0
      let i = 6
      while(i < p.width) {
        let circ = p.dist(i, j, p.width/2, p.height/2) <= radius 
        let msg = circ ? MSG1 : MSG2
        let index = 0
        index = count % msg.length
        
        p.push()
        p.translate(i, j)
        if(msg === MSG1) {
          p.fill(0)
        }
        else {
          p.fill(0)
          // index = count % msg.length
          index += p.floor(t * p.exp(-radius/50)*30) 
          index = index % msg.length
        }
        p.text(msg[index], 0, 0)
        p.pop()
        
        let xdiff = 12
        i += xdiff
        count += 1
        
      }
    }
    
    if(p.frameCount % 50 === 0) {
      radius += 10
      if (radius >= 200) p.noLoop()
    }
  } 
}
export default Sketch