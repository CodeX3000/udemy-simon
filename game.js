/* --------------------- Variables --------------------- */
var started = false;
var level = 0;
var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClicks = [];

/* ------------------ Event listeners ------------------ */
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClicks.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClicks.length - 1)
});

/* --------------------- Functions --------------------- */
function nextSequence() {
  increaseLevel();

  var randomColor = pickRandomColor();
  gamePattern.push(randomColor);
  animateColor(randomColor)
  playSound(randomColor);
}

function checkAnswer(click) {
  if (gamePattern[click] === userClicks[click]) {
    if (gamePattern.length === userClicks.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

/* --------------------- Utilities --------------------- */
function pickRandomColor() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];

  return randomColor;
}

function animateColor(randomColor) {
  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function increaseLevel() {
  level++;
  $("#level-title").text("Level" + " " + level);
  resetUserClicks();
}

function resetUserClicks() {
  userClicks = [];
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
