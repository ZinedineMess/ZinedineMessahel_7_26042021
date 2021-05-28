'use strict';

import Buttons from '../page/Buttons.js';
import Messages from '../page/Messages.js';
import Search from '../search/Search.js';
import Tags from '../page/Tags.js';
import Utils from '../utilities/Utils.js';

export default class Ingredients {
    static ingredientsExample = document.getElementById('ingredientsExample');

    static init(ingredients, recipes) {
        Utils.clearFilters(this.ingredientsExample);
        Buttons.launchButtons(document.querySelector("#ingredients > button"),
            document.querySelector("#openIngredientsFilter"),
            document.querySelector("#closeIngredientsFilter"),
            document.querySelector("#hiddenIngredientsFilter"));
        this.fillIngredients(Utils.sortByTitle(ingredients));
        this.filterByTags(recipes);
        this.searchInput(ingredients, recipes);
        return this;
    }

    // display the ingredients in the ingredients zone according to the recipes displayed in the 'recipes' section
    static fillIngredients(ingredients) {
        ingredients.forEach((ingredient) => {
            let listIngredients = document.createElement('li');

            listIngredients.innerHTML = `${Utils.upperText(ingredient)}`
            this.ingredientsExample.appendChild(listIngredients);
            listIngredients.classList.add('list-ingredients');
            listIngredients.setAttribute('data-filter', `${ingredient}`);
        });
    }

    // allows to search for the ingredients in the input from the ingredients present in the recipes displayed
    static searchInput(ingredients) {
        document.getElementById('inputIngredients').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;
            Utils.clearFilters(this.ingredientsExample);
            this.fillIngredients(
                Utils.isValid(valueSearch) ?
                Search.searchInputFilters(ingredients, valueSearch) :
                Utils.sortByTitle(ingredients));
        });
    }

    // gives the activated class to the selected tag and searches if it is present in the recipes
    static filterByTags(recipes) {
        let ingredientTag = document.getElementById('ingredientTag');

        document.querySelector('#ingredientsExample').addEventListener('click', (event) => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('selected')) {
                event.target.classList.add('selected');
                Buttons.hideButtonsOnClick(document.querySelector("#ingredients > button"),
                    document.querySelector("#openIngredientsFilter"),
                    document.querySelector("#hiddenIngredientsFilter"))
                Tags
                    .buildTags(ingredientTag, Utils.upperText(event.target.getAttribute('data-filter')))
                    .removeTagsOnClick(document.querySelector("#ingredientTag > i"), event, ingredientTag, recipes);
                this.searchAndDisplayRecipesFiltered();
                return;
            } else {
                Tags.resetSection(event, ingredientTag, recipes);
            };
        });
        return this;
    }

    static searchAndDisplayRecipesFiltered() {
        let resultFilters = Search.searchByTags();

        Messages.buildResultMessageWithResult(resultFilters.show);
        Utils.showRecipesFiltered(resultFilters.show);
        Utils.hideRecipesFiltered(resultFilters.hide);
    }
}
