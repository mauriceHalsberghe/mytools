const playersForm = document.querySelector(".bridge__playersForm");
const playersAmount = document.querySelector(".bridge__playerAmount");

const addPlayer = document.querySelector(".bridge__add");
const removePlayer = document.querySelector(".bridge__remove");

const startButton = document.querySelector(".bridge__start");

const playerColors = ["red", "green","dodgerblue","yellow","lime","deeppink","darkcyan","orange"];

document.querySelector('.bridge__game').style.display = "none"

document.querySelector('.bridge__reset').addEventListener('click', () => {
  localStorage.removeItem("players");
  localStorage.removeItem("score");
  localStorage.removeItem("currentRound");
  localStorage.removeItem("scoreHistory");
  window.location.reload();
})

const players = JSON.parse(localStorage.getItem("players")) || [];

if (players.length !== 0) {
    document.querySelector('.bridge__setup').style.display = "none";
    document.querySelector('.bridge__game').style.display = "block";
} else {
  let playersArray = [];
  
  for (let i = 1; i < 4; i++) {
    const input = document.createElement("input");
    input.placeholder = `Naam speler ${i}`;
    input.style.color = playerColors[i-1];
    input.classList.add('login__input');
    playersForm.appendChild(input);
    playersAmount.innerHTML = 3;
  }
  
  startButton.addEventListener("click", () => {
    for (const player of playersForm.children) {
      if (!player.value) {
        alert('Alle vakjes invullen');
        return;
      }
    }
  
    for (const player of playersForm.children) {
      playersArray.push(player.value);
    }
    localStorage.setItem("players", JSON.stringify(playersArray));
    document.querySelector('.bridge__setup').style.display = "none"
    document.querySelector('.bridge__game').style.display = "block"
    window.location.reload();  
  });
  
  addPlayer.addEventListener("click", () => {
    const input = document.createElement("input");
    input.placeholder = `Naam speler ${playersForm.length + 1}`;
    input.style.color = playerColors[playersForm.length];
    playersForm.appendChild(input);
    input.classList.add('login__input');
    playersAmount.innerHTML++;
  });
  
  removePlayer.addEventListener("click", () => {
    const inputs = playersForm.querySelectorAll("input");
    if (inputs.length > 3) {
      playersForm.removeChild(inputs[inputs.length - 1]);
      playersAmount.innerHTML--;
    }
  });
}