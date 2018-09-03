
var currentFrame = 7;
var numFrames = 8;
var notesInARow = 8;
var prevousFrame = numFrames;
var mainLoopPlaying = false;

var sheet = [
  [{'instrument': 'xylophone', 'note': 'C'}, {'instrument': 'guitar', 'note': 'C'}],
  [{'instrument': 'xylophone', 'note': 'D'}, {'instrument': 'guitar', 'note': 'C'}],
  [{'instrument': 'xylophone', 'note': 'E'}, {'instrument': 'guitar', 'note': 'C'}],
  [],
  [{'instrument': 'xylophone', 'note': 'C'}, {'instrument': 'guitar', 'note': 'D'}],
  [{'instrument': 'xylophone', 'note': 'D'}, {'instrument': 'guitar', 'note': 'D'}],
  [{'instrument': 'xylophone', 'note': 'E'}, {'instrument': 'guitar', 'note': 'E'}],
  [{'instrument': 'xylophone', 'note': 'E'}, {'instrument': 'guitar', 'note': 'E'}],
];

// TODO add all tones and intruments
instruments = {
  'guitar': {'C': null, 'D': null},
  'xylophone': {'C': null, 'D': null}
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

        instruments[tone.instrument][tone.note].volume = 1;
        instruments[tone.instrument][tone.note].currentTime = 0;
        instruments[tone.instrument][tone.note].play();
        
      }
    } else {
      console.log('play silence');
    }
  }

  if (mainLoopPlaying) {
    resultTimoutHandler = setTimeout(function(){ 
      processRow();
    }, 500);
  }
}

$(document).ready(function() {
  console.log('page loaded');

  //document.getElementById('id-div-row' + currentFrame).style.backgroundColor = 'lightGreen';

  if (mainLoopPlaying) {
    processRow();
  }

  initEvents();

  /*resultTimoutHandler = setTimeout(function(){ 
    processRow();
  }, 1200);*/
});

