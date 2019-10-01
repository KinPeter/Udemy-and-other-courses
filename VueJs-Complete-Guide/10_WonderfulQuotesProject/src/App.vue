<template>
    <div class="container">
        <app-header :quoteCount="quotes.length" :maxQuotes="maxQuotes"></app-header>
        <app-new-quote @quoteAdded="addNewQuote"></app-new-quote>
        <app-quote-grid :quotes="quotes" @quoteDeleted="deleteQuote"></app-quote-grid>
        <div class="alert alert-info text-center">Info: Click on a quote to delete it.</div>
    </div>
</template>

<script>
import QuoteGrid from './components/QuoteGrid.vue';
import NewQuote from './components/NewQuote.vue';
import Header from './components/Header.vue';
export default {
    data() {
        return {
            maxQuotes: 10,
            quotes: ["Just a quote to see something."]
        };
    },
    components: {
        appQuoteGrid: QuoteGrid,
        appNewQuote: NewQuote,
        appHeader: Header,
    },
    methods: {
        addNewQuote(eventData) {
            if (this.quotes.length === 10) {
                return alert('Please delete some quotes first!');
            }
            this.quotes.push(eventData);
        },
        deleteQuote(eventData) {
            this.quotes.splice(eventData, 1);
        }
    }
};
</script>

<style>
</style>