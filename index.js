$(document).ready(function() {
    buttonColors = ["red", "blue", "green", "yellow"];
    gamePattern = [];
    userClickedPattern = [];

    isGameOn = false;
    isGameOver = false;
    level = 0;

    //start the game when the user presses the key "A"
    $(document).keypress(function(event){
        if(event.key == "a" && !isGameOn){
            isGameOn = true;
            nextSequence();
            $("h1").text("Level " + level);
        }
        if(isGameOver){
            startOver();
        }
    });
    
    // generate a random number between 0 and 3 and use it to pick a random color from the buttonColors array.
    function nextSequence(){
        var randomNumber = new Number(Math.round(Math.random() * 3));
        gamePattern.push(buttonColors[randomNumber]);

        playSound(buttonColors[randomNumber]);
        animatePress(buttonColors[randomNumber]);

        level++;
        console.log("gamePattern:" + gamePattern)
    }

    // detect when any of the buttons are clicked and trigger a handler function.
    $(".btn").on("click", handleClick);
    function handleClick(){
       userChosenColor = $(this).attr("id");
       playSound(userChosenColor);
       animatePress(userChosenColor);
       
       userClickedPattern.push(userChosenColor);
       console.log("user:"+userClickedPattern+"\nright:"+gamePattern)
       checkAnswer(userChosenColor, userClickedPattern.length);
    }
    
    function playSound(currentColor){
        var audio = new Audio("./sounds/"+currentColor+".mp3");
        audio.play();
    }
    
    function animatePress(currentColor){
        $("#"+currentColor).fadeOut(100).fadeIn(100);
    }

    function checkAnswer(userChosenColor,currentLevel) {
        if(userChosenColor == gamePattern[currentLevel - 1]){
            if(userClickedPattern.length == gamePattern.length){
                userClickedPattern = [];
                setTimeout(function(){
                    $("h1").text("Level " + level);
                    nextSequence();
                }, 1000);
            }
        } else {
            isGameOver = true;
            $("h1").text("Game Over, Press Any Key to Restart")
            playSound("wrong");
            $("body").addClass("game-over");
        }
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        isGameOn = false;
        isGameOver = false;
        $("body").removeClass("game-over");
        $("h1").text("Press A Key to Start");
    }
    
});