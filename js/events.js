
// this file is handling click and  other events
// 


function initEvents() {
  
  $('.playIcon').mousedown(function(){

    console.log('awd');
    
    // play stop main loop
    if (mainLoopPlaying) {
      mainLoopPlaying = false;
    } else {
      mainLoopPlaying = true;
      processRow();
    }

  });
}