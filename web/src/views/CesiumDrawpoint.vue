<template>
    <div id="cesiumContainer"></div>
  </template>
  
  <script>
  import * as Cesium from "cesium";

  class DrawPoints {
  constructor(options) {
    this.layer = new Cesium.CustomDataSource('MyPoints')
    this.handler = undefined
  }
  /**
   * 添加鼠标点击事件
   * @param {Cesium.Viewer} viewer 目标地图
   */
  bindAction(viewer) {
    if (!this.handler) {
      this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    }
    this.handler.setInputAction((click) => {
      let earthPosition = undefined
      // 球面
      if (viewer.terrainProvider instanceof Cesium.EllipsoidTerrainProvider) {
        earthPosition = viewer.scene.camera.pickEllipsoid(click.position);
      }
      // 地形
      else {
        const ray = viewer.camera.getPickRay(click.position);
        earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
      }
      if (Cesium.defined(earthPosition)) {
        const entity = this.createPoint(earthPosition)
        this.layer.entities.add(entity)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }
  /**
   * 创建点
   * @param {Cesium.Cartesian3} worldPosition A 3D Cartesian point.
   * @return {Cesium.Entity} 点实体
   */
  createPoint(worldPosition) {
    const point = new Cesium.Entity({
      position: worldPosition,
      point: {
        color: Cesium.Color.RED,
        pixelSize: 5,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
    })
    return point;
  }
  /**
   * 添加图层
   * @param {Cesium.Viewer} viewer 目标地图
   */
  addToMap(viewer) {
    viewer.dataSources.add(this.layer);
  }
}






  export default {
    data() {
      return {}
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        Cesium.Ion.defaultAccessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzA0ZDZjMS0yOGI1LTRkNjYtYjc2Yy01Mzk2NWU3MTkxMzciLCJpZCI6MTUzNjg4LCJpYXQiOjE2ODkyNDE1MTN9.riUErrn-l-sHwrzF_JfZ35lGrruZowT0ZxSFkVIKVGY'
  
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
        //   requestRenderMode: true, // 减少Cesium渲染新帧总时间并减少Cesium在应用程序中总体CPU使用率
        //   // 如场景中的元素没有随仿真时间变化，请考虑将设置maximumRenderTimeChange为较高的值，例如Infinity
        //   maximumRenderTimeChange: Infinity
        // imageryProvider: new Cesium.UrlTemplateImageryProvider({
        //   url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        //   subdomains: ["a", "b", "c", "d"],
        // })
        });
        if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
        //判断是否支持图像渲染像素化处理
        viewer.resolutionScale = window.devicePixelRatio
      }
      viewer.scene.postProcessStages.fxaa.enabled = true
      viewer.scene.debugShowFramesPerSecond = true // 显示帧率

      const drawPoints = new DrawPoints()
      drawPoints.bindAction(viewer)
      drawPoints.addToMap(viewer)
     

      const dataSource = new Cesium.GeoJsonDataSource();
      dataSource.load('/SchoolSWUST3.geojson').then(function() {
        viewer.dataSources.add(dataSource);
        viewer.zoomTo(dataSource);
      });

          
        viewer.camera.flyTo({destination:Cesium.Cartesian3.fromDegrees(104.69348687397722, 31.53730468710188,3000)})
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