<template>
  <div class="main__wrapper">
    <div class="login__container">
      <div class="login__wrapper">
        <FlashMessageWrapper />

        <h1 class="is-size-1">OKBOT</h1>
        <h2 class="is-size-5">Discord Bot</h2>

        <router-view />

        <footer>
          <strong>{{ new Date().getFullYear() }}</strong> &copy; Vottus, SIM7K
          &ndash; Všechna práva vyhrazena.
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main__wrapper {
  width: 100vw;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  background: url("../assets/img/login-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .login__container {
    @media (min-width: 960px) {
      width: 650px;
      margin-right: 10rem;
    }
    .login__wrapper {
      background: rgba(0, 0, 0, 0.42);
      padding: 2rem;
      border-radius: 0.89rem;
      & > div {
        margin-bottom: 30px;
      }
      h1 {
        margin-bottom: 0;
        line-height: 1;
      }

      h2 {
        margin-bottom: 40px;
      }

      a {
        color: #b23bf0;
      }

      footer {
        margin-top: 40px;
        color: #c1c1c1;
      }
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue"
import FlashMessageWrapper from "@/components/flash/FlashMessageWrapper.vue"
export default Vue.extend({
  components: {
    FlashMessageWrapper
  }
})
</script>
