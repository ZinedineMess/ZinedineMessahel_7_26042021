'use strict';

export default class Utils {
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

    // search starts from 3 characters
    static isValid(value) {
        return value.length > 2;
    }

    // Open/Close the ingredients/appliance/ustensils menu
    static launcherInput(btn, open, close, hiddenPart) {
        // open
        btn.addEventListener('click', () => {
            btn.style.width = "35rem";
            open.style.display = 'none';
            hiddenPart.style.display = 'block';
        });

        // close
        close.addEventListener('click', () => {
            btn.style.width = "11rem";
            open.style.display = 'block';
            hiddenPart.style.display = 'none';
        });

        return this;
    }

    static clearRecipesSection() {
        return document.getElementById('mainContent').innerHTML = '';
    }

    static clearFilters(elt) {
        return elt.innerHTML = '';
    }

    // get the elements holding the 'activated' class
    static getFiltersWithClassActivated() {
        let currentFilters = document.querySelectorAll('li.activated');
        let filterSelected = [];

        currentFilters.forEach(function (currentFilter) {
            filterSelected.push(Utils.normalizeText(currentFilter.getAttribute("data-filter")));
        });

        return filterSelected;
    }

    static showRecipesFiltered(elt) {
        return elt.forEach(e => {
            e.style.display = 'block';
        });
    }

    static hideRecipesFiltered(elt) {
        return elt.forEach(e => {
            e.style.display = 'none';
        });
    }
}
