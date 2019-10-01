<template>
    <div class="component">
        <h1>The User Component</h1>
        <p>I'm an awesome User!</p>
        <button @click="changeName">Change my name</button>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail 
                    :name="name" 
                    @nameWasReset="name = $event"
                    :resetFn="resetName"
                    :userAge="age">
                </app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit 
                    :userAge="age">
                </app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>
import UserDetail from './UserDetail.vue';
import UserEdit from './UserEdit.vue';
import { eventBus } from '../main';

export default {
    data() {
        return {
            name: 'Peter',
            age: 34
        };
    },
    methods: {
        changeName() {
            this.name = 'Cheyun'
        }, 
        resetName() {
            this.name = 'Peter'
        }
    },
    components: {
        appUserDetail: UserDetail,
        appUserEdit: UserEdit
    },
    created() {
        eventBus.$on('ageWasEdited', (eventData) => {
            this.age = eventData;
        });
    }
}
</script>

<style >
    div.component {
        background-color: lightblue;
    }
</style>
