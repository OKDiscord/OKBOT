<template>
  <div>
    <Alert v-for="(alert, i) in store.alerts" :alert="alert" :key="i" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import store from "../../../store"
import Alert from "./Alert.vue"

export default defineComponent({
  components: {
    Alert,
  },
  setup() {
    return {
      store,
    }
  },
})
</script>
