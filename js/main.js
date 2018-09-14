
var currentFrame = 7;
var numFrames = 8;
var notesInARow = 8;
var prevousFrame = numFrames;
var mainLoopPlaying = false;
var selectedInstrument = 'guitar';
var selectedNote = 'C';
var songSpeedMilis = 500;
var songName = 'song1';

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
source.src = 'media/tones/C.wav';
instruments.xylophone.C.appendChild(source); 

instruments.xylophone.D = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/D.wav';
instruments.xylophone.D.appendChild(source); 

instruments.xylophone.E = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/E.wav';
instruments.xylophone.E.appendChild(source); 

instruments.xylophone.F = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/F.wav';
instruments.xylophone.F.appendChild(source); 

// guitar
instruments.guitar.C = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar_C.mp3';
instruments.guitar.C.appendChild(source); 

instruments.guitar.D = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar_D.mp3';
instruments.guitar.D.appendChild(source); 

instruments.guitar.E = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar_E.mp3';
instruments.guitar.E.appendChild(source); 

instruments.guitar.F = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar_F.mp3';
instruments.guitar.F.appendChild(source); 

instruments.guitar.G = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar_G.mp3';
instruments.guitar.G.appendChild(source); 

instruments.guitar.A1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar_A1.mp3';
instruments.guitar.A1.appendChild(source); 

instruments.guitar.B1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar_B1.mp3';
instruments.guitar.B1.appendChild(source); 

instruments.guitar.C1 = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/guitar_C1.mp3';
instruments.guitar.C1.appendChild(source); 

instruments.drums.C = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/drums_C.mp3';
instruments.drums.C.appendChild(source); 

instruments.drums.D = document.createElement('audio');
var source = document.createElement('source');
source.src = 'media/tones/drums_D.mp3';
instruments.drums.D.appendChild(source); 

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

