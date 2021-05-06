'use strict';

import RecipesBuilder from './RecipesBuilder.js';
import Search from './Search.js';
import Ingredients from './filters/Ingredients.js';
import Appliances from './filters/Appliances.js';
import Ustensils from './filters/Ustensils.js';

// Build the recipes section by default
RecipesBuilder.buildSection(recipes);

// Search Input
new Search().listenerSearchInput(recipes);

Ingredients.build(recipes);
Appliances.build(recipes);
Ustensils.build(recipes);
