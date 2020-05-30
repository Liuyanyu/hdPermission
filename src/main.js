import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "@assets/base.styl";
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  ak: "yhGtwOULKUiUF4BIvyH75zGzLN0PdSrr"
});

// import { BmlMarkerClusterer } from 'vue-baidu-map'
// Vue.component('bml-marker-cluster', BmlMarkerClusterer)


import "lib-flexible";
import "./util/rem";
// import VCharts from "v-charts";

// Vue.use(VCharts);
import Video from "video.js";
import "video.js/dist/video-js.css";

import $ from "jquery";
// window.jQuery = $;
// window.$ = $;
Vue.prototype.$ = $;
//引入公共css文件
import "@assets/css/sidebarStyle.css";
import "@assets/css/sidebarCirStyle.css";

import select from "./util/select.js";
// axios.defaults.headers.common['Authentication-Token'] = store.state.token;
export default {
  select
};

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.config.debug = true;
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

Vue.prototype.$video = Video;
Vue.use(ElementUI, {
  size: "small",
  zIndex: 3000
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
