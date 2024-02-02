<template>
    <div id="cesiumContainer"></div>
  </template>
  
  <script>
  import * as Cesium from "cesium";
  export default {
    data() {
      return {}
    },
    mounted() {
      this.init()
      // Cesium.Ion.defaultAccessToken =
      //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzA0ZDZjMS0yOGI1LTRkNjYtYjc2Yy01Mzk2NWU3MTkxMzciLCJpZCI6MTUzNjg4LCJpYXQiOjE2ODkyNDE1MTN9.riUErrn-l-sHwrzF_JfZ35lGrruZowT0ZxSFkVIKVGY'
      //     var viewer = new Cesium.Viewer('cesiumContainer')
    },
    methods: {
      async init() {
        Cesium.Ion.defaultAccessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1M2FjMzZkNS1kODU1LTQxN2ItYmI3OC0zNTMxNjExZTliYWIiLCJpZCI6MTUzNjg4LCJpYXQiOjE2ODkyNDE2NDJ9.J4hDJbam79rd8zF0PeOsUH_CBm7FyedHbtl61JNeRJU'
  
        var viewer = new Cesium.Viewer('cesiumContainer', {
          animation: false, // 隐藏动画控件
          baseLayerPicker: false, // 隐藏图层选择控件
          fullscreenButton: false, // 隐藏全屏按钮
          vrButton: false, // 隐藏VR按钮，默认false
          geocoder: false, // 隐藏地名查找控件
          homeButton: false, // 隐藏Home按钮
          infoBox: false, // 隐藏点击要素之后显示的信息窗口
          sceneModePicker: false, // 隐藏场景模式选择控件
          selectionIndicator: true, // 显示实体对象选择框，默认true
          timeline: false, // 隐藏时间线控件
          navigationHelpButton: false, // 隐藏帮助按钮
          scene3DOnly: true, // 每个几何实例将只在3D中呈现，以节省GPU内存
          shouldAnimate: false, // 开启动画自动播放
          sceneMode: 3, // 初始场景模式 1：2D 2：2D循环 3：3D，默认3
          requestRenderMode: true, // 减少Cesium渲染新帧总时间并减少Cesium在应用程序中总体CPU使用率
          // 如场景中的元素没有随仿真时间变化，请考虑将设置maximumRenderTimeChange为较高的值，例如Infinity
          maximumRenderTimeChange: Infinity,
          // terrain: Cesium.Terrain.fromWorldTerrain(),
          terrainProvider: Cesium.createWorldTerrain({
            requestVertexNormals:true,   //增加法线提高光照效果
          requestWaterMask:true,       //增加水面特效
          }),

        });

       // 关闭地表大气层，默认是 true
          viewer.scene.globe.showGroundAtmosphere = false;
          
          // 相机设置到纽约
          viewer.camera.setView({
            destination:new Cesium.Cartesian3(1332761,-4662399,4137888),
            orientation:{
              heading:0.60,
              pitch:-0.66
            }
          })
        // 添加纽约3D建筑，75343是资产ID
        let city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url:Cesium.IonResource.fromAssetId(75343)
          }))
          // 定义3d样式
          // 不同高度的建筑，使用不同颜色
          let heightStyle = new Cesium.Cesium3DTileStyle({
            color:{
              // 条件判断具体的颜色
              conditions : [
                ['${Height} >= 300','rgba(45,0,75,0.5)'],
                ['${Height} >= 200','rgb(102,71,151)'],
                ['${Height} >= 100','rgba(170,162,204,0.5)'],
                ['${Height} >= 50','rgba(224,226,238,0.5)'],
                ['${Height} >= 25','rgba(252,230,200,0.5)'],
                ['${Height} >= 10','rgba(248,176,87,0.5)'],
                ['${Height} >= 5','rgba(198,106,11,0.5)'],
                ["true","rgb(127,59,8)"]
              ]
            }
          })
          city.style = heightStyle;



      
        console.log('viewer', viewer)
        // 隐藏下方Cesium logo
        viewer.cesiumWidget.creditContainer.style.display = 'none'
      }
    }
  }
  </script>
  <style >
  #cesiumContainer {
    /* width: 1271.2px;
    height: 668.8px; */
    width: 100%;
    height: 100%;
    position:absolute;
    /* padding: 0;
    overflow:hidden */

  }
  </style>
