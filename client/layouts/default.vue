<template>
  <div class="default-layout">
    <div class="header"></div>
    <div class="main">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.default-layout {
  .main {
    margin: 0 auto;
    width: 60vw;
  }
}
</style>
