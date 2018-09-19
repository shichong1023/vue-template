// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/index'
import requestUrl from './config/requestUrl'
import './config/elementUi'
import config from './config/index'
import $ from 'jquery'
//时间
import moment from 'moment';
import 'moment/locale/zh-cn';

Vue.config.productionTip = false

window.Moment = moment

// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$config = config

if (process.env.NODE_ENV === 'production') {
  // 生产环境
  Vue.prototype.$pathUrl = requestUrl.production
} else if (process.env.NODE_ENV === 'development') {
  // 开发环境
  Vue.prototype.$pathUrl = requestUrl.development
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
