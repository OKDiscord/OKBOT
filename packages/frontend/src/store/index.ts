import Vue from "vue"
import Vuex, { GetterTree, ActionTree, MutationTree, Action } from "vuex"

Vue.use(Vuex)

export type FlashMessage = {
  title: string
  message: string | string[]
  type: "danger" | "info" | "success" | "warning"
}

const state = () => ({
  flashMessages: [] as FlashMessage[]
})

const getters: GetterTree<AppState, AppState> = {
  getFlashMessages: state => state.flashMessages
}

const actions: ActionTree<AppState, AppState> = {
  flashMessage: ({ commit }, flash: FlashMessage) => {
    commit("flash", flash)
  },
  flashOneMessage: ({ commit }, flash: FlashMessage) => {
    commit("flashOnly", flash)
  },
  clearFlash: ({ commit }) => {
    commit("clearFlash")
  }
}

const mutations: MutationTree<AppState> = {
  flash: (state, flash: FlashMessage) => {
    return state.flashMessages.push(flash)
  },
  flashOnly: (state, flash: FlashMessage) => {
    return (state.flashMessages = [flash])
  },
  clearFlash: state => {
    return (state.flashMessages = [])
  }
}

const modules = {}

export type AppState = ReturnType<typeof state>

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules
})
