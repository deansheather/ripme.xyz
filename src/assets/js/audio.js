if (config.audio && !(getParameterByName('noaudio') !== null)) {
  r(function () {
    var player = document.getElementById('audio');
    var songEl = document.getElementById('song');
    var previousSong = null;

    player.volume = config.audioVolumeDefault;
    
    /**
     * Change the current song.
     */
    function nextSong () {
      var song = config.audioFiles[Math.floor(Math.random() * config.audioFiles.length)];

      if (previousSong === song) return nextSong();

      Logger.info('[Player] Changing song...');
      playSong(song);
    }

    // Attach to click handler
    document.getElementById('skip-song').onclick = nextSong;

    /**
     * Play a song.
     */
    function playSong (song) {
      previousSong = song;

      songEl.innerText = song[0];
      songEl.setAttribute('href', song[1]);

      player.setAttribute('src', 'assets/audio/' + song[0] + '.mp3');
      player.load();
      player.play();
      player.addEventListener('ended', nextSong);

      Logger.info('[Player] Started playing ' + song[0] + '.');
    }

    if (getParameterByName('song')) {
      if (config.audioFiles[getParameterByName('song')]) {
        Logger.info('[Player] Playing song from query string.');
        return playSong(config.audioFiles[getParameterByName('song')]);
      }
    }

    nextSong();
  })
}