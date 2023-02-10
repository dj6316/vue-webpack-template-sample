import AppHome from './components/AppHome.vue';
const AppMedium = () => import('./components/AppMedium.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AppHome,
  },
  {
    path: '/medium',
    name: 'Medium',
    component: AppMedium,
  },
];

export default routes;
