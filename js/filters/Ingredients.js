'use strict';

import Buttons from '../page/Buttons.js';
import DomService from '../page/DomService.js';
import Messages from '../page/Messages.js';
import Search from '../search/Search.js';
import Tags from '../page/Tags.js';
import Utils from '../utilities/Utils.js';

export default class Ingredients {
    static ingredientsExample = document.getElementById('ingredientsExample');

    static init(ingredients) {
        Utils.clearFilters(this.ingredientsExample);
        Buttons.launchButtons(document.querySelector("#ingredients > button"),
            document.querySelector("#openIngredientsFilter"),
            document.querySelector("#closeIngredientsFilter"),
            document.querySelector("#hiddenIngredientsFilter"));
        this.fillIngredients(Utils.sortByTitle(ingredients));
        this.searchInput(ingredients);
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
            if (Utils.isValid(valueSearch)) {
                Utils.clearFilters(this.ingredientsExample);
                return this.fillIngredients(Search.searchInputFilters(ingredients, valueSearch));
            }
            Utils.clearFilters(this.ingredientsExample);
            return this.fillIngredients(Utils.sortByTitle(ingredients));
        });
    }

    static filterTags(recipes) {
        let selected = [];
        let ingredientTag = document.getElementById('ingredientTag');

        document.querySelectorAll('.list-ingredients').forEach(filter => {
            filter.addEventListener('click', (event) => {
                let classValue = event.target.classList.value;

                if (-1 === classValue.indexOf('selected')) {
                    event.target.classList.add('selected');
                    selected.push(event.target.getAttribute('data-filter'));
                    Buttons.hideButtonsOnClick(document.querySelector("#ingredients > button"),
                        document.querySelector("#openIngredientsFilter"),
                        document.querySelector("#hiddenIngredientsFilter"))
                    Tags
                        .buildTags(ingredientTag, Utils.upperText(event.target.getAttribute('data-filter')))
                        .removeTagsOnClick(document.querySelector("#ingredientTag > i"), event, ingredientTag, recipes);
                    Messages.buildResultMessageWithResult(Search.searchByIngTags(recipes, selected));
                    Utils.clearRecipesSection();
                    DomService.buildResult(Search.searchByIngTags(recipes, selected));
                } else {
                    selected.splice(event.target.getAttribute('data-filter'));
                    Tags.resetSection(event, ingredientTag, recipes);
                };
            });
        });
        return selected;
    }
}
