'use strict';

import Utils from '../utilities/Utils.js';
import Filters from './Filters.js';

export default class Ingredients {
    static btnIngredients = document.querySelector("#ingredients > button");
    static openArrow = document.querySelector("#openIngredientsFilter");
    static closeArrow = document.querySelector("#closeIngredientsFilter");
    static hiddenFilter = document.querySelector("#hiddenIngredientsFilter");
    static ingredientsExample = document.getElementById('ingredientsExample');

    static init(resultIng) {
        this.ingredientsExample.innerHTML = '';
        new Utils().launchInputFilters(this.btnIngredients, this.openArrow, this.closeArrow, this.hiddenFilter);
        this.showIngredientsInInput(Utils.sortByTitle(resultIng));
        this.filters();
    };

    static filter(collection) {
        document.getElementById('inputIngredients').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;
            if (Utils.isValid(valueSearch)) {
                this.init(Filters.search(collection, valueSearch));
            } else {
                this.init(collection);
            };
        });
    };

    static showIngredientsInInput(ingredients) {
        ingredients.forEach((ingredient) => {
            let listIngredients = document.createElement('li');

            listIngredients.innerHTML = `${Utils.upperText(ingredient)}`
            this.ingredientsExample.appendChild(listIngredients);
            listIngredients.classList.add('list-ingredients');
            listIngredients.setAttribute('data-filter', `${ingredient}`);
        });
    };

    static filters() {
        this.ingredientsExample.addEventListener('click', event => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('actived')) {
                event.target.classList.add('actived');
            } else {
                event.target.classList.remove('actived');
            }
            this.sortDomArticle();
        });
    }

    static sortDomArticle() {
        document.querySelectorAll('.articleRecipes').forEach((article) => {
            if (Utils.ownAllFilters(article)) {
                article.style.display = 'block';
                this.btnIngredients.style.width = "11rem";
                this.openArrow.style.display = 'block';
                this.hiddenFilter.style.display = 'none';
            } else {
                article.style.display = 'none';
            }
        });
    }
}