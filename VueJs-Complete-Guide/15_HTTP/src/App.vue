<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Http</h1>
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" v-model="user.username">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" v-model="user.email">
                </div>
                <button class="btn btn-primary" @click="submit">Submit</button>
                <hr>
                <input type="text" class="form-control" v-model="node">
                <br><br>
                <button class="btn btn-primary" @click="fetchData">Get Data</button>
                <br><br>

                <ul class="list-group">
                    <li class="list-group-item" v-for="u in users" :key="u.username">
                        {{ u.username }} ({{ u.email }})
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>

<script>

    export default {
        data() {
            return {
                user: {
                    username: '',
                    email: ''
                },
                users: [],
                resource: {},
                node: 'data'
            }
        },
        components: {
            
        },
        methods: {
            submit() {
                // this.$http.post('data.json', this.user)
                // .then((response) => {
                //     console.log(response);
                // })
                // .catch((error) => {
                //     console.log(error);
                // });

                // Using resource action method:
                // this.resource.save({/*options*/}, this.user);
                this.resource.saveAlt({/*options*/}, this.user);
            },
            fetchData() {
                // this.$http.get('data.json')
                // .then((response) => {
                //     return response.json();
                // })
                // .then((data) => {
                //     this.users = Object.values(data);
                // })
                // .catch((error) => {
                //     console.log(error);
                // });

                this.resource.getData({node: this.node})
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.users = Object.values(data);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        },
        created() {
            // Default resource setup: 
            // this.resource = this.$resource('data.json');

            // Custom resource actions
            const customActions = {
                saveAlt: {
                    method: 'POST',
                    url: 'alternative.json'
                },
                getData: {
                    method: 'GET'
                }
            }
            this.resource = this.$resource('{node}.json', {}, customActions);
        }
    }
</script>

<style>


</style>
