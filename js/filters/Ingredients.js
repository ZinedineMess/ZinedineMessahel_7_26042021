'use strict';
///////////////////////////////////////

import Filter from '../factory/Filters.js';
import InputOpenClose from '../factory/InputOpenClose.js';

export default class Ingredients {
    init(data) {
        let buttonIngredients = document.querySelector("#ingredients > button");
        let openArrow = document.querySelector("#open-ingredients-filter");
        let closeArrow = document.querySelector("#close-ingredients-filter");
        let hiddenIngredientsFilter = document.querySelector("#hidden-ingredients-filter");
        let ingredientsExample = document.getElementById("ingredients-example");
        let filtres = document.querySelector('#ingredients-example');

        this.getAllIngredients(data, ingredientsExample);
        new InputOpenClose().openInput(buttonIngredients, openArrow, hiddenIngredientsFilter);
        new InputOpenClose().closeInput(buttonIngredients, openArrow, closeArrow, hiddenIngredientsFilter);
        new Filter().filters(filtres, buttonIngredients, openArrow, hiddenIngredientsFilter);
    }

    // Collect all the ingredients, and sort them alphabetically
    getAllIngredients(data, ingredientsExample) {
        let allIngredients = [];

        data.forEach(recipe => {
            recipe.ingredients.forEach((element) => {
                allIngredients.push(element.ingredient);
            })
        })

        let ingredientsArrayNoSort = [...new Set(allIngredients)];
        let ingredientsArray = ingredientsArrayNoSort.sort((a, b) => { // SORT BY TITLE
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            } else if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            }
        })

        this.showIngredientsInInput(ingredientsArray, ingredientsExample);
        this.keyup(ingredientsArray, ingredientsExample);
    }

    // Create the elements of the list of ingredients
    showIngredientsInInput(ingredientsArray, ingredientsExample) {
        ingredientsArray.forEach((ingredient) => {
            let listIngredients = document.createElement('li');

            listIngredients.innerHTML = `${ingredient}`
            ingredientsExample.appendChild(listIngredients);
            listIngredients.classList.add('list-ingredients');
            listIngredients.setAttribute('data-filter', `${ingredient}`);
        })
    }

    // Allows you to be able to search in the list of ingredients using the input
    keyup(ingredientsArray, ingredientsExample) {
        let ingredientInput = document.getElementById('input-ingredients');

        ingredientInput.addEventListener('keyup', (key) => {
            let valueInput = key.target.value.toLowerCase();
            let filteredInputIngredients = ingredientsArray.filter((ingredients) => {
                return (ingredients.toLowerCase().includes(valueInput))
            });
            ingredientsExample.innerHTML = " ";
            this.showIngredientsInInput(filteredInputIngredients, ingredientsExample);
        })
    }
}
