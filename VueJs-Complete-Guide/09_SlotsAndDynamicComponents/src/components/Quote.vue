<template>
    <div class="quote">
        <div class="title">
            <slot name="title"></slot>
            <span style="color: #ccc">
                <slot name="subtitle">The subtitle</slot>
            </span>
        </div>
        <hr>
        <slot name="content"></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style>
div.quote {
    border: 1px solid #ccc;
    box-shadow: 1px 1px 2px #000;
    padding: 30px;
    margin: 10px auto;
}
h2 {
    color: red;
}
.title {
    font-style: italic;
}
</style>