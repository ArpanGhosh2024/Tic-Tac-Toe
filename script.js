let boxes = document.querySelectorAll(".box"); /*All the buttons are stored inside a NodeList*/
let resetBtn = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
let isWinner = false;
let buttonClicks = 0;

const winPatterns = [ //2-D array to store all the winning combinations for a 3X3 grid
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const resetGame = () => {
  turnO = true; //assuming playerO starts first
  enableBtns();
  msgContainer.classList.add("hide"); // to hide the msgContainer when game is reset or a new game is started
};

boxes.forEach((box) => {
  box.addEventListener("click",() =>{
    //handle the button click event
    if(turnO){ //O's turn
      box.style.color = "#B8336A";
      box.innerText = "O";
      turnO = false;
    } else{ //X's turn
      box.style.color = "#FFC100";
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; //button click now will not change the innerText
    buttonClicks++;
    checkWinner(); 
  });
});

const disableBtns = () => { //to disable all the buttons once the game is won
  for(let box of boxes){
    box.disabled = true;
  }
};

const enableBtns = () => { //to enable all the buttons once the game is reset or a new game is started
  for(let box of boxes){
    box.disabled = false; //all buttons are enabled
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  if(winner === "O"){
    msg.style.color = "#B8336A";
  } else if(winner === "X"){
    msg.style.color = "#FFC100";
  }
  msg.innerText = `${winner} wins!!!`;
  msgContainer.classList.remove("hide"); //to remove "hide" class from the classList to make the msgContainer visible
  disableBtns();
};

const checkWinner = () => {
  let patternCount = 0;
  for(let pattern of winPatterns){
    patternCount++;
    //storing the current contents of the winning patterns  
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){
      if(pos1Val === pos2Val && pos2Val === pos3Val){
        console.log("Winner is player"+pos1Val);
        isWinner = true;
        showWinner(pos1Val);
      }
      else{
        if(patternCount === 8 && buttonClicks === 9 && isWinner === false){
          console.log("Draw");
          msg.style.color = "#987284";
          msg.innerText = "Draw match!!!";
          msgContainer.classList.remove("hide");
        }
      }
    }
  }
};

newGameButton.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
