'use strict';

import Ingredients from './filters/Ingredients.js';

export default class RecipesBuilder {
    static buildSection(recipes) {
        recipes.forEach(recipe => {
            this.buildRecipe(recipe);
        })
    }

    static buildRecipe(recipe) {
        let section = document.getElementById('mainContent');

        section.appendChild(this.createArticleElt(recipe));
    }

    static createArticleElt(recipe) {
        let article = document.createElement('article');
        let dataFilter = recipe.ingredients.map(element => element.ingredient) + recipe.ustensils + recipe.appliance;

        article.classList.add('article-recipes');
        article.setAttribute('data-filter', dataFilter);
        article.innerHTML = this.getArticleInnerHTML(recipe);
        
        return article;
    }

    static getArticleInnerHTML(recipe) {
        return `
            <img src="https://res.cloudinary.com/dlpyn3wxf/image/upload/v1619104039/img-recipes_tqi94t.png" alt="img" />
            <div class='recipeTitle'>
                <h2 class="recipeName">${recipe.name}</h2>
                <span class="recipeDuration"><i class="far fa-clock"></i>${recipe.time} min</span>
            </div>
            <div class="recipeInfo">
                <div class="recipeIngredients">${recipe.ingredients.map(element => `
                    <p><b>${element.ingredient} </b>:
                    ${ "quantity" in element ? element.quantity : ""}
                    ${ "unit" in element ? element.unit: ""}</p>`).join(" ")}
                </div>
                <div class="recipeInstructions">
                    <span>${recipe.description}</span>
                </div>
            </div>
        `;
    }
}
