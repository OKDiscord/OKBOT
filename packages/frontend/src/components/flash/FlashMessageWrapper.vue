<template>
  <div>
    <FlashMessage v-for="(flash, i) in flashes" :flash="flash" :key="i" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapState } from "vuex"

import FlashMessage from "./FlashMessage.vue"

export default Vue.extend({
  components: {
    FlashMessage,
  },
  computed: mapState({
    flashes: (state: any) => state.flashMessages,
  }),
})
</script>
