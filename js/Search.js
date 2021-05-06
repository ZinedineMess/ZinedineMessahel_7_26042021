'use strict';

import RecipesBuilder from './RecipesBuilder.js';
import Ingredients from './filters/Ingredients.js';

export default class Search {
    listenerSearchInput(recipes) {
        let mainContent = document.getElementById('mainContent');

        document.getElementById('searchBarInput').addEventListener('keyup', (key) => {
            let valueInput = key.target.value.toLowerCase();
            if (valueInput.length > 2) {
                this.search(recipes, valueInput, mainContent);
            } else {
                mainContent.innerHTML = '';
                RecipesBuilder.buildSection(recipes);
            }
        });
    }

    search(collections, value, container) {
        let recipesDisplay = [];
        let recipesFromTitle = [];
        let recipesFromDescription = [];
        let ingredients = [];

        this.searchByName(collections, value, container, recipesDisplay, recipesFromTitle, ingredients);
        this.searchByDescription(recipesFromTitle, value, container, recipesDisplay, recipesFromDescription, ingredients);
        this.searchByIngredients(recipesFromDescription, value, container, recipesDisplay, recipesFromDescription, ingredients);
    
        Ingredients.buildSuggestionIngredients(ingredients);
    }

    searchByName(collections, value, content, display, title, ingredients) {
        collections.forEach(collection => {
            if (collection.name.toLowerCase().includes(value)) {
                content.innerHTML = '';
                display.push(collection);
                RecipesBuilder.buildSection(display);
                ingredients.push(collection.ingredients);
            } else {
                title.push(collection);
            }
        });
    }

    searchByDescription(collections, value, content, display, description, ingredients) {
        collections.forEach(collection => {
            if (collection.description.toLowerCase().includes(value)) {
                content.innerHTML = '';
                display.push(collection);
                RecipesBuilder.buildSection(display);
                ingredients.push(collection.ingredients);
            } else {
                description.push(collection);
            }
        });
    }

    searchByIngredients(collections, value, content, display, ingredients) {
        collections.forEach(collection => {
            if (collection.ingredients.some(elt => elt.ingredient.toLowerCase().includes(value))) {
                content.innerHTML = '';
                display.push(collection);
                RecipesBuilder.buildSection(display);
                ingredients.push(collection.ingredients);
            }
        });
    }
}
