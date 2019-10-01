<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <p v-text="'Some text'"></p>
                <p v-html="'<b>Some bold text</b>'"></p>
            </div>
        </div>            
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h3>Custom directives</h3>
                <p v-highlight:background="'lightgreen'">Color this background</p>
                <p v-highlight="'red'">Color this text</p>
                <p v-highlight:background.delayed="'lightcoral'">Color this delayed</p>
                <p v-local-highlight:background.delayed.blink="{mainColor: 'lightcoral', secondColor: 'lightblue', delay: 500}">Color this with local</p>
            </div>
        </div>            
    </div>
</template>

<script>
export default {
    data() {
        return {
           
        }
    },
    // Local directive
    directives: {
        'local-highlight': {
            bind(el, binding) {
                let delay = 0;
                if (binding.modifiers['delayed']) {
                    delay = 3000;
                }
                if (binding.modifiers['blink']) {
                    let mainColor = binding.value.mainColor;
                    let secondColor = binding.value.secondColor;
                    let currentColor = mainColor;
                    setTimeout(() => {
                        setInterval(() => {
                            currentColor == secondColor ? currentColor = mainColor : currentColor = secondColor;
                            if (binding.arg == 'background') {
                                el.style.backgroundColor = currentColor;
                            } else {
                                el.style.color = currentColor;
                            }
                        }, binding.value.delay);
                    }, delay);
                } else {
                    setTimeout(() => {
                        if (binding.arg == 'background') {
                            el.style.backgroundColor = binding.value;
                        } else {
                            el.style.color = binding.value;
                        }
                    }, delay);
                }
            }
        }
    },
    components: {
        
    },
    methods: {
        
    }
}
</script>

<style>

</style>
