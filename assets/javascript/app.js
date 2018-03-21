$(document).ready(function () {
    console.log("ready!");

   



    $(".urban").on("click", function (process) {

        $(".urbanDef").empty();

        //Disables the page to refresh itself
        process.preventDefault();

        //Targeting user input
        term = $("#user-input").val().trim();

        console.log(term);





        //Contact the API
        $.get(
            "http://api.urbandictionary.com/v0/define?term=" + term
        ).then(function (response) {


            console.log(response);
            console.log(response.list[0].definition);

            $(".userInput").html("Word searched: " + term);
            
            $(".urbanDef").html("Definition: " + response.list[0].definition);
          
            $(".urbanEx").html("Example: " + response.list[0].example);

        })

        //Erase text after user hits submit
        $("#user-input").val("");

       

       

    });


    













});