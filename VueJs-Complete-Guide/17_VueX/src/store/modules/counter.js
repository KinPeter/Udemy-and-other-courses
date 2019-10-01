const state = {
    counter: 0
};

const getters = {
    doubleCounter: (state) => {
        return state.counter * 2;
    },
    stringCounter(state) {
        return state.counter + ' clicks';
    },
};

const mutations = {
    increment(state, payload) {
        state.counter += payload;
    },
    decrement(state, payload) {
        state.counter -= payload;
    },
};

const actions = {
    increment(context, payload) {
        context.commit('increment', payload);
    },
    decrement(context, payload) {
        context.commit('decrement', payload);
    },
    asyncIncrement(context, payload) {
        setTimeout(() => {
            context.commit('increment', payload.by);
        }, payload.duration);
    },
    asyncDecrement(context, payload) {
        setTimeout(() => {
            context.commit('decrement', payload.by);
        }, payload.duration);
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}