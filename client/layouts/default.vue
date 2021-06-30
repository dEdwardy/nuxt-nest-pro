<template>
  <div class="default-layout">
    <j-header></j-header>
    <j-category style="margin-top: 61px" :category="category"></j-category>
    <div class="main-wrapper">
      <main class="main">
        <Nuxt />
      </main>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      category: (state) => state.dict.category || [],
    }),
  },
}
</script>
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
    // margin-top: 24px;
    // padding-top: 61px;
    background-color: #f4f5f5;
    width: 100%;
    .main {
      height: 100%;
      flex: 1;
      position: relative;
      // margin: 0 auto;
      // width: 100%;
      // max-width: 960px;
    }
  }
}
</style>
