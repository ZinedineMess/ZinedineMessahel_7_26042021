'use strict';

import Builder from './pages/RecipesBuilder.js';
import Ingredients from './search/Ingredients.js';
import Appliances from './search/Appliances.js';
import Ustensils from './search/Ustensils.js';
import Search from './search/Search.js';
import Utils from './utilities/Utils.js';
import DataLogic from './utilities/DataLogic.js';
import Message from './pages/Messages.js';

// Build by default without search
Builder.buildSection(recipesApiResult);
Ingredients.init(DataLogic.getAllIngredients(recipesApiResult));
Appliances.init(DataLogic.getAllAppliances(recipesApiResult));
Ustensils.init(DataLogic.getAllUstensils(recipesApiResult));

// Build with search Input
document.getElementById('searchBarInput').addEventListener('keyup', (key) => {
    let valueSearch = key.target.value;
    let result = Search.search(valueSearch);

    Utils.clearRecipesSection();

    if (Utils.isValid(valueSearch)) {
        if (result.recipesMatchedSorted.length === 0) {
            return Message.buildResultMessageWithNoResult();
        };
        Utils.clearRecipesSection();
        Message.buildResultMessageWithResult(result.recipesMatchedSorted);
        Builder.buildSection(result.recipesMatchedSorted);
        Ingredients.init(result.ingredients); // Ingredients logic
        Appliances.init(result.appliances); // Appliances logic
        Ustensils.init(result.ustensils); // Ustensils logic
    } else {
        Utils.clearRecipesSection();
        Message.removeResultMessage();
        Builder.buildSection(recipesApiResult);
    }
});
