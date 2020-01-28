$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p class= 'news' data-id='" + data[i]._id + "'>" + data[i].headline + "</p>");
  }
});

$(document).on("click", "p", function () {

    var thisId = $(this).attr("data-id");
    
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    }).then(function(data){
      console.log(data);
      // The title of the article
      $("#note").append("<h2>" + data.headline + "</h2>" +  "<form>" + "<input id='titleinput' name='title' >" + 
      "<textarea id='bodyinput' name='body'></textarea>" + "<button data-id='" + data._id + "' id='addcomment'>Add Comment</button>"
       + "</form>");
      
      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });

    $(document).on("click", "#addcomment", function() {
      // Grab the id associated with the article from the submit button
      var thisId = $(this).attr("data-id");
    
      // Run a POST request to change the note, using what's entered in the inputs
      $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          // Value taken from title input
          title: $("#titleinput").val(),
          // Value taken from note textarea
          body: $("#bodyinput").val()
        }
      })
        // With that done
        .then(function(data) {
          // Log the response
          console.log(data);
          // Empty the notes section
          $("#notes").empty();
        });
    
      // Also, remove the values entered in the input and textarea for note entry
      $("#titleinput").val("");
      $("#bodyinput").val("");
    });
    

});

