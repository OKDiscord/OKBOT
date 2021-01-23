<template>
  <div>
    <div class="container" style="margin-top: 4rem;">
      <div class="div-wrapper">
        <h2 class="is-size-2 mb-6">Nové hlasování</h2>
        <PollForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import PollForm from "@/components/poll/PollForm.vue"

export default Vue.extend({
  name: "IndexPage",
  components: {
    PollForm,
  },
  created: () => (document.title = "Nové hlasování | OKBOT"),
})
</script>
