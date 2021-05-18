'use strict';

import Builder from './pages/RecipesBuilder.js';

import Ingredients from './search/Ingredients.js';
import Appliances from './search/Appliances.js';
import Ustensils from './search/Ustensils.js';

import Search from './search/Search.js';

import Utils from './utilities/Utils.js';
import DataLogic from './utilities/DataLogic.js';

// Build the recipes section by default
Builder.buildSection(recipesApiResult);
Ingredients.init(DataLogic.getAllIngredients(recipesApiResult), recipesApiResult);
Appliances.init(DataLogic.getAllAppliances(recipesApiResult), recipesApiResult);
Ustensils.init(DataLogic.getAllUstensils(recipesApiResult), recipesApiResult);

// Search Input
document.getElementById('searchBarInput').addEventListener('keyup', (key) => {
    let valueSearch = key.target.value;
    let mainContent = document.getElementById('mainContent');
    let result = Search.search(valueSearch);

    mainContent.innerHTML = '';
    if (Utils.isValid(valueSearch)) {
        if (result.recipesMatchedSorted.length === 0) {
            return Builder.buildResultMessageWithNoResult();
        }
        Builder
        .buildResultMessageWithResult(result.recipesMatchedSorted)
        .buildSection(result.recipesMatchedSorted);
        Ingredients.init(result.ingredients, result.recipesMatchedSorted);
        Appliances.init(result.appliances, result.recipesMatchedSorted);
        Ustensils.init(result.ustensils, result.recipesMatchedSorted);
    } else {
        Builder.removeResultMessage();
        mainContent.innerHTML = '';
        Builder.buildSection(recipesApiResult);
    }
});
