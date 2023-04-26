const VELOCITY = 0.025
const VELOCITY_INCREMENT = 0.00000001

export default class Ball{
    constructor(ballelem){
        this.ballelem = ballelem;
        this.reset()
    }
    get x(){
        return parseFloat(getComputedStyle(this.ballelem).getPropertyValue("--x"))
    }
    set x(value){
        this.ballelem.style.setProperty("--x",value);
    }
    get y(){
        return parseFloat(getComputedStyle(this.ballelem).getPropertyValue("--y"))
    }
    set y(value){
        this.ballelem.style.setProperty("--y",value);
    }
  
    reset(){
        this.x = 50;
        this.y = 50;
        this.direction = {x:0,y:0}
        while(Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9){
            const random_number = RandomNumberBetween(0,Math.PI*2);
            this.direction = {x: Math.cos(random_number),y: Math.sin(random_number)}
        }
        this.velocity = VELOCITY;
    }
    rect(){
        return this.ballelem.getBoundingClientRect();
    }
    update(delta,paddleRect){
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREMENT * delta;
        const rect =  this.rect();
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1
          }
        if(paddleRect.some(r=>collision(r,rect))){
            this.direction.x *= -1
        }
    }
}

function RandomNumberBetween(min,max){
    return Math.random()*(max-min)+min
}

function collision(rect1,rect2){
    return (rect1.right >= rect2.left &&
            rect1.left <= rect2.right &&
            rect1.top <= rect2.bottom &&
            rect1.bottom >= rect2.top)
}