function generate() {


    var arr = []
    while (arr.length < 3) {
        var randomnumber = Math.ceil(Math.random() * 9)
        var found = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == randomnumber) { found = true; break }
        }
        if (!found) arr[arr.length] = randomnumber;
    }

    console.log(arr);

    var count = 10;
    $("#submit").click(function() {

        count--;
        $("#counter").html(count);
        if (count <= 0) {
            alert("Sorry You are out of turns" + "the numbers were   " + arr[0] + "  " + arr[1] + "  " + arr[2])
            document.location.reload(true);
        } else {

        }





        var val1 = $("#box1").val();
        var val2 = $("#box2").val();
        var val3 = $("#box3").val();
        var gen1 = (arr[0]);
        var gen2 = (arr[1]);
        var gen3 = (arr[2]);


        if (val1 == gen1) {

            $('#box1').removeClass('input-wrong-number')
            $('#box1').addClass('input-correct-number-correct-box');

        } else if (val1 == gen2 || val1 == gen3) {
            $('#box1').removeClass('input-wrong-number')
            $('#box1').addClass('input-correct-number-wrong-box');


        } else {

            $('#box1').addClass('input-wrong-number');

        }



        if (val2 == gen2) {
            $('#box2').removeClass('input-wrong-number')
            $('#box2').addClass('input-correct-number-correct-box');

        } else if (val2 == gen1 || val2 == gen3) {
            $('#box2').removeClass('input-wrong-number')
            $('#box2').addClass('input-correct-number-wrong-box');

        } else {

            $('#box2').addClass('input-wrong-number');

        }




        if (val3 == gen3) {
            $('#box3').removeClass('input-wrong-number')
            $('#box3').addClass('input-correct-number-correct-box');

        } else if (val3 == gen1 || val3 == gen2) {
            $('#box3').removeClass('input-wrong-number')
            $('#box3').addClass('input-correct-number-wrong-box');

        } else {

            $('#box3').addClass('input-wrong-number');

        }
        if (val1 == gen1 && val2 == gen2 && val3 == gen3) {
            alert("Congradulations you have Won!")
            document.location.reload(true);
        }

        else {

        }

    });
}

window.onload = function() {
    alert("Enter A number between 0 and 9.  You can only enter a number once.  If your number matches the number for that box, the box will turn green. If it matches a number from another box it will turn Yellow. If it doesn't match any numbers in the sequence the box will turn red. You have ten guesses.  ");

}




function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}


/*

 • A random three numbers sequence will be chosen, each between 0 and 9 
• None of the numbers in the sequence can be the same, so you could get 1 2 3, but not 1 2 2
• A button will be available to process the guess
• The user will be able to enter one guess per text box, and will have 10 total tries to guess the
sequence of three numbers
• If a number doesn’t match that box’s number, and doesn’t match any of the numbers in the
sequence, the box should be red
• If a number matches that box’s number, the box should be green
• If a number doesn’t match that box’s number, but does match one of the numbers in the
sequence, the box should be yellow
• Make sure these instructions are on the screen so users know the color values
• If the user wins, let them know, and give them the ability to start the game again
• If the user loses, let them know, and tell them what the numbers were, and the ability to start
the game again
• Each textbox should only allow numbers to be entered
• Only one character should be allowed to be entered into any field
• Add a ShareThis button to share the page
• Publish the page in a folder on GitHub pages, and link to it from a home page on GitHub pages
*/