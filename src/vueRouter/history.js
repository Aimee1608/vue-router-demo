let _Vue = null;
export default class VueRouter {
  static install(Vue) {
    //1 判断当前插件是否被安装
    if (VueRouter.install.installed) {
      return
    }

    VueRouter.install.installed = true
    //2 把Vue的构造函数记录在全局
    _Vue = Vue
    //3 把创建Vue的实例传入的router对象注入到Vue实例
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
        }
      },
    })

  }
  constructor(options) {
    // 初始化参数
    this.options = options;
    // 将routes 存放在routeMap中
    this.routeMap = {}
    // 记录当前的current，并设置为响应式
    this.data = _Vue.observable({
      current: '/'
    })
    this.init()
  }
  init() {
    this.createRouteMap()
    this.initComponent(_Vue)
    this.initEvent()
  }
  // 创建routeMap的数据
  createRouteMap() {
    this.options.routes.forEach(item => {
      this.routeMap[item.path] = item.component
    })
  }
  // 处理组件
  initComponent(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        console.log('this.$slots.default', this.$slots.default)
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickhander
          }
        }, [this.$slots.default])
      },
      methods: {
        clickhander(e) {
          e.preventDefault();
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
        }
      }
    })


    Vue.component("router-view", {
      render: (h) => {
        const cm = this.routeMap[this.data.current]
        return h(cm)
      }
    })
  }
  // 监听事件 替换的current
  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}