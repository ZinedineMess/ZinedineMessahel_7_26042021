'use strict';

import Utils from '../utilities/Utils.js';

export default class Builder {
    // build the section containing the recipes to display
    static buildSection(collections) {
        return collections.forEach(collection => {
            this.buildRecipe(collection);
        });
    }

    // build each recipe
    static buildRecipe(collection) {
        let section = document.getElementById('mainContent');

        return section.appendChild(this.createArticleElt(collection));
    }

    // create the article which will contain the information of each recipe
    static createArticleElt(collection) {
        let article = document.createElement('article');
        let dataFilter = collection.ingredients.map(element => element.ingredient) + collection.ustensils + collection.appliance;

        article.classList.add('articleRecipes');
        article.setAttribute('data-filter', Utils.normalizeText(dataFilter));
        article.innerHTML = this.getArticleInnerHTML(collection);

        return article;
    }

    static getArticleInnerHTML(collection) {
        return `
            <img src='https://res.cloudinary.com/dlpyn3wxf/image/upload/v1619104039/img-recipes_tqi94t.png' alt='img' />
            <div class='recipeTitle'>
                <h2 class='recipeName'>${collection.name}</h2>
                <span class='recipeDuration'><i class='far fa-clock'></i>${collection.time} min</span>
            </div>
            <div class='recipeInfo'>
                <div class='recipeIngredients'>${collection.ingredients.map(elt => `
                    <p><b>${elt.ingredient} </b>:
                    ${ 'quantity' in elt ? elt.quantity : ''}
                    ${ 'unit' in elt ? elt.unit: ''}</p>`).join(' ')}
                </div>
                <div class='recipeInstructions'>
                    <span>${collection.description}</span>
                </div>
            </div>
        `;
    }
}
