
var randomNumber;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColor;
var userClickedPattern = [];
var level = 0;
var started = true;
$(document).keypress(function () {
    if (started != false)
    {
        nextSequence();
        started = false;
    }
    $("#level-title").text("Level " +level);

})
function nextSequence()
{
      userClickedPattern = [];
    level++;
    randomNumber = Math.random() * 4;
    $("#level-title").text("Level " + level);
  
    randomNumber = Math.floor(randomNumber);

    randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);


    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSounds(randomChosenColor);
    
}
function playSounds(name)
{
    var audio = new Audio(name + ".mp3");
    audio.play();
}
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSounds(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

})
function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
   
}

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
       if (gamePattern.length===userClickedPattern.length) {
        setTimeout(nextSequence(),1000)
       }
        
    
    }
    else {
        playSounds("wrong");
        $("body").addClass("game-over");
        setTimeout(function ()
        {
            $("body").removeClass("game-over");
        }, 1000)
        $("#level-title").text("GAME OVER !!!");
        setTimeout(startOver(), 2000);
        
    }
}
function startOver()
{
    gamePattern = [];
    started = true;
    level = 0;
     $("#level-title").text("PRESS ANY KEY TO START !!!");
}