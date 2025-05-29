const diceElement = document.getElementById('dice');
const rollBtn = document.getElementById('rollBtn');
const historyList = document.getElementById('history');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

let rollHistory = [];

function getRandomDiceFace() {
  return Math.floor(Math.random() * 6) + 1;
}

function getDiceUnicode(num) {
  // Unicode dice faces ⚀ (U+2680) to ⚅ (U+2685)
  return String.fromCodePoint(0x2680 + num - 1);
}

function addRollToHistory(roll) {
  rollHistory.unshift(roll);
  if (rollHistory.length > 10) {
    rollHistory.pop();
  }
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';
  rollHistory.forEach((roll, index) => {
    const li = document.createElement('li');
    li.textContent = `Roll ${rollHistory.length - index}: ${getDiceUnicode(roll)} (${roll})`;
    historyList.appendChild(li);
  });
}

function rollDice() {
  rollBtn.disabled = true;
  diceElement.classList.add('rolling');
  diceElement.textContent = '🎲';

  // Animation duration 600ms (matches CSS animation)
  setTimeout(() => {
    const roll = getRandomDiceFace();
    diceElement.textContent = getDiceUnicode(roll);
    diceElement.classList.remove('rolling');
    addRollToHistory(roll);
    rollBtn.disabled = false;
    rollBtn.focus();
  }, 600);
}

rollBtn.addEventListener('click', rollDice);

clearHistoryBtn.addEventListener('click', () => {
  rollHistory = [];
  renderHistory();
  rollBtn.focus();
});

// Initialize
diceElement.textContent = getDiceUnicode(1);
renderHistory();
