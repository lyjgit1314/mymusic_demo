import Vue from 'vue'
import VueRouter from 'vue-router'
import indexview from '../views/index/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'index',
    component: indexview,
    children:[
      {
        path: '/',
        name: 'index',
        component: () => import('../views/index/indexdata'),
      },
      {
        path: '/musicdetail/:id',
        name: 'musicdetail',
        component: () => import('../views/musicdetail/musicdetail'),
      },
      {
        path: '/twolist',
        name: 'twolist',
        component: () => import('../views/twolist/twolist'),
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
