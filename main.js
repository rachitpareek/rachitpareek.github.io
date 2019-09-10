var words = ["Student.", "Sexyboi.", "cutiepie"];
var i = -1;

function randomWord() {

    setInterval(function () {

        i++

        var word = words[i];
        console.log(words[i])

        $("#random-word").fadeOut('fast', function () {
            $(this).html(word).fadeIn("fast");
        });
        
        if (i === 2) {
            i = -1;
        }

    }, 2000);
}

randomWord();