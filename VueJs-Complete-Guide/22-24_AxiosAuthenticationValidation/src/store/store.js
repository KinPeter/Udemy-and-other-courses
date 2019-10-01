import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth'; // our custom axios instance
import globalAxios from 'axios';
import router from '../router';
import { apikey } from '../../key';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        idToken: null,
        userId: null,
        user: null
    },
    getters: {
        user(state) {
            return state.user;
        },
        isAuth(state) {
            return state.idToken !== null;
        }
    },
    mutations: {
        authUser(state, userData) {
            state.idToken = userData.token;
            state.userId = userData.userId;
        },
        storeUser(state, user) {
            state.user = user;
        },
        clearAuthData(state) {
            state.idToken = null;
            state.userId = null;
            state.user = null;
        }
    },
    actions: {
        setLogoutTimer(context, expirationTime) {
            setTimeout(() => {
                context.dispatch('logout');
            }, expirationTime * 1000);
        },
        signup(context, authData) {
            axios.post(':signUp?key=' + apikey, {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
            .then((response) => {
                console.log(response);
                context.commit('authUser', {
                    token: response.data.idToken,
                    userId: response.data.localId
                });
                const now = new Date();
                const expDate = new Date(now.getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expDate);
                context.dispatch('storeUser', authData);
                context.dispatch('setLogoutTimer', response.data.expiresIn);
            }).catch((error) => {
                console.log(error);
            });
        },
        login(context, authData) {
            axios.post(':signInWithPassword?key=' + apikey, {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
            .then((response) => {
                console.log(response);
                context.commit('authUser', {
                    token: response.data.idToken,
                    userId: response.data.localId
                });
                const now = new Date();
                const expDate = new Date(now.getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expDate);
                context.dispatch('setLogoutTimer', response.data.expiresIn);
            }).catch((error) => {
                console.log(error);
            });
        },
        tryAutoLogin(context) {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const expDate = localStorage.getItem('expirationDate');
            const now = new Date();
            if (now >= expDate) {
                return;
            }
            const userId = localStorage.getItem('userId');
            context.commit('authUser', {token, userId});
            router.push('/dashboard');
        },
        storeUser(context, userData) {
            if (!context.state.idToken) {
                return;
            }
            globalAxios.post('/users.json' + '?auth=' + context.state.idToken, userData)
            .then((response) => {
                console.log(response);
                context.commit();
            }).catch((error) => {
                console.log(error);
            });
        },
        fetchUser(context) {
            globalAxios.get('/users.json' + '?auth=' + context.state.idToken)
            .then((response) => {
                console.log(response);
                context.commit('storeUser', Object.values(response.data)[0]);
            }).catch((error) => {
                console.log(error);
            });
        },
        logout(context) {
            context.commit('clearAuthData');
            localStorage.clear();
            router.replace('/signin');
        }
    },
    modules: {
        
    }
});