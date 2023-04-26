const SPEED = 0.02;

export default class Paddle {
    constructor(paddleelem){
        this.paddleelem = paddleelem;
        this.reset()
    }
    get position(){
        return parseFloat(getComputedStyle(this.paddleelem).getPropertyValue("--position"))
    }
    set position(value){
        this.paddleelem.style.setProperty("--position",value)
    }
    reset(){
        this.position = 50;
    }
    rect(){
        return this.paddleelem.getBoundingClientRect();
    }
    update(delta, ballheight){
        this.position += SPEED * delta * (ballheight - this.position);
    }
}