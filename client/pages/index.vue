<template>
  <div class="container">
    <div>
      <h1 class="title">nuxt-demo01</h1>
      <IconPicker v-model="a" />
      {{ $t('links') }}
    </div>
    <div v-for="(item, index) of list" :key="index" style="display: flex">
      <div>
        {{ item.username }}
      </div>
      <div>
        {{ item.company }}
      </div>
    </div>
  </div>
</template>

<script>
import { getUserList } from '../api/user'
export default {
  async asyncData() {
    try {
      console.error('async data')
      const { data } = await getUserList()
      console.error(data + '22222')
      return data
    } catch (error) {
      console.error(error)
    }
  },
  data() {
    return {
      a: '',
      list: [],
    }
  },
  mounted() {
    console.error(process.env.NUXT_ENV)
    this.$store.commit('SET_USERNAME', '1234')
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
