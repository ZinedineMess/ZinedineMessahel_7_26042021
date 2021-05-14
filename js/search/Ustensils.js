'use strict';

import Utils from '../utilities/Utils.js';
import Filters from './Filters.js';

export default class Ustensils {
    static btnUstensils = document.querySelector("#ustensiles > button");
    static openArrow = document.querySelector("#openUstensilesFilter");
    static closeArrow = document.querySelector("#closeUstensilesFilter");
    static hiddenFilter = document.querySelector("#hiddenUstensilesFilter");
    static ustensilsExample = document.getElementById('ustensilesExample');

    static init(resultUst) {
        this.ustensilsExample.innerHTML = '';
        new Utils().launchInputFilters(this.btnUstensils, this.openArrow, this.closeArrow, this.hiddenFilter);
        this.showUstensilsInInput(Utils.sortByTitle(resultUst));
    };

    static searchInput(collection) {
        document.getElementById('inputUstensiles').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;
            if (Utils.isValid(valueSearch)) {
                this.init(Filters.search(collection, valueSearch));
            } else {
                this.init(collection);
            }
        });
    };

    static showUstensilsInInput(ustensils) {
        ustensils.forEach((ustensil) => {
            let listUstensils = document.createElement('li');

            listUstensils.innerHTML = `${Utils.upperText(ustensil)}`
            this.ustensilsExample.appendChild(listUstensils);
            listUstensils.classList.add('list-ingredients');
            listUstensils.setAttribute('data-filter', `${ustensil}`);
        });
    };
}
