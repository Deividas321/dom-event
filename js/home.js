const h1DOM = document.querySelector('h1');
const buttonDOM = document.querySelector('button');

function doSomethingSilly (){
    console.log('silly silly me....');
}
buttonDOM.addEventListener('click', doSomethingSilly);





// Get the score display elements
const score1DOM = document.getElementById('score1');
const score2DOM = document.getElementById('score2');
const lastClickDOM = document.getElementById('last-click');

// Initialize the scores
let score1 = 0;
let score2 = 0;

// Function to update the score display
function updateScore(team, points) {
    if (team === 1) {
        score1 += points;
        score1DOM.textContent = `Score: ${score1}`;
    } else if (team === 2) {
        score2 += points;
        score2DOM.textContent = `Score: ${score2}`;
    }
    // Update the last click information
    lastClickDOM.textContent = `Last Click: Team ${team}, Points ${points}`;
}

// Get all buttons
const buttons = document.querySelectorAll('button');

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const team = parseInt(button.getAttribute('data-team'), 10);
        const points = parseInt(button.getAttribute('data-points'), 10);
        updateScore(team, points);
    });
});

