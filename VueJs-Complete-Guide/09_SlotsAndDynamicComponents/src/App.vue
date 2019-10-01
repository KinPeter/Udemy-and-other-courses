<template>
<div class="container">
    <div class="row">
        <div class="col col-xs-12 text-center">
            <button @click="selectedComponent = 'app-quote'">Quote</button>
            <button @click="selectedComponent = 'app-author'">Author</button>
            <button @click="selectedComponent = 'app-new'">New</button>
            <p>{{ selectedComponent }}</p>
            <hr>
            <keep-alive>
                <component :is="selectedComponent"></component>
            </keep-alive>
            <app-quote>
                <h2 slot="title">The Quote</h2>
                <p slot="content">A wonderful quote!</p>
            </app-quote>
        </div>
    </div>
</div>
</template>

<script>
import Quote from './components/Quote.vue';
import Author from './components/Author.vue';
import New from './components/New.vue';

export default {
    data() {
        return {
            selectedComponent: 'app-quote'
        };
    },
    components: {
        appQuote: Quote,
        appAuthor: Author,
        appNew: New
    }
}
</script>

<style>

</style>
