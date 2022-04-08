<template>
  <div class="big">
    <audio
      class="audio"
      :src="musicUrl"
      ref="audioPlayer"
      autoplay
      @play="changeState(true)"
      @pause="changeState(false)"
      @ended="changeMusic('next')"
      @timeupdate="timeupdate"
    ></audio>


    <div class="big_left">
      <img src="../assets/userimg.png" alt="" />
    </div>
    <div class="big_center">
      <div class="big_center_top">
        <div class="top_right">
          <img src="../assets/shangyishou.png" alt="" />
        </div>
        <div class="top_right" @click="musiclist?clickbut():''">
          <img
            src="../assets/bofang.png"
            alt=""
            v-if="!this.$store.state.isplay"
          />

          <img src="../assets/zanting.png" alt="" v-else />
        </div>
        <div class="top_right">
          <img src="../assets/xiayishou.png" alt="" />
        </div>
      </div>
      <div class="bottom">
        <div class="bottom_right">{{ currentTime | handleMusicTime }}</div>
        <el-slider
          class="bottom_center"
          v-model="musicnum"
          disabled
          :show-tooltip="false"
        ></el-slider>
        <div class="bottom_right">{{duration | handleMusicTime}}</div>
      </div>
    </div>
    <div class="big_right">
      <div class="big_right_icon">
        <img src="../assets/laba.png" alt="" />
      </div>
      <el-slider
        class="volumeSlider"
        v-model="volume"
        @input="changeVolume"
        :show-tooltip="false"
      ></el-slider>
      <div class="big_right_right el-icon-s-grid"></div>
    </div>
  </div>
</template>

<script>
import { handleMusicTime, returnSecond } from "plugins/utils";
let lastSecond = 0;

// 总时长的秒数
let durationNum = 0;

export default {
  data() {
    return {

    // 音乐总时长
    duration: "00:00",
    // 当前播放时间位置
      currentTime: 0,
      musicUrl: "",

      musiclist:null,

      // 音乐进度
      musicnum: 0,

      // 音量
      volume: 30,
    };
  },
  watch:{
      // 监听vuex中musicId的变化
    "$store.state.musicid"(id) {
      console.log("vuex中的id发生了变化",id);
       // 先暂停当前播放的音乐
      this.pauseMusic();
      this.getMusicDetail(id)
    //   durationNum = returnSecond(this.duration);
    }
  },
  filters: {
    handleMusicTime,
  },
  mounted(){
      
  },
  methods: {
      // 拖动音量条的回调
    changeVolume(e) {
      // 改变audio的音量
      // input事件 实时触发
      this.$refs.audioPlayer.volume = e / 100;
      if (this.isMuted && e > 0) {
        this.isMuted = false;
      } else if (e == 0 && this.isMuted == false) {
        this.isMuted = true;
      }
    },


    // 请求歌曲的url
    async getMusicDetail(id) {
        var that = this
    //   this.$store.commit("updateMusicLoadState", true);
      let result = await that.$api("/song/url", { id });
      // console.log(musicDetail);
      console.log(result.data.data[0]);
      // 获取不到url
      if (result.data.data[0].url == null) {
        this.$message.error("该歌曲暂无版权，请选择下一首");
        return;
      }
      durationNum = result.data.data[0].size
      that.musiclist = result.data.data[0]
      that.musicUrl = result.data.data[0].url;
    },
    // 当前播放时间位置
    timeupdate() {
      // console.log(e);
      // console.log(this.$refs.audioPlayer.currentTime);
      // 节流
      let time = this.$refs.audioPlayer.currentTime;
      let endtime = this.$refs.audioPlayer.duration;
      // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
    //   this.$store.commit("updateCurrentTime", time);

      time = Math.floor(time);
      endtime = Math.floor(endtime);
      if (time !== lastSecond) {
        // console.log(time);
        lastSecond = time;
        this.currentTime = time;
        this.duration = endtime
        // 计算进度条的位置
        this.musicnum = Math.floor(time/endtime*100);
        //  console.log('当前播放时间',this.musicnum)
      }
    },
    gettime(e){
        console.log('获取总时长',e)
    },

    // audio开始或暂停播放的回调  在vuex中改变状态
    changeState(state) {
      this.$store.commit("changePlayState", state);
    },
    // 点击播放暂停
    clickbut() {
      !this.$store.state.isplay ? this.playMusic() : this.pauseMusic();
    },
    // 播放音乐的函数
    playMusic() {
      this.$refs.audioPlayer.play();
    },
    // 暂停音乐的函数
    pauseMusic() {
      this.$refs.audioPlayer.pause();
    },
  },
};
</script>

<style lang="less" scoped>
.big {
  width: 100%;
  height: 100%;
  // background: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .big_left {
    width: 40px;
    height: 40px;
    // background: yellow;
    margin-left: 30px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .big_center {
    width: 20%;
    height: 50px;
    // background: yellow;
    .big_center_top {
      width: 50%;
      height: 30px;
      // background: green;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .top_right {
        width: 20px;
        height: 20px;
        img {
          width: 100%;
          height: 100%;
          display: block;
          // background: blue;
        }
      }
    }
    .bottom {
      width: 95%;
      height: 10px;
      // background: red;
      margin: 5px auto 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .bottom_center {
        width: 70%;
      }
      .bottom_right {
        font-size: 14px;
        color: white;
      }
    }
  }
  .big_right {
    width: 10%;
    height: 40px;
    // background: yellow;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .big_right_icon {
      width: 18px;
      height: 18px;
      // background: red;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .volumeSlider {
      width: 80px;
      // height: 10px;
    }
    .big_right_right {
      font-size: 18px;
      color: white;
    }
  }
}
</style>