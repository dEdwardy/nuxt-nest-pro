<template>
  <div ref="j-ad" :class="fixed ? 'fixed j-ad' : 'j-ad'">
    <div v-for="(item, index) of ad" :key="index" class="ad-wrapper">
      <img
        class="banner"
        :src="'http://localhost:3000/static/' + item.url"
        alt=""
      />
      <span class="ad">广告</span>
      <span class="close" @click.stop="() => handleClose(item)">X</span>
    </div>
  </div>
</template>

<script>
import { throttle } from 'lodash-es'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      io: null,
      fixed: false,
      top: null,
    }
  },
  computed: {
    ...mapState({
      ad: (state) => state?.dict?.ad ?? [],
    }),
  },
  mounted() {
    if (!this.ad || this.ad.length === 0) return
    window.addEventListener('scroll', this.handleScroll)
    this.io = new IntersectionObserver(this.handleObserva)
    const el = this.$refs['j-ad']
    this.io.observe(el)
  },
  beforeDestroy() {
    if (!this.ad || this.ad.length === 0) return
    window.removeEventListener('scroll', this.handleScroll)
    const el = this.$refs['j-ad']
    this.io.unobserve(el)
    this.io.disconnect()
    this.io = null
  },
  methods: {
    handleClose(item) {
      this.$store.commit('CLOSE_AD', item.id)
    },
    handleScroll: throttle(function (e) {
      if (!this.fixed) return
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop <= this.top) {
        this.fixed = false
      }
    }, 200),
    handleObserva([el]) {
      if (el.intersectionRatio === 0) {
        this.top = document.documentElement.scrollTop || document.body.scrollTop
        this.fixed = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.j-ad {
  position: relative;
  top: 0;
  &.fixed {
    position: fixed;
    top: 67px;
  }
  .ad-wrapper {
    background: #fff;
    margin-bottom: 10px;
    width: 220px;
    height: 220px;
    position: relative;
    .banner {
      width: 100%;
      height: 100%;
    }
    .ad {
      cursor: pointer;
      position: absolute;
      right: 6px;
      bottom: 6px;
      color: #aaa;
      &:link,
      &:visited,
      &:hover,
      &:active {
        &::before {
          content: '投放';
        }
      }
    }
    .close {
      cursor: pointer;
      position: absolute;
      right: 6px;
      top: 6px;
      color: #aaa;
    }
  }
}
</style>
