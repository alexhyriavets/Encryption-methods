import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue'
import Affine from '@/views/Affine.vue'
import BitPermutation from '@/views/BitPermutation.vue'
import Hill from '@/views/Hill.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/affine',
      name: 'affine',
      component: Affine,
    },
    {
      path: '/bit-permutation',
      name: 'bit-permutation',
      component: BitPermutation,
    },
    {
      path: '/hill',
      name: 'hill',
      component: Hill,
    },
  ],
});
