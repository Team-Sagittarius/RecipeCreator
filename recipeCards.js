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

function makeCard(recipeObj){
    var name = recipeObj.name;
    var category = recipeObj.category;
    var course = recipeObj.course;
    var ingredients = recipeObj.ingredients;
    var vegetarian = recipeObj.vegetarian;
    var instructions = recipeObj.instructions;
    var description = recipeObj.description;

    var newCard = `<div class="col-md-6 col-lg-4 col-xl-3 py-2"><div class="card h-100"><img class="card-img-top img-fluid" src="//placehold.it/500x280" alt="Card image cap"><div class="card-block"><h4 class="card-title">${name}</h4><p class="card-text">`+ description +`</p>`+
    `<p class="card-text"><small class="text-muted">Vegetarian:`;

    if (vegetarian){
        newCard += `  <i class="far fa-check-circle" style="color:green"></i>`;
    }
    else{
        newCard +=`  <i class="far fa-times-circle" style="color:red"></i>`;
    }

    newCard+=`</small></p></div></div></div>`;



    var leftBody = formatIngredients(ingredients);
    var rightBody = formatInstructions(instructions);

    $('#cardrow').append(newCard);

    var lastCard = $(".card").last();
    lastCard.data("datalist",[leftBody,rightBody,name]);
}

$(document).ready(function() {

    $(".card").click(function(e) {
        var card = $(e.target).parents(".card");
        $("#leftside").html(card.children(".leftBody").html());
        $("#rightside").html(card.children(".rightBody").html());
        $(".modal-title").html(card.children(".leftBody").html());
        $("#foodModal").modal('show');
    });

    $("#addRecipe").click(function(){
       $("#recipeInput").modal('show');
    });

});
