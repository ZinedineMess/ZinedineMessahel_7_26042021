'use strict';
/////////////////////////////////////////

export default class Recipes {
    displayRecipes(data) {
        data.forEach(recipe => {
            let sectionRecipe = document.getElementById('recipes');
            let articleRecipe = document.createElement("article");
            let recipesTemplate = `
            <img src="https://res.cloudinary.com/dlpyn3wxf/image/upload/v1619104039/img-recipes_tqi94t.png" alt="img" />
            <div class='recipe-title'>
            <h2 class="name">${recipe.name}</h2>
            <span class="duration"><i class="far fa-clock"></i>${recipe.time} min</span>
            </div>
            <div class="recipes-info">
            <div class="recipes-ingredients">${recipe.ingredients.map(element => `
                <p><b>${element.ingredient} </b>:
                ${ "quantity" in element ? element.quantity : ""}
                ${ "unit" in element ? element.unit: ""}</p>`).join(" ")}
            </div>
            <div class="recipes-instructions">
                <span>${recipe.description}</span>
            </div>        
        </div>
            </div>
            `
            articleRecipe.innerHTML = recipesTemplate;
            sectionRecipe.appendChild(articleRecipe);
        })
    }
}
