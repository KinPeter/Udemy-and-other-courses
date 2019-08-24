<script>
    import { onMount } from 'svelte';
    import hobbyStore from './hobby-store.js';

    let hobbyInput;
    let hobbies = [];
    let isLoading = false;

    onMount(() => {
        isLoading = true;
        let getHobbies = fetch('https://svelte-course-project.firebaseio.com/hobbies.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed!');
            }
            return response.json();
        }).then((data) => {
            hobbies = Object.values(data);
            hobbyStore.setHobbies(hobbies);
            // return hobbies;
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            isLoading = false;
        });
    });


    function addHobby() {
        hobbyStore.addHobby(hobbyInput.value);
        isLoading = true;
        fetch('https://svelte-course-project.firebaseio.com/hobbies.json', {
            method: 'POST',
            body: JSON.stringify(hobbyInput.value),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Failed!');
            }
            console.log('Saved Data');
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            isLoading = false;
        });
    }
</script>

<label for="hobby">Hobby</label>
<input type="text" id="hobby" bind:this={hobbyInput}>
<button on:click={addHobby}>Add hobby</button>

{#if isLoading}
    <p>Loading...</p>
{:else}
    <ul>
    {#each $hobbyStore as hobby}
        <li>{hobby}</li>
    {/each}
    </ul>
{/if}

<!-- {#await getHobbies}
<p>Loading...</p>
{:then hobbyData}
<ul>
    {#each hobbyData as hobby}
        <li>{hobby}</li>
    {/each}
</ul>
{:catch error}
<p>{error.message}</p>
{/await} -->