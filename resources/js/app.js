
require('./bootstrap');
window.Vue = require('vue');
import moment from 'moment' 
import { Form, HasError, AlertError } from 'vform'
import Gate from "./Gate"
Vue.prototype.$gate  = new Gate(window.user);

import swal from 'sweetalert2'
window.swal = swal;
const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.toast = toast;


import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, { 
    color : 'rgb(143,255,199)',
    failedColor : 'red',
    heigth : '5px'
})

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router';
Vue.use(VueRouter);


let routes = [
    { path : '/dashboard', component : require('./components/Dashboard.vue').default },
    { path : '/users', component : require('./components/Users.vue').default },
    { path : '/developer', component : require('./components/Developer.vue').default },
    { path : '/profile', component : require('./components/Profile.vue').default }
    
] 
 
const router = new VueRouter({
    mode : 'history',
    routes
})

Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
});


Vue.filter('myDate', function(date){
    return moment(date).format('MMMM Do YYYY');
});


window.Fire = new Vue();


Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);



Vue.component(
    'not-found',
    require('./components/NotFound.vue').default
);

Vue.component('pagination', require('laravel-vue-pagination'));

const app = new Vue({
    el: '#app',
    router,
    data : {
        search : ''        
    },
    methods : {
        searchit : _.debounce(() => {
            Fire.$emit('searching');
        },2000)
    },
});
