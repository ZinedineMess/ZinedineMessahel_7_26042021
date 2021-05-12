'use strict';

import Utils from '../utilities/Utils.js';
import Filters from './Filters.js';

export default class Appliances {
    static btnAppliances = document.querySelector("#appareil > button");
    static openArrow = document.querySelector("#openAppareilFilter");
    static closeArrow = document.querySelector("#closeAppareilFilter");
    static hiddenFilter = document.querySelector("#hiddenAppareilFilter");
    static appliancesExample = document.getElementById('appareilExample');

    static init(resultApp) {
        this.appliancesExample.innerHTML = '';
        new Utils().launchInputFilters(this.btnAppliances, this.openArrow, this.closeArrow, this.hiddenFilter);
        this.showAppliancesInInput(Utils.sortByTitle(resultApp));
    };

    static filter(collection) {
        document.getElementById('inputAppareil').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;

            if (Utils.isValid(valueSearch)) {
                this.init(Filters.search(collection, valueSearch));
            } else {
                this.init(collection);
            }
        });
    };

    static showAppliancesInInput(appliances) {
        appliances.forEach((appliance) => {
            let listAppliances = document.createElement('li');

            listAppliances.innerHTML = `${Utils.upperText(appliance)}`
            this.appliancesExample.appendChild(listAppliances);
            listAppliances.classList.add('list-ingredients');
            listAppliances.setAttribute('data-filter', `${appliance}`);
        });
    };

    static filters() {
        this.appliancesExample.addEventListener('click', event => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('actived')) {
                event.target.classList.add('actived');
            } else {
                event.target.classList.remove('actived');
            }
            this.sortDomArticle();
        });
    };

    static sortDomArticle() {
        document.querySelectorAll('.articleRecipes').forEach((article) => {
            if (Utils.ownAllFilters(article)) {
                article.style.display = 'block';
                this.btnAppliances.style.width = "11rem";
                this.openArrow.style.display = 'block';
                this.hiddenFilter.style.display = 'none';
            } else {
                article.style.display = 'none';
            }
        });
    };
}
