
//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  {songName: "Ram Aayenge - Payal Dev", filepath: "songs/1.mp3", coverPath: "images/song1.jpg"},
  {songName: "Levitating - Dua Lipa", filepath: "songs/2.mp3", coverPath: "images/song2.jpg"},
  {songName: "Satranga - Arijit Singh", filepath: "songs/3.mp3", coverPath: "images/song3.jpg"},
  {songName: "Calm Down - Rema", filepath: "songs/4.mp3", coverPath: "images/song4.jpg"},
  {songName: "Unakku Thaan", filepath: "songs/5.mp3", coverPath: "images/song5.jpg"},
  {songName: "Jamal Kudu", filepath: "songs/6.mp3", coverPath: "images/song6.jpg"},
  {songName: "Ranjhan Aaya", filepath: "songs/7.mp3", coverPath: "images/song7.jpg"},
  {songName: "Hua Main ", filepath: "songs/2.mp3", coverPath: "images/song8.jpg"},
  {songName: "Shape of You ", filepath: "songs/2.mp3", coverPath: "images/song9.jpg"},
  {songName: "Baby - Justin Bieber", filepath: "songs/2.mp3", coverPath: "images/song10.jpg"},
]

songItems.forEach((element, i)=>{ 
  element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

//Handle Play/Pause Click
masterPlay.addEventListener('click', () => {
  if(audioElement.paused || audioElement.currentTime <= 0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});


// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
  // Update Seekbar
  progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
  myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
  audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
      element.classList.remove('fa-pause-circle');
      element.classList.add('fa-play-circle');
  })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click', (e)=>{ 
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
      audioElement.src = `songs/${songIndex+1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
  })
})

document.getElementById('next').addEventListener('click', ()=>{

  if(songIndex>=9){
      songIndex = 0
  }
  else{
      songIndex += 1;
  }
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  makeAllPlays();
  let selectedSong = document.getElementById(`${songIndex}`);
  selectedSong.classList.remove('fa-play-circle');
  selectedSong.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
  if(songIndex<=0){
      songIndex = 0
  }
  else{
      songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  makeAllPlays();
  let selectedSong = document.getElementById(`${songIndex}`);
  selectedSong.classList.remove('fa-play-circle');
  selectedSong.classList.add('fa-pause-circle');
})