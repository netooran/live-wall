const videos = {
  space: ["videos/planet-earth-in-close-up-view.mp4"],
  nature: ["videos/waterfalls-from-front.mp4", "videos/waves-from-above.mp4"],
  dark: ["videos/cabin-at-night.mp4", "videos/white-smoke.mp4"],
};
const preferences = new Set();
let preferredVideos = [];
let playingVideo = 0;

const tags = document.querySelectorAll("button.tag");
const play = document.querySelector("button.play");
const home = document.querySelector(".home");
const player = document.querySelector(".player");
const video = document.querySelector("video");

const updateVideoSrc = () => (video.src = preferredVideos[playingVideo]);

const hasPreference = () => preferences.size > 0;
const getAllVideos = () => Object.values(videos).flat();
const getPreferredVideos = () =>
  [...preferences].map((v) => videos[v] || []).flat();

const togglePreference = (event) => {
  const tag = event.target;
  tag.classList.toggle("active");
  const preference = tag.getAttribute("data-value");
  preferences[preferences.has(preference) ? "delete" : "add"](preference);
};

const playScreenSaver = () => {
  home.classList.toggle("hidden");
  player.classList.toggle("hidden");

  preferredVideos = hasPreference() ? getPreferredVideos() : getAllVideos();
  updateVideoSrc();
};

const playNext = () => {
  playingVideo =
    playingVideo === preferredVideos.length - 1 ? 0 : playingVideo + 1;
  updateVideoSrc();
};

const attachEvents = () => {
  tags.forEach((tag) => tag.addEventListener("click", togglePreference));
  play.addEventListener("click", playScreenSaver);
  video.addEventListener("ended", playNext);
};

attachEvents();
