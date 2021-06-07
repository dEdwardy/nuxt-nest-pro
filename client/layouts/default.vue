<template>
  <div class="default-layout">
    <j-header></j-header>
    <div class="main-wrapper">
      <main class="main">
        <Nuxt />
      </main>
    </div>
    <el-backtop target=".default-layout .j-header"></el-backtop>
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
  // min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .main-wrapper {
    margin-top: 24px;
    padding-top: 60px;
    background-color: #f4f5f5;
    height: 100%;
    width: 100%;
    .main {
      height: 100%;
      flex: 1;
      position: relative;
      margin: 0 auto;
      width: 100%;
      max-width: 960px;
    }
  }
}
</style>
