const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const toggleFormat = document.getElementById('toggleFormat');

let is24HourFormat = false;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  let ampm = '';
  if (!is24HourFormat) {
    ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  }

  timeElement.textContent = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}${ampm}`;

  // Date format: Weekday, DD Month YYYY
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.textContent = now.toLocaleDateString(undefined, options);
}

// Toggle event
toggleFormat.addEventListener('change', () => {
  is24HourFormat = toggleFormat.checked;
  updateClock();
});

// Initial load and start interval
updateClock();
setInterval(updateClock, 1000);
