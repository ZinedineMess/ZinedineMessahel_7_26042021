'use strict';
/////////////////////////////////////////

import Recipes from "./Recipes.js"

export default class SearchBox {
    search(data) {
        let searchBar = document.getElementById('search-bar-input');

        searchBar.addEventListener('keyup', (key) => {
            let recipesSection = document.getElementById('recipes');
            let valueInput = key.target.value.toLowerCase();

            if (valueInput.length >= 3) {
                let filteredRecipes = data.filter((recipe) => {
                    return (
                        recipe.name.toLowerCase().includes(valueInput) ||
                        recipe.ingredients.some(elt => elt.ingredient.toLowerCase().includes(valueInput)) ||
                        recipe.description.toLowerCase().includes(valueInput) ||
                        recipe.appliance.toLowerCase().includes(valueInput) ||
                        recipe.ustensils.some(elt => elt.toLowerCase().includes(valueInput))
                    )
                })
                recipesSection.innerHTML = "";
                new Recipes().displayRecipes(filteredRecipes);
                this.showMessageInfo(filteredRecipes, recipesSection);
            } else {
                recipesSection.innerHTML = "";
                new Recipes().displayRecipes(data);
            }
        });
    }

    showMessageInfo(filteredRecipes, recipesSection) {
        let messageInfoNoRecipe = document.getElementById('message-info-no-recipe');
        let messageInfoResult = document.getElementById('message-info-result-search');
        let resultSearchRecipe = parseInt(filteredRecipes.length);
        let messageTemplate = `
        <span>Nombre de recette(s) trouvée(s) suite à votre recherche : ${resultSearchRecipe}</span>
        <i class="far fa-times-circle"></i>
        `;

        if (filteredRecipes.length <= 0) {
            messageInfoNoRecipe.style.display = 'flex';
            messageInfoResult.style.display = 'none';
        } else {
            messageInfoResult.innerHTML = messageTemplate;
            messageInfoResult.style.display = 'flex';
            messageInfoNoRecipe.style.display = 'none';
            recipesSection.innerHTML = "";
            new Recipes().displayRecipes(filteredRecipes);
        }
    }
}
