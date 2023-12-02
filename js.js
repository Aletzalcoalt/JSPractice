//html elements
const btnStart = document.querySelector(".btnStart");
const title1 = document.querySelector(".title1");
const flexContainer = document.querySelector(".flex-Container");
const dot = document.querySelector(".dot");
const timer = document.querySelector(".timer");
const body = document.getElementsByTagName("body");
const score =  document.querySelector(".score");

//variables

let maxDots = 50;
let colorChangerCount = 0;
let actualColor = 0;
let seconds = 59;
let minutes = 1;
let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;
let evilDots = [];
let scoreCount = 0;
let colorScheme = [
  ["#fbb", "#fbc"],
  ["#bfb", "#bfc"],
  ["#bbf", "#bcf"],
  ["#ff9", "#ffb"]
];


//styles
dot.style.position = "absolute";

//functions
const updateTimer = () =>{

  seconds--;
  if (seconds === 0) {
    seconds = 59;
    minutes--;
  }

  const formatMinutes = minutes < 10 ? `0${minutes}`: minutes;
  const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;

  if (minutes < 0) {  
    endGame();
    return;
  }

  timer.textContent = `${formatMinutes}:${formatSeconds}`;


}

const randomHeight = () =>{
  maxHeight = window.innerHeight;
  return Math.floor(Math.random() * ((maxHeight-100)  - 1) + 1);
};
const randomWidth = () =>{
  maxWidth = window.innerWidth;
  return Math.floor(Math.random() * ((maxWidth-100) - 1) + 1);
};
const moveEvilDots = () =>{
  evilDots.forEach ((x) =>{
    x.style.top = `${randomHeight()}px`;
    x.style.left = `${randomWidth()}px`;
  });
};

const addPoints = () =>{
  scoreCount++;
  colorChangerCount++;
  if (colorChangerCount > 5) {
    changeColor();
    colorChangerCount = 0;
  }
  score.textContent = scoreCount;
};

const createDot = () =>{
  const newDot= document.createElement("DIV");
  evilDots.push(newDot);
  newDot.classList.add("dot", "evilDots");
  
  newDot.style.position = "absolute";
  newDot.style.backgroundColor = colorScheme[actualColor][1];
  newDot.style.display = "inline-Block";

  body[0].appendChild(newDot);

  newDot.onclick = () => {
    endGame();
  };

};

const updateDotsNumber = () => {
  if (evilDots.length > maxDots) {
    do{

      let eliminatedDot = evilDots.pop();
      eliminatedDot.remove();

    }while(evilDots.length >= maxDots);
  }

  if (evilDots.length < scoreCount && evilDots.length < maxDots) {
    let eliminatedDot = evilDots.pop();

    while (evilDots.length < scoreCount) {

      evilDots.push(eliminatedDot);
    }
  }
}

const updateMaxDots = () =>{
  if (maxWidth > 1000) {
    maxDots = 50;
  }
  else if (maxWidth > 700) {
    maxDots = 35;
  }
  else if (maxWidth > 500) {
    maxDots = 25;
  } else {
    maxDots = 20;
  }

  updateDotsNumber();
}



//onclick Events
btnStart.onclick = () => {
  const interval = setInterval(updateTimer,1000);
  title1.style.display = "none";
  flexContainer.style.display = "none";
  btnStart.style.display = "none";
  dot.style.display = "inline-Block";
  dot.style.zIndex = "10";
  timer.style.display = "block";
  score.style.display = "block";
};



dot.onclick = () => {
  
  updateMaxDots();
  dot.style.top = `${randomHeight()}px`;
  dot.style.left = `${randomWidth()}px`;
  addPoints();
  createDot();
  moveEvilDots();

};

const endGame = () =>{

  title1.style.display = "flex";
  flexContainer.style.display = "flex";
  dot.style.display = "none";
  evilDots.forEach ((x) =>{
    x.style.display = "none";
  });
  title1.innerHTML = `Fin del juego <br>
  Puntuacion final = ${scoreCount}`;
  timer.style.display = "none";
  score.style.display = "none";
};

const changeColor = () => {
  let numRandom = 0;
  do{
    numRandom = Math.floor(Math.random() * 4);
  }while(numRandom === actualColor);

  actualColor = numRandom;

  dot.style.backgroundColor = colorScheme[actualColor][0];

  evilDots.forEach ((x) =>{
    x.style.backgroundColor = colorScheme[actualColor][1];
  });
};



