'use strict';

import Utils from '../utilities/Utils.js';
import Search from './Search.js';
import RecipesBuilder from '../pages/RecipesBuilder.js';

export default class Appliances {
    static appliancesExample = document.getElementById('appareilExample');
    static recipesMatched = []; // result recipes that match
    static recipesMatchedSorted = []; // array containing the result, having removed duplicate recipes
    static appareilBadges = document.querySelector("#appareilBadges");

    static init(appliances, collection) {
        Utils.launcherInput(document.querySelector("#appareil > button"),
            document.querySelector("#openAppareilFilter"),
            document.querySelector("#closeAppareilFilter"),
            document.querySelector("#hiddenAppareilFilter"));
        this.appliancesExample.innerHTML = [];
        this.displayAppliances(Utils.sortByTitle(appliances));
        this.searchInput(appliances);
        this.giveTheClassActivatedOnClick(collection);
    };

    // display the appliances in the appliances zone according to the recipes displayed in the 'recipes' section
    static displayAppliances(appliances) {
        appliances.forEach((appliances) => {
            let listAppliances = document.createElement('li');

            listAppliances.innerHTML = `${Utils.upperText(appliances)}`
            this.appliancesExample.appendChild(listAppliances);
            listAppliances.classList.add('list-appareil');
            listAppliances.setAttribute('data-filter', `${appliances}`);
        });
    };

    // allows to search for the appliances in the input from the appliances present in the recipes displayed
    static searchInput(appliances) {
        document.getElementById('inputAppareil').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;
            if (Utils.isValid(valueSearch)) {
                this.appliancesExample.innerHTML = [];
                this.displayAppliances(Search.searchInputFilters(appliances, valueSearch, this.recipesMatched, this.recipesMatched));
                return;
            }
            this.appliancesExample.innerHTML = [];
            this.displayAppliances(Utils.sortByTitle(appliances));
        });
    };

    // gives the class 'activated' when an appliance is clicked
    static giveTheClassActivatedOnClick(collection) {
        this.appliancesExample.addEventListener('click', event => {
            let classValue = event.target.classList.value;
            let mainContent = document.getElementById('mainContent');

            if (-1 === classValue.indexOf('activated')) {
                mainContent.innerHTML = '';
                event.target.classList.add('activated');
                RecipesBuilder.buildSection(Search.searchFiltersApp(collection, this.recipesMatched, this.recipesMatchedSorted));
                RecipesBuilder.buildTags(this.appareilBadges, Utils.upperText(event.target.getAttribute('data-filter')))
            } else {
                mainContent.innerHTML = '';
                event.target.classList.remove('activated');
                RecipesBuilder.buildSection(recipesApiResult);
                RecipesBuilder.removeTag(this.appareilBadges);
            }
        });
    };
}
