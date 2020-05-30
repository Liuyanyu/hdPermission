import Vue from "vue";
import Router from "vue-router";

import login from "@/views/login";
import permission from "@/views/permission";

Vue.use(Router);
// 页面刷新时，重新赋值token
// if (sessionStorage.getItem('token')) {
//   store.commit('set_token', sessionStorage.getItem('token'))
// }
export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      name: "login",
      component: login
    },
    {
      name: "permission",
      path: "./permission",
      component: permission
    }
  ]
});