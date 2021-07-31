var buttonColor = ["green", "red", "yellow", "blue"];
var level = 0;
var gamePressedButton = [];
var userPressedButton = [];

$("body").keypress(function() {
    if(level === 0) {
        nextSequence();
    }
});

$(".btn").click(function() {
    var clickedButton = $(this).attr("id");
    userPressedButton.push(clickedButton);

    playSound(clickedButton);

    animation(clickedButton);

    matchSequence(userPressedButton.length-1);
})

function matchSequence(l) {
    if(userPressedButton[l] === gamePressedButton[l]) {
        if(userPressedButton.length === gamePressedButton.length) {
            setTimeout(function() {
                nextSequence();
            }, 800);
            
        }
    } else {
        playSound("wrong");

        $("#level-title").text("Game Over, press any key to start");
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);

        level=0;
        gamePressedButton = [];
    }
}

function nextSequence() {
    level++;
    userPressedButton = [];
    $("#level-title").text("Level "+level);
    var randomValue = Math.floor(Math.random()*4);
    var randomColor = buttonColor[randomValue];
    gamePressedButton.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomColor);

    animation(randomColor);
}

function playSound(value) {
    var soundPlay = new Audio("sounds/"+value+".mp3");
    soundPlay.play();
}

function animation(btn) {
    $("#"+btn).addClass("pressed");
    setTimeout(function() {
        $("#"+btn).removeClass("pressed");
    }, 200);
    
}


