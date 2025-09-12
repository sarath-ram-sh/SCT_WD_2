let timer = null;
let elapsed = 0; // in milliseconds
let running = false;
let lapCount = 0;

function updateDisplay() {
  let ms = elapsed % 1000;
  let totalSeconds = Math.floor(elapsed / 1000);
  let seconds = totalSeconds % 60;
  let minutes = Math.floor(totalSeconds / 60) % 60;
  let hours = Math.floor(totalSeconds / 3600);

  document.getElementById("display").textContent =
    `${String(hours).padStart(2,'0')}:` +
    `${String(minutes).padStart(2,'0')}:` +
    `${String(seconds).padStart(2,'0')}:` +
    `${String(ms).padStart(3,'0')}`;
}

function start() {
  if (!running) {
    running = true;
    let last = Date.now();
    timer = setInterval(() => {
      let now = Date.now();
      elapsed += now - last;
      last = now;
      updateDisplay();
    }, 10);
  }
}

function pause() {
  running = false;
  clearInterval(timer);
}

function reset() {
  pause();
  elapsed = 0;
  lapCount = 0;
  updateDisplay();
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (running) {
    lapCount++;
    let li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${document.getElementById("display").textContent}`;
    document.getElementById("laps").appendChild(li);
  }
}

function clearLaps() {
  document.getElementById("laps").innerHTML = "";
  lapCount = 0;
}
