import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'
import Form from '../views/Form.vue'
import Ramais from '../views/Ramais.vue'
import NoMap from '../views/NoMap.vue'
import FormScript from '../views/FormScript.vue'
import Things from '../views/Things.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: List
  },
  {
    path: '/form',
    name: 'form',
    component: Form
  },
  {
    path: '/ramais',
    name: 'ramais',
    component: Ramais
  },
    {
    path: '/NoMap',
    name: 'nomap',
    component: NoMap
  },
  {
    path: '/FormScript',
    name: 'formscript',
    component: FormScript
  },
  {
    path: '/Things',
    name: 'things',
    component: Things
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
