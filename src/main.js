import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import tw from 'vee-validate/dist/locale/zh_TW.json';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import App from './App.vue';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import formatDateFilter from './filters/formatDate';

library.add(fas, fab);
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize('zh_TW', tw);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
Vue.use(Vuex);
Vue.component('Loading', Loading);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.filter('currency', currencyFilter);
Vue.filter('formatDate', formatDateFilter);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) document.title = to.meta.title;
  if (to.meta.requiresAuth) {
    const url = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    const res = await axios.post(url);
    if (res.data.success) next();
    else next({ path: '/login' });
  } else next();
});
