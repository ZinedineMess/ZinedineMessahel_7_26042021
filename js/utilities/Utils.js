'use strict';

export default class Utils {
    // search starts from 3 characters
    static isValid(value) {
        return value.length > 2;
    }

    // transform the text into lowercase
    static normalizeText(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    // transform the text into uppercase
    static upperText(text) {
        return text
            .charAt(0)
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") +
            text
            .substring(1)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    static clearRecipesSection() {
        return document.getElementById('mainContent').innerHTML = '';
    }

    static clearFilters(elt) {
        return elt.innerHTML = '';
    }

    // Collect all the ingredients/appliance/ustensils, and sort them alphabetically
    static sortByTitle(array) {
        let arrayNoSort = [...new Set(array)];
        let arraySort = arrayNoSort.sort((a, b) => {
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            } else if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            }
        })

        return arraySort;
    }
}
