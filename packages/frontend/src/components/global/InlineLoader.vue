<template>
  <div class="loader__wrapper">
    <div class="loader" />
  </div>
</template>

<style lang="scss" scoped>
.loader__wrapper {
  background: rgba(178, 59, 240, 0.49);
  display: inline-block;
  padding: 10px 10px 5px 10px;
  border-radius: 8px;
  margin-bottom: 0;

  .loader {
    display: inline-block;
    font-size: 2rem;
  }
}
</style>
