// Global app controller
import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/base";

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

        // Search for recipies
        await state.search.getResults();

        // Render results on UI
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

