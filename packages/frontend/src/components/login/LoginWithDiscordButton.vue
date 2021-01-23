<template>
  <button
    class="button is-medium"
    @click.prevent="discord"
    :class="{
      'is-discord': !loadingDiscord,
      'is-dark is-loading': loadingDiscord
    }"
  >
    Přihlásit se přes Discord
  </button>
</template>

<script lang="ts">
import { flashOneMessage } from "@/app/functions/flash"
import { FlashMessage } from "@/store"
import Vue from "vue"
export default Vue.extend({
  data: () => ({
    loadingDiscord: false
  }),
  methods: {
    async discord() {
      this.$store.dispatch("clearFlash")
      this.loadingDiscord = true
      setTimeout(async () => {
        try {
          const { data } = await this.$axios.get<{
            success: boolean
            state: "provided"
            url: string
          }>("/auth/discord-oauth")

          this.loadingDiscord = false

          if (!data.success || !data.url) {
            this.loadingDiscord = false
            return flashOneMessage({
              type: "danger",
              title: "Došlo k chybě",
              message: `Došlo k chybě při získávání Discord OAuth URL. Chyba: neznámá`
            })
          }

          window.location.href = data.url
        } catch (e) {
          this.loadingDiscord = false
          flashOneMessage({
            type: "danger",
            title: "Došlo k chybě",
            message: `Došlo k chybě při získávání Discord OAuth URL. Chyba: ${e.message}`
          })
        }
      }, Math.random() * 600)
    }
  }
})
</script>
