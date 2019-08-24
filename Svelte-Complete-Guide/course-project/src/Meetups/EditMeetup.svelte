<script>
    import { createEventDispatcher } from 'svelte';
    import TextInput from '../UI/TextInput.svelte';
    import Button from '../UI/Button.svelte';
    import Modal from '../UI/Modal.svelte';
    import meetupsStore from './meetups-store.js';
    import { isEmpty, isValidEmail } from '../Helpers/validation.js';

    const dispatch = createEventDispatcher();

    export let id = null;

    let title = '';
    let subtitle = '';
    let description = '';
    let imageUrl = '';
    let address = '';
    let contactEmail = '';

    if (id) {
        const unsubscribe = meetupsStore.subscribe((items) => {
            const selectedMeetup = items.find(i => i.id === id);
            title = selectedMeetup.title;
            subtitle = selectedMeetup.subtitle;
            description = selectedMeetup.description;
            imageUrl = selectedMeetup.imageUrl;
            address = selectedMeetup.address;
            contactEmail = selectedMeetup.contactEmail;
        });

        unsubscribe();
    }

    
    $: titleValid = !isEmpty(title);
    $: subtitleValid = !isEmpty(subtitle);
    $: addressValid = !isEmpty(address);
    $: descriptionValid = !isEmpty(description);
    $: imageUrlValid = !isEmpty(imageUrl);
    $: contactEmailValid = isValidEmail(contactEmail);
    $: formValid = titleValid && subtitleValid && addressValid && descriptionValid && imageUrlValid && contactEmailValid;

    function submitForm() {
        const meetupData = {
            title: title,
            subtitle: subtitle,
            description: description,
            address: address,
            contactEmail: contactEmail,
            imageUrl: 'https://loremflickr.com/640/480/' + imageUrl
        };

        if (id) {
            fetch(`https://svelte-course-project.firebaseio.com/meetups/${id}.json`, {
                method: 'PATCH',
                body: JSON.stringify(meetupData),
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Error occured.');
                }
                meetupsStore.updateMeetup(id, meetupData);
            }).catch((error) => {
                console.log(error);
            });
        } else {
            fetch('https://svelte-course-project.firebaseio.com/meetups.json', {
                method: 'POST',
                body: JSON.stringify({...meetupData, isFavorite: false}),
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Error occured.');
                }
                return response.json();
            }).then((data) => {
                meetupsStore.addMeetup({...meetupData, isFavorite: false, id: data.name});
            }).catch((error) => {
                console.log(error);
            });
        }
        dispatch('save');
    }

    function deleteMeetup() {
        fetch(`https://svelte-course-project.firebaseio.com/meetups/${id}.json`, {
                method: 'DELETE'
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Error occured.');
                }
                meetupsStore.removeMeetup(id);
            }).catch((error) => {
                console.log(error);
            });
        dispatch('save');
    }

    function cancel() {
        dispatch('cancel');
    }
</script>

<style>
    form {
        width: 100%;
    }
</style>

<Modal title="Edit Meetup Data" on:cancel >
    <form on:submit|preventDefault="{submitForm}">
        <TextInput 
            id="title"
            label="Title"
            valid={titleValid}
            validityMessage="Please enter a valid title."
            value={title}
            on:input="{(event) => {title = event.target.value;}}" />
        <TextInput 
            id="subtitle"
            label="Subtitle"
            valid={subtitleValid}
            validityMessage="Please enter a valid subtitle."
            value={subtitle}
            on:input="{(event) => {subtitle = event.target.value;}}" />
        <TextInput 
            id="address"
            label="Address"
            valid={addressValid}
            validityMessage="Please enter a valid address."
            value={address}
            on:input="{(event) => {address = event.target.value;}}" />
        <TextInput 
            id="imageUrl"
            label="Image URL"
            valid={imageUrlValid}
            validityMessage="Please enter a valid URL."
            value={imageUrl}
            on:input="{(event) => {imageUrl = event.target.value;}}" />
        <TextInput 
            id="contactEmail"
            type="email"
            label="Email"
            valid={contactEmailValid}
            validityMessage="Please enter a valid email."
            value={contactEmail}
            on:input="{(event) => {contactEmail = event.target.value;}}" />
        <TextInput 
            id="description"
            controlType="textarea"
            rows="3"
            label="Description"
            valid={descriptionValid}
            validityMessage="Please enter a valid description."
            value={description}
            on:input="{(event) => {description = event.target.value;}}" />
    </form>
    <div slot="footer">
        <Button 
            type="button" 
            mode="outline" 
            on:click="{cancel}">
            Cancel
        </Button>
        <Button 
            type="button" 
            on:click="{submitForm}" 
            disabled={!formValid}>
            Save
        </Button>
        <!-- if in edit mode -->
        {#if id} 
            <Button 
                type="button" 
                on:click="{deleteMeetup}">
                Delete
            </Button>
        {/if}

    </div>
</Modal>