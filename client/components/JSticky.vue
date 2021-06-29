<template>
  <div ref="j-sticky" class="j-sticky">
    <slot />
  </div>
</template>

<script>
import { throttle } from 'lodash-es'
export default {
  name: 'JSticky',
  props: {
    position: {
      type: String,
      default: 'top',
    },
    offsetTop: {
      type: String,
      default: '0',
    },
    zIndex: {
      type: Number,
      default: 99,
    },
    // eslint-disable-next-line vue/require-prop-types
    container: {
      default: null,
    },
  },
  data() {
    return {}
  },
  mounted() {
    if (this.container)
      this.container.addEventListener('scroll', this.handleScroll)
    else window.addEventListener('scroll', this.handleScroll)
    // this.container
  },
  beforeDestroy() {
    if (this.container)
      this.container.removeEventListener('scroll', this.handleScroll)
    else window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll: throttle(function (e) {
      console.error(e)
    }, 200),
  },
}
</script>

<style lang="scss" scoped>
.j-sticky {
  position: relative;
}
</style>
