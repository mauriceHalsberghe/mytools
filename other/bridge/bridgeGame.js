(() => {
    const ROUNDS = 21;

    const playerColors = ["red", "green","dodgerblue","yellow","lime","deeppink","darkcyan","orange"];

    const currentRound = parseInt(localStorage.getItem("currentRound")) || 1;
    const round = document.querySelector('.bridge__roundNumber');
    localStorage.setItem('currentRound', currentRound);

    if (currentRound === 11) {
        round.innerHTML = `${currentRound}. 10 kaarten zonder troef`;
    } else if (currentRound > 11) {
        round.innerHTML = `${currentRound}. ${22- currentRound} kaarten`;
    } else {
        round.innerHTML = `${currentRound}. ${currentRound} kaarten`;
    }
    
    const players = JSON.parse(localStorage.getItem("players")) || [];
    const playerAmount = players.length;

    let playersScore = JSON.parse(localStorage.getItem("score"));

    if (!Array.isArray(playersScore) || playersScore.length !== players.length) {
        playersScore = new Array(players.length).fill(0);
        localStorage.setItem("score", JSON.stringify(playersScore));
    }
    
    if (players.length === 0) {
        document.querySelector('.bridge__setup').style.display = "block";
        document.querySelector('.bridge__game').style.display = "none";
        return;
    }

    const table = document.querySelector('table');
    function generateTable() {
        table.innerHTML = `
        <tr>
            <th></th>
            <th>Gok</th>
            <th>Uitslag</th>
            <th>Punten</th>
            <th>Totaal score</th>
        </tr>`;
    
        players.forEach((player, index) => {
            table.innerHTML += `
        <tr>
            <td class="player" style="color: ${playerColors[index]};" >${player}</td>
            <td><input id="g${index+1}" type="number" class="login__input"></td>
            <td><input id="r${index+1}" type="number" class="login__input"></td>
            <td id="p${index+1}"></td>
            <td id="t${index+1}"></td>
        </tr>`;
        });
    
        table.innerHTML += `
        <tr>
            <td>Totaal</td>
            <td class="guess_total"></td>
            <td class="result_total"></td>
            <td></td>
            <td></td>
        </tr>`;
    
        for (let i = 0; i < playerAmount; i++) {
            document.querySelector(`#g${i+1}`).addEventListener('input', () => {
                calcGuessTotal();
            });
    
            document.querySelector(`#r${i+1}`).addEventListener('input', () => {
                calcGuessTotal();
                calcPoints();
            });
        }
        for (let i = 0; i < playerAmount; i++) {
            displayPoints(playersScore[i], i)
        }

        displayPlayerTurn();
    }


    function calcPoints() {
        for (let i = 0; i < playerAmount; i++) {
            const guess = document.querySelector(`#g${i+1}`).value;
            const result = document.querySelector(`#r${i+1}`).value;

            const $points = document.querySelector(`#p${i+1}`);

            if (guess === result) {
                let score = 10 + (guess * 2);
                $points.innerHTML = `+${score}`;
                const newScore = playersScore[i] + score;
                displayPoints(newScore, i);
            } else {
                let score = Math.abs(guess - result) * 2;
                $points.innerHTML = `- ${score}`;
                const newScore = playersScore[i] - score;
                displayPoints(newScore, i);
            }
        }
    }
    

    function calcGuessTotal() {
        const guessTotalHTML = document.querySelector('.guess_total');
        const resultTotalHTML = document.querySelector('.result_total');

        let guessTotal = 0;
        let resultTotal = 0;

        for (let i = 0; i < playerAmount; i++) {
            const guess = document.querySelector(`#g${i+1}`);
            if (guess.value) {
                guessTotal += parseInt(guess.value);
                guessTotalHTML.innerHTML = '';
            }
            const result = document.querySelector(`#r${i+1}`);
            if (result.value) {
                resultTotal += parseInt(result.value);
                resultTotalHTML.innerHTML = '';
            }
        }
        if (document.querySelector(`#g${playerAmount}`).value !== '') {
            if (guessTotal === currentRound) {
                alert('Totaal mag niet uitkomen!');
                document.querySelector(`#g${playerAmount}`).value = '';
            } else {
                guessTotalHTML.innerHTML = guessTotal;
            }
        }
        if (document.querySelector(`#r${playerAmount}`).value !== '') {
            if (resultTotal !== currentRound) {
                alert('Fout aantal slagen');
                document.querySelector(`#r${playerAmount}`).value = '';
            } else {
                resultTotalHTML.innerHTML = resultTotal;
            }
        }
    }

    function displayPoints(point, index) {
        document.querySelector(`#t${index+1}`).innerHTML = point;
    }


    const nextRound = document.querySelector('.bridge__nextRound');
    nextRound.addEventListener('click', () => {

        const inputs = document.querySelectorAll('input');
        let allFilled = true;
    
        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
            }
        });
    
        if (!allFilled) {
            alert('Vul alle vakjes');
            return;
        }
    
        const newScore = [];
    
        for (let i = 0; i < playerAmount; i++) {
            const score = parseInt(document.querySelector(`#t${i+1}`).textContent, 10) || 0;
            newScore[i] = score;
        }
    
        localStorage.setItem("score", JSON.stringify(newScore));
        const next = parseInt(currentRound, 10) + 1;
        localStorage.setItem('currentRound', next);
    
        updatePlayerScores(newScore);
        location.reload();
    });
    
      function updatePlayerScores(newScores) {
        let scoreHistory = JSON.parse(localStorage.getItem('scoreHistory')) || [];
      
        newScores.forEach((score, index) => {
          scoreHistory.push(score); 
        });
      
        localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
      }

    generateTable();
    
    function displayPlayerTurn() {
        const players = document.querySelectorAll('.player');
        players.forEach(player => player.classList.remove('playerTurn'));
    
        const currentIndex = (currentRound - 1) % playerAmount;
        console.log(currentIndex);
        
            if (players[currentIndex]) {
            players[currentIndex].classList.add('playerTurn');
        }
    }
})();