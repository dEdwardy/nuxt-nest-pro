<template>
  <div ref="j-ad" :class="fixed ? 'fixed j-ad' : 'j-ad'">
    <div v-for="(item, index) of ad" :key="index" class="ad-wrapper">
      <img
        class="banner"
        :src="'http://localhost:3000/static/' + item.url"
        alt=""
      />
      <span class="ad">投放广告</span>
      <span class="close">X</span>
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
      ad: (state) => state.dict.ad || [],
    }),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.io = new IntersectionObserver(this.handleObserva)
    const el = this.$refs['j-ad']
    this.io.observe(el)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    const el = this.$refs['j-ad']
    this.io.unobserve(el)
    this.io.disconnect()
    this.io = null
  },
  methods: {
    handleScroll: throttle((e) => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop <= this.top) {
        this.fixed = false
      }
    }, 200),
    handleObserva([el]) {
      console.log(el)
      if (el.intersectionRatio === 0) {
        console.log(el.boundingClientRect)
        console.error(document.body.scrollTop)
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
  &.fixed {
    position: fixed;
  }
  .ad-wrapper {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px;
    width: 220px;
    height: 220px;
    position: relative;
    .banner {
      width: 100%;
      height: 100%;
    }
    .ad {
      position: absolute;
      right: 14px;
      bottom: 14px;
      color: #aaa;
    }
    .close {
      position: absolute;
      right: 14px;
      top: 14px;
      color: #aaa;
    }
  }
}
</style>
