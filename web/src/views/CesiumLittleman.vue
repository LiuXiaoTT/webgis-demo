<template>
    <!-- <div id="cesiumContainer"></div> -->
    <div ref="cesiumContainer" class="cesium-container"></div>
  </template>
  
  <script>
  import * as Cesium from "cesium";
  

 

  export default {
    data() {
      return {}
    },
    name:'CesiumViewer',
    mounted() {
      this.init()
      this.viewer.scene.globe.enableLighting = true
    },
    methods: {
      init() {
        Cesium.Ion.defaultAccessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzA0ZDZjMS0yOGI1LTRkNjYtYjc2Yy01Mzk2NWU3MTkxMzciLCJpZCI6MTUzNjg4LCJpYXQiOjE2ODkyNDE1MTN9.riUErrn-l-sHwrzF_JfZ35lGrruZowT0ZxSFkVIKVGY'
  
      
        // 创建Cesium Viewer
        this.viewer = new Cesium.Viewer(this.$refs.cesiumContainer,{
            animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        shouldAnimate: true,
        targetFrameRate: 60,
        useDefaultRenderLoop: false,
        requestRenderMode: true,
        maximumRenderTimeChange: 0.0,
        contextOptions: {
            webgl: {
            alpha: true,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false
            }
        },
        imageryProvider: Cesium.createWorldImagery({
            style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS
        }),
        terrainProvider: Cesium.createWorldTerrain({
            requestWaterMask: true,
            requestVertexNormals: true,
        }),
        terrainShadows: Cesium.ShadowMode.ENABLED,
        // skyBox: new Cesium.SkyBox({
        //     sources: {
        //     positiveX: 'Assets/Textures/SkyBox/tycho2t3_80_px.jpg',
        //     negativeX: 'Assets/Textures/SkyBox/tycho2t3_80_mx.jpg',
        //     positiveY: 'Assets/Textures/SkyBox/tycho2t3_80_py.jpg',
        //     negativeY: 'Assets/Textures/SkyBox/tycho2t3_80_my.jpg',
        //     positiveZ: 'Assets/Textures/SkyBox/tycho2t3_80_pz.jpg',
        //     negativeZ: 'Assets/Textures/SkyBox/tycho2t3_80_mz.jpg',
        //     },
        // }),
        // sceneMode: Cesium.SceneMode.SCENE3D,
        // shadows: true,
      
            })
            // const postProcessStages = this.viewer.scene.postProcessStages
            // postProcessStages.add(Cesium.PostProcessStageLibrary.createEdgeDetectionStage())
            // postProcessStages.add(Cesium.PostProcessStageLibrary.createSepiaStage())

            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createEdgeDetectionStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createSepiaStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createVignetteStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createLensFlareStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createNightVisionStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createHeatHazeStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createDepthOfFieldStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createFilmGrainStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createSobelEdgeDetectionStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createEmbossStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createBloomStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createSilhouetteStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createCellularStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createGaussianBlurStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createHDRStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createHighPassStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createNightVisionStage())
            // this.viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createZoomBlurStage())
          
        // viewer.camera.flyTo({destination:Cesium.Cartesian3.fromDegrees(104.695361,31.535004,3000)})
        console.log('viewer', viewer)
        // 隐藏下方Cesium logo
        viewer.cesiumWidget.creditContainer.style.display = 'none'
        
      }
    },

   
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