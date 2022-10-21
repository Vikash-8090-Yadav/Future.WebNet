const p1Button = document.querySelector("#p1btn");
const p2Button = document.querySelector("#p2btn");
const p1disp = document.querySelector("#p1disp");
const p2disp = document.querySelector("#p2disp");
const resetButton = document.querySelector("#reset");
const winningScoreSelect = document.querySelector("#playto")

let p1score = 0;
let p2score = 0;
let winningScore = 0;
let isGameOver = false;

p1Button.addEventListener("click", function(){
    if(!isGameOver){
        p1score+=1;
        if(p1score === winningScore){
            isGameOver = true;
            p1disp.classList.add("has-text-success");
            p2disp.classList.add("has-text-danger");
            p1Button.disabled = true;
            p2Button.disabled = true;
        }
        p1disp.textContent = p1score;
    }
})

p2Button.addEventListener("click", function(){
    if(!isGameOver){
        p2score+=1;
        if(p2score === winningScore){
            isGameOver = true;
            p2disp.classList.add("has-text-success");
            p1disp.classList.add("has-text-danger");
            p1Button.disabled = true;
            p2Button.disabled = true;
        }
        p2disp.textContent = p2score;
    }
})

winningScoreSelect.addEventListener("change", function(){
    winningScore = parseInt(this.value);
    reset();
})


resetButton.addEventListener("click", reset)

function reset(){
    isGameOver = false;
    p1score = 0;
    p2score = 0;
    p1disp.textContent = p1score;
    p2disp.textContent = p2score;
    p1disp.classList.remove("has-text-success", "has-text-danger");
    p2disp.classList.remove("has-text-success", "has-text-danger");
    p1Button.disabled = false;
    p2Button.disabled = false;

}

