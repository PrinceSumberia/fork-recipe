import axios from 'axios';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const key = '371dfa06eaf39a2f9894ff6076d3bb8a';
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            console.log(error);
        }
    }
}

