<template>
    <div>
        <h3>List Component with mixin</h3>
        <input type="text" v-model="filterText">
        <ul>
            <li v-for="fruit in filteredFruits" v-bind:key="fruit">{{ fruit }}</li>
        </ul>
    </div>
</template>

<script>
import { fruitMixin } from '../fruitMixin';

export default {
    mixins: [fruitMixin],
    created() {
        console.log('List component created');
    }
}
</script>

<style>

</style>
