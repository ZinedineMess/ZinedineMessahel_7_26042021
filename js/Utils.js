'use strict';

export default class Utils {
    // Collect all the ingredients/appliance/ustensils, and sort them alphabetically
    sortByTitle(array) {
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

    // Open the ingredients/appliance/ustensils menu, with the inputs
    launchInputFilters(btn, openArrow, closeArrow, hiddenPart) {
        btn.addEventListener('click', () => {
            btn.style.width = "35rem";
            openArrow.style.display = 'none';
            hiddenPart.style.display = 'block';
        })

        this.closeInputFilters(btn, openArrow, closeArrow, hiddenPart);
        return this;
    }

    // Close the ingredients/appliance/ustensils menu
    closeInputFilters(btn, openArrow, closeArrow, hiddenPart) {
        closeArrow.addEventListener('click', () => {
            btn.style.width = "11rem";
            openArrow.style.display = 'block';
            hiddenPart.style.display = 'none';
        })

        return this;
    }
}
