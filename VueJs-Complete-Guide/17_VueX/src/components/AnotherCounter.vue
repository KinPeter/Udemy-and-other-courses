<template>
    <div>
        <button 
            class="btn btn-primary" 
            @click="asyncIncrement({by: 200, duration: 1000})" 
            style="margin-right: 5px">
            Increment
        </button>
        <button 
            class="btn btn-primary" 
            @click="asyncDecrement({by: 50, duration: 2000})">
            Decrement
        </button>
    </div>
</template>

<script>
    import { mapMutations, mapActions } from 'vuex';
    export default {
        methods: {
            ...mapMutations(['increment', 'decrement']),
            ...mapActions(['asyncIncrement', 'asyncDecrement'])
        }
    }
</script>