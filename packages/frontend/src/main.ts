import Vue from "vue"
import App from "@/App.vue"
import router from "@/router"
import store from "@/store"

import "@/assets/scss/main.scss"
import { OKInstall } from "./app/OK"

// @ts-ignore
import vSelect from "vue-select"

Vue.config.productionTip = false

const bindToWindow = false

Vue.component("VSelect", vSelect)
Vue.use(new OKInstall())

const vue = new Vue({
  router,
  store,
  render: createElement => createElement(App)
}).$mount("#app")

if (bindToWindow) (window as any).Vue = vue
