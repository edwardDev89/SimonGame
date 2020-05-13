// variables
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var randomChosenColor;
var level = 0;
var start = false;

$("h1").click(function(){
    if (!start)
    {
        $("h1").text("Level "+ level);
        nextSequence();
        start = true;
    }   
})

$(".btn").click(function(e){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playAudio(userChosenColour);
    animatedPress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    //initialize 
    userClickedPattern=[];  

    level++;
    $("h1").text("Level " + level);   
    var randomNumber = Math.floor(Math.random()* 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playAudio(randomChosenColor);                                                                                                                                                                                                              
    $("#"+ randomChosenColor).fadeOut(250).fadeIn(250);   
}

function playAudio(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatedPress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(() => {
        $("."+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLvl){
    if(gamePattern[currentLvl] == userClickedPattern[currentLvl])
    {
        if(gamePattern.length == userClickedPattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 1000);    
        }                     
    }
    else
    {
        $("body").addClass("game-over");
        playAudio("wrong");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Wrong Color!<br/>Click here to Restart!");
        startOver();
}
}

function startOver(){
        start = false;
        level = 0;
        gamePattern = [];
}
