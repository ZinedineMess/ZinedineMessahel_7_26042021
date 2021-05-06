'use strict';

import Utils from '../Utils.js';

export default class Appliances {
    static build() {
        let btn = document.querySelector("#appareil > button");
        let openAppareilArrow = document.querySelector("#openAppareilFilter");
        let closeAppareilArrow = document.querySelector("#closeAppareilFilter");
        let hiddenAppareilFilter = document.querySelector("#hiddenAppareilFilter");

        new Utils()
            .launchInputFilters(btn, openAppareilArrow, closeAppareilArrow, hiddenAppareilFilter)
    }
}
