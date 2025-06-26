import Vue from 'vue';
import VueRouter from 'vue-router';
import ContactsView from '../views/ContactsView.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/contacts' },
  { path: '/contacts', name: 'contacts', component: ContactsView },
  { path: '/call-logs', name: 'call-logs', component: () => import('../views/CallLogsView.vue') },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;