<template>
    <div class="quote">
        <h3>New Quote</h3>
    </div>
</template>

<script>
export default {
    destroyed() {
        console.log('Destroyed!');
    },
    activated() {
        console.log('Activated!');
    },
    deactivated() {
        console.log('Deactivated!');
    }
}
</script>

<style>

</style>