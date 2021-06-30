<template>
  <div class="j-category">
    <div class="categories-wrapper">
      <div class="categories flex flex-wrap align-center flex-wrap">
        <nuxt-link
          v-for="(item, index) of category"
          :key="index"
          class="category item"
          :to="{
            path: `/${item.name}`,
          }"
        >
          {{ item.name }}
        </nuxt-link>
      </div>
    </div>
    <div class="tags-wrapper">
      <div class="tags flex flex-wrap align-center flex-wrap">
        <nuxt-link
          v-for="(item, index) of tag"
          :key="index"
          class="tag item"
          :to="{ path: `/${cur.name}/${item.name}` }"
        >
          {{ item.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
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
    return {
      cur: {},
      tag: [],
    }
  },
  // computed: {
  //   ...mapState({
  //     tag: (state) => state.curCategory?.tag ?? state?.category[0]?.tag ?? [],
  //   }),
  // },
  watch: {
    '$route.params.category': {
      handler(v) {
        console.error(v)
        console.error(this.category)
        if (!v) return
        this.cur = this.category.filter((i) => i.name === v)[0]
        console.error(this.cur)
        this.tag = this.cur ? this.cur.tag : []
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.j-category {
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
    background-color: #f4f5f5 !important;
    .tags {
      margin: 0 auto;
      width: 100%;
      max-width: 960px;
      .tag.item {
        a {
          color: #aaa !important;
          &.active-route {
            color: #1890ff !important;
          }
        }
        background-color: #fff;
        color: #909090;
        border-radius: 0 12px;
        padding: 0 8px;
        margin: 12px;
      }
    }
  }
}
</style>
