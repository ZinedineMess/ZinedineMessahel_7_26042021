'use strict';

import Appliances from '../filters/Appliances.js';
import DataLogic from '../utilities/DataLogic.js';
import DomService from './DomService.js';
import Ingredients from '../filters/Ingredients.js';
import Messages from './Messages.js';
import Ustensils from '../filters/Ustensils.js';

export default class Builder {
    static init() {
        // Build Section with all Recipes before Search
        DomService.buildResult(recipesApiResult);
        Messages.hideMessage();
        // Ingredients logic
        Ingredients.init(DataLogic.getAllIngredients(recipesApiResult), recipesApiResult);
        // Appliances logic
        Appliances.init(DataLogic.getAllAppliances(recipesApiResult), recipesApiResult);
        // Ustensils logic
        Ustensils.init(DataLogic.getAllUstensils(recipesApiResult), recipesApiResult);
    }

    static initSearch(result) {
        // Build Section after Search
        DomService.buildResult(result.recipesMatched);
        Messages.buildResultMessageWithResult(result.recipesMatched);
        // Ingredients logic
        Ingredients.init(result.ingredients, result.recipesMatched);
        // Appliances logic
        Appliances.init(result.appliances, result.recipesMatched);
        // Ustensils logic
        Ustensils.init(result.ustensils, result.recipesMatched);
    }
}
