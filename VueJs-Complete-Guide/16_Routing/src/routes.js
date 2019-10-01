import Home from './components/Home.vue';

// Lazy loading "Users" with webpack:
const User = (resolve) => {
    require.ensure(['./components/user/User.vue'], () => {
        resolve(require('./components/user/User.vue'));
    }, 'userGroup') // last arg, 'userGroup' is optional to put these 4 files into one bundle
}
const UserStart = (resolve) => {
    require.ensure(['./components/user/UserStart.vue'], () => {
        resolve(require('./components/user/UserStart.vue'));
    }, 'userGroup') // last arg, 'userGroup' is optional to put these 4 files into one bundle
}
const UserDetail = (resolve) => {
    require.ensure(['./components/user/UserDetail.vue'], () => {
        resolve(require('./components/user/UserDetail.vue'));
    }, 'userGroup') // last arg, 'userGroup' is optional to put these 4 files into one bundle
}
const UserEdit = (resolve) => {
    require.ensure(['./components/user/UserEdit.vue'], () => {
        resolve(require('./components/user/UserEdit.vue'));
    }, 'userGroup') // last arg, 'userGroup' is optional to put these 4 files into one bundle
}

export const routes = [
    { path: '', component: Home, name: 'home' },
    { path: '/user', component: User, children: [
        { path: '', component: UserStart },
        { path: ':id', component: UserDetail, beforeEnter: (to, from, next) => {
            console.log('guard inside route setup');
            next();
        } },
        { path: ':id/edit', component: UserEdit, name: 'userEdit' }
    ] },
    { path: '/redirect-me', redirect: '/user' },
    { path: '/redirect-home', redirect: {name: 'home'} },
    { path: '*', redirect: '/' }
];
