console.log("Lets write javascript");
let currentSong = new Audio();
let songs=["./songs/0.mp3","./songs/1.mp3","./songs/2.mp3","./songs/3.mp3","./songs/4.mp3","./songs/5.mp3","./songs/6.mp3","./songs/7.mp3","./songs/8.mp3","./songs/9.mp3"];

// const playButtons = document.getElementsByClassName('play-btn');


const cards = document.getElementsByClassName("card");
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", ((index) => {
        return () => {
            playMusic(index);
			// togglePlayPause();

        };
    })(i));
}

// const playPauseButton = document.getElementById('playPauseButton');
// const playButtonImage = "./Assets/player_icon3.png";
// const pauseButtonImage = "./Assets/player_icon3a.png";
// function togglePlayPause() {
// 	if (currentSong.paused) {
// 		// currentSong.play();
// 		playPauseButton.src = pauseButtonImage;
// 	} else {
// 		// currentSong.pause();
// 		playPauseButton.src = playButtonImage;
// 	}
// }
let currentSongIndex = 0;
function playMusic(index){
	if(index>=0 && index < songs.length){
		currentSong.src = songs[index];
		currentSong.play();
		console.log(`Playing: ${songs[index]}`);
		currentSongIndex=index;
	}
	else{
		console.log('Invalid song index');
	} 
}

document.addEventListener("DOMContentLoaded", function () {
    
    const playButtons = document.getElementsByClassName('play-btn');
	
    const playButtonImage = "./Assets/player_icon3.png";
	const pauseButtonImage = "./Assets/player_icon3a.png";
	const forwardButtons = document.querySelectorAll('.forwardButton');
    const backwardButtons = document.querySelectorAll('.backwardButton');
    

    // Play button
	Array.from(playButtons).forEach(function(playButton) {
        playButton.addEventListener('click', function () {
            if (playButton.getAttribute('src') === playButtonImage) {
                playButton.style.opacity = '0';
                playButton.setAttribute('src', pauseButtonImage);
				playButton.style.opacity = '1';

				currentSong.play();
            } else {
                playButton.setAttribute('src', playButtonImage);
				currentSong.pause();
            }
        });
	});
	//forward button 
	forwardButtons.forEach(button => {
        button.addEventListener('click', function () {
            let nextIndex = currentSongIndex + 1;
            if (nextIndex >= songs.length) {
                nextIndex = 0; // Loop back to the first song
            }
            playMusic(nextIndex);
        });
    });

    // Event listeners for backward buttons
    backwardButtons.forEach(button => {
        button.addEventListener('click', function () {
            let prevIndex = currentSongIndex - 1;
            if (prevIndex < 0) {
                prevIndex = songs.length - 1; // Loop to the last song
            }
            playMusic(prevIndex);
        });
    });
});

	// setting up seek bar 
	document.addEventListener("DOMContentLoaded", function () {
		
		const progressBar = document.querySelector('.progress-bar');
		const currentTimeElem = document.querySelector('.curr-time');
		const totalTimeElem = document.querySelector('.tot-time');

		// Helper function to format time in mm:ss
		function formatTime(seconds) {
			const mins = Math.floor(seconds / 60);  // converts sec into mins
			const secs = Math.floor(seconds % 60); // calculates remaining seconds 
			return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
		}
		// Update the progress bar and current time as the audio plays
		currentSong.addEventListener('timeupdate',function(){
			const currentTime = currentSong.currentTime;
			const duration = currentSong.duration;
			const progress = (currentTime/duration)*100;
			progressBar.value = progress;
			currentTimeElem.textContent = formatTime(currentTime);
		})
		 // Set the total duration once metadata is loaded
		 currentSong.addEventListener('loadedmetadata',function(){
			const duration = currentSong.duration;
			totalTimeElem.textContent = formatTime(duration);
		 })
		 // Seek audio when progress bar is adjusted
		 progressBar.addEventListener('input', function () {
			const duration = currentSong.duration;
			const seekTime = (progressBar.value / 100) * duration;
			currentSong.currentTime = seekTime;
		});
	});























    
