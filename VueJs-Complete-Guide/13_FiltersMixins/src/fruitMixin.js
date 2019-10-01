export const fruitMixin = {
    data() {
        return {
            fruits: ['Apple', 'Banana', 'Mango', 'Melon'],
            filterText: ''
        }
    },
    computed: {
        // Computed properties are more performant than filters!
        filteredFruits() {
            return this.fruits.filter((fruit) => {
                return fruit.match(this.filterText);
            });
        }
    },
    created() {
        console.log('Mixin created');
    }
}