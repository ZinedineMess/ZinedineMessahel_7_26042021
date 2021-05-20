'use strict';

import Utils from '../utilities/Utils.js';
import Search from './Search.js';
import RecipesBuilder from '../pages/RecipesBuilder.js';
import Badges from '../pages/Badges.js';
import Message from '../pages/Messages.js';

export default class Ingredients {
    static ingredientsExample = document.getElementById('ingredientsExample');
    static ingredientBadges = document.querySelector("#ingredientBadges");

    static init(ingredients) {
        Utils
            .launcherInput(document.querySelector("#ingredients > button"),
                document.querySelector("#openIngredientsFilter"),
                document.querySelector("#closeIngredientsFilter"),
                document.querySelector("#hiddenIngredientsFilter"))
            .clearFilters(this.ingredientsExample);
        this.displayIngredients(Utils.sortByTitle(ingredients));
        this.searchInput(ingredients);
        this.giveTheClassActivatedOnClick();
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
                Utils.clearFilters(this.ingredientsExample);
                return this.displayIngredients(Search.searchInputFilters(ingredients, valueSearch));
            }
            Utils.clearFilters(this.ingredientsExample);
            return this.displayIngredients(Utils.sortByTitle(ingredients));
        });
    };

    static giveTheClassActivatedOnClick() {
        this.ingredientsExample.addEventListener('click', event => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('activated')) {
                event.target.classList.add('activated');
                this.filterTags();
                Badges.buildTags(this.ingredientBadges, Utils.upperText(event.target.getAttribute('data-filter')));
                Message.removeResultMessage();
                return;
            }
            event.target.classList.remove('activated');
            Utils.clearRecipesSection();
            Badges.removeTag(this.ingredientBadges);
            RecipesBuilder.buildSection(recipesApiResult);
            return;
        });
    };

    static filterTags() {
        let resultFilters = Search.filters();
        this.show(resultFilters.show);
        this.hide(resultFilters.hide);
    };

    static show(elt) {
        elt.forEach(s => {
            s.style.display = 'block';
        });
    }

    static hide(elt) {
        return elt.forEach(h => {
            h.style.display = 'none';
        });
    }
}
