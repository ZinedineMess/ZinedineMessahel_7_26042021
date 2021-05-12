'use strict';

import RecipesBuilder from './pages/RecipesBuilder.js';
import DataLogic from './utilities/DataLogic.js';

import Search from './search/Search.js';

import Ingredients from './search/Ingredients.js';
import Appliances from './search/Appliances.js';
import Ustensils from './search/Ustensils.js';


// Build the recipes section by default
RecipesBuilder.buildSection(recipesApiResult);

Ingredients.init(DataLogic.getAllIngredients());
Ingredients.filter(DataLogic.getAllIngredients());

Appliances.init(DataLogic.getAllAppliances());
Appliances.filter(DataLogic.getAllAppliances());

Ustensils.init(DataLogic.getAllUstensils());
Ustensils.filter(DataLogic.getAllUstensils());

// Search Input
document.getElementById('searchBarInput').addEventListener('keyup', (key) => {
    let valueSearch = key.target.value;
    let mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '';

    let result = Search.search(valueSearch);

    Ingredients.init(result.ingredients);
    Ingredients.filter(result.ingredients);

    Appliances.init(result.appliances);
    Appliances.filter(result.appliances);

    Ustensils.init(result.ustensils);
    Ustensils.filter(result.ustensils);
});