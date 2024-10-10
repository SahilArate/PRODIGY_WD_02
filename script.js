document.addEventListener('DOMContentLoaded', () => {
    let timer;
    let seconds = 0;
    let running = false;
    let lapCounter = 0;
    let progress = 0;

    const timeDisplay = document.getElementById('timeDisplay');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const laps = document.getElementById('laps');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const downloadBtn = document.getElementById('downloadBtn');
    const progressCircle = document.getElementById('progressCircle');

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', recordLap);
    darkModeToggle.addEventListener('click', toggleDarkMode);
    downloadBtn.addEventListener('click', downloadLapData);

    function startTimer() {
        if (!running) {
            running = true;
            timer = setInterval(() => {
                seconds++;
                timeDisplay.textContent = formatTime(seconds);
                updateProgressCircle();
            }, 1000);
        }
    }

    function pauseTimer() {
        running = false;
        clearInterval(timer);
    }

    function resetTimer() {
        running = false;
        clearInterval(timer);
        seconds = 0;
        lapCounter = 0;
        progress = 0;
        timeDisplay.textContent = '00:00:00';
        laps.innerHTML = '';
        resetProgressCircle();
    }

    function recordLap() {
        lapCounter++;
        const lapTime = formatTime(seconds);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapItem);
        lapItem.style.animation = 'fadeInUp 0.5s forwards';
    }

    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    }

    function pad(num) {
        return num < 10 ? `0${num}` : num;
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    function downloadLapData() {
        const lapData = Array.from(laps.children).map(lap => lap.textContent).join('\n');
        const blob = new Blob([lapData], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'lap_times.txt';
        a.click();
    }

    // Circular Progress Animation
    function updateProgressCircle() {
        const progressMax = 60;
        progress = (seconds % progressMax) / progressMax * 440;
        progressCircle.style.strokeDashoffset = 440 - progress;
    }

    function resetProgressCircle() {
        progressCircle.style.strokeDashoffset = 440;
    }
});
