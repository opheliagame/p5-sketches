const Sketch = (W, H) => (p) => {

  const MSG1 = 'loading '
  const MSG2 = 'just a minute '
  let amp1, amp2, t, cols

  p.setup = () => {
    p.createCanvas(W, H);
    p.textAlign(p.CENTER, p.CENTER)
    p.textSize(12)
    amp1 = p.textWidth(MSG1)
    amp2 = p.textWidth(MSG2)
    cols = Math.floor(p.width/amp1)
  }

  p.draw = () => {
    p.background(255);
    t = p.millis()/500
    p.randomSeed(1)
  
    for(let j = 0; j < p.height; j+=12){
      let xoff = p.sin(p.radians(j)+t)*12*5
   
      let i = xoff
      while(i < p.width+amp1) {
        let xdiff = (i <= p.width/2) ? amp2 : amp1
        let msg = xdiff === amp1 ? MSG1 : MSG2 
        p.text(msg, i-xdiff/2, j)
      
        i += xdiff
      }
    }
  } 
}
export default Sketch;