$( document ).ready(function() {
    console.log( "ready!" );

    //Here is the user input word
    var term;


    //Contact the API
    $.get(
        "http://api.urbandictionary.com/v0/define?term=" + term
      ).done(function (response) {
  
        console.log(response);
  
       
      });











});