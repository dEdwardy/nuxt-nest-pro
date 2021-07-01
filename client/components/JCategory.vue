<template>
  <div class="j-category">
    <div
      ref="category"
      :class="hideHeader ? 'categories-wrapper top' : 'categories-wrapper'"
    >
      <div class="categories flex flex-wrap align-center flex-wrap">
        <nuxt-link
          v-for="(item, index) of category"
          :key="index"
          class="category item"
          :to="{
            path: `/${item.name}`,
          }"
        >
          <a-popover trigger="hover" placement="bottom" arrow-point-at-center>
            <template slot="content">
              <div style="max-width: 360px" class="flex flex-wrap align-center">
                <div class="tags flex flex-wrap align-center flex-wrap">
                  <nuxt-link
                    v-for="(i, idx) of item.tag"
                    :key="idx"
                    class="tag item"
                    :to="{ path: `/${cur.name}/${i.name}` }"
                  >
                    {{ i.name }}
                  </nuxt-link>
                </div>
              </div>
            </template>
            {{ item.name }}
          </a-popover>
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
import { throttle } from 'lodash-es'
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
      hideHeader: false,
    }
  },
  watch: {
    '$route.params.category': {
      handler(v) {
        if (!v) return
        this.cur = this.category.filter((i) => i.name === v)[0]
        console.error(this.cur)
        this.tag = this.cur ? this.cur.tag : []
      },
      immediate: true,
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handlScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handlScroll)
  },
  methods: {
    handlScroll: throttle(function (e) {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 400) {
        if (!this.hideHeader) this.hideHeader = true
      } else {
        this.hideHeader = false
      }
    }),
  },
  // computed: {
  //   ...mapState({
  //     tag: (state) => state.curCategory?.tag ?? state?.category[0]?.tag ?? [],
  //   }),
  // },
}
</script>

<style lang="scss" scoped>
.j-category {
  .categories-wrapper {
    &.top {
      transform: translate3d(0, -61px, 0);
    }
    position: fixed;
    top: 61px;
    left: 0;
    right: 0;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    transition: all 0.2s;
    transform: translateZ(0);
    z-index: 99;
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
    padding-top: 44px;
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
.ant-popover-inner-content {
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 15%);
  border: 1px solid #ebebeb;
  padding: 14px 14px 14px 0 !important;
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
      background-color: #f4f5f5;
      color: #909090;
      border-radius: 0 12px;
      padding: 0 8px;
      margin: 10px;
    }
  }
}
</style>
