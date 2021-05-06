'use strict';

import Utils from '../Utils.js';

export default class Ustensils {
    static build() {
        let btn = document.querySelector("#ustensiles > button");
        let openUstensilesArrow = document.querySelector("#openUstensilesFilter");
        let closeUstensilesArrow = document.querySelector("#closeUstensilesFilter");
        let hiddenUstensilesFilter = document.querySelector("#hiddenUstensilesFilter");

        new Utils()
            .launchInputFilters(btn, openUstensilesArrow, closeUstensilesArrow, hiddenUstensilesFilter)
    }
}
