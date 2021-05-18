'use strict';

import Utils from '../utilities/Utils.js';
import Search from './Search.js';
import RecipesBuilder from '../pages/RecipesBuilder.js';

export default class Ingredients {
    static ingredientsExample = document.getElementById('ingredientsExample');
    static recipesMatched = []; // result recipes that match
    static recipesMatchedSorted = []; // array containing the result, having removed duplicate recipes
    static ingredientBadges = document.querySelector("#ingredientBadges");

    static init(ingredients, collection) {
        Utils.launcherInput(document.querySelector("#ingredients > button"),
            document.querySelector("#openIngredientsFilter"),
            document.querySelector("#closeIngredientsFilter"),
            document.querySelector("#hiddenIngredientsFilter"));
        this.ingredientsExample.innerHTML = [];
        this.displayIngredients(Utils.sortByTitle(ingredients));
        this.searchInput(ingredients);
        this.giveTheClassActivatedOnClick(collection);
    };

    // display the ingredients in the ingredients zone according to the recipes displayed in the 'recipes' section
    static displayIngredients(ingredients) {
        ingredients.forEach((ingredient) => {
            let listIngredients = document.createElement('li');

            listIngredients.innerHTML = `${Utils.upperText(ingredient)}`
            this.ingredientsExample.appendChild(listIngredients);
            listIngredients.classList.add('list-ingredients');
            listIngredients.setAttribute('data-filter', `${ingredient}`);
        });
    };

    // allows to search for the ingredients in the input from the ingredients present in the recipes displayed
    static searchInput(ingredients) {
        document.getElementById('inputIngredients').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;
            if (Utils.isValid(valueSearch)) {
                this.ingredientsExample.innerHTML = [];
                this.recipesMatched = [];
                return this.displayIngredients(Search.searchInputFilters(ingredients, valueSearch, this.recipesMatched, this.recipesMatchedSorted));
            }
            this.ingredientsExample.innerHTML = [];
            return this.displayIngredients(Utils.sortByTitle(ingredients));
        });
    };

    // gives the class 'activated' when an ingredient is clicked and filters
    static giveTheClassActivatedOnClick(collection) {
        this.ingredientsExample.addEventListener('click', event => {
            let classValue = event.target.classList.value;
            let mainContent = document.getElementById('mainContent');

            if (-1 === classValue.indexOf('activated')) {
                event.target.classList.add('activated');
                mainContent.innerHTML = '';
                RecipesBuilder.buildSection(Search.searchFiltersIng(collection, this.recipesMatched, this.recipesMatchedSorted));
                RecipesBuilder.buildTags(this.ingredientBadges, Utils.upperText(event.target.getAttribute('data-filter')))
            } else {
                event.target.classList.remove('activated');
                mainContent.innerHTML = '';
                RecipesBuilder.buildSection(recipesApiResult);
                RecipesBuilder.removeTag(this.ingredientBadges);
            }
        });
    };
}
