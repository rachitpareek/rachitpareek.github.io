var words = ["Student.", "Developer.", "Entrepreneur."];
var i = -1;

function randomWord() {

    setInterval(function () {

        i++

        var word = words[i];
        console.log(words[i])

        $("#random-word").fadeOut('slow', function () {
            $(this).html(word).fadeIn("slow");
        });
        
        if (i === 2) {
            i = -1;
        }

    }, 3000);
}

randomWord();