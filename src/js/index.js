// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipe
**/

const state = {};

const controlSearch = async () => {
    // Get the query from view
    const query = searchView.getInput();

    if (query) {
        // New serach object and add to state
        state.search = new Search(query);

        // Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            await state.search.getResults();

            // Render results on UI
            clearLoader();

            searchView.renderResults(state.search.result);

        } catch (error) {
            console.log(error);
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    controlSearch();
});



elements.searchResPages.addEventListener('click', (event) => {
    const btn = event.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    if (id) {
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            state.recipe.calcTime();
            state.recipe.calcServings();

            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            console.log(error);
        }
    }
};

['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe));
