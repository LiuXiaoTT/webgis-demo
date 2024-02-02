<template>
 <el-container style="height: 100vh; border: 1px solid #eee">
  <el-header class="head-nav" style="height: 70px;">
      <el-row>
            <el-col :span="6" class='logo-container'>
                <img src="../assets/earth.png" class='logo' alt="">
                <span class='title' style="color: #fff;">  WebGIS 地图展示系统</span>
            </el-col>
            <el-col :span='6' class="user">
                <div class="userinfo">
                     <div class='welcome'>
                        <p class='name comename'>Welcome</p>
                        <!-- <p class='name avatarname'>{{user.name}}</p> -->
                    </div>
                    <span class='username'>
                        <el-dropdown trigger="click" @command='setDialogInfo'>
                            <span class="el-dropdown-link" style="color: #fff;">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <!-- <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                                <el-dropdown-item  command='logout'>退出</el-dropdown-item> -->
                            </el-dropdown-menu>
                        </el-dropdown>
                     </span>
                </div>
            </el-col>
        </el-row>
    </el-header>



  <el-container>
    <el-aside width="150px" >
    <el-menu router :default-openeds="['1', '2']">
        <!-- 一级菜单 -->
        <router-link to="/home">
              <el-menu-item index="0">
                  <i class="fa fa-margin fa-server"></i>
                  <i class="el-icon-platform-eleme"></i>
                  <span slot="title">首页</span>
              </el-menu-item>
          </router-link>
          <router-link to="/gaodeMap">
              <el-menu-item index='1'>
                  <i class="fa fa-margin fa-server"></i>
                  <i class="el-icon-map-location"></i>
                  <span slot="title">校园地图</span>
              </el-menu-item>
          </router-link>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-menu"></i><span>二维</span></template>
        <el-menu-item-group router>
          <!-- <el-menu-item index="/gaodeMap">基础地图展示</el-menu-item> -->
          <el-menu-item index="/DrawOverlay">绘制覆盖物</el-menu-item>
          <el-menu-item index="/DistancePolygon">距离面积测量</el-menu-item>
          <el-menu-item index="/BusstopInquiry">公交站点查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title"><i class="el-icon-menu"></i><span>三维</span></template>
        <el-menu-item-group>
         
          <el-menu-item index="/CesiumDrawpoint">绘制点数据</el-menu-item>
          <el-menu-item index="/CesiumDrawline">绘制线数据</el-menu-item>
          <el-menu-item index="/CesiumMap1">三维实体展示</el-menu-item>
          <el-menu-item index="/NewYork3D">3D模型展示</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- <el-submenu index="5">
        <template slot="title"><i class="el-icon-menu"></i><span>导航五</span></template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>
  </el-aside>
    
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<style>
  /* .el-header {
    background-color: #324057;
    color: #333;
    line-height: 60px;
  } */
  
  .el-aside {
    /* color: #c5dfd5; */
    background-color: #3c4a61;
    position: relative;
    height: 100%;

  }
  .el-main{
    padding: 0;
    overflow-y: hidden;
    overflow-x: hidden;
    position: relative;
    top: 0;
  /* left: 64px; */
  /* width: calc(100% - 200px);
  height: calc(100% - 71px); */
  /* overflow: auto; */
  }
  .el-container{
    overflow: hidden;
  }
  .el-menu{
    background-color: #59657b;
  }
  span{
    color:#333;
  }
  .el-menu-item{
    /* color: #333; */
    color: black;
  }
  /* el-menu:hover{
    color: #59657b;
  } */
</style>



<style>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
  font-weight: bold;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 14px;
  font-weight: bolder;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}

</style>
<script>
  export default {
    methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
  };
</script>
