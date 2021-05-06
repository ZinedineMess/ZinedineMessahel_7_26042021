'use strict';

import Utils from '../Utils.js';

export default class Ingredients {
    static build() {
        let btn = document.querySelector("#ingredients > button");
        let openIngredientsArrow = document.querySelector("#openIngredientsFilter");
        let closeIngredientsArrow = document.querySelector("#closeIngredientsFilter");
        let hiddenIngredientsFilter = document.querySelector("#hiddenIngredientsFilter");

        new Utils()
            .launchInputFilters(btn, openIngredientsArrow, closeIngredientsArrow, hiddenIngredientsFilter);
    }

    static buildSuggestionIngredients(ingredients) {
        let ingredientsExample = document.querySelector("#ingredientsExample");
        let ingredient = this.getAllIngredients(ingredients);

        this.showIngredientsInInput(ingredient, ingredientsExample);
    }

    // Collect all the ingredients, and sort them alphabetically
    static getAllIngredients(ingredients) {
        let allIngredients = [];

        ingredients.forEach(rec => {
            for(let i = 0; i < rec.length; i ++) {
                allIngredients.push(rec[i].ingredient);
            }
        })

        let ingredientsArray = new Utils().sortByTitle(allIngredients);

        return ingredientsArray;
    }

     // Create the elements of the list of ingredients
    static showIngredientsInInput(ingredients, ingredientsExample) {
        ingredients.forEach((ingredient) => {
            let listIngredients = document.createElement('li');

            listIngredients.innerHTML = `${ingredient}`
            ingredientsExample.appendChild(listIngredients);
            listIngredients.classList.add('list-ingredients');
            listIngredients.setAttribute('data-filter', `${ingredient}`);
        })
    }
}
