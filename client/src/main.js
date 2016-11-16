import Vue from 'vue'
import App from './App.vue'
import routes from "./routes.js";
import page from "page";

var app = new Vue({
   el: '#app',
   template: '<ke-app v-bind:route="getRoute"></ke-app>',
   data() {
       return {
           route: ''
       }
   },
   computed: {
       getRoute() {
           return this.route;
       }
   },
   components: {
       'ke-app': App
   }
})

Object.keys(routes).forEach(route => {
    var r = routes[route];
    page(route, () => app.route = r)
})

page('*', () => app.route = '404')
page()
