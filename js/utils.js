
// generateURL
// 
// paintone share codes:
//  - 'nl' number of song lines
//  - 'sp' song speed milis
//  - 'sl' song lines start
//  - 'g1' guitar tone C1
//  - 'g12' guitar tone G2
//  - 'd1' drums C1
//  - 'p1' pipe C1
//  - 'x1' xylophone 1
//  - ';' new song line
//  - '-' note separator
//  - ''
//  
//  example: http://www.mystic-peanut.com/mystic_sites/paintone/paintone.html?nl=8&sp=500&sn=song1&sl=g0;-g0;--g0;---g0;;;;;

function parseSongFromURL(songurl) {
  var url = new URL(songurl ? songurl : window.location.href);
  var numberOfLines = url.searchParams.get("nl");
  console.log('parseSongFromURL numberOfLines: ' + numberOfLines);
  if (numberOfLines) {
    // song seems to be there, lets parse it    

    // TODO: add rows or remove them if numberOfLines is different then current
    numFrames = numberOfLines;

    songSpeedMilis = url.searchParams.get("sp");
    songName = url.searchParams.get("sn");
    $('#id-input-songname').val(songName);
    var songLines = url.searchParams.get("sl");
    console.log('parseSongFromURL songLines: ' + songLines);
    var sheetLinesArr = songLines.split(';');
    for (var i=0; i<sheetLinesArr.length; i++) {
      var sLine = sheetLinesArr[i];
      if (sLine) {
        // row is not empty, insert some notes
        var sheetNotesArr = sLine.split('-');
        for (var j=0; j<sheetNotesArr.length; j++) {
          sheetNote = sheetNotesArr[j];
          if (sheetNote) {
            // convert g1 to sheet note
            setNoteFromCode(sheetNote, i, j);
          }
        }
      
      }
    }
  }
}

function generateURL() {
  var url = 'http://www.mystic-peanut.com/mystic_sites/paintone/paintone.html'
  var paramNumberOfLines = 'nl=' + numFrames + '&';
  var paramSongSpeed = 'sp=' + songSpeedMilis + '&';
  var paramSongName = 'sn=' + songName + '&';
  var paramSongLines = 'sl=';

  for (var i=0; i<numFrames; i++) {
    paramSongLines += getNoteCodesFromSongLine(sheet[i]);
    paramSongLines += ';'
  }

  url += '?' + paramNumberOfLines + paramSongSpeed + paramSongName + paramSongLines;

  console.log(url);

  return url;
}

// convert sheet line notes to url codes
function getNoteCodesFromSongLine(sheetLine) {

  var notesCodes = '';
  if (thereAreNotesInTheRow(sheetLine)) {
    for (var j=0; j<notesInARow; j++) {
      if (sheetLine[j]) {
        notesCodes += getNoteCode(sheetLine[j].instrument, sheetLine[j].note);
        
        if ( ! theresMoreNotesInTheRow(sheetLine, j+1)) 
          break;
      }
      notesCodes += '-';
    }
  }

  return notesCodes;
}

function thereAreNotesInTheRow(sheetLine) {
  for (var k=0; k<notesInARow; k++) {
    if (sheetLine[k])
      return true;
  }
  return false;
}

function theresMoreNotesInTheRow(sheetLine, index) {
  for (var k=index; k<notesInARow; k++) {
    if (sheetLine[k])
      return true;
  }
  return false;
}

function getNoteCode(instrument, note) {
  var noteCode = '';
  noteCode += instrument.charAt(0);
  noteCode += notes.indexOf(note);
  console.log('noteCode: ' + noteCode + note);

  return noteCode;
}

function setNoteFromCode(noteCode, row, col) {

  var codedNote = notes[noteCode.substr(1)];
  //console.log('codedNote: ' + codedNote + 'noteCode.substr(1): ' + noteCode.substr(1));
  var codedInstrument = instrumentCodes[noteCode.charAt(0)];
  sheet[row][col] = {};
  sheet[row][col].instrument = codedInstrument;
  sheet[row][col].note = codedNote;
  var element = document.getElementById('id-div-token-' + row + '-' + col);
  element.style.background = "white url('media/"+codedInstrument+".png') no-repeat center";
  element.style.backgroundSize = "77%";
  element.style.borderColor = notesColors[codedNote];
}

