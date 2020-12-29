import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                name: 'layout',
                path: '/',
                component: () => import(/* webpackChunkName: "layout" */ './layout/index.vue'),
                children: [
                    {
                        name: 'home',
                        path: 'home',
                        meta: {
                            isCloseSSr: true
                        },
                        component: () => import(/* webpackChunkName: "home" */ './pages/home/index.vue')
                    },
                    {
                        name: '404',
                        path: '404',
                        component: () => import(/* webpackChunkName: "404" */ './pages/404/index.vue')
                    },
                ]
            },
            // {
            //     path: '*',
            //     redirect: '/404'
            // }
        ]
    });
};