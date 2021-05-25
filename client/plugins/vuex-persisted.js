export default function (ctx) {
  // 离开页面 刷新前 将store中的数据存到localStorage
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('vuex', JSON.stringify(ctx.store.state))
  })
  // 获取localStorage中的store数据
  const vuex = localStorage.getItem('vuex')
  if (vuex) {
    // 将localStorage中的store数据替换到store中
    ctx.store.replaceState(JSON.parse(vuex))
  }
}
