function formatIngredients(ingredList) {
    var tempstring = "<ul>";
    for (let [key, value] of Object.entries(ingredList[0])) {
        tempstring += `<li>${value} -- ${key}</li>`;
    }
    tempstring += "</ul>";
    return tempstring;
}

function formatInstructions(instrucList) {
    var tempstring = "<ol>";
    for (let [key, value] of Object.entries(instrucList[0])) {
        tempstring += `<li>${value}</li>`;
    }
    tempstring+="</ol>";
    return tempstring;
}

$(document).ready(function() {

    $(".card").click(function(e) {
        var card = $(e.target).parents(".card");
        //$("#leftside").html(card.children(".leftBody").html());
        //$("#rightside").html(card.children(".rightBody").html());
        //$(".modal-title").html(card.children(".leftBody").html());
        //$("#foodModal").modal('show');

        var cardID = card.getAttribute("id");
        var getUrl ="/api/recipes/id"+cardID;
        console.log(getUrl);
        $.ajax({url:getUrl,success:function(result){
          var ingredients = formatIngredients(result.ingredients);
          var instructions = formatIngredients(result.ingredients);
          $("#leftside").html(ingredients);
          $("#rightside").html(instructions);
          $(".modal-title").html(result.name);
          $("#foodModal").modal('show');
        },
        error:function(error){
          console.log(error);
        }
      });

    });

    $("#addRecipe").click(function(){
       $("#recipeInput").modal('show');
    });

    $("#searchbar").on('change paste keyup', function(){
        var term = $("#searchbar").val();
        var cards = document.getElementsByClassName("card h-100");
        console.log(term);
        for (let c of cards) {
            if (c.querySelectorAll(".card-title")[0].id.includes(term)) {
                $(c).show();
            } else {
                $(c).hide();
            }
        }
   });
});
