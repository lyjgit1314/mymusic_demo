<template>
    <div class="content">
        <div class="left">
            <sidebar></sidebar>
        </div>
        <div class="right">
            <div class="right_top">
                <topnav></topnav>
            </div>
            <div class="right_bottom">
                <router-view/>
            </div>
        </div>

        <div class="foot">
            <footnav></footnav>
        </div>
    </div>
</template>

<script>
import topnav from '../../components/topnav.vue'
import sidebar from '../../components/sidebar.vue'
import Footnav from '../../components/footnav.vue'
export default {
  components: { sidebar, topnav, Footnav },
    data(){
        return{

        }
    },
    mounted() {
    //  this.getSingerMv()
	},
    methods:{
     async getSingerMv() {
      // 这个接口没有offset 参数
      let res = await this.$api("/toplist", {
        
      });
      console.log(res);
      this.singerMvInfo = res.data;
    },
    }
}
</script>


<style lang="less">
    .content{
        width: 100%;
        height: 100%;
        background: #181b2b;
        position: relative;
        display: flex;
        position: fixed;
        top: 0;
        left: 0;

        .left{
            // width: 100%;
            height: 90vh;
            background: #25283a;
        }
        .right{
            width: 100%;
            height: 100vh;
            // background: red;
            .right_top{
            width: 100%;
            height: 10vh;
            // background: green;
            display: flex;
            justify-content: center;
            align-items: center;
            }
            .right_bottom{
                // width: 90vw;
                height: 82vh;
                // background: pink;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .foot{
            width: 100vw;
            height: 60px;
            background: #25283a;
            position: fixed;
            bottom: 0;
            left: 0;
        }
        
    }
</style>