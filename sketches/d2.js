import { range } from '../utils/utils'
import Transformer from '../utils/transformer'

const Sketch = (W, H) => (p) => {
  let { 
    // Constants
    RADIANS,
    DEGREES,
    CENTER,
    PI, 
    HALF_PI: PI_2,
    QUARTER_PI: PI_4,
    TWO_PI,

  } = p

  const MSG = 'lies'
  let t, counter = 0

  p.setup = function() {
    p.createCanvas(W, H)
    p.angleMode(DEGREES)
    p.textAlign(CENTER, CENTER)
    p.textSize(12)
  }

  p.draw = () => {
    p.background(255);
    t = p.millis()/1000
    counter += 2
    let msg = MSG
    
    
    p.push()
    p.translate(p.width/2, p.height/2)
    let index = 0
    for(let r = 50; r < 200; r+=15) {
      let diff = 45
      
      for(let angle = 0; angle < 360; angle+=diff) {
        let x1 = p.cos(angle) * r
        let y1 = p.sin(angle) * r
        let x2 = p.cos(angle+diff) * r
        let y2 = p.sin(angle+diff) * r
        let cx1 = p.cos(angle     +5) * (r-20)
        let cy1 = p.sin(angle     +5) * (r-20)
        let cx2 = p.cos(angle+diff-5) * (r-20)
        let cy2 = p.sin(angle+diff-5) * (r-20)
        let mx = (x1+x2)/2
        let my = (y1+y2)/2
        
        // bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2)
        let px = x1
        let py = y1
        let d = p.dist(x1, y1, x2, y2)
        let dreal = 0
        let ts = []
        let fdiff = p.map(d, 0, 200, 0.2, 0.02)
        for(let f = 0; f < 1-fdiff; f+=fdiff) {
          // let f = map(n, 0, d, 0, 1)
          let x = p.bezierPoint(x1, cx1, cx2, x2, f)
          let y = p.bezierPoint(y1, cy1, cy2, y2, f)
          
          let letter 
          if(index < counter) {
            letter = msg[(index+p.floor(t))%msg.length]
          }
          else {
            letter = ' '
          }
          let nextLetter = msg[(index+1)%msg.length]
          let lwidth = p.textWidth(letter)
          
          
          index += 1
          // n += lwidth*2
          dreal += p.dist(px, py, x, y)
          if((dreal - ((dreal/50)+1)*50) < 0.5) {
            p.push()
            p.translate(x, y)
            // rotate(90-atan2(x, y))
            p.rotate(p.atan2(y, x))
            p.text(letter, 0, 0)
            // circle(0, 0, 2)
            p.pop()
            ts.push(f)
          } 
          px = x
          py = y
        }
        
      }
      
    }
    p.pop()
  } 
}
export default Sketch