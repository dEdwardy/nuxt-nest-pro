<template>
  <div>
    <div class="categories-wrapper">
      <div class="categories flex align-center flex-wrap">
        <nuxt-link
          v-for="(item, index) of category"
          :key="index"
          class="category item"
          :to="{ path: `/${item.name}`, params: { id: item.name } }"
          @click="() => handleClick(item)"
        >
          {{ item.name }}
        </nuxt-link>
      </div>
    </div>
    <div class="tags-wrapper">
      <div class="tags flex align-center flex-wrap">
        <nuxt-link
          v-for="(item, index) of category"
          :key="index"
          class="tag item"
          :to="{ path: `/${item.name}`, params: { id: item.name } }"
          @click="() => handleClick(item)"
        >
          {{ item.name }}
        </nuxt-link>
      </div>
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
.categories-wrapper {
  height: 46px;
  line-height: 46px;
  background: #fff;
  .categories {
    margin: 0 auto;
    width: 100%;
    max-width: 960px;
    .category.item {
      height: 46px;
      line-height: 46px;
      padding: 0 16px;
      margin-right: 12px;
    }
  }
}
.tags-wrapper {
  .tags {
    margin: 0 auto;
    width: 100%;
    max-width: 960px;
    .tag.item {
      background-color: #fff;
      color: #909090;
      border-radius: 0 12px;
      padding: 0 8px;
      margin: 12px;
    }
  }
}
</style>
