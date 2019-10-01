<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>User name: {{ name }}</p>
        <p>Reversed name: {{ switchName() }}</p>
        <p>User age: {{ userAge }}</p>
        <button @click="resetName()">Reset name with custom event</button>
        <button @click="resetFn()">Reset name with Function prop</button>
    </div>
</template>

<script>

export default {
    props: {
        // PROP validation
        // name: String
        // name: [String, Array]
        name: {
            type: String,
            required: true,
            default: 'Peter' // if NOT required
        },
        resetFn: Function,
        userAge: Number
    },
    methods: {
        switchName() {
            return this.name.split('').reverse().join('');
        },
        resetName() {
            this.name = 'Peter';
            this.$emit('nameWasReset', this.name);
        }
    }
}
</script>

<style scoped>
    div.component {
        background-color: lightcoral;
    }
</style>
