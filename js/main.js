'use strict';
/////////////////////////////////////////

import {
    recipes
} from './data/recipesData.js';
import Recipes from './Recipes.js';
import SearchBox from './SearchBox.js';

(function appDispatch() {
    let data = recipes;
    new Recipes().displayRecipes(data);
    new SearchBox().search(data);
}) ();