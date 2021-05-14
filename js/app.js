'use strict';

import RecipesBuilder from './pages/RecipesBuilder.js';
import DataLogic from './utilities/DataLogic.js';

import Search from './search/Search.js';

import Ingredients from './search/Ingredients.js';
import Appliances from './search/Appliances.js';
import Ustensils from './search/Ustensils.js';


// Build the recipes section by default
RecipesBuilder.buildSection(recipesApiResult);

Ingredients.init(DataLogic.getAllIngredients(recipesApiResult));
Ingredients.searchInput(DataLogic.getAllIngredients(recipesApiResult));
Ingredients.filters(recipesApiResult);

// Appliances.init(DataLogic.getAllAppliances(recipesApiResult));
// Appliances.searchInput(DataLogic.getAllAppliances(recipesApiResult));
// Appliances.filters(recipesApiResult);

// Ustensils.init(DataLogic.getAllUstensils(recipesApiResult));
// Ustensils.searchInput(DataLogic.getAllUstensils(recipesApiResult));
// Ustensils.filters(recipesApiResult);


// Search Input
document.getElementById('searchBarInput').addEventListener('keyup', (key) => {
    let valueSearch = key.target.value;
    let mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '';

    let result = Search.search(valueSearch);

    Ingredients.init(result.ingredients);
    Ingredients.searchInput(result.ingredients);
    Ingredients.filters(result.recipesMatchedSorted);

    // Appliances.init(result.appliances);
    // Appliances.searchInput(result.appliances);

    // Ustensils.init(result.ustensils);
    // Ustensils.searchInput(result.ustensils);
});
