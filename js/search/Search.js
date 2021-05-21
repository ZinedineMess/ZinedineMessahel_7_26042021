'use strict';

import Utils from '../utilities/Utils.js';
import DataLogic from '../utilities/DataLogic.js';

export default class Search {
    static recipesMatched = []; // result recipes that match
    static recipesMatchedSorted = []; // array containing the result, having removed duplicate recipes

    // allows you to search for recipes by name, description and ingredients
    static search(value) {
        this.searchPrincipal(value);
        this.removeDuplicatesRecipes();

        return {
            'recipesMatchedSorted': this.recipesMatchedSorted,
            'ingredients': DataLogic.getAllIngredients(this.recipesMatchedSorted),
            'appliances': DataLogic.getAllAppliances(this.recipesMatchedSorted),
            'ustensils': DataLogic.getAllUstensils(this.recipesMatchedSorted),
        };
    }

    // search by input for name/description/ingredients
    static searchPrincipal(value) {
        this.recipesMatched = []; // refresh recipesMatched
        this.searchByName(value) &&
            this.searchByDescription(value) &&
            this.searchByIngredients(value);
    }

    static searchByName(value) {
        recipesApiResult.forEach(recipe => {
            if (Utils.normalizeText(recipe.name).includes(Utils.normalizeText(value))) {
                this.recipesMatched = [];
                this.recipesMatched.push(recipe);
            }
        });

        return this.recipesMatched;
    }

    static searchByDescription(value) {
        recipesApiResult.forEach(recipe => {
            if (Utils.normalizeText(recipe.description).includes(Utils.normalizeText(value))) {
                this.recipesMatched.push(recipe);
            }
        });

        return this.recipesMatched;
    }

    static searchByIngredients(value) {
        recipesApiResult.forEach(recipe => {
            if (recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(value))) {
                this.recipesMatched.push(recipe);
            }
        });

        return this.recipesMatched;
    }

    // removed duplicate recipes
    static removeDuplicatesRecipes() {
        this.recipesMatchedSorted = [...new Set(this.recipesMatched)];

        return this.recipesMatchedSorted;
    }

    // search by input for ingredients/appliances/ustensils
    static searchInputFilters(collection, value) {
        let matched = [];
        collection.forEach(elt => {
            if (Utils.normalizeText(elt).includes(Utils.normalizeText(value))) {
                matched.push(elt);
            }
        });

        return matched;
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
}
