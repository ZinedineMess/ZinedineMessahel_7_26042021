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

    // search by tags for ingredients
    static searchByIngTags(recipes, tagIng) {
        let resultIng = [];

        recipes.forEach(recipe => {
            if (recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(tagIng))) {
                resultIng.push(recipe);
            }
        });

        return resultIng;
    }

    // search by tags for appliances
    static searchByAppTags(recipes, tagApp) {
        let resultApp = [];

        recipes.forEach(recipe => {
            if (Utils.normalizeText(recipe.appliance).includes(tagApp)) {
                resultApp.push(recipe);
            }
        });

        return resultApp;
    }

    // search by tags for ustensils
    static searchByUstTags(recipes, tagUst) {
        let resultUst = [];

        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ust => {
                if (Utils.normalizeText(ust).includes(tagUst)) {
                    resultUst.push(recipe);
                }
            });
        });

        return resultUst;
    }
}
