<template>
    <div class="component">
        <h3>You may edit the User here</h3>
        <p>Age: {{ userAge }}</p>
        <button @click="editAge" >Edit age</button>
    </div>
</template>

<script>
import { eventBus } from '../main';

export default {
    props: ['userAge'],
    methods: {
        editAge() {
            // this.userAge = 30;
            const newAge = 30;
            // this.$emit('ageWasEdited', this.userAge);
            eventBus.$emit('ageWasEdited', newAge);
        }
    }
}
</script>

<style scoped>
    div.component {
        background-color: lightgreen;
    }
</style>
