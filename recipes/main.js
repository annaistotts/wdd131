
import recipes from './recipes.mjs';

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    return list[random(list.length)];
}

function tagsTemplate(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
}

function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        html += i <= rating ? '<span class="icon-star">⭐</span>' : '<span class="icon-star-empty">☆</span>';
    }
    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    return `
        <section class="recipe">
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="description">
                <div class="tags">${tagsTemplate(recipe.tags)}</div>
                <h2>${recipe.name}</h2>
                ${ratingTemplate(recipe.rating)}
                <p>${recipe.description}</p>
            </div>
        </section>
    `;
}

// I used ChatGPT a lot right here because I couldn't figure out why my search bar wasn't working
function renderRecipes(recipeList) {
    const recipeContainer = document.querySelector('main');
    const searchBar = document.querySelector('.search');
    const searchHTML = searchBar ? searchBar.outerHTML : '';
    const recipesHTML = recipeList.map(recipeTemplate).join('');
    recipeContainer.innerHTML = searchHTML + recipesHTML;

    
    const searchButton = document.querySelector('.search button');
    if (searchButton) {  
        searchButton.addEventListener('click', (event) => {
            event.preventDefault();
            const query = document.querySelector('#search-input').value;
            const filteredRecipes = filterRecipes(query);
            renderRecipes(filteredRecipes);
        });
    }
}

function init() {
    const randomRecipe = getRandomListEntry(recipes);
    renderRecipes([randomRecipe]);
}

function filterRecipes(query) {
    query = query.toLowerCase();
    return recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
        recipe.recipeIngredient.some(ingredient => ingredient.toLowerCase().includes(query))
    ).sort((a, b) => a.name.localeCompare(b.name));
}

const searchButton = document.querySelector('.search button');
const searchInput = document.querySelector('#search-input');

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    const query = searchInput.value;
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
});

document.addEventListener('DOMContentLoaded', init);
