'use strict';

import Buttons from '../page/Buttons.js';
import DataLogic from '../utilities/DataLogic.js';
import DomService from '../page/DomService.js';
import Messages from '../page/Messages.js';
import Search from '../search/Search.js';
import Tags from '../page/Tags.js';
import Utils from '../utilities/Utils.js';

export default class Ustensils {
    static ustensilsExample = document.getElementById('ustensilesExample');

    static init(ustensils, recipes) {
        Utils.clearFilters(this.ustensilsExample);
        Buttons.launchButtons(document.querySelector("#ustensiles > button"),
            document.querySelector("#openUstensilesFilter"),
            document.querySelector("#closeUstensilesFilter"),
            document.querySelector("#hiddenUstensilesFilter"));
        this.fillUstensils(Utils.sortByTitle(ustensils));
        this.searchInput(ustensils);
        this.filterTags(recipes);
        return this;
    }

    // display the ustensils in the ustensils zone according to the recipes displayed in the 'recipes' section
    static fillUstensils(ustensils) {
        let ul = document.createElement('ul');
        ul.classList.add('listUlUst');
        this.ustensilsExample.appendChild(ul);

        ustensils.forEach((ustensils) => {
            let listUstensils = document.createElement('li');

            listUstensils.innerHTML = `${Utils.upperText(ustensils)}`
            ul.appendChild(listUstensils);
            listUstensils.classList.add('list-ustensiles');
            listUstensils.setAttribute('data-filter', `${ustensils}`);
        });
    }

    // allows to search for the ustensils in the input from the ustensils present in the recipes displayed
    static searchInput(ustensils) {
        document.getElementById('inputUstensiles').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;
            Utils.clearFilters(this.ustensilsExample);
            this.fillUstensils(
                Utils.isValid(valueSearch) ?
                Search.searchInputFilters(ustensils, valueSearch) :
                Utils.sortByTitle(ustensils));
        });
    }

    static filterTags(recipes) {
        let selected = [];
        let ustensileTag = document.getElementById('ustensileTag');

        document.querySelector('#ustensilesExample').addEventListener('click', (event) => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('selected')) {
                event.target.classList.add('selected');
                selected.push(event.target.getAttribute('data-filter'));
                Buttons.hideButtonsOnClick(document.querySelector("#ustensiles > button"),
                    document.querySelector("#openUstensilesFilter"),
                    document.querySelector("#hiddenUstensilesFilter"))
                Tags
                    .buildTags(ustensileTag, Utils.upperText(event.target.getAttribute('data-filter')))
                    .removeTagsOnClick(document.querySelector("#ustensileTag > i"), event, ustensileTag, recipes);
                Messages.buildResultMessageWithResult(Search.searchByUstTags(recipes, selected));
                Utils.clearRecipesSection();
                DomService.buildResult(Search.searchByUstTags(recipes, selected));
                Utils.clearFilters(this.ustensilsExample);
                this.fillUstensils(Utils.sortByTitle(DataLogic.getAllUstensils(Search.searchByUstTags(recipes, selected))));
            } else {
                selected.splice(event.target.getAttribute('data-filter'));
                Tags.resetSection(event, ustensileTag, recipes);
            };
        });
        return selected;
    }
}