function loadSong() {
    console.log($(this).attr('name'));
    var song = $(this).attr('name');
    // load the song from cache
    var songUrl = window.localStorage.getItem(song);
    console.log('the loaded song: ' + songUrl);
    clearSheet();
    parseSongFromURL(songUrl);
    // show notificatoin 'song loaded'
    showNotification('Song loaded');
    // hide settings
    $('.saved-songs-div').hide('fast');
}

function deleteSong() {
  var songDeleteName = $(this).attr('name');
  console.log(songDeleteName);

  // TODO: ask for confirmation?
  
  // remove song from cache, 
  var savedSongsStr = window.localStorage.getItem("savedSongs");
  var savedSongsArr = savedSongsStr.split(';');
  var delIndex = savedSongsArr.indexOf(songDeleteName);
  savedSongsArr.splice(savedSongsArr.indexOf(songDeleteName),1);

  if (savedSongsArr.length) {
    window.localStorage.setItem('savedSongs', savedSongsArr.join(';'));
  } else {
    window.localStorage.removeItem('savedSongs');
  }

  window.localStorage.removeItem(songDeleteName);

  // remove html elem
  var element = document.getElementById('id-saved-song-' + delIndex);
  element.remove(); 
  var delIconElement = document.getElementById('id-delete-song-' + delIndex);
  delIconElement.remove(); 

  // if last song, get out of that menu
  if (savedSongsArr.length == 0)
    $('.saved-songs-div').hide('fast');

  // the song is gone forever
}

function showSavedSongs() {
  $('.settings-div').hide('fast', function(){
    // code after hiding settings is done
    console.log('load saved songs rows');

    // delete all saved song elements children of class 'savedSong'
    $('.savedSong').each(function (i, obj) {
      $(this).remove();
    });
    $('.deleteIcon').each(function (i, obj) {
      $(this).remove();
    });

    // for each saved song, re-add child row to saved-songs-div
    var savedSongsStr = window.localStorage.getItem("savedSongs");
    if (savedSongsStr) {
    var savedSongs = savedSongsStr.split(';');
      savedSongs.forEach(function (item, index) {
        $('.saved-songs-div').append("<div id='id-delete-song-" + index + "' name='" + item + "' class='settingIcon deleteIcon'></div> <div id='id-saved-song-" + index + "' name='" + item + "' class='row settingsRow savedSong'> <div class='settingIcon songIcon'></div>Load <span style='color: purple'>" + item + "</span></div>");
        var element = document.getElementById('id-saved-song-' + index);
        element.onclick = loadSong; 
        var delIconElement = document.getElementById('id-delete-song-' + index);
        delIconElement.onclick = deleteSong; 
      });

      // show saved songs div
      $('.saved-songs-div').show('fast');
    } else {
      console.log('error: shouldnt even be here');
    }

  });
}

function thereAreSavedSongs() {
  var savedSongsStr = window.localStorage.getItem("savedSongs");
  if (savedSongsStr) {
    return true;
  }
  return false;
}

function clearSheet() {

  for (var row=0; row<numFrames; row++) {
    for (var col=0; col<notesInARow; col++) {
      var element = document.getElementById('id-div-token-' + row + '-' + col);
      element.style.background = "#fafafa";
      element.style.borderColor = "#fafafa";
    }
  }

  sheet = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];
}

function showNotification(msg, time = 3000) {
  var x = document.getElementById("snackbar");
  x.innerHTML = msg;
  // Add the "show" class to DIV
  x.className = "show";
  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, time);




  /*new Noty({
    type: 'success', //alert (default), success, error, warning, info - ClassName generator uses this value → noty_type__${type}
    layout: 'center', //top, topLeft, topCenter, topRight (default), center, centerLeft, centerRight, bottom, bottomLeft, bottomCenter, bottomRight - ClassName generator uses this value → noty_layout__${layout}
    theme: 'bootstrap-v4', //relax, mint (default), metroui - ClassName generator uses this value → noty_theme__${theme}
    text: 'My beautiful snackbar', //This string can contain HTML too. But be careful and don't pass user inputs to this parameter.
    //timeout: 5000, // false (default), 1000, 3000, 3500, etc. Delay for closing event in milliseconds (ms). Set 'false' for sticky notifications.
    progressBar: true, //Default, progress before fade out is displayed
    //closeWith: 'click' //default; alternative: button
    
    animation: {
        open: 'animated bounceInRight', // Animate.css class names
        close: 'animated bounceOutRight' // Animate.css class names
    }
  }).show();*/

  //console.log('yes noty?');
}