'use strict';
///////////////////////////////////////

import Filter from '../factory/Filters.js';
import InputOpenClose from '../factory/InputOpenClose.js';

export default class Ustensils {
    build(data) {
        let buttonUstensils = document.querySelector("#ustensiles > button");
        let openArrow = document.querySelector("#open-ustensiles-filter");
        let closeArrow = document.querySelector("#close-ustensiles-filter");
        let hiddenUstensilsFilter = document.querySelector("#hidden-ustensiles-filter");
        let ustensilsExample = document.getElementById("ustensiles-example");
        let filtres = document.querySelector('#ustensiles-example');

        this.getAllUstensils(data, ustensilsExample);
        new InputOpenClose().openInput(buttonUstensils, openArrow, hiddenUstensilsFilter);
        new InputOpenClose().closeInput(buttonUstensils, openArrow, closeArrow, hiddenUstensilsFilter);
        new Filter().filters(filtres, buttonUstensils, openArrow, hiddenUstensilsFilter);
    }

    // Collect all the ustensils, and sort them alphabetically
    getAllUstensils(data, ustensilsExample) {
        let allUstensils= [];

        data.forEach(recipe => {
            recipe.ustensils.forEach(u => {
                allUstensils.push(u)
            })
        })

        let ustensilsArrayNoSort = [...new Set(allUstensils)];
        let ustensilsArray = ustensilsArrayNoSort.sort((a, b) => { // SORT BY TITLE
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            } else if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            }
        })

        this.showUstensilsInInput(ustensilsArray, ustensilsExample);
        this.keyup(ustensilsArray, ustensilsExample)
    }

    // Create the elements of the list of ustensils
    showUstensilsInInput(ustensilsArray, ustensilsExample) {
        ustensilsArray.forEach((ustensils) => {
            let listUstensils = document.createElement('li');

            listUstensils.innerHTML = `${ustensils}`
            ustensilsExample.appendChild(listUstensils);
            listUstensils.classList.add('list-ustensiles');
            listUstensils.setAttribute('data-filter', `${ustensils}`);
        })
    }

    // Allows you to be able to search in the list of ustensils using the input
    keyup(ustensilsArray, ustensilsExample) {
        let ustensilsInput = document.getElementById('input-ustensiles');

        ustensilsInput.addEventListener('keyup', (key) => {
            let valueInput = key.target.value.toLowerCase();
            let filteredInputUstensils = ustensilsArray.filter((ustensils) => {
                return (ustensils.toLowerCase().includes(valueInput))
            });
            ustensilsExample.innerHTML = " ";
            this.showUstensilsInInput(filteredInputUstensils, ustensilsExample);
        })
    }
}
