<template>
  <div>
    <div class="container" style="margin-top: 4rem;">
      <div class="div-wrapper">
        <h3 class="is-size-3">Vítejte v administraci OKBOTa.</h3>
        <div class="form-group mt-6">
          <router-link to="/announce" class="button is-primary mr-5"
            >Nové oznámení</router-link
          >
          <router-link to="/announce" class="button is-primary"
            >Nové hlasování</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import AnnounceForm from "@/components/announce/AnnounceForm.vue"

export default Vue.extend({
  name: "IndexPage",
  mounted() {},
  components: {
    AnnounceForm,
  },
  created: () => (document.title = "Domov | OKBOT"),
})
</script>
