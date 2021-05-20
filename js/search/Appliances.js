'use strict';

import Utils from '../utilities/Utils.js';
import Search from './Search.js';
import RecipesBuilder from '../pages/RecipesBuilder.js';
import Badges from '../pages/Badges.js';
import Message from '../pages/Messages.js';

export default class Appliances {
    static appliancesExample = document.getElementById('appareilExample');
    static appareilBadges = document.getElementById('appareilBadges');

    static init(appliances) {
        Utils.launcherInput(document.querySelector("#appareil > button"),
            document.querySelector("#openAppareilFilter"),
            document.querySelector("#closeAppareilFilter"),
            document.querySelector("#hiddenAppareilFilter"));
        Utils.clearFilters(this.appliancesExample);
        this.displayAppliances(Utils.sortByTitle(appliances));
        this.searchInput(appliances);
        this.giveTheClassActivatedOnClick();
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
                Utils.clearFilters(this.appliancesExample);
                this.displayAppliances(Search.searchInputFilters(appliances, valueSearch));
                return;
            }
            Utils.clearFilters(this.appliancesExample);
            this.displayAppliances(Utils.sortByTitle(appliances));
        });
    };

    static giveTheClassActivatedOnClick() {
        this.appliancesExample.addEventListener('click', event => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('activated')) {
                event.target.classList.add('activated');
                this.filterTags();
                Badges.buildTags(this.appareilBadges, Utils.upperText(event.target.getAttribute('data-filter')));
                Message.removeResultMessage();
                return;
            }
            event.target.classList.remove('activated');
            Utils.clearRecipesSection();
            Badges.removeTag(this.appareilBadges);
            RecipesBuilder.buildSection(recipesApiResult);
            return;
        });
    };

    static filterTags() {
        let resultFilters = Search.filters();
        this.show(resultFilters.show);
        this.hide(resultFilters.hide);
    };

    static show(elt) {
        elt.forEach(s => {
            s.style.display = 'block';
        });
    }

    static hide(elt) {
        return elt.forEach(h => {
            h.style.display = 'none';
        });
    }
}
