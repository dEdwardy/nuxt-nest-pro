<template>
  <div class="post">
    <div class="article-detail">
      <div class="infos">
        <img
          src="https://edw4rd.cn/assets/avatar.jpg"
          style="width: 40px; height: 40px"
          alt=""
        />
        <div style="flex: 1">
          <div class="username">
            {{ post.author.username }}
          </div>
          <div class="meta-info">
            {{ format(post.created) }}
          </div>
        </div>
        <el-button>关注</el-button>
      </div>
      <div class="post-title">
        {{ post.title }}
      </div>
      <div class="post-body">
        <div v-html="post.content"></div>
      </div>
    </div>
    <aside class="aside">aside</aside>
  </div>
</template>

<script>
import { format } from '@/utils'
import { getArtilceById } from '@/api/article'
export default {
  async asyncData({ params: { id } }) {
    try {
      const { data } = await getArtilceById(id)
      console.log(data)
      return {
        post: data,
      }
    } catch (err) {
      console.error(err)
    }
  },
  data() {
    return {
      editorOption: {
        placeholder: '请输入',
      },
    }
  },
  methods: {
    format,
  },
}
</script>

<style lang="scss" scoepd>
.post {
  display: flex;
  min-height: calc(100vh - 84px);
  // background-color: #f4f5f5;
  .article-detail {
    background-color: #fff;
    padding: 24px;
    margin: 0 18px;
    flex: 1;
    margin-right: 16px;
    .infos {
      display: flex;
      justify-content: center;
    }
    .post-title {
      margin: 12px 0;
      font-size: 32px;
      font-weight: 700;
      line-height: 1.5;
    }
  }
  .aside {
    width: 240px;
  }
}
</style>
