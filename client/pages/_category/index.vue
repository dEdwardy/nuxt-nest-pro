<template>
  <div class="home-wrapper">
    <j-category :category="category"></j-category>
    <div class="home">
      <div class="article-list">
        <div v-for="(item, index) of article.list" :key="index" class="article">
          <nuxt-link
            :to="{ path: `/post/${item.id}`, params: { id: item.id } }"
            target="_blank"
          >
            <div class="infos">
              <div class="author">
                {{ item.author.username }}
              </div>
              <div class="created">| {{ format(item.created) }}</div>
              <div class="tag">
                | {{ item.tag.map((i) => i.name).join(' ') }}
              </div>
            </div>
            <div class="main-content">
              <div class="left">
                <div class="title">
                  {{ item.title }}
                </div>
                <div class="desc">
                  {{ item.brief_content }}
                </div>
              </div>
              <div class="right">
                <img
                  src="https://edw4rd.cn/assets/avatar.jpg"
                  class="article-bg"
                />
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <aside class="aside">
        <j-ad></j-ad>
      </aside>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticles } from '@/api/article'
import { format } from '@/utils'
export default {
  async asyncData() {
    try {
      const { data } = await getArticles()
      return {
        article: data,
      }
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    ...mapState({
      category: (state) => state.dict.category || [],
    }),
  },
  methods: {
    format,
  },
}
</script>

<style lang="scss" scoped>
.home-wrapper {
  .home {
    margin: 0 auto;
    width: 100%;
    max-width: 960px;
    a {
      text-decoration: none;
    }
    height: 100%;
    display: flex;
    .article-list {
      background-color: #f4f5f5;
      flex: 1;
      margin-right: 16px;
      .article {
        padding: 12px 20px 0;
        cursor: pointer;
        background-color: #fff;
        border-bottom: 1px solid #e5e6eb;
        &:link,
        &:visited,
        &:hover,
        &:active {
          background-color: #fafafa;
        }
        .infos {
          display: flex;
          align-items: center;
          font-size: 13px;
          line-height: 22px;
          color: #4e5969;
          .author {
            max-width: 162px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
          }
          .created {
            margin: 0 2px;
          }
          .tag {
            margin: 0 2px;
          }
        }
        .main-content {
          display: flex;
          margin-top: 10px;
          padding-bottom: 12px;
          width: 100%;
          .left {
            flex: 1;
            .title {
              font-weight: 700;
              font-size: 16px;
              line-height: 24px;
              color: #1d2129;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }
            .desc {
              margin-top: 8px;
              font-weight: 400;
              font-size: 13px;
              line-height: 22px;
              color: #86909c;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }
          }
          .right {
            .article-bg {
              width: 120px;
              height: 80px;
            }
          }
        }
      }
    }
    .aside {
      width: 240px;
    }
  }
}
</style>
