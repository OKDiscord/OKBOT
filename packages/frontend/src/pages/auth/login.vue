<template>
  <div>
    <InlineLoader v-if="loading" />
    <LoginForm v-else />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import FlashMessageWrapper from "@/components/flash/FlashMessageWrapper.vue"
import LoginForm from "@/components/login/LoginForm.vue"
import InlineLoader from "@/components/global/InlineLoader.vue"
import { FlashMessage } from "@/store"
import { flashOneMessage } from "@/app/functions/flash"
import { objectEmpty } from "@/app/functions/misc"

export default Vue.extend({
  components: {
    LoginForm,
    FlashMessageWrapper,
    InlineLoader,
  },
  data() {
    return {
      loading: false,
    }
  },
})
</script>
