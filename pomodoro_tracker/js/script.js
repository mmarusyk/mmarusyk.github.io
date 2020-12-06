// Time
let workMinutes = 50;
let workSeconds = '00'
let shortBreakMinutes = 10;
let shortBreakSeconds = '00';
let longBreakMinutes = 30;
let longBreakSeconds = '00'
let pomodorosMax = 4;

// Initialize
document.getElementById('digit-minutes').textContent = workMinutes;
document.getElementById('digit-seconds').textContent = workSeconds;
document.querySelector('.pomodoros-max').textContent = pomodorosMax;
minutes = document.getElementById('digit-minutes');
seconds = document.getElementById('digit-seconds');

let buttonWork = document.getElementById('button-work');
let buttonShortBreak = document.getElementById('button-short-break');
let buttonLongBreak = document.getElementById('button-long-break');
let startButton = document.getElementById('button-start');
let stopButton = document.getElementById('button-stop');
let pomodoros = document.querySelector('.pomodoros');

let startTimer;
let countPomodoros = 0;

// Start Timer
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  if (startTimer === undefined) {
    startTimer = setInterval(goTimer, 1000)
  }
})


// Stop Timer
stopButton.addEventListener('click', () => {
  if (buttonWork.disabled) {
    minutes.innerText = workMinutes;
    seconds.innerText = workSeconds;
    resetTimer();
  } else if (buttonShortBreak.disabled) {
    minutes.innerText = shortBreakMinutes;
    seconds.innerText = shortBreakSeconds;
    resetTimer();
  } else if (buttonLongBreak.disabled){
    minutes.innerText = longBreakMinutes;
    seconds.innerText = longBreakSeconds;
    resetTimer();
  }
})

buttonWork.addEventListener('click', () => {
  disableButton(true, false, false);
  minutes.innerText = workMinutes;
  seconds.innerText = workSeconds;
  resetTimer();
})

buttonShortBreak.addEventListener('click', () => {
  disableButton(false, true, false);
  minutes.innerText = shortBreakMinutes;
  seconds.innerText = shortBreakSeconds;
  resetTimer();
})

buttonLongBreak.addEventListener('click', () => {
  disableButton(false, false, true);
  minutes.innerText = longBreakMinutes;
  seconds.innerText = longBreakSeconds;
  resetTimer();
})

function goTimer() {
  if (seconds.innerText != 0) {
    seconds.innerText--;
  } else if (minutes.innerText != 0 && seconds.innerText == 0) {
    seconds.innerText = 59;
    minutes.innerText--;
  }
  if (minutes.innerText == 0 && seconds.innerText == 0) {
    var audio = new Audio('sounds/default.mp3');
    audio.play();
    setTimeout(() => {
      audio.pause();
      if (buttonWork.disabled && countPomodoros == pomodorosMax - 1) {
        countPomodoros = 0;
        buttonLongBreak.click();
      } else if (buttonWork.disabled && countPomodoros != pomodorosMax - 1) {
        countPomodoros++;
        buttonShortBreak.click();
      } else {
        buttonWork.click();
      }
      pomodoros.textContent = countPomodoros;
    }, 5000);
    resetTimer();
  }
}

function resetTimer() {
  clearInterval(startTimer);
  startTimer = undefined;
  startButton.disabled = false;
  stopButton.disabled = true;
}

function disableButton(value1, value2, value3) {
  buttonWork.disabled = value1;
  buttonShortBreak.disabled = value2;
  buttonLongBreak.disabled = value3;
}