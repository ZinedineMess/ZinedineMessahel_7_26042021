'use strict';

import DataLogic from '../utilities/DataLogic.js';
import Utils from '../utilities/Utils.js';

export default class Search {
    static searchMainInput(value) {
        let recipesMatched = [];

        recipesApiResult.forEach(recipe => {
            if (Utils.normalizeText(recipe.name).includes(Utils.normalizeText(value)) || Utils.normalizeText(recipe.description).includes(Utils.normalizeText(value)) || recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(value))) {
                recipesMatched.push(recipe);
            };
        });
        return {
            'recipesMatched': recipesMatched,
            'ingredients': DataLogic.getAllIngredients(recipesMatched),
            'appliances': DataLogic.getAllAppliances(recipesMatched),
            'ustensils': DataLogic.getAllUstensils(recipesMatched),
        };
    }

    // search by input for ingredients/appliances/ustensils
    static searchInputFilters(collection, value) {
        let resultInput = [];
        collection.forEach(elt => {
            if (Utils.normalizeText(elt).includes(Utils.normalizeText(value))) {
                resultInput.push(elt);
            };
        });

        return resultInput;
    }

    // search if the selected tag is in the recipes found in the recipe section
    static searchByTags() {
        let selected = Utils.getFiltersWithClassActivated();
        let matched = [];
        let notMatched = [];

        document.querySelectorAll("#mainContent > article").forEach(article => {
            if (Utils.normalizeText(article.getAttribute('data-filter')).includes(selected)) {
                matched.push(article);
            } else {
                notMatched.push(article);
            }
        });

        return {
            'show': matched,
            'hide': notMatched
        };
    }

    static showRecipesFiltered(elt) {
        return elt.forEach(e => {
            e.style.display = 'block';
        });
    }

    static hideRecipesFiltered(elt) {
        return elt.forEach(e => {
            e.style.display = 'none';
        });
    }
}
