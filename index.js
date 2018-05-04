// variable to keep track of what stage we're currently on
var stage_number = 1;

// main run functions
stage1();

// stage1 runs with timer, target and score count
function stage1(){
  score_count =0;
  timer = 20;
  target = 10;
  //Moving multiple objects
  animateDiv('#balloon1');
  animateDiv('#balloon2');
  animateDiv('#balloon3');
  animateDiv('#balloon4');
  animateDiv('#balloon5');
  animateDiv('#balloon6');
  // hiding unused objects
  document.getElementById('balloon7').style.visibility='hidden';
  document.getElementById('balloon8').style.visibility='hidden';
  document.getElementById('balloon9').style.visibility='hidden';
  document.getElementById('balloon10').style.visibility='hidden';
  // starts the timer
  decrement_timer();
  //displays timer and targets on the screen
  document.getElementById('timer').innerHTML = "time: " + timer;
  document.getElementById('target').innerHTML = "target: " + target;
  document.getElementById('score').innerHTML = "score: " + score_count;
}
//checkForWin through score_count and target
function checkForWin(){
  if (target < score_count) {
    return true;
  }
}
// target changes to 20 and more black balloons appear
function stage2(){
  document.getElementById('balloon7').style.visibility='visible';
  document.getElementById('balloon8').style.visibility='visible';
  document.getElementById('balloon9').style.visibility='visible';
  document.getElementById('balloon10').style.visibility='visible';
  score_count =0;
  timer = 20;
  target = 20;
  animateDiv('#balloon1');
  animateDiv('#balloon2');
  animateDiv('#balloon3');
  animateDiv('#balloon4');
  animateDiv('#balloon5');
  animateDiv('#balloon6');
  animateDiv('#balloon7');
  animateDiv('#balloon8');
  animateDiv('#balloon9');
  animateDiv('#balloon10');
  decrement_timer();
  document.getElementById('timer').innerHTML = "time: " + timer;
  document.getElementById('target').innerHTML = "target: " + target;
  document.getElementById('score').innerHTML = "score: " + score_count;
}
//target changes to 25 and only two red balloons appear
function stage3(){
  score_count =0;
  timer = 20;
  target = 25;
  document.getElementById('balloon1').style.visibility='hidden';
  document.getElementById('balloon2').style.visibility='hidden';
  document.getElementById('balloon3').style.visibility='hidden';
  animateDiv('#balloon4');
  animateDiv('#balloon5');
  animateDiv('#balloon6');
  animateDiv('#balloon7');
  animateDiv('#balloon8');
  animateDiv('#balloon9');
  animateDiv('#balloon10');
  decrement_timer();
  document.getElementById('timer').innerHTML = "time: " + timer;
  document.getElementById('target').innerHTML = "target: " + target;
  document.getElementById('score').innerHTML = "score: " + score_count;
}

// tests if the score is bigger than the target
function checkForWin(){
  if (target < score_count+1) {
    return true; //means you passed the test
  }
}

//game ends when clicking a black balloon
var game_running = true;
function end_game() {
  game_running = false;
  timer = 0;
  document.getElementById('timer').innerHTML ="time: " + timer;
}

// function increments the score when the balloon is clicked
var score_count = 0;
function increment_score(){
  score_count++;
  playPop();
  document.getElementById('score').innerHTML = "score: " + score_count;
}

// function to decrement the timer and end the game
var timer = 20;
function decrement_timer(){
  timer--;
  document.getElementById('timer').innerHTML ="time: " +  timer;
  // if timer hasn't hit 0 then decrease the timer after 1 second
  if(timer > 0){
     setTimeout(decrement_timer, 1000);
  }
  else {
    //function to end the game
    if(checkForWin() == true){
      if(stage_number == 1) document.getElementById('message').innerHTML= 'You beat stage 1!';
      if(stage_number == 2) document.getElementById('message').innerHTML= 'You beat stage 2!';
      if(stage_number == 3) document.getElementById('message').innerHTML= 'You won!';
      if(stage_number == 1){
        stage2();
        stage_number = 2;
        return;
      }
      if (stage_number == 2) {
        stage3();
        stage_number = 3;
        return;
      }
      if (stage_number == 3){
        setTimeout(reset, 10000);
      }
      return;
    }else{
      // case for if you lost
      document.getElementById('message').innerHTML= 'You didn\'t hit the target in time!';
      setTimeout(reset, 10000);
      return;
    }
  }
}

// tells you the score
function end_game(){
  document.getElementById('message').innerHTML= 'You scored ' + score_count;
  // reset the game after 10,000 milliseconds = 10 seconds
  setTimeout(reset, 10000);
}

// reset function
function reset(){
  // reloads page automatically
  location.reload();
}

// make a new position for the balloon to go to
function makeNewPosition(){

    // Get viewport dimensions (remove the dimension of the div)
    // otherwise balloons will go off screen
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    // make random positions within the viewport
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    // return random coordinates on the screen
    return [nh,nw];

}

// animate the balloons movement
//recursive function because it calls itself
function animateDiv(object) {
  // get a random new position
  var newq = makeNewPosition();

  // use jquery to animate the div containing the balloon
  $(object).animate({ top: newq[0], left: newq[1] }, 2000, function(){
    // when the balloon is done with it's current animation then
    // if game is running
    if(game_running = true){
      // continue to animate the div and move it to new random positions
      animateDiv(object);
    }
  });
}


// CODE FOR PRESENTING HERE
// not to be part of the final game!!!!!!!

// function to add an event listener to the whole page for key presses
var addEvent = document.addEventListener ? function(target,type,action){
   if(target){
       target.addEventListener(type, action, false);
   }
} : function(target,type,action){
   if(target){
       target.attachEvent('on' + type, action, false);
   }
}

// add functionality for each key pressed (key down and key up)
addEvent(document,'keydown',function(e) {
   // grab the event
   e = e || window.event;
   var key = e.which || e.keyCode;
   // switch case for which key was pressed
   switch (key) {
     // case for spacebar
     case 32:
      increment_score();
      increment_score();
      increment_score();
      increment_score();
      increment_score();
      increment_score();
      increment_score();
      increment_score();
      increment_score();
      increment_score();
      increment_score();
     break;
   }
 }
)

// function to play balloon pop noise
function playPop(){
  var audio = new Audio('pop_effect.mp3');
  audio.play();
}
