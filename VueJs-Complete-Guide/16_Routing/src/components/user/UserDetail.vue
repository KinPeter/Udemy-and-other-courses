<template>
    <div>
        <h3>Some User Details</h3>
        <p>User loaded has ID: {{ $route.params.id }}</p>
        <router-link 
            tag="button" 
            :to="{ 
                name: 'userEdit', 
                params: { id: $route.params.id }, 
                query: { locale: 'en', q: 100 },
                hash: '#extra' 
            }" 
            class="btn btn-primary">
            Edit user
        </router-link>
    </div>
</template>

<script>
export default {
    // local ROUTE GUARD
    beforeRouteEnter(to, from, next) {
        // runs before the component is created!
        console.log('guard inside the component');
        next();
    }
}
</script>