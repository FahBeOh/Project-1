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
            console.log(response);
            var displayGif = $("<img class='img-fluid mr-3 mb-3'>");
            $(".gifHolder").html(displayGif);
            displayGif.attr("src", response.data[0].images.fixed_width.url);
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
                $(".oxDef").html("I am sorry, but civilized people do not use such language.");
            }
        })
        .then(function (response) {
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

            console.log(response);
            console.log(response.list[0].definition);
            if (response.result_type === "exact"){
                alert("weiner");
            }
            $(".wordSearched").html(term.toUpperCase());

            $(".urbanDef").html("<b>Definition</b>: " + response.list[0].definition);

            $(".urbanEx").html("<b>Example</b>: " + response.list[0].example);

           
        })
        // Calling giphy api function
        giphy();

        //Erase text after user hits submit
        $("#user-input").val("");

    });
















});