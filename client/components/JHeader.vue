<template>
  <header :class="hideHeader ? 'j-header-wrapper top' : 'j-header-wrapper'">
    <div class="j-header">
      <a class="img-wrapper" href="/">
        <img
          class="logo-img"
          src="https://edw4rd.cn/assets/avatar.jpg"
          alt=""
        />
      </a>
      <nav class="nav">
        <ul class="flex">
          <li>
            <nuxt-link to="/">首页</nuxt-link>
          </li>
          <li style="padding: 0">
            <ul class="phone-hide flex">
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
          <li style="padding: 0">
            <ul class="search-panel flex">
              <li class="inner" style="width: 100%">
                <el-input
                  v-model="searchVal"
                  size="small"
                  style="width: 100%"
                  placeholder="探索"
                  class="input-with-select"
                  @focus="handleFocus"
                  @blur="handleBlur"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click.stop="handleSearch"
                  ></el-button>
                </el-input>
              </li>
              <li v-if="!focus" style="min-width: 102px">创作者中心</li>
              <li v-if="!focus" style="min-width: 74px">写文章</li>
            </ul>
          </li>
          <!-- <li v-if="uinfo && uinfo.username" class="avatar-wrapper"> -->
          <li v-show="uinfo && uinfo.username" class="avatar-wrapper">
            <a-dropdown
              :trigger="['click']"
              :get-popup-container="getPopupContainer"
              class="flex align-center justify-center"
              style="height: 60px; display: flex"
            >
              <img
                id="avatar"
                class="avatar"
                src="https://edw4rd.cn/assets/avatar.jpg"
                alt=""
              />
              <a-menu slot="overlay" @click="onClick">
                <a-menu-item key="a">写文章</a-menu-item>
                <a-menu-item key="b">草稿箱</a-menu-item>
                <a-menu-item key="c">我的主页</a-menu-item>
                <a-menu-item key="d">我赞过的</a-menu-item>
                <a-menu-item key="e">我的小册</a-menu-item>
                <a-menu-item key="f">我的收藏</a-menu-item>
                <a-menu-item key="g">标签管理</a-menu-item>
                <a-menu-item key="h">设置</a-menu-item>
                <a-menu-divider />
                <a-menu-item key="i">关于</a-menu-item>
                <a-menu-item key="j">退出登录</a-menu-item>
                <a-menu-divider />
              </a-menu>
            </a-dropdown>
          </li>
          <li v-show="!(uinfo && uinfo.username)" @click="showLogin">登录</li>
        </ul>
      </nav>
    </div>
    <el-dialog
      custom-class="login-modal"
      :visible.sync="loginVisible"
      :close-on-click-modal="false"
      append-to-body
      width="318px"
    >
      <div slot="title">
        <span style="font-size: 16px; font-weight: 800">帐号密码登录</span>
      </div>
      <el-form size="small" style="user-selection: none">
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            placeholder="邮箱/手机号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="flex align-center justify-end"
          style="user-selection: none"
        >
          <drag-verify
            ref="verify"
            :width="268"
            :height="32"
            style="border: 1px solid #aaa"
            :is-passing.sync="isPassing"
            text="请按住滑块拖动"
            success-text="验证通过"
            handler-icon="el-icon-d-arrow-right"
            success-icon="el-icon-circle-check"
            @passcallback="handlePass"
          ></drag-verify>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            type="primary"
            :loading="loginLoading"
            @click.stop="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <div slot="footer" style="padding: 0">
        <div class="flex justify-between align-center">
          <el-button type="text">手机登录</el-button>
          <el-button type="text">忘记密码</el-button>
        </div>
        <div class="flex justify-between align-center">
          <div class="icon-wrapper">
            <svg-icon class="icon" icon-class="weibo" title="微博"></svg-icon>
          </div>
          <div class="icon-wrapper">
            <svg-icon class="icon" icon-class="wechat" title="微信"></svg-icon>
          </div>
          <div class="icon-wrapper">
            <svg-icon
              class="icon"
              icon-class="github"
              title="Github"
            ></svg-icon>
          </div>
        </div>
        <div
          class="argreement-box flex align-center justify-center"
          style="margin-top: 20px; font-size: 14px"
        >
          注册登录即表示同意
          <el-button type="text">用户协议</el-button> 、
          <el-button type="text">隐私政策</el-button>
        </div>
      </div>
    </el-dialog>
  </header>
</template>

<script>
import { throttle } from 'lodash-es'
import { mapState } from 'vuex'
import dragVerify from 'vue-drag-verify2'
export default {
  name: 'JHeader',
  components: {
    dragVerify,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      hideHeader: false,
      focus: false,
      searchVal: '',
      loginVisible: false,
      loginLoading: false,
      isPassing: false,
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '' }],
        password: [{ required: true, message: '' }],
      },
    }
  },
  computed: {
    ...mapState({
      uinfo: (state) => state.uinfo,
    }),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll: throttle(function () {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 400) {
        console.log('top')
        if (!this.hideHeader) this.hideHeader = true
      } else {
        this.hideHeader = false
      }
    }),
    getPopupContainer(node) {
      return node.parentNode
    },
    onClick({ key }) {
      switch (key) {
        case 'j':
          this.$store.commit('LOGOUT')
          break
        default:
          break
      }
    },
    handleFocus() {
      if (this.focus) return
      this.focus = true
    },
    handleBlur() {
      if (!this.focus) return
      this.focus = false
    },
    handleSearch() {
      if (!this.searchVal) return
      this.$router.push({
        path: '/search',
        query: {
          query: this.searchVal,
        },
      })
      // this.$emit('search', this.searchVal)
    },
    showLogin() {
      this.isPassing = false
      this.loginVisible = true
    },
    handlePass() {},
    login() {
      if (!this.loginForm.username) {
        this.$notify({
          message: '请输入帐号',
        })
        return
      }
      if (!this.loginForm.password) {
        this.$notify({
          message: '请输入密码',
        })
        return
      }
      if (!this.isPassing) {
        this.$notify({
          message: '请拖动滑块验证',
        })
        return
      }
      this.loginLoading = true
      this.$store
        .dispatch('login', this.loginForm)
        .then(async () => {
          await this.$store.dispatch('getDict')
          this.$notify.success({
            message: '登录成功',
          })
          this.loginLoading = false
          this.loginVisible = false
        })
        .catch((err) => {
          this.loginLoading = false
          this.isPassing = false
          this.$refs.verify.reset()
          this.$notify.error({
            message: err,
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.j-header-wrapper {
  border-bottom: 1px solid #f1f1f1;
  z-index: 999;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.2s;
  transform: translateZ(0);
  &.top {
    transform: translate3d(0, -61px, 0);
  }
  .search-panel {
    width: 400px;
    .inner {
      transition: all 0.3 ease-in-out;
    }
  }
  .avatar-wrapper {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
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
    .nav {
      height: 60px;
      line-height: 60px;
      ul.flex {
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
}
</style>
