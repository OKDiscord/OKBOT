<template>
  <div class="flex flex-col md:flex-row justify-between">
    <div>
      <div class="mb-8">
        <Title>OKBOT</Title>
        <Subtitle>Sign in to use the dashboard.</Subtitle>
      </div>

      <login-form @loading="val => (state.loading = val)" />
    </div>
    <div
      class="w-full border-t md:border-t-0 mt-4 pt-4 md:mt-0 md:pt-0 md:border-l md:ml-8 md:pl-8 flex items-center transition duration-300 ease-in-out"
      :class="state.loading ? 'opacity-50 cursor-not-allowed' : ''"
    >
      <div class="flex flex-col md:items-center">
        <h3 class="text-gray-500 mb-2">
          <strike>Or login using</strike> (soon):
        </h3>
        <div>
          <Button small class="bg-discord mr-2" disabled> Discord </Button>
          <Button small class="bg-gray-500" disabled> GitHub </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import Button from "../../components/elements/button/Button.vue"
import Title from "../../components/typography/Title.vue"
import Subtitle from "../../components/typography/Subtitle.vue"
import LoginForm from "../../components/login/LoginForm.vue"
import InlineLoader from "../../components/elements/loader/Loader.vue"

export default defineComponent({
  components: {
    LoginForm,
    InlineLoader,
    Button,
    Title,
    Subtitle,
  },
  setup() {
    const state = reactive({
      loading: false,
    })

    return {
      state,
    }
  },
})
</script>
