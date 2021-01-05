import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import asyncDataMixin from './mixins/async-data';


export const createApp = context => {
    const router = createRouter();
    const store = createStore();
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });
    Vue.mixin(asyncDataMixin);
    return { app, router };
};