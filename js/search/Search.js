'use strict';

import Utils from '../utilities/Utils.js';
import DataLogic from '../utilities/DataLogic.js';

export default class Search {
    static recipes = recipesApiResult; // all recipes
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
    };

    static searchByName(value) {
        this.recipes.forEach(recipe => {
            if (Utils.normalizeText(recipe.name).includes(Utils.normalizeText(value))) {
                this.recipesMatched = [];
                this.recipesMatched.push(recipe);
            }
        })

        return this.recipesMatched;
    };

    static searchByDescription(value) {
        this.recipes.forEach(recipe => {
            if (Utils.normalizeText(recipe.description).includes(Utils.normalizeText(value))) {
                this.recipesMatched.push(recipe);
            }
        })

        return this.recipesMatched;
    };

    static searchByIngredients(value) {
        this.recipes.forEach(recipe => {
            if (recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(value))) {
                this.recipesMatched.push(recipe);
            }
        })

        return this.recipesMatched;
    };

    // removed duplicate recipes
    static removeDuplicatesRecipes() {
        this.recipesMatchedSorted = [...new Set(this.recipesMatched)];

        return this.recipesMatchedSorted;
    };

    // search by input for ingredients/appliances/ustensils
    static searchInputFilters(collection, value, matched, matchedSorted) {
        collection.forEach(elt => {
            if (Utils.normalizeText(elt).includes(Utils.normalizeText(value))) {
                matched.push(elt);
            }
        });

        return Utils.removeDuplicatesRecipes(matched, matchedSorted);
    };

    // search by click for ingredients in the ingredients area
    static searchFiltersIng(collection, matched, matchedSorted) {
        let filters = Utils.getFiltersWithClassActivated(); // get the elements holding the 'activated' class
        collection.forEach(recipe => {
            recipe.ingredients.forEach(ing => {
                if (Utils.normalizeText(ing.ingredient).includes(filters)) {
                    matched.push(recipe);
                }
            })
        });

        return Utils.removeDuplicatesRecipes(matched, matchedSorted);
    }

    // search by click for appliances in the ingredients area
    static searchFiltersApp(collection, matched, matchedSorted) {
        let filters = Utils.getFiltersWithClassActivated(); // get the elements holding the 'activated' class
        collection.forEach(recipe => {
            if (Utils.normalizeText(recipe.appliance).includes(filters)) {
                matched.push(recipe);
            }
        });

        return Utils.removeDuplicatesRecipes(matched, matchedSorted);
    }

    // search by click for ustensils in the ingredients area
    static searchFiltersUst(collection, matched, matchedSorted) {
        let filters = Utils.getFiltersWithClassActivated(); // get the elements holding the 'activated' class
        collection.forEach(recipe => {
            recipe.ustensils.forEach(ust => {
                if (Utils.normalizeText(ust).includes(filters)) {
                    matched.push(recipe);
                }
            })
        });

        return Utils.removeDuplicatesRecipes(matched, matchedSorted);
    }
}
