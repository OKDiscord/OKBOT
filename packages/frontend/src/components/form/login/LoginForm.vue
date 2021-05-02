<template>
  <form @submit.prevent="login">
    <div class="mb-4">
      <text-input
        placeholder="Username"
        v-model.trim="state.username"
        :disabled="loading"
        @update:modelValue="v$.username.$touch"
        :error="v$.username.$error"
      />
    </div>
    <div class="mb-4">
      <text-input
        placeholder="Password"
        v-model="state.password"
        :disabled="loading"
        @update:modelValue="v$.password.$touch"
        :error="v$.password.$error"
      />
    </div>
    <div class="mb-4">
      <Button type="submit" class="bg-primary"> Login </Button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue"

import TextInput from "../elements/form/TextInput.vue"
import Button from "../elements/button/Button.vue"
import { clearAlerts, fail } from "../../store/alert"
import { useVuelidate } from "@vuelidate/core"
import { required, minLength } from "../../app/validators"
import { $http, createRequest, handleResponse } from "../../app"
import { awaitBoolRef } from "../../app/utils"
import { login as apiLogin, LoginData } from "../../app/api/login"

export default defineComponent({
  components: {
    TextInput,
    Button,
  },
  emits: ["loading"],
  setup(props, { emit }) {
    const state = reactive({
      username: "",
      password: "",
    })

    const v$ = useVuelidate(
      {
        username: {
          required,
        },
        password: {
          minLength: minLength(6),
        },
      },
      state
    )

    const loading = ref(false)

    watch(
      () => loading,
      val => {
        emit("loading", val)
      },
      { immediate: true }
    )

    const login = async () => {
      clearAlerts()
      v$.value.$touch()

      console.log(v$)
      if (v$.value.$error) return console.error("Failed form validation.")

      const req = createRequest<LoginData>(apiLogin, () => {
        console.log("success")
      })

      awaitBoolRef(loading, req.fetch(state))
    }

    return {
      state,
      loading,
      v$,
      login,
    }
  },
})
</script>
