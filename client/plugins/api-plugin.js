import apis from '@/api/index.js'
export default (ctx, inject) => {
  const apiObject = {}
  for (const i in apis) {
    apiObject[i] = apis[i](ctx.$axios)
  }

  // inject:注入到服务端context, vue实例, vuex中
  inject('API', apiObject)
}
