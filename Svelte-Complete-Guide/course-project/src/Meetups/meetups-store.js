import { writable } from 'svelte/store';

const meetups = writable([]);

const customStore = {
    subscribe: meetups.subscribe,
    setMeetups: (meetupsArray) => {
        meetups.set(meetupsArray);
    },
    addMeetup: (meetupData) => {
        meetups.update((items) => {
            return [meetupData, ...items];
        });
    },
    updateMeetup: (id, meetupData) => {
        meetups.update((items) => {
            const meetupIndex = items.findIndex(i => i.id === id);
            const updatedMeetup = { ...items[meetupIndex], ...meetupData };
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        });
    },
    removeMeetup: (id) => {
        meetups.update((items) => {
            return items.filter(i => i.id !== id);
        });
    },
    toggleFavorite: (id) => {
        meetups.update((items) => {
            const updatedMeetup = { ...items.find(meetup => meetup.id === id) };
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
            const meetupIndex = items.findIndex(meetup => meetup.id === id);
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        });
    },
}

export default customStore;