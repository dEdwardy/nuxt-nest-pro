<script>
export default {
  props: {
    filterable: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      icons: [],
    }
  },
  computed: {
    value_: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  created() {
    const modules = require.context('@/assets/icons/svg', false, /\.svg$/)
    this.icons = modules.keys().map((i) => modules(i)?.default?.id.slice(5))
  },
  methods: {
    handleClear() {
      console.log('clear.........')
    },
  },
  render(h, context) {
    const showCurrent = this.value ? (
      <svg-icon icon-class={this.value} class="icon icon-current"></svg-icon>
    ) : (
      ''
    )
    const options = this.icons.map((item, index) => {
      return (
        <el-option
          style="height:auto;line-height:auto;padding:20px;margin:10px 0;"
          value={item}
          // eslint-disable-next-line vue/no-mutating-props
          {...{ on: { 'update:value': (val) => (this.value = val) } }}
          key={index}
        >
          <div title={item} style="text-align:center">
            <svg-icon icon-class={item} class="icon"></svg-icon>
            <div class="text">{item}</div>
          </div>
        </el-option>
      )
    })
    return (
      <div class="icon-select-wrapper ">
        {showCurrent}
        <el-select
          className="icon-select"
          popper-append-to-body
          clearable
          filterable
          onClear={() => this.handleClear()}
          popper-class="custom-popper"
          style="width:100%"
          value={this.value_}
          onChange={(e) => {
            this.$emit('input', e)
          }}
          {...this.props}
          // vModel={ this.value }   //vue-cli4支持了vModel语法糖
        >
          {options}
        </el-select>
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
::v-deep input.el-input__inner {
  padding-right: 60px !important;
}
.icon-select-wrapper {
  display: inline-block;
  position: relative;
  .icon-current {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 34px;
    z-index: 888;
  }
}
::v-deep .el-select-dropdown__wrap .el-scrollbar__wrap {
  width: 700px;
}
.icon {
  width: 24px;
  height: 24px;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
