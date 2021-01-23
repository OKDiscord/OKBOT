<template>
  <div>
    <Header />
    <div class="container" style="margin-top: 40px; margin-bottom: 60px;">
      <FlashMessageWrapper />
    </div>
    <div style="min-height: calc(100vh - 4rem);">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue"

import Header from "@/components/layout/Header.vue"
import Footer from "@/components/layout/Footer.vue"
import FlashMessageWrapper from "@/components/flash/FlashMessageWrapper.vue"

export default Vue.extend({
  name: "DefaultLayout",
  components: {
    Header,
    Footer,
    FlashMessageWrapper,
  },
})
</script>
