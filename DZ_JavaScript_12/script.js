const playEl = document.querySelector(".play-pause-icon .play");
const pauseEl = document.querySelector(".play-pause-icon .pause");
const playerEl = document.querySelector("video");
const sliderEl = document.querySelector(".slider");
const barsWrap = document.querySelector(".bars-wrap");
const volumeEl = document.querySelector(".volume");
const volumeOFF = document.querySelector(".cross");
const volumeWAVE1 = document.querySelector(".wave1");
const volumeWAVE2 = document.querySelector(".wave2");
const volumeBTN = document.querySelectorAll(".volume-btn");
const timeP = document.querySelector(".videoplayer-time p");

window.addEventListener("load", function (e) {
    let soundVolUser = 0;
    timeP.textContent = `${trimTime(
        playerEl.currentTime
    )} / ${trimTime(playerEl.duration)}`;
});

function trimTime(time) {
    time = Math.floor(time);
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    var minutesVal = minutes;
    var secondsVal = seconds;
    if (minutes < 10) {
        minutesVal = "0" + minutes;
    }
    if (seconds < 10) {
        secondsVal = "0" + seconds;
    }
    return minutesVal + ":" + secondsVal;
}
function playFunc() {
    playerEl.play();
    playEl.classList.add("hidden");
    pauseEl.classList.remove("hidden");
    videoPlay = setInterval(function () {
        playerEl.volume = volumeEl.value / 100;
        let videoTime = Math.round(playerEl.currentTime);
        let videoLength = Math.round(playerEl.duration);
        timeP.textContent = `${trimTime(videoTime)} / ${trimTime(
            videoLength
        )}`;
        sliderEl.style.width = (videoTime * 100) / videoLength + "%";
    }, 10);
}

function pauseFunc() {
    playerEl.pause();
    pauseEl.classList.add("hidden");
    playEl.classList.remove("hidden");
    clearInterval(videoPlay);
}

function muteSound() {
    playerEl.volume = 0;
    volumeEl.value = 0;
    volumeWAVE1.classList.add("hidden");
    volumeWAVE2.classList.add("hidden");
    volumeOFF.classList.remove("hidden");
}

function userSound() {
    if (volumeEl.value != 0) {
        if (volumeEl.value < 50) {
            volumeWAVE2.classList.add("hidden");
            volumeOFF.classList.add("hidden");
            volumeWAVE1.classList.remove("hidden");
        } else {
            volumeOFF.classList.add("hidden");
            volumeWAVE1.classList.add("hidden");
            volumeWAVE2.classList.remove("hidden");
        }
    } else {
        volumeWAVE1.classList.add("hidden");
        volumeWAVE2.classList.add("hidden");
        volumeOFF.classList.remove("hidden");
    }
}

playEl.addEventListener("click", function (e) {
    playFunc();
});

pauseEl.addEventListener("click", function (e) {
    pauseFunc();
});

playerEl.addEventListener("click", function (e) {
    if (!playEl.classList.contains("hidden")) {
        playFunc();
    } else {
        pauseFunc();
    }
});

barsWrap.addEventListener("click", function (e) {
    let posX = e.clientX - 8;
    let timePos = (posX * 100) / 640;
    sliderEl.style.width = timePos + "%";
    playerEl.currentTime =
        (timePos * Math.round(playerEl.duration)) / 100;
    timeP.textContent = `${trimTime(
        playerEl.currentTime
    )} / ${trimTime(playerEl.duration)}`;
});

volumeEl.addEventListener("click", function (e) {
    playerEl.volume = volumeEl.value / 100;
    userSound();
});

volumeBTN.forEach((element) =>
    element.addEventListener("click", function (e) {
        if (this.classList.contains("cross")) {
            playerEl.volume = soundVolUser / 100;
            volumeEl.value = soundVolUser;
            userSound();
        } else {
            soundVolUser = volumeEl.value;
            muteSound();
        }
    })
);