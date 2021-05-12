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
    };

    // search starts from 3 characters
    static isValid(value) {
        return value.length > 2;
    };

    // transform the text into lowercase
    static normalizeText(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

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
    };

    // Open the ingredients/appliance/ustensils menu
    launchInputFilters(btn, openArrow, closeArrow, hiddenPart) {
        btn.addEventListener('click', () => {
            btn.style.width = "35rem";
            openArrow.style.display = 'none';
            hiddenPart.style.display = 'block';
        })

        this.closeInputFilters(btn, openArrow, closeArrow, hiddenPart);

        return this;
    };

    // Close the ingredients/appliance/ustensils menu
    closeInputFilters(btn, openArrow, closeArrow, hiddenPart) {
        closeArrow.addEventListener('click', () => {
            btn.style.width = "11rem";
            openArrow.style.display = 'block';
            hiddenPart.style.display = 'none';
        })

        return this;
    };

    static getActiveFilters() {
        let currentFilters = document.querySelectorAll('li.actived');
        let filterSelected = [];

        currentFilters.forEach(function (currentFilter) {
            filterSelected.push(currentFilter.getAttribute("data-filter"));
        });

        return filterSelected;
    }

    static ownAllFilters(article) {
        let filters = this.getActiveFilters();
        let articleFilters = this.normalizeText(article.getAttribute('data-filter'));
        let intersection = filters.filter(
            x => articleFilters.includes(x)
        );

        return filters.length == intersection.length;
    }
}
