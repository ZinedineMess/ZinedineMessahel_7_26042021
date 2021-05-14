'use strict';

import Utils from '../utilities/Utils.js';
import Filters from './Filters.js';
import RecipesBuilder from '../pages/RecipesBuilder.js';

export default class Ingredients {
    static btnIngredients = document.querySelector("#ingredients > button");
    static openArrow = document.querySelector("#openIngredientsFilter");
    static closeArrow = document.querySelector("#closeIngredientsFilter");
    static hiddenFilter = document.querySelector("#hiddenIngredientsFilter");
    static ingredientsExample = document.getElementById('ingredientsExample');
    static recipesMatched = [];

    static init(resultIng) {
        this.ingredientsExample.innerHTML = '';
        new Utils().launchInputFilters(this.btnIngredients, this.openArrow, this.closeArrow, this.hiddenFilter);
        this.showIngredientsInInput(Utils.sortByTitle(resultIng));
    };

    static searchInput(collection) {
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

    static filters(collection) {
        this.ingredientsExample.addEventListener('click', event => {
            let classValue = event.target.classList.value;
            let mainContent = document.getElementById('mainContent');

            if (-1 === classValue.indexOf('actived')) {
                mainContent.innerHTML = '';
                event.target.classList.add('actived');
                this.filterBadges();
                RecipesBuilder.buildSection(this.sortDomArticle(collection));
            } else {
                mainContent.innerHTML = '';
                event.target.classList.remove('actived');
                RecipesBuilder.buildSection(collection);
            }
        });
    }

    static getActiveFilters() {
        let currentFilters = document.querySelectorAll('li.actived');
        let filterSelected = [];

        currentFilters.forEach(function (currentFilter) {
            filterSelected.push(currentFilter.getAttribute("data-filter"));
        });

        return filterSelected;
    }

    static sortDomArticle(collection) {
        let filters = this.getActiveFilters();
        console.log(filters);
        collection.forEach(recipe => {
            recipe.ingredients.forEach(ing => {
                if (Utils.normalizeText(ing.ingredient).includes(filters)) {
                    this.recipesMatched.push(recipe);
                }
            })
        })

        return this.recipesMatched;
    }

    static filterBadges() {
        this.addFilterBadge();
    }

    static addFilterBadge() {
        let tagsBadges = document.getElementById('tagsBadges');
        let tags = this.getActiveFilters();
        tags.forEach(tag => {
            let template = 
            `
            <div>
                <span>${Utils.upperText(tag)}</span>
                <i class="far fa-times-circle"></i>
            </div>
            `
            tagsBadges.innerHTML = template;
        })
    }
}
