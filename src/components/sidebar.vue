<template>
  <div class="contents">
    <el-menu
      default-active="/"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="this.$store.state.caidan.ishouzhedie"
      background-color="#25283a"
      text-color="#616e80"
      active-text-color="#FFFFFF"
      active-background-color="#ffffff"
      :router="true"
    >
      <el-menu-item class="left_top">
        <div class="left_top_icon">
          <img src="../assets/logo.png" />
        </div>
        <div v-show="!this.$store.state.caidan.ishouzhedie" class="left_top_size">网易云</div>
      </el-menu-item>
      <!-- <div class="left_top">
        <div class="left_top_icon">
          <img src="../assets/logo.png" />
        </div>
        <div v-show="!this.$store.state.caidan.ishouzhedie">
          {{ this.$store.state.caidan.isshousize }}
        </div>
      </div> -->

      <el-submenu index="1" style="width: 100%">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span slot="title">音乐数据</span>
        </template>
        <el-menu-item index="/">音乐歌单</el-menu-item>
        <el-menu-item index="/twolist">选项2</el-menu-item>
        <!-- <el-menu-item index="1-1-3">选项3</el-menu-item> -->

        <!-- <el-submenu index="1-1">
          <span slot="title">选项4</span>
          <el-menu-item index="1-1-1">选项1</el-menu-item>
        </el-submenu>

        <el-submenu index="1-2">
          <span slot="title">选项4</span>
          <el-menu-item index="1-2-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">音乐仓库</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <!-- <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less">
.el-menu {
  border: 0 !important;
}
.contents {
  //   width: 10vw;
  height: 90vh;
  //   background: #25283a;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    // width: 10vw;
    width: 200px;
    height: 90vh;
  }
  //   激活的样式
  .el-menu-item.is-active {
    color: #ddf0ff;
    background-color: #35394f !important;
  }
  // 鼠标移上的样式
  // .el-menu-item:hover{
  //     background-color: red!important;
  // }

  .left_top {
    // max-width: 200px;
    height: 10vh;
    //   background: yellow;
    text-align: center;
    line-height: 10vh;
    font-size: 20px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 1s;
    .left_top_size{
      font-size: 22px;
      color: white;
    }
    
  }
  .left_top_icon {
      width: 30px;
      height: 30px;
      //  background: yellow;
      margin-right: 10px;
      img {
        // width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
    }
}
</style>