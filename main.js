var words = ["Student.", "Developer.", "Entrepreneur."];
var i = 0;

function wordCycler() {
    setInterval(function () {
        var word = words[i];
        $("#random-word").fadeOut('slow', function () {
            $(this).html(word).fadeIn("slow");
        });
        i = (i+1)%3
    }, 3000);
}

wordCycler();