<script>
    // import { writable } from 'svelte/store';
    import { tweened } from 'svelte/motion';
    import { cubicIn } from 'svelte/easing';
    import { fade, fly, slide, scale } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    import Spring from './Spring.svelte';

    const progress = tweened(0, {
        delay: 0,
        duration: 700,
        easing: cubicIn
    });

    setTimeout(() => {
        progress.set(0.5)
    }, 1500);


    let boxes = [];
    let boxInput;

    function addBox() {
        boxes = [boxInput.value, ...boxes]
    }

    const flyParams = {
        delay: 0,
        duration: 500,
        easing: cubicIn, // must be imported
        opacity: 0.1, // starting opacity
        x: 300, 
        y: -200,
    }

    function discard(value) {
        boxes = boxes.filter(elem => elem !== value);
    }

    let showParagraph = true;

</script>

<style>
    .box {
        width: 10rem;
        height: 10rem;
        background-color: #ccc;
        margin: 1rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.6);
        border-radius: 5px;
        padding: 1rem;
    }
</style>

<!-- Simple animation with "Tweened" subpackage -->
<!-- <progress value={$progress} ></progress> -->

<!-- More natural felt animation with "Spring" subpackage -->
<!-- <Spring /> -->
<!-- Spring and Tweened works with any store of numbers or dates -->


<!-- TRANSITIONS -->
<input type="text" bind:this={boxInput}>
<button on:click={addBox}>Add</button>
<!-- Transitions and events on transitions -->
{#each boxes as box (box)}
    <div 
        transition:fly={flyParams} 
        class="box"
        on:click={discard.bind(this, box)}
        on:introstart={() => {console.log('Adding the element starts');}}
        on:introend={() => {console.log('Adding the element ends');}}
        on:outrostart={() => {console.log('Removing the element starts');}}
        on:outroend={() => {console.log('Removing the element ends');}}
        animate:flip={{delay: 0, duration: 200, easing: cubicIn}} >
        {box}
    </div>
{/each}
<!-- animate:flip is animating the passive elements (other elements of the list)  -->

<hr>
<button on:click={() => {showParagraph = !showParagraph}}>Toggle</button>
{#if showParagraph}
    <!-- Different in- and out- transition -->
    <p in:fade out:fly={{y: 300}}>Can you see me?</p>
{/if}