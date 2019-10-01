<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h3>Filters and Mixins</h3>
                <p>{{ text | toUppercase }}</p>
                <p>{{ text | to-lowercase }}</p>
                <p>{{ text | to-lowercase | toUppercase }}</p>
                <hr>
                <!-- Mixins are not shared (not singleton), they are created for each component! -->
                <button @click="fruits.push('Berries')">Add new item</button>
                <input type="text" v-model="filterText">
                <ul>
                    <li v-for="fruit in filteredFruits" v-bind:key="fruit">{{ fruit }}</li>
                </ul>
                <hr>
                <app-list></app-list>
            </div>
        </div>            
    </div>
</template>

<script>
import ListVue from './components/List.vue';
import { fruitMixin } from './fruitMixin';
export default {
    mixins: [fruitMixin],
    data() {
        return {
            text: 'Hello there!',
        }
    },
    // Local filters
    filters: {
        toUppercase(value) {
            return value.toUpperCase();
        }
    },
    components: {
        appList: ListVue
    },
    methods: {
        
    }
}
</script>

<style>

</style>
