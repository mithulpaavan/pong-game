//getComputedStyle() function can access dom elements css properties by using getPropertyValue
import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.querySelector(".ball"))
const PlayerPaddle= new Paddle(document.querySelector('.player'))
const ComputerPaddle = new Paddle(document.querySelector('.computer'))
const player_score = document.querySelector(".player-score");
const computer_score = document.querySelector('.computer-score')

let lastTime;

function update(time){
    let rect = ball.rect()
    if(lastTime != null){
         const delta = time - lastTime;
         ball.update(delta,[PlayerPaddle.rect(),ComputerPaddle.rect()])
         ComputerPaddle.update(delta, ball.y)
    }
    if(rect.left >= window.innerWidth || rect.right <= 0){
        handleLose(rect);
    }
    lastTime = time;
    window.requestAnimationFrame(update)
}

window.addEventListener("mousemove",(e)=>{
    PlayerPaddle.position = (e.y/window.innerHeight)*100
})

function handleLose(rect){
    ball.reset()
    ComputerPaddle.reset()

    if(rect.right >= window.innerWidth){
        player_score.textContent = parseInt(player_score.textContent) + 1;
    }
    else{
        computer_score.textContent = parseInt(computer_score.textContent) + 1;
    }
}
window.requestAnimationFrame(update)
