<template>
  <Navbar />
  <div class="bg-gray-900">
    <div class="py-24 bg-primary-image-blur bg-no-repeat bg-cover bg-center">
      <div class="px-6 max-w-6xl mx-auto w-full">
        <Title class="text-4xl text-white">
          {{ store.pageTitle }}
        </Title>
      </div>
    </div>
    <main class="min-w-screen min-h-screen px-6 max-w-6xl mx-auto w-full">
      <alert-renderer />
      <div class="py-8">
        <router-view />
      </div>
    </main>
  </div>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import AlertRenderer from "../components/elements/alert/AlertRenderer.vue"
import Navbar from "../components/layout/Navbar.vue"
import Footer from "../components/layout/Footer.vue"
import Title from "../components/typography/Title.vue"
import store from "../store"

export default defineComponent({
  components: {
    AlertRenderer,
    Title,
    Navbar,
    Footer,
  },
  setup() {
    store.pageTitle = "Dashboard"

    return {
      store,
    }
  },
})
</script>
