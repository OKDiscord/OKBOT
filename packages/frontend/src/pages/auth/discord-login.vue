<template>
  <div>
    <InlineLoader v-if="loading" />
    <div v-else-if="!loading && !error">
      <h1>stuff</h1>
    </div>

    <div v-if="error" class="mb-4">
      <div class="buttons is-centered">
        <LoginWithDiscordButton />
        <router-link to="/login" class="button is-primary is-medium">Zpět k přihlášení</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { clearFlash, flashOneMessage, flashError } from "@/app/functions/flash"
import { objectEmpty } from "@/app/functions/misc"
import InlineLoader from "@/components/global/InlineLoader.vue"
import LoginWithDiscordButton from "@/components/login/LoginWithDiscordButton.vue"

import Vue from "vue"
import { AxiosResponse } from "axios"
export default Vue.extend({
  components: {
    InlineLoader,
    LoginWithDiscordButton,
  },
  data: () => ({
    loading: false,
    error: false,
  }),
  mounted() {
    const { query } = this.$route

    if (objectEmpty(query)) return this.$router.push("/login")

    this.loading = true

    if (query.hasOwnProperty("error")) {
      this.loading = false
      this.error = true
      return flashError(query.error, query.error_description)
    }

    if (!query.hasOwnProperty("code")) {
      this.loading = false
      return this.$router.push("/login")
    }

    setTimeout(async () => {
      try {
        const response = await this.$axios.request({
          method: "POST",
          url: "/auth/discord-authorize",
          data: {
            code: query.code,
          },
        })

        // @ts-ignore
        if (!response.data.success) this.handleError(response)

        // TODO: do stuff
      } catch (e) {
        if (!e.isAxiosError) return flashError(null, null)

        // @ts-ignore
        this.handleError(e.response)
      }
    }, Math.random() * 600)
  },
  methods: {
    handleError(response: AxiosResponse<any>) {
      this.loading = false
      this.error = true
      return flashError(response.data.state, response.data.localized)
    },
  },
})
</script>
