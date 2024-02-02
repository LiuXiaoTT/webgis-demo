<template>
  
   <div class="11">
      <div id='container' style="z-index: 1;"></div>
    <!-- <el-card class='info' style="z-index: 2;">操作说明：圆和矩形通过拖拽来绘制，其他覆盖物通过点击来绘制</el-card> -->
    <div class="input-card" style='width: 24rem;z-index: 2;'>
        <div class="input-item">
          <input type="radio" name='func' checked="" value='marker'><span class="input-text">画点</span>
          <input type="radio" name='func' value='polyline'><span class="input-text">画折线</span>
          <input type="radio" name='func' value='polygon'><span class="input-text" style='width:5rem;'>画多边形</span>
        </div>
        <div class="input-item">
          <input type="radio" name='func' value='rectangle'><span class="input-text">画矩形</span>
          <input type="radio" name='func' value='circle'><span class="input-text">画圆</span>
        </div>
        <div class="input-item">
            <input id="clear" type="button" class="btn" value="清除" />
          <input id="close" type="button" class="btn" value="关闭绘图" />
        </div>
    </div>
  </div>

  </template>
    <style>
    
    #container{
      position: absolute;
      height: 100%;
      width: 100%;
    }
    .input-card{
      position: absolute;
      /* background-color:#e3e2e2; */
      
      /* bottom: 5px; */
    }
    .info{
      position: absolute;
      /* top: 20px; */
    }

    .input-item{
      height: 2.2rem;
    }
    .btn{
      width: 6rem;
      margin: 0 1rem 0 2rem;
    }
    .input-text{
      width: 4rem;
      margin-right:1rem;
    }
  </style>

  <script>
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
      plugins: ["AMap.MouseTool"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap) => {
      var map = new AMap.Map("container", {
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: 17, //初始化地图级别
        center: [104.69348687397722, 31.53730468710188], //初始化地图中心点位置
        // rotation:45,//初始地图顺时针旋转的角度
        // pitch: 65,//地图俯仰角度
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
    var mouseTool = new AMap.MouseTool(map); 
    //监听draw事件可获取画好的覆盖物
    var overlays = [];
    mouseTool.on('draw',function(e){
        overlays.push(e.obj);
    }) 
    
    function draw(type){
      switch(type){
        case 'marker':{
            mouseTool.marker({
              //同Marker的Option设置
            });
            break;
        }
        case 'polyline':{
            mouseTool.polyline({
              strokeColor:'#80d8ff'
              //同Polyline的Option设置
            });
            break;
        }
        case 'polygon':{
            mouseTool.polygon({
              fillColor:'#00b0ff',
              strokeColor:'#80d8ff'
              //同Polygon的Option设置
            });
            break;
        }
        case 'rectangle':{
            mouseTool.rectangle({
              fillColor:'#00b0ff',
              strokeColor:'#80d8ff'
              //同Polygon的Option设置
            });
            break;
        }
        case 'circle':{
            mouseTool.circle({
              fillColor:'#00b0ff',
              strokeColor:'#80d8ff'
              //同Circle的Option设置
            });
            break;
        }
      }
    }
    var radios = document.getElementsByName('func');
    for(var i=0;i<radios.length;i+=1){
        radios[i].onchange = function(e){

          draw(e.target.value)
        }
    }
    draw('marker')

    document.getElementById('clear').onclick = function(){
        map.remove(overlays)
        overlays = [];
    }  
    document.getElementById('close').onclick = function(){
        mouseTool.close(true)//关闭，并清除覆盖物
        for(var i=0;i<radios.length;i+=1){
            radios[i].checked = false;
        }
    }



    })
  
  },
}}

 
  
  </script>

