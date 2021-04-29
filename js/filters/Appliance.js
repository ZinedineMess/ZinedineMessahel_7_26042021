'use strict';
///////////////////////////////////////

import Filter from '../factory/Filters.js';
import InputOpenClose from '../factory/InputOpenClose.js';


export default class Appliance {
    build(data) {
        let buttonAppliance = document.querySelector("#appareil > button");
        let openArrow = document.querySelector("#open-appareil-filter");
        let closeArrow = document.querySelector("#close-appareil-filter");
        let hiddenApplianceFilter = document.querySelector("#hidden-appareil-filter");
        let ApplianceExample = document.getElementById("appareil-example");
        let filtres = document.querySelector('#appareil-example');

        this.getAllAppliance(data, ApplianceExample);
        new InputOpenClose().openInput(buttonAppliance, openArrow, hiddenApplianceFilter);
        new InputOpenClose().closeInput(buttonAppliance, openArrow, closeArrow, hiddenApplianceFilter);
        new Filter().filters(filtres, buttonAppliance, openArrow, hiddenApplianceFilter);
    }

    // Collect all the appliance, and sort them alphabetically
    getAllAppliance(data, ApplianceExample) {
        let allAppliance = [];

        data.forEach(recipe => {
            allAppliance.push(recipe.appliance);
        })

        let applianceArrayNoSort = [...new Set(allAppliance)];
        let applianceArray = applianceArrayNoSort.sort((a, b) => { // SORT BY TITLE
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            } else if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            }
        })

        this.showApplianceInInput(applianceArray, ApplianceExample);
        this.keyup(applianceArray, ApplianceExample)
    }

    // Create the elements of the list of appliance
    showApplianceInInput(applianceArray, ApplianceExample) {
        applianceArray.forEach((appliance) => {
            let listAppliance = document.createElement('li');

            listAppliance.innerHTML = `${appliance}`
            ApplianceExample.appendChild(listAppliance);
            listAppliance.classList.add('list-appliance');
            listAppliance.setAttribute('data-filter', `${appliance}`);
        })
    }

    // Allows you to be able to search in the list of appliance using the input
    keyup(applianceArray, ApplianceExample) {
        let applianceInput = document.getElementById('input-appareil');

        applianceInput.addEventListener('keyup', (key) => {
            let valueInput = key.target.value.toLowerCase();
            let filteredInputAppliance = applianceArray.filter((appliance) => {
                return (appliance.toLowerCase().includes(valueInput))
            });
            ApplianceExample.innerHTML = " ";
            this.showApplianceInInput(filteredInputAppliance, ApplianceExample);
        })
    }
}
