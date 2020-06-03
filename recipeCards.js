var cookbook = [{
    'name': 'BLT',
    'category': 'sandwich',
    'course': 'main',
    'description':'its a BLT',
    'ingredients': [{
        'bread': '2 slices',
        'bacon': 'by preference',
        'lettuce': 'by preference',
        'tomato': 'by preference',
        'mayo': 'by preference'
    }],
    'vegetarian': false,
    'instructions': [{
        '1': 'cook bacon to desired crispiness',
        '2': 'toast bread',
        '3': 'slice tomato',
        '4': 'make the sandwich man its not that hard'
    }]
},
{
    'name': 'BLT',
    'category': 'sandwich',
    'course': 'main',
    'description':'its a BLT',
    'ingredients': [{
        'bread': '2 slices',
        'bacon': 'by preference',
        'lettuce': 'by preference',
        'tomato': 'by preference',
        'mayo': 'by preference'
    }],
    'vegetarian': false,
    'instructions': [{
        '1': 'cook bacon to desired crispiness',
        '2': 'toast bread',
        '3': 'slice tomato',
        '4': 'make the sandwich man its not that hard'
    }]
},
{
    'name': 'BLT',
    'category': 'sandwich',
    'course': 'main',
    'description':'its a BLT',
    'ingredients': [{
        'bread': '2 slices',
        'bacon': 'by preference',
        'lettuce': 'by preference',
        'tomato': 'by preference',
        'mayo': 'by preference'
    }],
    'vegetarian': false,
    'instructions': [{
        '1': 'cook bacon to desired crispiness',
        '2': 'toast bread',
        '3': 'slice tomato',
        '4': 'make the sandwich man its not that hard'
    }]
},
{
    'name': 'BLT',
    'category': 'sandwich',
    'course': 'main',
    'description':'its a BLT',
    'ingredients': [{
        'bread': '2 slices',
        'bacon': 'by preference',
        'lettuce': 'by preference',
        'tomato': 'by preference',
        'mayo': 'by preference'
    }],
    'vegetarian': false,
    'instructions': [{
        '1': 'cook bacon to desired crispiness',
        '2': 'toast bread',
        '3': 'slice tomato',
        '4': 'make the sandwich man its not that hard'
    }]
},

{
    'name': 'BLT',
    'category': 'sandwich',
    'course': 'main',
    'description':'its a BLT',
    'ingredients': [{
        'bread': '2 slices',
        'bacon': 'by preference',
        'lettuce': 'by preference',
        'tomato': 'by preference',
        'mayo': 'by preference'
    }],
    'vegetarian': false,
    'instructions': [{
        '1': 'cook bacon to desired crispiness',
        '2': 'toast bread',
        '3': 'slice tomato',
        '4': 'make the sandwich man its not that hard'
    }]
},
{
    'name': 'JLT',
    'category': 'sandwich',
    'course': 'main',
    'description':'its a BLT',
    'ingredients': [{
        'bread': '2 slices',
        'bacon': 'by preference',
        'lettuce': 'a lot',
        'tomato': 'by preference',
        'mayo': 'by preference'
    }],
    'vegetarian': false,
    'instructions': [{
        '1': 'cook bacon to desired crispiness',
        '2': 'toast bread',
        '3': 'slice tomato',
        '4': 'make the sandwich man its not that hard'
    }]
},

{
    'name': 'BLT',
    'category': 'sandwich',
    'course': 'main',
    'description':'its a BLT',
    'ingredients': [{
        'bread': '2 slices',
        'bacon': 'by preference',
        'lettuce': 'by preference',
        'tomato': 'by preference',
        'mayo': 'by preference'
    }],
    'vegetarian': false,
    'instructions': [{
        '1': 'cook bacon to desired crispiness',
        '2': 'toast bread',
        '3': 'slice tomato',
        '4': 'make the sandwich man its not that hard'
    }]
},
{
    'name': 'CLT',
    'category': 'sandwich',
    'course': 'main',
    'description':'its a BLT',
    'ingredients': [{
        'bread': '2 slices',
        'bacon': 'by preference',
        'lettuce': 'a lot',
        'tomato': 'by preference',
        'mayo': 'by preference'
    }],
    'vegetarian': false,
    'instructions': [{
        '1': 'cook bacon to desired crispiness',
        '2': 'toast bread',
        '3': 'slice tomato',
        '4': 'make the sandwich man its not that hard'
    }]
}
];

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
    
    for(obj of cookbook){
        makeCard(obj);
    }
    
    
    $(".card").click(function(e) {
        var card = $(e.target).parents(".card");
        $("#leftside").html(card.data("datalist")[0]);
        $("#rightside").html(card.data("datalist")[1]);
        $(".modal-title").html(card.data("datalist")[2]);
        $("#foodModal").modal('show');
    });
    
    $("#addRecipe").click(function(){
       $("#recipeInput").modal('show'); 
    });

});