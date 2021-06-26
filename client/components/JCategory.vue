<template>
  <div class="category flex align-center flex-wrap">
    <div v-for="(item, index) of category" :key="index" class="item">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'JCategory',
  props: {
    category: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.category {
  height: 46px;
  line-height: 46px;
  background: #fff;
  .item {
    margin-right: 12px;
  }
}
</style>
