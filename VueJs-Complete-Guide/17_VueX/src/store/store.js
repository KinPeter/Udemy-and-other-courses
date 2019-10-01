import Vue from 'vue';
import Vuex from 'vuex';
import Counter from './modules/counter';
// import Value from './modules/value';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        value: 0
    },
    getters: {
        value(state) {
            return state.value;
        }        
    },
    mutations: {
        updateValue(state, payload) {
            state.value = payload;
        }    
    },
    actions: {
        updateValue(context, payload) {
            context.commit('updateValue', payload);
        }    
    },
    modules: {
        // distributes all state, mutations, getters, actions from the Counter module file
        counter: Counter,
        // value: Value
    }
});