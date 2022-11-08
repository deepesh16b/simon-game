var btnColors = ['green', 'red', 'yellow', 'blue'];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;

$(document).keypress(function (e) { 
    
    if(!started){
        $("#startBtn").addClass("hide");
        nextSequence();
        started = true;
    }
});
$("#startBtn").click(function (e) { 
    
    if(!started){
        $("#startBtn").addClass("hide");
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userPattern = [];
    level++;
    $(".title").text("Level " + level);
    var random_no = Math.floor( Math.random()*4 );
    var color = btnColors[random_no];
    gamePattern.push(color);
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
};

$(".btn").click(function (e) { 
    var colorPressed = $(this).attr("id");
    userPattern.push(colorPressed);
    playSound(colorPressed);
    animateBtn(colorPressed);
    checkAnswer(userPattern.length-1);
});

function checkAnswer(lastBtnPressed)
{
    if(userPattern[lastBtnPressed] == gamePattern[lastBtnPressed] )
    {
        if(userPattern.length == gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over"); 
        }, 100);
        startOver();
    }
}
function animateBtn(colorPressed)
{
    $("#" + colorPressed).addClass("pressed");
    setTimeout(function(){
        $("#" + colorPressed).removeClass("pressed");
    },100);
}
function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function startOver()
{
    $(".title").text("Game Over! Press any key to Restart");
    $("#startBtn").removeClass("hide");
    level = 0;
    started = false;
    gamePattern = [];
}
