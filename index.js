const videos = {
  space: [
    "https://player.vimeo.com/external/422333391.hd.mp4?s=094dd583d2248cffcec280ff0d50eba397d2bd6f\u0026profile_id=170\u0026oauth2_token_id=57447761",
  ],
  nature: [
    "https://player.vimeo.com/external/517619980.hd.mp4?s=dcab905de99f4814ba133b1b89347626363473b3\u0026profile_id=175\u0026oauth2_token_id=57447761",
  ],
  dark: [
    "https://player.vimeo.com/external/365128226.hd.mp4?s=cc1d27493cb4e8c4b5b12ba1aed7b59a838099f5\u0026profile_id=175\u0026oauth2_token_id=57447761",
  ],
};
const preferences = new Set();
let preferredVideos = [];
let playingVideo = 0;

const tags = document.querySelectorAll("button.tag");
const play = document.querySelector("button.play");
const home = document.querySelector(".home");
const player = document.querySelector(".player");
const video = document.querySelector("video");
const shortcuts = document.getElementById("shortcuts");

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

const showShortcuts = () => {
  shortcuts.style.display = "block";
  setTimeout(() => {
    shortcuts.style.display = "none";
  }, 5000);
};

const togglePlayer = () => {
  home.classList.toggle("hidden");
  player.classList.toggle("hidden");
};

const enterFullscreen = () => player.requestFullscreen();

const goHome = () => {
  togglePlayer();
};

const playScreenSaver = async () => {
  togglePlayer();
  preferredVideos = hasPreference() ? getPreferredVideos() : getAllVideos();
  updateVideoSrc();
  await enterFullscreen();
  showShortcuts();
};

const playNext = () => {
  playingVideo =
    playingVideo === preferredVideos.length - 1 ? 0 : playingVideo + 1;
  updateVideoSrc();
};

const handleKeyboardShortcut = (e) => {
  const key = e.which || e.keyCode;
  if (key === 13) return enterFullscreen();
  if (key == 72) return goHome();
  if (key == 191) return showShortcuts();
};

const attachEvents = () => {
  document.addEventListener("keyup", handleKeyboardShortcut);
  tags.forEach((tag) => tag.addEventListener("click", togglePreference));
  play.addEventListener("click", playScreenSaver);
  video.addEventListener("ended", playNext);
};

attachEvents();
