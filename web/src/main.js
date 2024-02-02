import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'




// import Cesium from 'cesium/Cesium'
// import 'cesium/Build/Cesium/Widgets/widgets.css'
// Vue.prototype.Cesium = Cesium  // 将 Cesium 注册为 Vue 实例的属性


Vue.config.productionTip = false
window.CESIUM_BASE_URL='/'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
