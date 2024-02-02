<template>
    <div id="cesiumContainer"></div>
  </template>
  
  <script>
  import * as Cesium from "cesium";

  class DrawLines {
  constructor(options) {
    this.layer = new Cesium.CustomDataSource('MyLines')
    this.activeShapePoints = []
    this.activeShape = undefined
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
    // 鼠标左键单击画点
    this.handler.setInputAction((click) => {
      const earthPosition = this.getPosition(viewer, click.position)
      if (Cesium.defined(earthPosition)) {
        if (this.activeShapePoints.length === 0) {
          this.activeShapePoints.push(earthPosition)
          const dynamicPositions = new Cesium.CallbackProperty(() => {
            return this.activeShapePoints;
          }, false);
          this.activeShape = this.drawLine(dynamicPositions)
        }
        this.activeShapePoints.push(earthPosition)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    // 鼠标移动
    this.handler.setInputAction((move) => {
      if (this.activeShapePoints.length >= 2) {
        const earthPosition = this.getPosition(viewer, move.endPosition)
        if (Cesium.defined(earthPosition)) {
          this.activeShapePoints.pop()
          this.activeShapePoints.push(earthPosition)
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    // 单击鼠标右键结束画线
    this.handler.setInputAction((click) => {
      this.activeShapePoints.pop();
      this.drawLine(this.activeShapePoints)
      this.layer.entities.remove(this.activeShape)
      this.activeShapePoints = []
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }
  /**
   * 添加鼠标点击事件的位置
   * @param {Cesium.Viewer} viewer 目标地图
   * @param {Cesium.Cartesian2} position 鼠标位置
   * @return {Cesium.Cartesian3} 鼠标点击位置的坐标
   */
  getPosition(viewer, position) {
    let earthPosition = undefined
    // 球面
    if (viewer.terrainProvider instanceof Cesium.EllipsoidTerrainProvider) {
      earthPosition = viewer.scene.camera.pickEllipsoid(position);
    }
    // 地形
    else {
      const ray = viewer.camera.getPickRay(position);
      earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
    }
    return earthPosition
  }
  /**
   * 画线
   * @param {array<Cesium.Cartesian3>} positionData 线坐标
   */
  drawLine(positionData) {
    return this.layer.entities.add({
      polyline: {
        positions: positionData,
        clampToGround: true,
        width: 3,
      },
    });
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

      const drawLines = new DrawLines()
      drawLines.bindAction(viewer)
      drawLines.addToMap(viewer)
        // var redBox = viewer.entities.add({
        //     name : 'Red box with black outline',
        //     position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
        //     box : {
        //       dimensions : new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
        //       material : Cesium.Color.RED.withAlpha(0.5),
        //       outline : true,
        //       outlineColor : Cesium.Color.BLACK
        //     }
        //   });
        //   viewer.zoomTo(viewer.entities);

        //加载校园的geojson文件
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