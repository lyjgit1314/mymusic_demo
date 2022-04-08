<template>
  <div class="body">
      <div class="swiper">
        <el-carousel :interval="4000" type="card" height="150px">
          <el-carousel-item v-for="(item,index) in swiperlist" :key="index">
            <img :src="item.imageUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="bottom">
        <div class="bottom_title">推荐歌单<i class="el-icon-arrow-right"></i></div>
        <div class="bottom_items">
          <div class="bottom_item" v-for="(item,index) in list" :key="index" @click="gomusicdetail(item.id)">
            <img :src="item.picUrl" alt="">
            <div class="bottom_item_size">{{item.name}}</div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      // 轮播图数据
      swiperlist:null,
      // 下面图像部分
      list:null,
    }
  },
  mounted(){
    // 获取轮播图数据
    this.getswper()
    // 获取下面图像部分
    this.getitemlist()
  },
  methods:{
    // 点击每一项
    gomusicdetail(id){
      console.log(id,this.$store.state.musicdetailid)
      this.$router.push({
        path:`/musicdetail/${id}`
      })
    },


    // 获取下面图像部分
    async getitemlist(){
      let res = await this.$api("/personalized", {
        limit:20
      });
      console.log(res.data.result);
      this.list = res.data.result;
    },

    // 获取轮播图数据
    async getswper() {
      // 这个接口没有offset 参数
      let res = await this.$api("/banner", {
        
      });
      // console.log(res.data.banners);
      this.swiperlist = res.data.banners;
    },
  }
}
</script>

<style lang="less">
::-webkit-scrollbar {
  /* 隐藏滚动条 */
  display: none;
}
  .body{
    width: 97%;
    height: 95%;
    background: #25283a;
    overflow-y: scroll;
    .swiper{
      // height: 200px;
      width: 60%;
      margin: 0 auto;
      // background: red;
    }
    .bottom{
      width: 80%;
      // height: 1000px;
      // background: yellow;
      margin: 0 auto;
      .bottom_title{
        font-size: 20px;
        color: white;
        font-weight: 700;
        margin-top: 50px;
      }
      .bottom_items{
        display: flex;
        flex-wrap: wrap;
        flex-shrink: 0;
        .bottom_item{
          width: 18%;
          margin: 20px 2% 20px 0;
          cursor: pointer;
          img{
            width: 100%;
            border-radius: 10px;
            display: block;
            // background: red;
          }
          .bottom_item_size{
            width: 100%;
            font-size: 12px;
            color: white;
            margin-top: 10px;
            // background: blue;
            overflow: hidden;
            white-space: normal;
            word-break: break-all;
          }
        }
      }
    }
  }



  .el-carousel__item img {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>