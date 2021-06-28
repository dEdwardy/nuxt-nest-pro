<template>
  <div class="404">404</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    console.error(this.$route.params, this.$route)
  },
}
</script>

<style></style>
