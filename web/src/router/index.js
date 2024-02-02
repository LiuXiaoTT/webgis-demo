import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '../views/IndexView.vue'
import HomeView from '../views/HomeView.vue'
import MapHome from '../views/MapHome.vue'

import CesiumMap1 from '../views/CesiumMap1.vue'
import DrawOverlay from '../views/DrawOverlay.vue'
import DistancePolygon from '../views/DistancePolygon.vue'
import BusstopInquiry from '../views/BusstopInquiry.vue'
import CesiumDrawpoint from '../views/CesiumDrawpoint.vue'
import CesiumView3D from '../views/CesiumView3D.vue'
import CesiumDrawline from '../views/CesiumDrawline.vue'
import CesiumLittleman from '../views/CesiumLittleman.vue'



Vue.use(VueRouter)

const routes = [

  // {
  //   path:'/',
  //   redirect:'/login'
  // },
  {
    path: '/',
    name: 'index',
    component: IndexView,
    children: [
      
      {path: '/home', name:'home', component: HomeView},
      {path: '/gaodeMap', name: 'map', component: MapHome},
      {path: '/NewYork3D', name: 'cesium', component: CesiumView3D},
      {path: '/CesiumMap1', name: 'cesium', component: CesiumMap1},
      {path: '/DrawOverlay', name: 'DrawCover', component: DrawOverlay},
      {path: '/DistancePolygon', name: 'DistancePolygon', component: DistancePolygon},
      {path: '/BusstopInquiry', name:'BusstopInquiry', component: BusstopInquiry},
      {path: '/CesiumDrawpoint', name:'CesiumDrawpoint', component: CesiumDrawpoint},
      {path: '/CesiumDrawline', name:'CesiumDrawline', component: CesiumDrawline},
      {path: '/CesiumLittleman', name:'CesiumLittleman', component: CesiumLittleman},


    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
