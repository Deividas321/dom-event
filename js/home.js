const score1DOM = document.getElementById('score1');
const score2DOM = document.getElementById('score2');
const lastClickDOM = document.getElementById('last-click');
const timerDOM = document.getElementById('timer');
const startPauseBtn = document.getElementById('start-pause');
const logDOM = document.getElementById('log');


let score1 = parseInt(localStorage.getItem('score1')) || 0;
let score2 = parseInt(localStorage.getItem('score2')) || 0;


let time = parseInt(localStorage.getItem('time')) || 5400;
let timerInterval;
let isRunning = false;

let log = JSON.parse(localStorage.getItem('log')) || [];


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


function updateTimer() {
    timerDOM.textContent = formatTime(time);
}

function startPauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Start';
    } else {
        timerInterval = setInterval(() => {
            if (time > 0) {
                time--;
                updateTimer();
                localStorage.setItem('time', time);
            } else {
                clearInterval(timerInterval);
            }
        }, 1000);
        startPauseBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function updateScore(team, points) {
    if (team === 1) {
        score1 += points;
        score1DOM.textContent = `Score: ${score1}`;
        localStorage.setItem('score1', score1);
    } else if (team === 2) {
        score2 += points;
        score2DOM.textContent = `Score: ${score2}`;
        localStorage.setItem('score2', score2);
    }
    const logEntry = { time: formatTime(time), team, points };
    log.push(logEntry);
    localStorage.setItem('log', JSON.stringify(log));
    displayLog();
    lastClickDOM.textContent = `Last Scored: Team ${team}, Points ${points}`;
}

function deleteLastScore(team) {
    for (let i = log.length - 1; i >= 0; i--) {
        if (log[i].team === team) {
            const removed = log.splice(i, 1)[0];
            if (team === 1) {
                score1 -= removed.points;
                score1DOM.textContent = `Score: ${score1}`;
                localStorage.setItem('score1', score1);
            } else if (team === 2) {
                score2 -= removed.points;
                score2DOM.textContent = `Score: ${score2}`;
                localStorage.setItem('score2', score2);
            }
            localStorage.setItem('log', JSON.stringify(log));
            displayLog();
            lastClickDOM.textContent = `Last Score Deleted: Team ${team}`;
            break;
        }
    }
}




function displayLog() {
    logDOM.innerHTML = log.map(entry => `<p>Time: ${entry.time}, Team ${entry.team} scored ${entry.points} points</p>`).join('');
}


const buttons = document.querySelectorAll('#buttons button');


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const team = button.getAttribute('data-team');
        const points = button.getAttribute('data-points');
        const action = button.getAttribute('data-action');
     

        if (team && points) {
            updateScore(parseInt(team), parseInt(points));
        }

        if (team && action === 'delete') {
            deleteLastScore(parseInt(team));
        }
    });
});


startPauseBtn.addEventListener('click', startPauseTimer);


score1DOM.textContent = `Score: ${score1}`;
score2DOM.textContent = `Score: ${score2}`;
updateTimer();
displayLog();
