<template>
    <div id="container1">
    </div>
  </template>

<style>
html,
body,
#container1 {
  width: 100%;
  height: 100%;
}
</style>

<script >

import AMapLoader from '@amap/amap-jsapi-loader';
export default{
    mounted(){
        this.initMap()
    },
    methods: {
  initMap() {
    AMapLoader.load({
      key: "b6a82fdbc955527cba63077f3ae3b2d1", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.ToolBar,AMap.HawkEye"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap) => {
      var map = new AMap.Map("container1", {
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: 17, //初始化地图级别
        center: [104.69348687397722, 31.53730468710188], //初始化地图中心点位置
        rotation:45,//初始地图顺时针旋转的角度
        pitch: 65,//地图俯仰角度
        terrain:true
      });

      AMap.plugin(['AMap.ControlBar', 'AMap.ToolBar'], function () {//异步加载插件
      var controlBar = new AMap.ControlBar({//控制地图旋转插件
        position: {
          right: '10px',
          top: '10px'
        }
      });
      map.addControl(controlBar);
      var toolBar = new AMap.ToolBar({//地图缩放插件
        position: {
          right: '40px',
          top: '110px'
        }
      });
      map.addControl(toolBar)
    });
    })
  
  },
}}

</script>