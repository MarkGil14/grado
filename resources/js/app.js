
require('./bootstrap');
window.Vue = require('vue');
import VueRouter from 'vue-router';
Vue.use(VueRouter);

let routes = [
    { path : '/dashboard', component : require('./components/ExampleComponent.vue') },
    { path : '/profile', component : require('./components/Profile.vue') }
] 
Vue.component('example-component', require('./components/ExampleComponent.vue'));

const router = new VueRouter({
    mode : 'history',
    routes
})


const app = new Vue({
    el: '#app',
    router 
});
