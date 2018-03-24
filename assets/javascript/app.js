$(document).ready(function () {
    console.log("ready!");

    // Function for "get" giphy Api and displying it to page
    function giphy() {
        var apiKey = "eAFKeOjlTldUvzjggovAVPjRKowwoyai";
        var queryURL = "https://api.giphy.com/v1/gifs/random?rating=g&tag=" + term + "&api_key=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            var displayGif = $("<img class='img-fluid mr-3 mb-3'>");
            $(".gifHolder").html(displayGif);
            displayGif.attr("src", response.data.images.fixed_width.url);
        })
    }

    $(".urban").on("click", function (process) {

        $(".urbanDef").empty();

        //Disables the page to refresh itself
        process.preventDefault();

        //Targeting user input
        term = $("#user-input").val().trim();

        console.log(term);

        var url = 'https://newsapi.org/v2/top-headlines?' +
            'q=' + term + '&' +
            'from=2018-03-24&' +
            'sortBy=popularity&' +
            'apiKey=ed60c9f213c14312a011b71f6ecc7d29';

        var req = new Request(url);

        fetch(req)
            .then(function (response) {
                console.log(response.json());
                console.log("articles: "+response.json().articles);
            })

            // $(".articles").html()

        //Contact the API
        $.get(
            "https://api.urbandictionary.com/v0/define?term=" + term
        ).then(function (response) {

            console.log(response);
            console.log(response.list[0].definition);

            $(".userInput").html("<b>Word searched</b>: " + term);

            $(".urbanDef").html("<b>Definition</b>: " + response.list[0].definition);

            $(".urbanEx").html("<b>Example</b>: " + response.list[0].example);
        })
        // Calling giphy api function
        giphy();

        //Erase text after user hits submit
        $("#user-input").val("");

    });
















});