
// this file is handling click and  other events
// 

// crveno, zuto, narandzasto, zeleno, ljubicasto, plavo, svetloroze, (crveno)
function initEvents() {
  
  console.log('... calling init events');

  document.addEventListener("touchstart", screenTouched);

  window.onblur = function() {
    console.log('dont play when in background');
    mainLoopPlaying = false;
  };

  $('.colorPick').mousedown(function(event){
    // get color index
    console.log('colorPick click');
    var rowColIDStr = event.currentTarget.id.split('-');
    if (rowColIDStr.length > 2) {
      var col = rowColIDStr[3];
      selectedNote = notes[col];
      selectedColorElement.style.borderColor = "white";
      selectedColorElement = event.currentTarget;
      selectedColorElement.style.borderColor = "#2afa2a";

      //instruments[selectedInstrument][selectedNote].volume = 1;
      //instruments[selectedInstrument][selectedNote].currentTime = 0;
      //instruments[selectedInstrument][selectedNote].play();

    } else {
      console.log('error parsing colorPick id');
    }
  });

  $('.instrumentPick').mousedown(function(element){
    // get instrument index
    console.log(element);
    var rowColIDStr = element.currentTarget.id.split('-');
    if (rowColIDStr.length > 2) {
      var col = rowColIDStr[3];
      selectedInstrument = instruments[col];
      selectedInstrumentElement.style.borderColor = "white";
      selectedInstrumentElement = element.currentTarget;
      selectedInstrumentElement.style.borderColor = "#2afa2a";

      //instruments[selectedInstrument][selectedNote].volume = 1;
      //instruments[selectedInstrument][selectedNote].currentTime = 0;
      //instruments[selectedInstrument][selectedNote].play();

    } else {
      console.log('error parsing colorPick id');
    }
  });

  $('.token').mousedown(function(element){
    // get token row and column index
    console.log(element);
    var rowColIDStr = element.target.id.split('-');
    if (rowColIDStr.length > 4) {
      var row = rowColIDStr[3];
      var col = rowColIDStr[4];

      var tone = sheet[row][col];
      if (tone && tone.instrument == selectedInstrument && tone.note == selectedNote) {
        console.log('obrisi gi');
        // delete icon
        sheet[row][col] = null;
        element.target.style.background = "#fafafa";
        element.target.style.borderColor = "#fafafa";
      } else {
        console.log('setuj novi');
        // set selected instrument and note
        sheet[row][col] = {};
        sheet[row][col].instrument = selectedInstrument;
        sheet[row][col].note = selectedNote;
        element.target.style.background = "white url('media/"+selectedInstrument+".png') no-repeat center";
        element.target.style.backgroundSize = "77%";
        element.target.style.borderColor = notesColors[selectedNote];
      }

    } else {
      console.log('error parsing token id');
    }
  });

  $('.playIcon').mousedown(function(){
    console.log('play clicked');

    // hack to fix "DOMException: play() can only be initiated by a user gesture."
    // if all tones not played, play them now
    if ( ! allSoundsPlayed) {
      console.log('play clicked not');
      playallsounds();
      allSoundsPlayed = true;
    }

    // play stop main loop
    if (mainLoopPlaying) {
      mainLoopPlaying = false;
    } else {
      mainLoopPlaying = true;
      processRow();
    }

    generateURL();

  });

  $('.thingsIcon').mousedown(function(){
    console.log('settings clicked');
    
    $('.saved-songs-div').hide('fast');

    // scroll to the top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    if ($('.about-div').is(':visible')) {
      $('.about-div').hide('fast');
      return;
    }

    // toggle settings panel
    if ($('.settings-div').is(":visible")) {
      $('.settings-div').hide('fast');
    } else {

      // calculate if load songs should be enabled
      if (thereAreSavedSongs()) {
        $('.loadRow').css('color','#383636');
        $('.loadRow').css('cursor','pointer');
      } else {
        $('.loadRow').css('color','lightgray');
        $('.loadRow').css('cursor','default');
      }
      
      $('.settings-div').show('fast');
      $("#id-input-songurl").val(generateURL());
    }
  });

  $("#id-input-songspeed").change(function() {
    songSpeedMilis = $("#id-input-songspeed").val();
    console.log('songSpeedMilis set to: ' + songSpeedMilis);
  });

  $('.leftIcon').mousedown(function() {
    songSpeedMilis = parseInt($("#id-input-songspeed").val())-1;
    $("#id-input-songspeed").val(songSpeedMilis);
  });

  $('.rightIcon').mousedown(function() {
    songSpeedMilis = parseInt($("#id-input-songspeed").val())+1;
    $("#id-input-songspeed").val(songSpeedMilis);
  });

  $('.saveRow').click(function() {
    // save the song to cache
    var songCode = generateURL();
    window.localStorage.setItem(songName, songCode);

    var savedSongsStr = window.localStorage.getItem("savedSongs");
    if (savedSongsStr) {
      var savedSongs = savedSongsStr.split(';');
      if (savedSongs.indexOf(songName) == -1) {
        console.log('songName saved ' + songName);
        savedSongs.push(songName);
        window.localStorage.setItem('savedSongs', savedSongs.join(';'));
      }
    } else {
        console.log('songName saved ' + songName);
        window.localStorage.setItem('savedSongs', songName);
    }

    // show notificatoin 'song saved'
    showNotification('Song saved');
  });

  $('.loadRow').mousedown(function() {
    //loadSong();
    if (thereAreSavedSongs()) {
      showSavedSongs();
    }
    //
  });

  $('.aboutRow').mousedown(function() {
    $('.settings-div').hide('fast', function(){
      // scroll to the top
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera      
      $('.about-div').show('fast');
    });
  });

  $('.clearRow').mousedown(function() {
    clearSheet();
    $('.settings-div').hide('fast');
  });

  $("#id-input-songname").change(function() {
    songName = $("#id-input-songname").val();
    console.log('songName set to: ' + songName);
  });

// TODO think this is not used
  $('.savedSong').mousedown(function() {
    console.log('load songName set to: ' + songName);
    songName = $(this).attr('name');
    console.log('load songName set to: ' + songName);
    loadSong(songName);
  });

}
