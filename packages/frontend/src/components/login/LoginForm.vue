<template>
  <form @submit.prevent="login" class="form has-text-left">
    <div
      class="field"
      :class="{
        'is-danger': form.errors.username,
        'is-success': form.errors.username === false
      }"
    >
      <label class="label">Uživatelské jméno</label>
      <input
        type="text"
        class="input"
        v-model="form.username"
        :disabled="form.processing"
        @keyup="validateUsername"
      />

      <div
        class="has-text-right"
        v-if="typeof form.errors.username === 'string'"
      >
        <p class="hint">{{ form.errors.username }}</p>
      </div>
    </div>
    <div
      class="field"
      :class="{
        'is-danger': form.errors.password,
        'is-success': form.errors.password === false
      }"
    >
      <label class="label">Heslo</label>
      <input
        type="text"
        class="input"
        v-model="form.password"
        :disabled="form.processing"
        @keyup="validatePassword"
      />

      <div
        class="has-text-right"
        v-if="typeof form.errors.password === 'string'"
      >
        <p class="hint">{{ form.errors.password }}</p>
      </div>
    </div>

    <div class="field mt-5 mb-6 has-text-centered">
      <button
        type="submit"
        class="button is-large"
        :class="{
          'is-primary': !form.processing,
          'is-dark is-loading': form.processing
        }"
      >
        Přihlásit se
      </button>
    </div>

    <div class="field mt-4 has-text-centered">
      <LoginWithDiscordButton />
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue"

import { FlashMessage } from "@/store"
import LoginWithDiscordButton from "@/components/login/LoginWithDiscordButton.vue"
import {flashOneMessage, clearFlash} from '@/app/functions/flash'

export default Vue.extend({
  components: {
    LoginWithDiscordButton
  },
  data: () => ({
    form: {
      username: "",
      password: "",
      processing: false,
      errors: {
        username: null,
        password: null
      } as { [key: string]: string | false | null }
    }
  }),
  methods: {
    async login() {
      this.$store.dispatch("clearFlash")
      this.form.processing = true

      const isValidated = this.validate()
      if (!isValidated) return (this.form.processing = false)

      setTimeout(async () => {
        const { username, password } = this.form
        try {
          const response = await this.$axios.request({
            method: "POST",
            url: "/auth/login",
            data: {
              username,
              password
            }
          })
          this.form.processing = false
          if (!response.data.success)
            return flashOneMessage({
              type: "danger",
              title: "Došlo k chybě",
              message: `Došlo k chybě při získávání Discord OAuth URL. Chyba: neznámá`
            })
        } catch (e) {
          this.form.processing = false
          if (!e.response) return flashOneMessage({
              type: "danger",
              title: "Došlo k chybě",
              message: `Došlo k chybě při přihlašování`
          })
        }
      }, Math.random() * 600)
    },
    validate() {
      const isUsername = this.validateUsername()
      const isPassword = this.validatePassword()
      return isUsername && isPassword
    },
    validateUsername() {
      let is = true

      if (!this.form.username) is = false

      if (is) this.form.username = this.form.username.replaceAll(" ", "")
      is = this.form.username.length >= 6

      this.form.errors.username = is
        ? false
        : "Uživatelské jméno musí mít alespoň 6 znaků."

      return is
    },
    validatePassword() {
      const is = Boolean(this.form.password) && this.form.password.length >= 6
      this.form.errors.password = is ? false : "Heslo musí mít alespoň 6 znaků."
      return is
    }
  }
})
</script>
