<template>
    <div class="about">
        <div id="container3"></div>
        <div id="tip" class='info' style='min-width:18rem;'></div>
        <div class="input-card" style='width:18rem;'>
    <label style='color:grey'>公交站点查询</label>
    <div class="input-item">
            <div class="input-item-prepend"><span class="input-item-text" >站名</span></div>
            <input id='stationKeyWord' type="text" value='临园路' >
    </div>
    <input id="search" type="button" class="btn" value="查询" />
   </div>
    </div>
  </template>


<style>
.input-card{
    position: absolute;
    z-index: 2;
    /* right: 20px; */
}
#container3{
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;

}
#tip{
    position: absolute;
    z-index: 2;
    /* left: 50%; */
}
/* .input-item{
    display: block;
} */

</style>

<script>

import AMapLoader from '@amap/amap-jsapi-loader'
export default{
    mounted(){
        this.initMap()
    },
    methods:{
        initMap(){
            AMapLoader.load({
                key:"b6a82fdbc955527cba63077f3ae3b2d1",
                plugins:["AMap.StationSearch"],
                version:"",
            }).then((AMap)=>{
                var map=new AMap.Map("container3",{
                    // zoom:15,
                    viewMode: "3D", //是否为3D地图模式
                    zoom: 17, //初始化地图级别
                    center: [104.69348687397722, 31.53730468710188], //初始化地图中心点位置
                    // rotation:45,//初始地图顺时针旋转的角度
                    // pitch: 65,//地图俯仰角度
                    terrain:true,
                    resizeEnable: true,
                });
                var markers = [];
	stationSearch();
    /*公交站点查询*/
    function stationSearch() {
        // 移除原有marker
        map.remove(markers);
        markers = [];
        var stationKeyWord  = document.getElementById('stationKeyWord').value
        if(!stationKeyWord) return
        //实例化公交站点查询类
        var station = new AMap.StationSearch({
            pageIndex: 1, //页码
            pageSize: 60, //单页显示结果条数
            city: '010'   //确定搜索城市
        });
        station.search(stationKeyWord, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                stationSearch_CallBack(result);
            } else {
                document.getElementById('tip').innerHTML = JSON.stringify(result);
            }
        });
    }
    /*公交站点查询返回数据解析*/
    function stationSearch_CallBack(searchResult) {
        var stationArr = searchResult.stationInfo;
        var searchNum = stationArr.length;
        if (searchNum > 0) {
            document.getElementById('tip').innerHTML = '查询结果：共' + searchNum + '个相关站点';
            for (var i = 0; i < searchNum; i++) {
                var marker = new AMap.Marker({
                    icon:new AMap.Icon({
                       image:'//a.amap.com/jsapi_demos/static/resource/img/pin.png',
                       size:new AMap.Size(32,32),
                       imageSize:new AMap.Size(32,32)
                    }),
                    offset:new AMap.Pixel(-16,-32),
                    position: stationArr[i].location,
                    map: map,
                    title: stationArr[i].name
                });
                marker.info = new AMap.InfoWindow({
                    content: stationArr[i].name,
                    offset: new AMap.Pixel(0, -30)
                });
                marker.on('mouseover', function(e) {
                    e.target.info.open(map, e.target.getPosition())
                })
                markers.push(marker);
            }
            map.setFitView();
        }
    } 
    document.getElementById('search').onclick = stationSearch;

            })
        }

    }
}


</script>