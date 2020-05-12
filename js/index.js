const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles
const songs = [
  "okean-elzy-choven",
  "okean-elzy-majzhe-vesna",
  "okean-elzy-vse-bude-dobre",
  "okean-elzy-bez-tebe",
  "okean-elzy-ne-tvoya-vijna",
];

// Keep track of song
let songIndex = 4;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

const timerShow = document.querySelector(".timer");
function subTime(dateCurrent, dateEnd) {
  return dateEnd - dateCurrent;
}

const endDate = {
  fullYear: "2020",
  month: "10",
  day: "30",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

let endDateStr = `${endDate.fullYear}-${endDate.month}-${endDate.day}T${endDate.hours}:${endDate.minutes}:${endDate.seconds}`;

timer = setInterval(function () {
  const now = new Date();
  const date = new Date(endDateStr);
  const timeLeft = subTime(now, date);
  if (timeLeft <= 0) {
    clearInterval(timer);
    alert("Час вийшов!");
  } else {
    const res = new Date(timeLeft);
    const timerStr = `${res.getUTCFullYear() - 1970} років ${res.getUTCMonth()} місяців ${
      res.getUTCDate() - 1
    } днів ${res.getUTCHours()}:${res.getUTCMinutes()}:${res.getUTCSeconds()}`;
    timerShow.innerHTML = timerStr;
  }
}, 1000);
