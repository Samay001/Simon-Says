let buttonColours = ["red","blue","green","yellow"];

let gamePattern = [];
let userClickedPattern = [];

var flag = false;
var level = 0;

$(document).keydown(function() {
    if(!flag){
        $("h1").text("Level " + level);
        nextSequence();
        flag = true;
    }
});

$("button").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+ level);

    let randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);

    let randomChosenColour  = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

    playSound(randomChosenColour);
}

function animatePress(currentColor)
{
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function playSound(name)
{
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("h1").text("Game over enter any key to restart");
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        startOver();
    } 
}

function startOver()
{
    level = 0;
    gamePattern = [];
    flag = false;
}
    




