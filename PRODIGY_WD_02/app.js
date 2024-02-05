var timer;
var startTime;
var laps = [];
var lapCount = 1;

function startStopwatch() {
    if (!timer) {
        startTime = new Date().getTime();
        timer = setInterval(updateDisplay, 10);
        document.getElementById("startBtn").innerText = "Pause";
    } else {
        clearInterval(timer);
        timer = null;
        document.getElementById("startBtn").innerText = "Resume";
    }
}

function updateDisplay() {
    var currentTime = new Date().getTime() - startTime;
    var hours = Math.floor(currentTime / 3600000);
    var minutes = Math.floor((currentTime % 3600000) / 60000);
    var seconds = Math.floor((currentTime % 60000) / 1000);
    var milliseconds = currentTime % 1000;

    document.getElementById("timerDisplay").innerText = formatTime(hours, minutes, seconds, milliseconds);
}

function formatTime(h, m, s, ms) {
    return (
        padTime(h) + " : " +
        padTime(m) + " : " +
        padTime(s) + " : " +
        padTime(ms, 3)
    );
}

function padTime(value, length = 2) {
    return (value + "").padStart(length, "0");
}

function recordLap() {
    if (timer) {
        var lapTime = new Date().getTime() - startTime;
        laps.push({ lap: lapCount++, time: lapTime });
        displayLaps();
    }
}

function displayLaps() {
    var lapList = document.getElementById("lapList");
    lapList.innerHTML = "";
    
    laps.forEach(function (lap) {
        var lapItem = document.createElement("li");
        lapItem.innerText = "Lap " + lap.lap + ": " + formatTime(0, 0, 0, lap.time);
        lapList.appendChild(lapItem);
    });
}

function pauseStopwatch() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        document.getElementById("startBtn").innerText = "Resume";
    }
}

function resetStopwatch() {
    clearInterval(timer);
    timer = null;
    document.getElementById("startBtn").innerText = "Start";
    document.getElementById("timerDisplay").innerText = "00 : 00 : 00 : 00";
    laps = [];
    lapCount = 1;
    displayLaps();
}
