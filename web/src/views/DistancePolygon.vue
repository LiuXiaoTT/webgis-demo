<template>
  <div class="22">
     <div id='container2'></div>
    <div class="input-card" style='width: 18rem;'>
        <div class="input-item">
          <input type="radio" name='func' checked="" value='rule'><span class="input-text">距离测量</span>
          <input type="radio" name='func' value='measureArea'><span class="input-text">面积测量</span>
        </div>
        <div class="input-item">
          <input id="close" type="button" class="btn" value="关闭" />
        </div>
    </div>
  </div>
  </template>

<style>
  #container2{
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
  }
  .input-card{
    position: absolute;
    z-index: 2;
  }


</style>
  <script>
  import AMapLoader from '@amap/amap-jsapi-loader';
export default{
  mounted(){
    this.initMap()
  },
  methods:{
    initMap(){
      AMapLoader.load({
        key:"b6a82fdbc955527cba63077f3ae3b2d1",
        version:"",
        plugins:["AMap.MouseTool"],
      }).then((AMap)=>{
        var map = new AMap.Map("container2", {
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: 17, //初始化地图级别
        center: [104.69348687397722, 31.53730468710188], //初始化地图中心点位置
        // rotation:45,//初始地图顺时针旋转的角度
        // pitch: 65,//地图俯仰角度
        terrain:true
      });
      var mouseTool = new AMap.MouseTool(map); 
    
    function draw(type){
      switch(type){
        case 'rule':{
            mouseTool.rule({
                startMarkerOptions : {//可缺省
                    icon: new AMap.Icon({
                        size: new AMap.Size(19, 31),//图标大小
                        imageSize:new AMap.Size(19, 31),
                        image: "//webapi.amap.com/theme/v1.3/markers/b/start.png"
                    }),
                    offset: new AMap.Pixel(-9, -31)
                },
                endMarkerOptions : {//可缺省
                    icon: new AMap.Icon({
                        size: new AMap.Size(19, 31),//图标大小
                        imageSize:new AMap.Size(19, 31),
                        image: "//webapi.amap.com/theme/v1.3/markers/b/end.png"
                    }),
                    offset: new AMap.Pixel(-9, -31)
                },
                midMarkerOptions : {//可缺省
                    icon: new AMap.Icon({
                        size: new AMap.Size(19, 31),//图标大小
                        imageSize:new AMap.Size(19, 31),
                        image: "//webapi.amap.com/theme/v1.3/markers/b/mid.png"
                    }),
                    offset: new AMap.Pixel(-9, -31)
                },
                lineOptions : {//可缺省
                    strokeStyle: "solid",
                    strokeColor: "#FF33FF",
                    strokeOpacity: 1,
                    strokeWeight: 2
                }
                //同 RangingTool 的 自定义 设置，缺省为默认样式
            });
            break;
        }
        case 'measureArea':{
            mouseTool.measureArea({
                strokeColor:'#80d8ff',
                fillColor:'#80d8ff',
                fillOpacity:0.3
              //同 Polygon 的 Option 设置
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
    draw('rule')

    document.getElementById('close').onclick = function(){
        mouseTool.close(true)//关闭，并清除覆盖物
        for(var i=0;i<radios.length;i+=1){
            radios[i].checked = false;
        }
    }
    
        }

      )
    }
  }
}


</script>