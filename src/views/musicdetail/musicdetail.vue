<template>
  <div class="body" v-if="musicdetail">
      <div class="top">
        <div class="top_icon el-icon-arrow-left" @click="back()"></div>
        <div class="top_img">
            <img :src="musicdetail.coverImgUrl" alt="">
        </div>
        <div class="top_right">
            <div class="top_top">
                <div class="top_top_left">歌单</div>
                <div class="top_top_right">{{musicdetail.name}}</div>
            </div>
            <div class="top_two">
                <div class="top_two_left">
                    <img :src="musicdetail.creator.avatarUrl" alt="">
                </div>
                <div class="top_two_name">{{musicdetail.creator.nickname}}</div>
                <div class="top_two_time">{{musicdetail.createTime | showDate }}创建</div>
            </div>
            <div class="buts">
                <div class="but_one">
                    <img src="../../assets/bofang.png" alt="">
                    播放全部</div>
                <div class="but_two">分享</div>
            </div>
            <div class="biao">标签：<span>{{musicdetail.tags.join(',')}}</span></div>
            <div class="biao">简介：{{musicdetail.description}}</div>
        </div>
      </div>

    <!-- 歌曲列表 -->
    <div class="list">
        <div class="list_title">歌曲列表</div>
        <div class="list_item">
            <el-table
                :data="musicdetail.tracks"
                size="mini"
                style="width: 100%;"
                :cell-style="'background:#282c42;color:white;border-bottom: 1px solid #4d5484;'"
                :header-cell-style="{background:'#333865',color:'white'}"
                @row-dblclick="clickRow"
                highlight-current-row
                stripe
                lazy
                :row-key="
                (row) => {
                    return row.id;
                }
                "
                :infinite-scroll-disabled="true"
                :infinite-scroll-distance="1500"
                :infinite-scroll-immediate="false">
                <el-table-column
                    label=""
                    width="40"
                    type="index"
                    :index="handleIndex"
                    >
                </el-table-column>
                <el-table-column prop="name" label="音乐标题" min-width="350">
                </el-table-column>
                <el-table-column prop="ar[0].name" label="歌手" min-width="120">
                </el-table-column>
                <el-table-column prop="al.name" label="专辑" min-width="170">
                </el-table-column>
                <el-table-column prop="dt" label="时长" min-width="100">
                </el-table-column>
            </el-table>
        </div>
    </div>

  </div>
</template>

<script>
import { formatDate, handleNum, handleMusicTime } from "plugins/utils";
export default {
    data(){
        return{
            musicdetail:null
        }
    },
    mounted(){
        // 获取数据
        this.getitemlist()
        console.log('这个是数据',this.musicdetail)
    },
    filters: {
        showDate(value) {
        // 1、先将时间戳转成Date对象
        const date = new Date(value);

        // 2、将date进行格式化
        return formatDate(date, "yyyy-MM-dd");
        }
    },
    methods:{
        // 点击每一项
        clickRow(item){
            console.log('我被点击了',item)
            this.$store.state.musicid = item.id
        },

        // 获取数据
        async getitemlist(){
            var timestamp = Date.parse(new Date());
            let res = await this.$api("/playlist/detail", {
                id: this.$route.params.id,
                timestamp,
            });
            console.log('这是单个数据',res.data.playlist);
            this.musicdetail = res.data.playlist;

            // 处理播放时间
            this.musicdetail.tracks.forEach((item, index) => {
            this.musicdetail.tracks[index].dt = handleMusicTime(item.dt);
      });
        },
        // 数量
        handleIndex(index){
            index+=1
            if(index<10){
                return '0'+index
            }else{
                return index
            }
        },


        // 返回上一页
        back(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  /* 隐藏滚动条 */
  display: none;
}
    .body{
        width: 97%;
        height: 95%;
        background: #25283a;
        // background: #333865;
        overflow-y: scroll;
        .top{
            display: flex;
            margin: 10px 0 0 10px;
            // background: red;
            .top_icon{
                font-size: 24px;
                color: white;
                font-weight: 700;
                flex-shrink: 0;
                margin-left: 10px;
            }
            .top_img{
                width: 150px;
                height: 150px;
                margin-left: 20px;
                flex-shrink: 0;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                    // background: yellow;
                }
            }
            .top_right{
                // width: 300px;
                height: 150px;
                // background: purple;
                margin-left: 20px;
                .top_top{
                    display: flex;
                    align-items: center;
                    .top_top_left{
                        border: 1px solid #ec4141;
                        border-radius: 5px;
                        padding: 1px 2px;
                        font-size: 12px;
                        color: #ec4141;
                    }
                    .top_top_right{
                        font-size: 20px;
                        font-weight: 700;
                        color: white;
                        margin-left: 10px;
                    }
                }
                .top_two{
                    display: flex;
                    align-items: center;
                    margin-top: 10px;
                    .top_two_left{
                        width: 25px;
                        height: 25px;
                        border: 0;
                        img{
                            width: 100%;
                            height: 100%;
                            display: block;
                            // background: red;
                            border-radius: 12.5px;
                        }
                    }
                    .top_two_name{
                        font-size: 12px;
                        color: #6191c2;
                        margin-left: 10px;
                    }
                    .top_two_time{
                        font-size: 12px;
                        color: white;
                        margin-left: 10px;
                    }
                }
                .buts{
                    display: flex;
                    align-items: center;
                    margin-top: 10px;
                    .but_one{
                        background-color: #ec4141;
                        padding: 8px 15px;
                        border-radius: 20px;
                        font-size: 12px;
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img{
                            width: 12px;
                            height: 12px;
                            display: block;
                        }
                    }
                    .but_two{
                        padding: 6px 15px;
                        border-radius: 20px;
                        font-size: 12px;
                        color: white;
                        border: 1px solid white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-left: 15px;
                    }
                }
                .biao{
                    // background: white;
                    width: 70%;
                    font-size: 12px;
                    color: white;
                    margin-top: 8px;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    span{
                        color: #6191c2;
                    }
                }
            }
        }
        .list{
            // width: 95%;
            // height: 500px;
            // background: yellow;
            margin: 20px auto 50px;
            .list_title{
                font-size: 22px;
                font-weight: 700;
                color: white;
                margin-left: 5%;
            }
            .list_item{
                width: 90%;
                // height: 400px;
                // background: red;
                margin: 0 auto;
                margin-top: 20px;
            }
        }
        
    }

    
</style>