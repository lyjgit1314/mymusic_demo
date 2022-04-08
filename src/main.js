import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入适配文件
import './components/flexible'

// 引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入业务请求api
import { request } from "./common/http";

// Vue.prototype.$request = request;
// 将请求挂载在vue原型上 ，可以全局使用
Vue.prototype.$api = request;





Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
