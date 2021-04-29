'use strict';
/////////////////////////////////////////

import {
    recipes
} from './data/recipesData.js';
import Recipes from './Recipes.js';
import SearchBox from './SearchBox.js';
import Ingredients from './filters/Ingredients.js';
import Appliance from './filters/Appliance.js';
import Ustensils from './filters/Ustensils.js';

(function builder() {
    let data = recipes;
    new Recipes().displayRecipes(data);
    new SearchBox().search(data);
    new Ingredients().build(data);
    new Appliance().build(data);
    new Ustensils().build(data);
}) ();