var playing = false;
var score;
var livesLeft;
var step;
var action;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];

$(function(){    
    // Start/Reset button    
    $("#startreset").click(function(){
        // If we are playing
        if(playing == true){
            // Reload the page
            location.reload();
        }
        // If we are not playing
        else{
            // Change game mode
            playing = true;
            // Score will be 0
            score = 0;
            $("#scorevalue").html(score);
            // Show lives on the left side
            $("#livesLeft").show();
            livesLeft = 3;
            addHearts();
            // Hide gameOver box
            $("#gameOver").hide();
            // Change Start by Reset
            $("#startreset").html("Reset Game");
            // Start throw down of the fruits
            startAction();
        }
    });
    // Slice a fruit    
    $("#fruit1").mouseover(function(){
        score++;
        // Update score
        $("#scorevalue").html(score);
        // Play sounds two different way
        // document.getElementById("slice_sound").play();
        $("#slice_sound")[0].play();
        // Stop throw down of the fruits
        clearInterval(action);
        // Hide fruit after slicing
        $("#fruit1").hide("explode", 500);
        // Then throw down new fruit every 800ms
        setTimeout(startAction, 800);
    });
    
    // Functions
    // Fill livesLeft box with hearts
    function addHearts(){
        $("#livesLeft").empty();
        for(i = 0; i < livesLeft; i++){
            $("#livesLeft").append('<img src="Images/lives.png" class="life" alt="Heart" >');
        }
    }
    // Start throw down of the fruits
    function startAction(){
        // Generate new fruits
        $("#fruit1").show();
        // Choose random fruits
        chooseFruit();
        // At the random position
        $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
        // Generate random step(speed)
        step = 1+ Math.round(5*Math.random());
        // Move fruit down by one step every 10ms
        action = setInterval(function(){
            // Move fruit by one step
            $("#fruit1").css('top', $("#fruit1").position().top + step);
            // Check if the fruit is too low
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                // If we have heart left, then continue
                if(livesLeft > 1 ){
                    // Generate new fruit
                    $("#fruit1").show();
                    // Choose a random fruit
                    chooseFruit();
                    // Choose random position
                    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
                    // Generate a random step
                    step = 1+ Math.round(5*Math.random());
                    // Reduce lives by one
                    livesLeft --;
                    // Lose one fruit sound
                    $("#lose_sound")[0].play();
                    // Populate livesLeft box
                    addHearts();
                }
                // Game over
                else{
                    // We are not playing anymore
                    playing = false;
                    // Change button to "Start Game"
                    $("#startreset").html("Start Game");
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                    $("#livesLeft").hide();
                    stopAction();
                    // final_lose_sound
                    $("#final_lose_sound")[0].play();
                }
            }
        }, 10);
    }
    // Generate a random fruit
    function chooseFruit(){
        $("#fruit1").attr('src', 'Images/' + '/Fruits/' + fruits[Math.round(8*Math.random())] +'.png');
        // $("#fruit1").attr('src' , 'Images/' + '/Fruits/' + fruits[0] +'.png');
    }
    // Stop throw down of the fruits
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
        // $("#livesLeft").hide();
    }
});