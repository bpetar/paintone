
var currentFrame = 7;
var numFrames = 8;
var notesInARow = 8;
var prevousFrame = numFrames;
var mainLoopPlaying = false;
var selectedInstrument = 'guitar';
var selectedNote = 'C';
var songSpeedMilis = 500;
var songName = 'song1';
var taregt = 0;
//var element =0;

var selectedColorElement = null;
var selectedInstrumentElement = null;

var sheet = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];

notes = ['C', 'D', 'E', 'F', 'G', 'A1', 'B1', 'C1'];

//instruments = ['guitar', 'xylophone', 'pipe', 'trombone', 'drums', 'harp', 'violin', 'sax'];

notesColors = {
  'C': '#EE6352', 
  'D': '#F4D35E', 
  'E': '#FF8552', 
  'F': '#57A773', 
  'G': '#673ab7', 
  'A1': '#08B2E3', 
  'B1': '#E4959E', 
  'C1': '#FE7362'
};

instrumentCodes = {
  'g' : 'guitar',
  'x' : 'xylophone',
  'p' : 'pipe',
  't' : 'trombone',
  'd' : 'drums',
  'h' : 'harp',
  'v' : 'violin',
  's' : 'sax'
}

// TODO add all tones and intruments
instruments = {
  '0': 'guitar',
  'guitar': {'C': null, 'D': null},
  '1': 'xylophone',
  'xylophone': {'C': null, 'D': null},
  '2': 'pipe',
  'pipe': {'C': null, 'D': null},
  '3': 'trombone',
  'trombone': {'C': null, 'D': null},
  '4': 'drums',
  'drums': {'C': null, 'D': null},
  '5': 'harp',
  'harp': {'C': null, 'D': null},
  '6': 'violin',
  'violin': {'C': null, 'D': null},
  '7': 'sax',
  'sax': {'C': null, 'D': null}
};

// TODO init all tones and instruments like these

// xylophone

instruments.xylophone.C = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/xylophone/C.wav';
instruments.xylophone.C.appendChild(source); 

instruments.xylophone.D = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/xylophone/D.wav';
instruments.xylophone.D.appendChild(source); 

instruments.xylophone.E = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/xylophone/E.wav';
instruments.xylophone.E.appendChild(source); 

instruments.xylophone.F = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/xylophone/F.wav';
instruments.xylophone.F.appendChild(source); 

instruments.xylophone.G = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/xylophone/C.wav';
instruments.xylophone.G.appendChild(source); 

instruments.xylophone.A1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/xylophone/D.wav';
instruments.xylophone.A1.appendChild(source); 

instruments.xylophone.B1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/xylophone/E.wav';
instruments.xylophone.B1.appendChild(source); 

instruments.xylophone.C1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/xylophone/F.wav';
instruments.xylophone.C1.appendChild(source); 

// guitar

instruments.guitar.C = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar/guitar_C.mp3';
instruments.guitar.C.appendChild(source); 

instruments.guitar.D = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar/guitar_D.mp3';
instruments.guitar.D.appendChild(source); 

instruments.guitar.E = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar/guitar_E.mp3';
instruments.guitar.E.appendChild(source); 

instruments.guitar.F = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar/guitar_F.mp3';
instruments.guitar.F.appendChild(source); 

instruments.guitar.G = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar/guitar_G.mp3';
instruments.guitar.G.appendChild(source); 

instruments.guitar.A1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar/guitar_A1.mp3';
instruments.guitar.A1.appendChild(source); 

instruments.guitar.B1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar/guitar_B1.mp3';
instruments.guitar.B1.appendChild(source); 

instruments.guitar.C1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar/guitar_C1.mp3';
instruments.guitar.C1.appendChild(source); 

//drums

instruments.drums.C = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/drums/drums_C.mp3';
instruments.drums.C.appendChild(source); 

instruments.drums.D = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/drums/drums_D.mp3';
instruments.drums.D.appendChild(source); 

instruments.drums.E = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/drums/rock.mp3';
instruments.drums.E.appendChild(source); 

instruments.drums.F = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/drums/cymbal.mp3';
instruments.drums.F.appendChild(source); 

instruments.drums.G = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/drums/darbuka.mp3';
instruments.drums.G.appendChild(source); 

instruments.drums.A1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/drums/Banjo_Drum_Hit_Fienup_002.mp3';
instruments.drums.A1.appendChild(source); 

