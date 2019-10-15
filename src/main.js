import Vue from 'vue'
import App from './App.vue'
import router from 'router/index.js'
import store from 'store/store.js'
import axios from 'axios'
import * as config from 'api/config.js'
import 'assets/css/base.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = config.contentType
axios.defaults.timeout = config.timeout
axios.defaults.baseURL = config.baseURL

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')