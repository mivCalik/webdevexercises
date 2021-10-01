var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPatern = [];
var started = false ;
var level = 0;

function playSound(name){
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChoosenColor);

  level++;
  $("#level-title").text("Level "+ level);
}

function animatePressed(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(userClickedPatern[currentLevel]===gamePattern[currentLevel]){
    //Success
    if( currentLevel === gamePattern.length-1){
        setTimeout(function(){
          nextSequence();
        },1000);
        userClickedPatern = [];
    }

  }else{
    //wrong
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPatern = [];
  started = false;
}

$(".btn").on("click",function handler(){
  var userChosenColor = this.id;
  userClickedPatern.push(userChosenColor);

  playSound(userChosenColor);
  animatePressed(userChosenColor);

  checkAnswer(userClickedPatern.length-1); //index of last clicked button
});


$(document).keydown(function(){
  if (!started){
    nextSequence();
    $("#level-title").text("Level "+ level);
    started = false;
  }
});
