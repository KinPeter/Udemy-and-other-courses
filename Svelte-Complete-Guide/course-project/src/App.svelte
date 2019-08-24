<script>
    import { onMount } from 'svelte';
    import Header from './UI/Header.svelte';
    import Error from './UI/Error.svelte';
    import Button from './UI/Button.svelte';
    import TextInput from './UI/TextInput.svelte';
    import MeetupGrid from './Meetups/MeetupGrid.svelte';
    import EditMeetup from './Meetups/EditMeetup.svelte';
    import MeetupDetail from './Meetups/MeetupDetail.svelte';
    import Spinner from './UI/Spinner.svelte'

    import meetupsStore from './Meetups/meetups-store.js';

    let editMode;
    let editedId;
    let page = 'overview';
    let pageData = {};
    let isLoading = true;
    let error;

    onMount(() => {
        fetch('https://svelte-course-project.firebaseio.com/meetups.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error occured.');
            }
            return response.json();
        }).then((data) => {
            const loadedMeetups = [];
            for (const key in data) {
                loadedMeetups.push({
                    ...data[key],
                    id: key
                });
            }
            console.log(loadedMeetups);
            meetupsStore.setMeetups(loadedMeetups.reverse());
        }).catch((err) => {
            error = err;
            console.log(err);
        }).finally(() => {
            isLoading = false;
        });
    });


    function saveMeetup(event) {        
        editMode = null;
        editedId = null;
    }

    function cancelEdit() {
        editMode = null;
        editedId = null;
    }

    function showDetails(event) {
        page = 'details';
        pageData.id = event.detail;
    }

    function closeDetails() {
        page = 'overview';
        pageData = {};
    }

    function startEdit(event) {
        editMode = 'edit';
        editedId = event.detail;
    }

</script>

<style>
    main {
        margin-top: 5rem;
    }
</style>


<Header />

{#if error}
<Error message={error.message} on:cancel={() => {error = null}}/>
{/if}

<main>
{#if page === 'overview'}
    {#if editMode === 'edit'}
        <EditMeetup 
            id={editedId}
            on:save={saveMeetup}
            on:cancel={cancelEdit}/>
    {/if}
    {#if isLoading}
        <Spinner />
    {:else}
        <MeetupGrid 
            meetups={$meetupsStore} 
            on:showdetails={showDetails}
            on:edit={startEdit}
            on:add={() => {editMode = 'edit'}}/>
    {/if}
{:else}
    <MeetupDetail 
        id={pageData.id} 
        on:close={closeDetails}/>
{/if}
</main>

