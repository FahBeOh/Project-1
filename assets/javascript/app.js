$(document).ready(function () {
    console.log("ready!");

    // Function for "get" giphy Api and displying it to page
    function giphy() {
        var apiKey = "eAFKeOjlTldUvzjggovAVPjRKowwoyai";
        var queryURL = "https://api.giphy.com/v1/gifs/search?limit=1&q=" + term + "&api_key=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var gifDiv = $(".gifHolder");
            var gifImage = $("<img class='img-fluid mr-3 mb-3'>");
            // Error handling
            if (response.data.length === 0){
                console.log(response);
                gifDiv.empty();
                gifDiv.append(gifImage);
                gifImage.attr("src", "https://media.giphy.com/media/7hvkctkRc3Q6Q/giphy.gif")
            } else {            
                gifDiv.empty();
                gifDiv.append(gifImage);
                gifImage.attr("src", response.data[0].images.fixed_width.url)
            }
        })
    }

    $(".urban").on("click", function (process) {

        $(".urbanDef").empty();
        $(".oxDef").empty();

        //Disables the page to refresh itself
        process.preventDefault();

        //Targeting user input
        term = $("#user-input").val().trim();

        console.log(term);

        var queryURL = "https://od-api.oxforddictionaries.com:443/api/v1/entries/en/" + term;
        var headers = {
            "Accept": "application/json",
            "app_id": "cdea9fcf",
            "app_key": "231e68a13c654e57183097636ce5f12d"
        };

        $.ajaxPrefilter(function (options) {
            if (options.crossDomain && $.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
        });

        $.ajax({
            url: queryURL,
            method: "GET",
            headers: headers,
            error: function(e){
                var peopleTalk = $(".oxDef");
                var displayError = $("<img class='img-fluid mr-3 mb-3'>");
                displayError.attr("src", "assets/images/pinky.png");
                peopleTalk.html(displayError);
                peopleTalk.append("<br>");
                peopleTalk.append("<p style='color:red;'>Civilzed people don't use such LANGUAGE!</p>");
            }
        }).then(function (response) {
            console.log(response);
            console.log(response.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
            $(".oxDef").html("<b>Definition: </b>" + response.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
        })

        //Contact the API
        $.ajax({
            url: "https://api.urbandictionary.com/v0/define?term=" + term,
            method: "GET",
            headers: headers,
        }).then(function (response) {
            var hipsterTalk = $(".urbanWrapper");
            var hipsterError = $("<img class='img-fluid mr-3 mb-3'>");
            var searchTerm = $(".wordSearched");
            var defDiv = $("<div class='urbanDef'>");
            var exDiv = $("<div class='urbanEx'>");
            // Error handling
            if (response.result_type !== "exact"){
                console.log(response);

                searchTerm.empty();
                hipsterError.attr("src", "assets/images/sponge.jpg");
                hipsterTalk.html(hipsterError);
                hipsterTalk.append("<br>");
                hipsterTalk.append("<p style='color:red;'>Bro, I'm not picking up what you're putting down..</p>");;
            } else {            
                console.log(response);
                console.log(response.list[0].definition);

                hipsterTalk.empty();
                searchTerm.html(term.toUpperCase());
                defDiv = $("<div class='urbanDef'>");
                hipsterTalk.append(defDiv);
                defDiv.html("<b>Definition</b>: " + response.list[0].definition);
                exDiv = $("<div class='urbanEx'>");
                hipsterTalk.append(exDiv);
                exDiv.html("<b>Example</b>: " + response.list[0].example);
            }
        })
        // Calling giphy api function
        giphy();

        //Erase text after user hits submit
        $("#user-input").val("");
    });
});