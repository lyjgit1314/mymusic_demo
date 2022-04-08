<template>
  <div class="topnav">
      <div class="topnav_left">
        <div class="topnav_icon el-icon-s-fold" v-show="!this.$store.state.caidan.ishouzhedie" @click="clickicon()"></div>
      <div class="topnav_icon el-icon-s-unfold" v-show="this.$store.state.caidan.ishouzhedie" @click="clickicon()"></div>

      </div>

      <div class="topnav_center">音乐系统</div>


      <div class="topnav_user">
        <div class="user_img">
          <img src="../assets/userimg.png"/>
        </div>
        <div class="user_name">玛卡巴卡</div>
      </div>

  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
      // 点击图标折叠菜单栏
      clickicon(){
          this.$store.commit('shouzhedie')

      }
    }
}
</script>

<style lang="less">
  .topnav{
    width: 97%;
    height: 80%;
    background: #25283a;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .topnav_left{
      display: flex;
      align-items: center;
      .topnav_icon{
    //  width: 30px;
    //  height: 30px;
      // background: red;
      margin-left: 20px;
      font-size: 26px;
      color: white;
    }
    }
    .topnav_center{
      font-size: 22px;
      color: white;
      font-weight: 700;
      
    }
    
    .topnav_user{
      // width: 100px;
      // height: 70px;
      // background: red;
      margin-right: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .user_img{
        width: 40px;
        height: 40px;
        // background: yellow;
        border-radius: 20px;
        img{
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 20px;
        }
      }
      .user_name{
        font-size: 20px;
        color: white;
        margin-left: 10px;
      }
    }
  }
</style>