<template>
  <div>
    <div class="container" style="margin-top: 4rem;">
      <div class="div-wrapper">
        <h2 class="is-size-2 mb-6">Nové oznámení</h2>
        <AnnounceForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import AnnounceForm from "@/components/announce/AnnounceForm.vue"

export default Vue.extend({
  name: "IndexPage",
  components: {
    AnnounceForm,
  },
  created: () => (document.title = "Nové oznámení | OKBOT"),
})
</script>
