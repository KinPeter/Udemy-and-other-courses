const state = {
    value: 0
};

const getters = {
    value(state) {
        return state.value;
    }
};

const mutations = {
    updateValue(state, payload) {
        state.value = payload;
    }
};

const actions = {
    updateValue(context, payload) {
        context.commit('updateValue', payload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}
