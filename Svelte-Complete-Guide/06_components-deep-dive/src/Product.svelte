<script>
    import { createEventDispatcher } from 'svelte';

    export let title;
    export let price;
    export let bestseller = false; // default value if not passed to this component

    const dispatch = createEventDispatcher();

    function addToCart() {
        dispatch('add-to-cart', {id: 'p1'});
    }
    function deleteMe() {
        dispatch('delete', 'I\'m deleted');
    }
</script>


<article>
    <h1>{title}</h1>
    <h3>${price}</h3>
    {#if bestseller}
        <h4>BESTSELLER</h4>
    {/if}
    <button on:click="{addToCart}">Add to cart</button>
    <button on:click="{deleteMe}">Delete</button>
</article>