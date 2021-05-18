'use strict';

export default class Builder {
    static resultMessage = document.getElementById('resultMessage'); 
    static resultSpan = document.querySelector("#resultMessage > span");
    static hiddenIngredientsFilter = document.querySelector("#hiddenIngredientsFilter");
    static hiddenAppareilFilter = document.querySelector("#hiddenAppareilFilter");
    static hiddenUstensilesFilter = document.querySelector("#hiddenUstensilesFilter");

    // build the section containing the recipes to display
    static buildSection(collections) {
        return collections.forEach(collection => {
            this.buildRecipe(collection);
        });
    };

    // build each recipe
    static buildRecipe(collection) {
        let section = document.getElementById('mainContent');

        return section.appendChild(this.createArticleElt(collection));
    };

    // create the article which will contain the information of each recipe
    static createArticleElt(collection) {
        let article = document.createElement('article');
        let dataFilter = collection.ingredients.map(element => element.ingredient) + collection.ustensils + collection.appliance;

        article.classList.add('articleRecipes');
        article.setAttribute('data-filter', dataFilter);
        article.innerHTML = this.getArticleInnerHTML(collection);

        return article;
    };

    static getArticleInnerHTML(collection) {
        return `
            <img src="https://res.cloudinary.com/dlpyn3wxf/image/upload/v1619104039/img-recipes_tqi94t.png" alt="img" />
            <div class='recipeTitle'>
                <h2 class="recipeName">${collection.name}</h2>
                <span class="recipeDuration"><i class="far fa-clock"></i>${collection.time} min</span>
            </div>
            <div class="recipeInfo">
                <div class="recipeIngredients">${collection.ingredients.map(elt => `
                    <p><b>${elt.ingredient} </b>:
                    ${ "quantity" in elt ? elt.quantity : ""}
                    ${ "unit" in elt ? elt.unit: ""}</p>`).join(" ")}
                </div>
                <div class="recipeInstructions">
                    <span>${collection.description}</span>
                </div>
            </div>
        `;
    };

    // displays the message with the number of recipes corresponding to the search
    static buildResultMessageWithResult(recipes) {
        this.launchResultMessage();
        this.resultMessage.style.backgroundColor = "#c4dcff"
        this.resultSpan.innerHTML = recipes.length + " recette(s) correspond(ent) à votre recherche";
        return this;
    }

    // displays the message indicating to the user that no recipe matches the search
    static buildResultMessageWithNoResult() {
        this.launchResultMessage();
        this.resultMessage.style.backgroundColor = "#fed8b2";
        this.resultSpan.innerHTML = "Aucune recette ne correspond à votre recherche... Vous pouvez chercher 'tarte aux pommes', 'poisson', etc.";
        return this;
    }

    static launchResultMessage() {
        this.hiddenIngredientsFilter.style.top = "20rem";
        this.hiddenAppareilFilter.style.top = "20rem";
        this.hiddenUstensilesFilter.style.top = "20rem";

        return this.resultMessage.style.display = 'flex';
    }

    static removeResultMessage() {
        this.hiddenIngredientsFilter.style.top = "16.2rem";
        this.hiddenAppareilFilter.style.top = "16.2rem";
        this.hiddenUstensilesFilter.style.top = "16.2rem";

        return this.resultMessage.style.display = 'none';
    }
}
