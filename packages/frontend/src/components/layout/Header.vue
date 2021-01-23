<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item is-size-5" to="/">
          <strong>OKBOT</strong>
        </router-link>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          @click="borgar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="main-nav" class="navbar-menu" ref="nav">
        <div class="navbar-start">
          <router-link
            to="/announce"
            active-class="is-active"
            class="navbar-item"
            >Nové oznámení</router-link
          >
          <router-link to="/poll" active-class="is-active" class="navbar-item"
            >Nové hlasování</router-link
          >
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-danger">Odhlásit se</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue"

export type ClickEvent = {
  target: HTMLElement
}

export type LocalRefs = {
  [key: string]: HTMLElement
  nav: HTMLDivElement
}

export default Vue.extend({
  methods: {
    borgar(event: ClickEvent) {
      const el = event.target
      console.log(event)

      el.classList.toggle("is-active")
      ;(this.$refs as LocalRefs).nav.classList.toggle("is-active")
    },
  },
})
</script>
