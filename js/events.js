
// this file is handling click and  other events
// 

// crveno, zuto, narandzasto, zeleno, ljubicasto, plavo, svetloroze, (crveno)
function initEvents() {
  
  $('.colorPick').mousedown(function(element){
    // get color index
    console.log(element);
    var rowColIDStr = element.currentTarget.id.split('-');
    if (rowColIDStr.length > 2) {
      var col = rowColIDStr[3];
      selectedNote = notes[col];
      selectedColorElement.style.borderColor = "white";
      selectedColorElement = element.currentTarget;
      selectedColorElement.style.borderColor = "#2afa2a";
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

    // toggle settings panel
    if ($('.settings-div').is(":visible")) {
      $('.settings-div').hide('fast');
    } else {
      $('.settings-div').show('fast');
      $("#id-input-songurl").val(generateURL());
    }
  });

  $("#id-input-songspeed").change(function() {
    songSpeedMilis = $("#id-input-songspeed").val();
  });
}
