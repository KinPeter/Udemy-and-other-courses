const vm1 = new Vue({
    el: '#app1',
    data: {
        title: 'The VueJS Instance',
        showParagraph: false
    },
    methods: {
        show() {
            this.showParagraph = true;
            this.updateTitle('The VueJS Instance (Updated)');
            console.log(this.$refs);
            console.log(this.$refs.myButton);
        },
        updateTitle(title) {
            this.title = title;
        }
    },
    computed: {
        lowercaseTitle() {
            return this.title.toLowerCase();
        }
    },
    watch: {
        title(value) {
            alert('Title changed, new value: ' + value);
        }
    }
});

const vm2 = new Vue({
    el: '#app2',
    data: {
        title: 'The second Instance',
    },
    methods: {
        onChange() {
            vm1.title = 'Changed!';
        }
    }
});

console.log(vm1);