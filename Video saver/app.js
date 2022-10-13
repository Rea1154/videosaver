"use strict";
const input = document.querySelector("#video-id-input");
const saveVideoBtn = document.querySelector(".save-video-btn");
const videoContainerUl = document.querySelector(".video-container-ul");
const popUp = document.querySelector(".videoplayer");
const iFrame = document.querySelector(".iframe");
const whatIsIdBtn = document.querySelector(".question-icon");

//Video save to storage
let videoKeyinStorage = localStorage.length;

const SaveVideoId = () => {
  const videoId = input.value;
  videoKeyinStorage++;

  // Add id to storage(if we don't have it already)
  if (!existingVideosId[videoId])
    localStorage.setItem(`video${videoKeyinStorage}`, videoId);

  input.value = "";

  displayVideos();
};

//Display saved videos
let existingVideosId = {};
const displayVideos = () => {
  //Looping through storage, create arr of ids and keys
  const videoIdArr = Object.keys(localStorage).map((key) => {
    return [key, localStorage.getItem(key)];
  });

  videoIdArr.forEach((video) => {
    // display video if we don't have it
    if (!existingVideosId[video[1]]) {
      videoContainerUl.innerHTML += `<li class="video-li ${video[0]}">
        <img src="http://img.youtube.com/vi/${video[1]}/0.jpg">
    <i class="fa-solid fa-play play-icon"></i>

        <button class='delete-btn'>x</button>
        </li>`;

      existingVideosId[video[1]] = true;
    }
  });
  updatingVideoList();
};

//delete video from list
const deleteVideo = (e) => {
  if (e.target.className === "delete-btn") {
    e.target.parentElement.remove();

    //delete video from storage
    const videoClassName = e.target.parentElement.classList[1];
    localStorage.removeItem(videoClassName);
  }
};

//play clicked video
const playClickedVideo = (e) => {
  if (e.target.classList.contains("video-li")) {
    const clickedVideoClass = e.target.classList[1];
    const clickedVideoId = localStorage.getItem(clickedVideoClass);
    iFrame.src = `https://www.youtube.com/embed/${clickedVideoId}`;

    popUp.classList.toggle("hidden");
  }
};

//click on each video
const updatingVideoList = () => {
  const videoList = document.getElementsByClassName("video-li");

  [...videoList].forEach((video) => {
    video.addEventListener("click", (e) => {
      deleteVideo(e);
      playClickedVideo(e);
    });
  });
};

//close videoplayer
const closePopUp = () => {
  popUp.classList.toggle("hidden");
  iFrame.src = "";
};

window.addEventListener("load", updatingVideoList());
window.addEventListener("load", displayVideos());
saveVideoBtn.addEventListener("click", SaveVideoId);
popUp.addEventListener("click", closePopUp);

// Hidden text to visible on click
whatIsIdBtn.addEventListener("click", () => {
  const spanText = document.querySelector(".whatisidtext");
  spanText.classList.toggle("span-hidden");
});
