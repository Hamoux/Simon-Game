var gamePattern = [];
var userPattern = [];
let correct = true;
var level = 0;
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    userPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

    level++;
    $("#level-title").text("Level " + level);
}

$("div[type='button']").click(function() {
    if (userPattern.length < gamePattern.length) {
        var colorOfBtn = $(this).attr("id");
        $(this).addClass("pressed");

        userPattern.push(colorOfBtn);

        var audio = new Audio("sounds/" + colorOfBtn + ".mp3");
        audio.play();

        setTimeout(() => {
            $(this).removeClass("pressed");
        }, 100);
        checkAnswer(userPattern.length - 1);
    }
});

$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentIndex) {
    if (gamePattern[currentIndex] === userPattern[currentIndex]) {  
        if (userPattern.length === gamePattern.length) { 
            setTimeout(() => {
                nextSequence(); 
            }, 1000);
        }
    }  else {
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    gamePattern = [];
    userPattern = [];
    level = 0;
    started = false;
}



