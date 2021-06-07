<template>
  <header class="j-header-wrapper">
    <div class="j-header">
      <a class="img-wrapper" href="/">
        <img
          class="logo-img"
          src="https://edw4rd.cn/assets/avatar.jpg"
          alt=""
        />
      </a>
      <nav class="nav">
        <ul>
          <li>
            <nuxt-link to="/">首页</nuxt-link>
          </li>
          <li style="padding: 0">
            <ul class="phone-hide">
              <li>
                <nuxt-link target="_blank" to="/recommended">沸点</nuxt-link>
              </li>
              <li>
                <nuxt-link target="_blank" to="/news">资讯</nuxt-link>
              </li>
              <li>
                <nuxt-link target="_blank" to="/book">小册</nuxt-link>
              </li>
              <li>
                <nuxt-link target="_blank" to="/events">活动</nuxt-link>
              </li>
            </ul>
          </li>
          <li>
            <el-input
              v-model="searchVal"
              size="small"
              style="width: 168px"
              placeholder="探索"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click.stop="handleSearch"
              ></el-button>
            </el-input>
          </li>
          <li>创作者中心</li>
          <li>写文章</li>
          <li @click="showLogin">登录</li>
        </ul>
      </nav>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="loginVisible"
      :close-on-click-modal="false"
      append-to-body
      width="30%"
    >
      <el-form>
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" style="padding: 0">
        <el-button @click="loginVisible = false">取 消</el-button>
        <el-button type="primary" @click="loginVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </header>
</template>

<script>
export default {
  name: 'JHeader',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchVal: '',
      loginVisible: false,
    }
  },
  methods: {
    handleSearch() {
      if (!this.searchVal) return
      this.$emit('search', this.searchVal)
    },
    showLogin() {
      this.loginVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.j-header-wrapper {
  z-index: 999;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  ::v-deep .el-dialog__footer {
    padding: 10px !important;
  }
  .j-header {
    color: #71777c;
    height: 60px;
    line-height: 60px;
    width: 960px;
    margin: auto;
    display: flex;
    align-items: center;
    ::v-deep .el-input__inner {
      border: 1px solid #aaa;
    }
    ::v-deep .el-input__inner:hover {
      border: 1px solid #aaa;
    }
    ::v-deep .el-input__inner:active {
      border: 1px solid #aaa;
    }
    a {
      text-decoration: none;
    }
    .nuxt-link-exact-active.active-route {
      color: #007fff;
    }
    .img-wrapper {
      height: 60px;
      .logo-img {
        width: 60px;
        height: 60px;
        line-height: 60px;
        border-radius: 50%;
      }
    }
    .nav ul {
      display: flex;
      align-items: center;
      li {
        a {
          color: #71777c;
        }
        cursor: pointer;
        padding: 0 16px;
      }
    }
  }
}
</style>
