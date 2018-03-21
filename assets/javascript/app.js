$( document ).ready(function() {
    console.log( "ready!" );

    //Here is the user input word
    
   
   
    $(".urban").on("click", function(process){

        process.preventDefault();

        term = $("#user-input").val().trim();

        console.log(term);

       

    //Contact the API
    $.get(
        "http://api.urbandictionary.com/v0/define?term=" + term
      ).then(function (response) {
        
  
        console.log(response);

        
            
           

          })
          $("#user-input").val("");
       
      });
    

     











});