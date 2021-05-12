'use strict';

export default class DataLogic {
    // get all the ingredients to make them appear by default, before searching
    static getAllIngredients() {
        let ingredients = [];
        recipesApiResult.forEach((recipe) => {
            recipe.ingredients.forEach((ing) => {
                if (!ingredients.includes(ing.ingredient.toLowerCase()))
                    ingredients.push(ing.ingredient.toLowerCase());
            });
        });
        return ingredients;
    };

    // get all the appliances to make them appear by default, before searching
    static getAllAppliances() {
        let appliances = [];
        recipesApiResult.forEach((recipe) => {
            if (!appliances.includes(recipe.appliance.toLowerCase()))
                appliances.push(recipe.appliance.toLowerCase());
        });
        return appliances;
    };

    // get all the ustensils to make them appear by default, before searching
    static getAllUstensils() {
        let ustensils = [];
        recipesApiResult.forEach((recipe) => {
            recipe.ustensils.forEach((ustensil) => {
                if (!ustensils.includes(ustensil.toLowerCase()))
                    ustensils.push(ustensil.toLowerCase());
            });
        });
        return ustensils;
    };
}