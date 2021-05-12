'use strict';

import Utils from '../utilities/Utils.js';

export default class Filters {
    static recipesMatched = []; // result recipes that match
    static recipesMatchedSorted = []; // array containing the result, having removed duplicate recipes

    // search by input for ingredients/appliances/ustensils
    static search(collection, value) {
        if (Utils.isValid(value)) {
            this.searchInput(collection, value);

            return this.removeDuplicatesRecipes();
        }
    };

    // search by input for ingredients/appliances/ustensils
    static searchInput(collection, value) {
        collection.forEach(ing => {
            if (Utils.normalizeText(ing).includes(Utils.normalizeText(value))) {
                this.recipesMatched.push(ing);
            }
        });

        return this.recipesMatched;
    };

    // removed duplicate recipes
    static removeDuplicatesRecipes() {
        this.recipesMatchedSorted = [...new Set(this.recipesMatched)];

        return this.recipesMatchedSorted;
    };
}
