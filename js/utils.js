
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
//  example: http://www.mystic-peanut.com/mystic_sites/paintone/paintone.html?nl=8&sp=500&sl=g0;-g0;--g0;---g0;;;;;

function parseSongFromURL(songurl) {
  var url = new URL(songurl ? songurl : window.location.href);
  var numberOfLines = url.searchParams.get("nl");
  console.log('parseSongFromURL numberOfLines: ' + numberOfLines);
  if (numberOfLines) {
    // song seems to be there, lets parse it
    numFrames = numberOfLines;
    
    // TODO: add rows or remove them if numberOfLines is different then default
    
    songSpeedMilis = url.searchParams.get("sp");
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
  var paramSongLines = 'sl=';

  for (var i=0; i<numFrames; i++) {
    paramSongLines += getNoteCodesFromSongLine(sheet[i]);
    paramSongLines += ';'
  }

  url += '?' + paramNumberOfLines + paramSongSpeed + paramSongLines;

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