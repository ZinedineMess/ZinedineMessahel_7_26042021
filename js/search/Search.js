'use strict';

import RecipesBuilder from '../pages/RecipesBuilder.js';
import Utils from '../utilities/Utils.js';
import DataLogic from '../utilities/DataLogic.js';

export default class Search {
    static recipes = recipesApiResult; // all recipes
    static recipesMatched = []; // result recipes that match
    static recipesMatchedSorted = []; // array containing the result, having removed duplicate recipes

    static search(value) {
        if (Utils.isValid(value)) {
            this.searchPrincipal(value); 
            this.removeDuplicatesRecipes();
            RecipesBuilder.buildSection(this.recipesMatchedSorted); // build the section with the search result

            return {
                'recipesMatchedSorted': this.recipesMatchedSorted,
                'ingredients': DataLogic.getAllIngredients(this.recipesMatchedSorted),
                'appliances': DataLogic.getAllAppliances(this.recipesMatchedSorted),
                'ustensils': DataLogic.getAllUstensils(this.recipesMatchedSorted),
            };
        }
        this.recipesMatchedSorted = [];
        this.recipesMatched = [];
        RecipesBuilder.buildSection(this.recipes); // build the section with all recipes if there is no result
    };

    // search by input for name/description/ingredients
    static searchPrincipal(value) {
        this.searchByName(value);
        this.searchByDescription(value);
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
}