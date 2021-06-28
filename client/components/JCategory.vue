<template>
  <div class="categories flex align-center flex-wrap">
    <span
      v-for="(item, index) of category"
      :key="index"
      class="category item"
      @click="() => handleClick(item)"
    >
      {{ item.name }}
      <span v-for="(i, idx) of item.tag" :key="idx" class="tag item">
        {{ i.name }}
      </span>
    </span>
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
  computed: {
    tag() {
      return this.category[0]
    },
  },
  methods: {
    handleClick(item) {},
  },
}
</script>

<style lang="scss" scoped>
.categories {
  height: 46px;
  line-height: 46px;
  background: #fff;
  .category.item {
    margin-right: 12px;
  }
  .tag.item {
    color: red;
    margin-right: 12px;
  }
}
</style>
