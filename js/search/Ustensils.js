'use strict';

import Utils from '../utilities/Utils.js';
import Search from './Search.js';
import RecipesBuilder from '../pages/RecipesBuilder.js';

export default class Ustensils {
    static ustensilsExample = document.getElementById('ustensilesExample');
    static recipesMatched = []; // result recipes that match
    static recipesMatchedSorted = []; // array containing the result, having removed duplicate recipes

    static init(ustensils, collection) {
        Utils.launcherInput(document.querySelector("#ustensiles > button"),
            document.querySelector("#openUstensilesFilter"),
            document.querySelector("#closeUstensilesFilter"),
            document.querySelector("#hiddenUstensilesFilter"));
        this.ustensilsExample.innerHTML = [];
        this.displayUstensils(Utils.sortByTitle(ustensils));
        this.searchInput(ustensils);
        this.giveTheClassActivatedOnClick(collection);
    };

    // display the ustensils in the ustensils zone according to the recipes displayed in the 'recipes' section
    static displayUstensils(ustensils) {
        ustensils.forEach((ustensils) => {
            let listUstensils = document.createElement('li');

            listUstensils.innerHTML = `${Utils.upperText(ustensils)}`
            this.ustensilsExample.appendChild(listUstensils);
            listUstensils.classList.add('list-ustensiles');
            listUstensils.setAttribute('data-filter', `${ustensils}`);
        });
    };

    // allows to search for the ustensils in the input from the ustensils present in the recipes displayed
    static searchInput(ustensils) {
        document.getElementById('inputUstensiles').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;
            if (Utils.isValid(valueSearch)) {
                this.ustensilsExample.innerHTML = [];
                this.displayUstensils(Search.searchInputFilters(ustensils, valueSearch, this.recipesMatched, this.recipesMatched));
                return;
            }
            this.ustensilsExample.innerHTML = [];
            this.displayUstensils(Utils.sortByTitle(ustensils));
        });
    };

    // gives the class 'activated' when an ustensil is clicked
    static giveTheClassActivatedOnClick(collection) {
        this.ustensilsExample.addEventListener('click', event => {
            let classValue = event.target.classList.value;
            let mainContent = document.getElementById('mainContent');

            if (-1 === classValue.indexOf('activated')) {
                mainContent.innerHTML = '';
                event.target.classList.add('activated');
                RecipesBuilder.buildSection(Search.searchFiltersUst(collection, this.recipesMatched, this.recipesMatchedSorted));
            } else {
                mainContent.innerHTML = '';
                event.target.classList.remove('activated');
                RecipesBuilder.buildSection(recipesApiResult);
            }
        });
    };
}