instruments.drums.B1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/drums/snare.mp3';
instruments.drums.B1.appendChild(source); 

instruments.drums.C1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/drums/Banjo_Drum_Hit_Fienup_016.mp3';
instruments.drums.C1.appendChild(source); 

//pipe

instruments.pipe.C = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/pipe/flute_C4_05_piano_normal.mp3';
instruments.pipe.C.appendChild(source); 

instruments.pipe.D = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/pipe/flute_D4_05_piano_normal.mp3';
instruments.pipe.D.appendChild(source); 

instruments.pipe.E = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/pipe/flute_E4_05_piano_normal.mp3';
instruments.pipe.E.appendChild(source); 

instruments.pipe.F = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/pipe/flute_F4_05_piano_normal.mp3';
instruments.pipe.F.appendChild(source); 

instruments.pipe.G = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/pipe/flute_G4_05_piano_normal.mp3';
instruments.pipe.G.appendChild(source); 

instruments.pipe.A1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/pipe/flute_A5_05_piano_normal.mp3';
instruments.pipe.A1.appendChild(source); 

instruments.pipe.B1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/pipe/flute_B5_05_piano_normal.mp3';
instruments.pipe.B1.appendChild(source); 

instruments.pipe.C1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/pipe/flute_C5_05_piano_normal.mp3';
instruments.pipe.C1.appendChild(source);  

//harp

instruments.harp.C = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/harp/C1.mp3';
instruments.harp.C.appendChild(source); 

instruments.harp.D = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/harp/D1.mp3';
instruments.harp.D.appendChild(source); 

instruments.harp.E = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/harp/E1.mp3';
instruments.harp.E.appendChild(source); 

instruments.harp.F = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/harp/F1.mp3';
instruments.harp.F.appendChild(source); 

instruments.harp.G = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/harp/G1.mp3';
instruments.harp.G.appendChild(source); 

instruments.harp.A1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/harp/A1.mp3';
instruments.harp.A1.appendChild(source); 

instruments.harp.B1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/harp/Bflat.mp3';
instruments.harp.B1.appendChild(source); 

instruments.harp.C1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/harp/C2.mp3';
instruments.harp.C1.appendChild(source); 

//sax

instruments.sax.C = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/sax/C4.mp3';
instruments.sax.C.appendChild(source); 

instruments.sax.D = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/sax/D4.mp3';
instruments.sax.D.appendChild(source); 

instruments.sax.E = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/sax/E4.mp3';
instruments.sax.E.appendChild(source); 

instruments.sax.F = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/sax/F4.mp3';
instruments.sax.F.appendChild(source); 

instruments.sax.G = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/sax/G5.mp3';
instruments.sax.G.appendChild(source); 

instruments.sax.A1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/sax/A4.mp3';
instruments.sax.A1.appendChild(source); 

instruments.sax.B1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/sax/B4.mp3';
instruments.sax.B1.appendChild(source); 

instruments.sax.C1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/sax/C6.mp3';
instruments.sax.C1.appendChild(source); 

//trombone

instruments.trombone.C = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/trombone/trombone_C4_05_forte_normal.mp3';
instruments.trombone.C.appendChild(source); 

instruments.trombone.D = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/trombone/trombone_D4_05_forte_normal.mp3';
instruments.trombone.D.appendChild(source); 

instruments.trombone.E = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/trombone/trombone_E4_05_forte_normal.mp3';
instruments.trombone.E.appendChild(source); 

instruments.trombone.F = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/trombone/trombone_F4_05_forte_normal.mp3';
instruments.trombone.F.appendChild(source); 

instruments.trombone.G = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/trombone/trombone_G4_05_forte_normal.mp3';
instruments.trombone.G.appendChild(source); 

instruments.trombone.A1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/trombone/trombone_A4_05_forte_normal.mp3';
instruments.trombone.A1.appendChild(source); 

instruments.trombone.B1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/trombone/trombone_B4_05_forte_normal.mp3';
instruments.trombone.B1.appendChild(source); 

instruments.trombone.C1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/trombone/trombone_C5_05_forte_normal.mp3';
instruments.trombone.C1.appendChild(source); 

//violin

instruments.violin.C = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/violin/violin_C4_05_forte_arco-normal.mp3';
instruments.violin.C.appendChild(source); 

