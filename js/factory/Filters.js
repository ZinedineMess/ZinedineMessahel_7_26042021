'use strict';
///////////////////////////////////////

export default class Filter {
    filters(filtres, btn, openArrow, hiddenPart) {
        let articles = document.querySelectorAll('.article-recipes');

        // EventListener at the click of the ingredients
        filtres.addEventListener('click', event => {
            let classValue = event.target.classList.value;
            let badgesDom = document.getElementById('tags-badges');

            if (-1 === classValue.indexOf('actived')) {
                event.target.classList.add('actived');
                this.badges(badgesDom);
            } else {
                event.target.classList.remove('actived');
                badgesDom.style.display = 'none';
            }

            this.sortDomArticle(articles, btn, openArrow, hiddenPart);
        })
    }

    // retrieve the filters with the 'actived' class and place them in the 'filterSelected' array    
    getActiveFilters() {
        let currentFilters = document.querySelectorAll('li.actived');
        let filterSelected = [];

        currentFilters.forEach(function (currentFilter) {
            filterSelected.push(currentFilter.getAttribute("data-filter"));
        });

        return filterSelected;
    }

    // compare/check if 'filters' has the same value as the 'article' class    
    ownAllFilters(article) {
        let filters = this.getActiveFilters();
        let articleFilters = article.getAttribute('data-filter');
        let articless = articleFilters;
        let intersection = filters.filter(
            x => articless.includes(x)
        );

        return filters.length == intersection.length;
    }

    // SHOW OR HIDE ARTICLES
    sortDomArticle(articles, btn, openArrow, hiddenPart) {
        articles.forEach((article) => {
            if (this.ownAllFilters(article)) {
                article.style.display = 'block';
                btn.style.width = "11rem";
                openArrow.style.display = 'block';
                hiddenPart.style.display = 'none';
            } else {
                article.style.display = 'none';
            }
        });
    }

    // Create the badge + eventListener element on click to make it disappear 
    badges(badgesDom) {
        let filter = this.getActiveFilters();
        let templateBadge = `
        <span>${filter}</span>
        <i class="far fa-times-circle close-badge"></i>
        `

        badgesDom.innerHTML = templateBadge;
        badgesDom.style.display = 'flex';
        badgesDom.style.backgroundColor = '#000';

        badgesDom.addEventListener('click', () => {
            badgesDom.style.display = 'none';
        })
    }
}