<script>
    import ContactCard from "./ContactCard.svelte";

    let name = "Max";
    let title = "";
    let image = "https://loremflickr.com/320/240/face";
    let description = "";
    let formState = 'empty';

    let createdContact;
    let createdContacts = [];

    function addContact() {
        if (
            !name.trim().length || 
            !title.trim().length ||
            !image.trim().length ||
            !description.trim().length
        ) {
            formState = 'invalid';
            return;
        }
        // !IMPORTANT
        // Always need to reassign a referenc type object (array, etc) to a new
        // one if you want Svelte to properly update the DOM!
        // For Svelte, the "=" sign is the trigger!
        createdContacts = [...createdContacts, {
            id: new Date().getTime(),
            name: name,
            jobTitle: title,
            imageUrl: image,
            description: description
        }];
        formState = 'done';
    }

    function deleteFirst() {
        createdContacts = createdContacts.slice(1);
    }
    function deleteLast() {
        createdContacts = createdContacts.slice(0, -1);
    }
</script>

<style>
    #form {
        width: 30rem;
        max-width: 100%;
        margin: 1rem 0;
    }
</style>

<form id="form">
    <div class="form-control">
        <label for="userName">User Name</label>
        <input type="text" bind:value={name} id="userName" />
    </div>
    <div class="form-control">
        <label for="jobTitle">Job Title</label>
        <input type="text" bind:value={title} id="jobTitle" />
    </div>
    <div class="form-control">
        <label for="image">Image URL</label>
        <input type="text" bind:value={image} id="image" />
    </div>
    <div class="form-control">
        <label for="desc">Description</label>
        <textarea rows="3" bind:value={description} id="desc" />
    </div>
    <button type="submit" on:click|preventDefault="{addContact}">Add Contact Card</button>
</form>

<!-- Event modifiers used like this: on:event|modifier="{handlerFunction}"
- once
- passive
- capture
- stopPropagation
- preventDefault
e.g.: <button on:click|once="{addContact}">Add Contact Card</button> -->

<button on:click="{deleteFirst}">Delete First</button>
<button on:click="{deleteLast}">Delete Last</button>

<!-- Possible to add inline functions as handlers:
<button on:click="{(event) => {createdContacts = createdContacts.slice(0, -1);}}">Delete Last</button> -->

{#if formState == 'invalid'}
    <p>All fields are mandatory.</p>
{:else}
    <p>Please add some data and click the button!</p>
{/if}

<!-- (contact.id) is the unique key for each element -->
{#each createdContacts as contact, index (contact.id)}
<h2># {index + 1}</h2>
<ContactCard 
    userName={contact.name} 
    jobTitle={contact.jobTitle} 
    description={contact.description} 
    userImage={contact.imageUrl} />
{:else}
    <p>Please start adding contacts.</p>
{/each}