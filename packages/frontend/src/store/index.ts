import { App, reactive } from "vue"
import { Alert } from "./types"

const store = reactive({
  alerts: [] as Alert[],
  user: null,
  pageTitle: "",
})

const installStore = {
  install: (app: App) => {
    app.provide("store", store)
    app.config.globalProperties.$store = store
  },
}

export { store, installStore }

export default store
