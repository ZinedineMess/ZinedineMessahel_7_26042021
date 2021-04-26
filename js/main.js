'use strict';
/////////////////////////////////////////

import {
    recipes
} from './recipes.js';
import Recipes from './template.js';

(function appDispatch() {
    let data = recipes;
    new Recipes().displayRecipes(data);
}) ();