instruments.violin.D = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/violin/violin_D4_05_forte_arco-normal.mp3';
instruments.violin.D.appendChild(source); 

instruments.violin.E = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/violin/violin_E4_025_forte_arco-normal.mp3';
instruments.violin.E.appendChild(source); 

instruments.violin.F = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/violin/violin_F4_05_forte_arco-normal.mp3';
instruments.violin.F.appendChild(source); 

instruments.violin.G = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/violin/violin_G4_05_forte_arco-normal.mp3';
instruments.violin.G.appendChild(source); 

instruments.violin.A1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/violin/violin_A4_025_forte_arco-normal.mp3';
instruments.violin.A1.appendChild(source); 

instruments.violin.B1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/violin/violin_B4_05_forte_arco-normal.mp3';
instruments.violin.B1.appendChild(source); 

instruments.violin.C1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/violin/violin_C5_05_forte_arco-normal.mp3';
instruments.violin.C1.appendChild(source); 




function processRow() {

  prevousFrame = currentFrame;
  currentFrame++;
  if (currentFrame == numFrames) 
    currentFrame = 0;
  console.log('tact ' + currentFrame);

  document.getElementById('id-div-row' + currentFrame).style.backgroundColor = 'lightGreen';
  document.getElementById('id-div-row' + prevousFrame).style.backgroundColor = 'white';

  for (var i = 0; i < notesInARow; i++) {
    if (sheet[currentFrame].length > 0) {
      var tone = sheet[currentFrame][i];
      if (tone) {
        console.log('play ' + tone.instrument + ': ' + tone.note);

        if(instruments[tone.instrument] && instruments[tone.instrument][tone.note]) {
          instruments[tone.instrument][tone.note].volume = 1;
          instruments[tone.instrument][tone.note].currentTime = 0;
          instruments[tone.instrument][tone.note].play();
        } else {
          console.log('tone undefined');
        }
        
      }
    } else {
      console.log('play silence');
    }
  }

  if (mainLoopPlaying) {
    resultTimoutHandler = setTimeout(function(){ 
      processRow();
    }, songSpeedMilis);
  }
}

$(document).ready(function() {
  console.log('page loaded');

  parseSongFromURL();

  if (mainLoopPlaying) {
    processRow();
  }

  initEvents();

  // set selected tones and instruments
  selectedColorElement = document.getElementById('id-div-col-0');
  selectedInstrumentElement = document.getElementById('id-div-ins-0');
  selectedColorElement.style.borderColor = "#2afa2a";
  selectedInstrumentElement.style.borderColor = "#2afa2a";

  console.log('window width: ' + window.offsetWidth);
});

function addFunction() {

  console.log('addFunction called');
  
  $('<div class="row toneRow" id="id-div-row' + numFrames + '"></div>').insertBefore($('#id-div-rowAddRemove'));
  
  sheet.push([]);
  
  for (var i=0; i<notesInARow; i++) {
    $('#id-div-row' + numFrames).append('<div class="token circle2" id="id-div-token-' + numFrames + '-' + i + '"></div>');
    var element2 = document.getElementById('id-div-token-' + numFrames + '-' + i);
    
    element2.onclick = function(element2) {
      // get token row and column index
      var rowColIDStr = element2.target.id.split('-');
      if (rowColIDStr.length > 4) {
        var row = rowColIDStr[3];
        var col = rowColIDStr[4];
        var tone = sheet[row][col];
        if (tone && tone.instrument == selectedInstrument && tone.note == selectedNote) {
          // delete icon
          sheet[row][col] = null;
          element2.target.style.background = "#fafafa";
          element2.target.style.borderColor = "#fafafa";
        } else {
          // set selected instrument and note
          sheet[row][col] = {};
          sheet[row][col].instrument = selectedInstrument;
          sheet[row][col].note = selectedNote;
          element2.target.style.background = "white url('media/"+selectedInstrument+".png') no-repeat center";
          element2.target.style.backgroundSize = "77%";
          element2.target.style.borderColor = notesColors[selectedNote];
        } 
      }
    }
  }
  numFrames++;
  console.log('frame+= id-div-row' + numFrames);
}

function rmvFunction() {
  numFrames--;
  var IDX = 'id-div-row' + numFrames;
  var element = document.getElementById(IDX);
  element.parentNode.removeChild(element);
  sheet.pop();
  console.log('frame-= id-div-row' + numFrames);
} 