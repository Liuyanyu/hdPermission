<template>
  <div class="welcome__wrapper">
    <common-header></common-header> 
    <router-view />
    <baidu-map
      class="map"
      :center="location"
      :zoom="zoom"
      @ready="handleMapReady"
    >
    </baidu-map>

    <div class="home-card">
      <div
        class="home-item home-item1"
        style="height:180px;margin-bottom: -1px"
      >
        <p class="envirTit">园区概况</p>
        <div style="width:100%;margin-top:20px">
          <div class="envirTitleBg">
            <p class="envirTitle">环境感知</p>
          </div>
          <div class="item1Content" style="display:flex;">
            <span style="flex:1">PM2.5 : 85</span>
            <span style="flex:1">气温 : 35℃</span>
            <span style="flex:1">空气质量 : 优</span>
          </div>
          <div class="item1Content">
            <p><span>距离路灯开启时间 : </span><span>2小时15分</span></p>
          </div>
          <div class="item1Content" style="display:flex;font-weight: 600">
            <span style="flex:1"
              ><span>土壤墒情 : </span><span>正常</span></span
            >
            <span style="flex:1"
              ><span>水质监测 : </span><span>正常</span></span
            >
          </div>
        </div>
      </div>
      <div class="home-item home-item2 home-item3">
        <div style="width:100%;">
          <div class="envirTitleBg">
            <p class="envirTitle">交通管理</p>
          </div>
          <div class="item1Content item2Content">
            <p><span>今日入园人数 : </span><span>5600</span></p>
          </div>
          <div
            class="item1Content item2Content"
            style="display:flex;font-weight: 600"
          >
            <span style="flex:1"
              ><span>东门入园人数 : </span><span>2000</span></span
            >
            <span style="flex:1"
              ><span>西门入园人数 : </span><span>3600</span></span
            >
          </div>
          <div
            class="item1Content item2Content"
            style="display:flex;font-weight: 600"
          >
            <span style="flex:1"
              ><span>今日累计车次 : </span><span>5600</span></span
            >
            <span style="flex:1"
              ><span>剩余车位 : </span><span>5600</span></span
            >
          </div>
          <div class="item1Content item2Content">
            <p><span>今日无人车载人次数 : </span><span>5600</span></p>
          </div>
        </div>
      </div>
      <div class="home-item home-item2 home-item3">
        <div style="width:100%">
          <div class="envirTitleBg">
            <p class="envirTitle">运营感知</p>
          </div>
          <div class="item1Content item2Content">
            <p><span>设备总数 : </span><span>11000</span></p>
          </div>
          <div class="item1Content item2Content">
            <p><span>设备开启状态 : </span><span>20</span><span>/50</span></p>
          </div>
          <div class="item1Content item2Content">
            <p><span>设备故障状态 : </span><span>10</span><span>/50</span></p>
          </div>
        </div>
      </div>

      <div class="home-item home-item2">
        <div style="width:100%;">
          <div class="envirTitleBg">
            <p class="envirTitle">能耗感知</p>
          </div>
          <div class="item1Content" style="display:flex;font-weight: 600">
            <span style="flex:1">
              <span>总耗电量 : </span><span>85</span><span>kw/h</span></span
            >
            <span style="flex:1"
              ><span>节省电量 : </span><span>85</span><span>kw/h</span></span
            >
          </div>
          <div class="item1Content" style="display:flex;font-weight: 600">
            <span style="flex:1">
              <span>昨日耗电量 : </span><span>85</span><span>kw/h</span></span
            >
            <span style="flex:1"
              ><span>昨日节省电量 : </span><span>85</span
              ><span>kw/h</span></span
            >
          </div>
          <div class="item1Content" style="display:flex;font-weight: 600">
            <span style="flex:1">
              <span>节省金额 : </span><span>85kw/h</span></span
            >
            <span style="flex:1"
              ><span>昨日节省金额 : </span><span>85kw/h</span>
            </span>
          </div>
          <div class="item1Content" style="display:flex;font-weight: 600">
            <span style="flex:1">
              <span>总耗水量 : </span><span>85</span><span>kw/h</span></span
            >
            <span style="flex:1"
              ><span>节省水量 : </span><span>85</span><span>kw/h</span></span
            >
          </div>
          <div class="item1Content" style="display:flex;font-weight: 600">
            <span style="flex:1">
              <span>昨日耗水量 : </span><span>85</span><span>kw/h</span></span
            >
            <span style="flex:1"
              ><span>昨日节省水量 : </span><span>85</span
              ><span>kw/h</span></span
            >
          </div>
          <div class="item1Content " style="display:flex;font-weight: 600">
            <span style="flex:1"
              ><span>节省金额 : </span
              ><span style="color:#F57800">85kw/h</span></span
            >
            <span style="flex:1;"
              ><span>昨日节省金额 : </span
              ><span style="color:#F57800">85万元</span></span
            >
          </div>
        </div>
      </div>
      <div class="home-item home-item2">
        <div style="width:100%;">
          <div class="envirTitleBg">
            <p class="envirTitle">智能安防</p>
          </div>
          <div class="item1Content item2Content">
            <p><span>今日在园人数 : </span><span>11000</span></p>
          </div>
          <div class="item1Content item2Content">
            <p><span>今日告警统计 : </span><span>20</span></p>
          </div>
          <div class="item1Content item2Content">
            <p><span>巡更点状态 : </span><span>未完成</span></p>
          </div>
          <div class="item1Content item2Content">
            <p><span>告警状态 : </span><span>无</span></p>
          </div>
        </div>
      </div>
      <div class="home-item home-item2">
        <div style="width:100%;">
          <div class="envirTitleBg">
            <p class="envirTitle">智能照明</p>
          </div>
          <div
            class="item1Content item2Content"
            style="display:flex;font-weight: 600"
          >
            <span style="flex:1"
              ><span>昨日用电量 : </span><span>85</span><span>kw/h</span></span
            >
            <span style="flex:1"
              ><span>昨日节省电量 : </span><span>85</span
              ><span>kw/h</span></span
            >
          </div>
          <div
            class="item1Content item2Content"
            style="display:flex;font-weight: 600"
          >
            <span style="flex:1"
              ><span>智慧路灯开启 : </span><span>8</span><span>/</span
              ><span>30</span></span
            >
            <span style="flex:1"
              ><span>感应路灯开启 : </span><span>8</span><span>/</span
              ><span>30</span></span
            >
          </div>
          <div
            class="item1Content item2Content"
            style="display:flex;font-weight: 600"
          >
            <span style="flex:1"
              ><span>普通路灯开启 : </span><span>8</span><span>/</span
              ><span>30</span></span
            >
            <span style="flex:1"
              ><span>草坪路灯开启 : </span><span>8</span><span>/</span
              ><span>30</span></span
            >
          </div>
          <div class="item1Content item2Content">
            <p><span>告警状态 : </span><span>无</span></p>
          </div>
        </div>
      </div>
      <div class="home-item home-item2">
        <div style="width:100%;">
          <div class="envirTitleBg">
            <p class="envirTitle">智能灌溉</p>
          </div>
          <div
            class="item1Content item2Content"
            style="display:flex;font-weight: 600"
          >
            <span style="flex:1"
              ><span>昨日用水量 : </span><span>85</span><span>kw/h</span></span
            >
            <span style="flex:1"
              ><span>昨日节省水量 : </span><span>85</span
              ><span>kw/h</span></span
            >
          </div>
          <div
            class="item1Content item2Content"
            style="display:flex;font-weight: 600"
          >
            <span style="flex:1"
              ><span>普通区用水量 : </span><span>8</span><span>/</span
              ><span>30</span></span
            >
            <span style="flex:1"
              ><span>智能区用水量 : </span><span>8</span><span>/</span
              ><span>30</span></span
            >
          </div>
          <div class="item1Content item2Content">
            <p>
              <span>灌溉阀控开启 : </span><span>55</span><span>/</span
              ><span>100</span>
            </p>
          </div>
          <div class="item1Content item2Content">
            <p><span>告警状态 : </span><span>无</span></p>
          </div>
        </div>
      </div>
      <div class="home-item home-item2">
        <div style="width:100%;">
          <div class="envirTitleBg">
            <p class="envirTitle">智能养护</p>
          </div>
          <div class="item1Content item2Content">
            <p><span>垃圾桶清理次数 : </span><span>85</span></p>
          </div>
          <div class="item1Content item2Content">
            <p><span>无人车清理次数 : </span><span>55</span></p>
          </div>
          <div class="item1Content item2Content">
            <p><span>无人车清理次数 : </span><span>55</span></p>
          </div>
          <div class="item1Content item2Content">
            <p><span>告警状态 : </span><span>无</span></p>
          </div>
        </div>
      </div>
      <div class="home-item home-item2">
        <div style="width:100%;">
          <div class="envirTitleBg">
            <p class="envirTitle">智能景观</p>
          </div>
          <div
            class="item1Content item2Content"
            style="display:flex;font-weight: 600"
          >
            <span style="flex:1"
              ><span>交互跑道01感应次数 : </span><span>85</span
              ><span>kw/h</span></span
            >
            <span style="flex:1"
              ><span>雨水花园感应次数 : </span><span>85</span
              ><span>kw/h</span></span
            >
          </div>
          <div
            class="item1Content item2Content"
            style="display:flex;font-weight: 600"
          >
            <span style="flex:1"
              ><span>交互跑道03感应次数 : </span><span>85</span
              ><span>kw/h</span></span
            >
            <span style="flex:1"
              ><span>智能座椅感应次数 : </span><span>85</span
              ><span>kw/h</span></span
            >
          </div>
          <div class="item1Content item2Content">
            <p><span>骑行设备感应次数 : </span><span>55</span></p>
          </div>
          <div class="item1Content item2Content">
            <p><span>交互跑道02感应次数 : </span><span>无</span></p>
          </div>
        </div>
      </div>
    </div>
    <common-footer></common-footer> 
    <router-view />
  </div>
</template>
<script>
import CommonHeader from "@commons/CommonHeader";
import CommonFooter from "@commons/CommonFooter";
export default {
  name: "Welcome",
  components: { CommonHeader, CommonFooter },
  directives: {},
  mixins: [],
  props: {},
  data() {
    return {
      location: { lng: 116.302269, lat: 39.99242 },
      zoom: 12,
      center: { lng: 0, lat: 0 },
      zoom: 3
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    handleMapReady() {
      this.location = { lng: 116.302269, lat: 39.99242 };
      this.zoom = 17;
      // var mapStyle = { style: "midnight" };
      // this.setMapStyle(mapStyle);
    }
  }
};
</script>
<style lang="stylus" scoped>
@media only screen and (min-width: 1366px) and (max-width: 1440px)
  p
  margin 0
  padding 0
.welcome__wrapper >>> .el-scrollbar__wrap
  overflow-x auto
.welcome__wrapper
  width 100%
  height 100%
  overflow hidden
  position relative
  .home-card
    width 83%
    // height 80vh
    position absolute
    z-index 2
    top 6.5vh
    left 8.5%
    display flex
    flex-wrap wrap
    justify-content center
    align-items center
    overflow hidden
    display flex
    flex-wrap wrap
    .home-item
      border-style solid
      border-width 1px
      border-color #e4e4e4
      width calc(33% - 30px)
      width 500px
      height 160px
      padding 0px 0px 0px 10px
      margin-right 15px
      margin-bottom 10px
      display flex
    .home-item1
      background-image url('../assets/indexImg/titleBg1.png')
      background-size cover
      // height 280px
      position relative
      .envirTit
        color #ffffff
        line-height 23px
        font-size 10px
        padding-left 11px
        letter-spacing 3px
        position absolute
    .envirTitleBg
      margin-top 10px
      margin-left 10px
      margin-right 20px
      color #fff
      height 30px
      font-size 15px
      background-image url('../assets/asideImg/bigTit.png')
      background-repeat no-repeat
      line-height 30px
      .envirTitle
        color #FEFFFF
        font-size 14px
        color #fff
        letter-spacing 6px
        font-weight bold
        line-height 30px
        padding-left 20px
        background-image url('../assets/asideImg/bigTit.png')
        background-repeat no-repeat
    .item1Content
      color #02F4F3
      margin-left 11px
      margin-top 10px
      font-size 14px
      font-weight 600
    .item2Content
      // line-height 30px
    .home-item2
      background-image url('../assets/indexImg/titleBg2.png')
      background-size cover
    .home-item3
      margin-top 30px
    :nth-child(3n)
      margin-right 0

p
  margin 0
  padding 0
.welcome__wrapper >>> .el-scrollbar__wrap
  overflow-x auto
.welcome__wrapper
  width 100%
  height 100%
  overflow hidden
  position relative
  .home-card
    width 83%
    // height 80vh
    position absolute
    z-index 2
    top 6.5vh
    left 8.5%
    display flex
    flex-wrap wrap
    justify-content center
    align-items center
    overflow hidden
    display flex
    flex-wrap wrap
    .home-item
      border-style solid
      border-width 1px
      border-color #e4e4e4
      width calc(33% - 30px)
      // width 500px
      // height 250px
      padding 0px 0px 0px 10px
      margin-right 15px
      margin-bottom 10px
      display flex
    .home-item1
      background-image url('../assets/indexImg/titleBg1.png')
      background-size cover
      // height 280px
      position relative
      .envirTit
        color #ffffff
        line-height 23px
        font-size 0.1rem
        padding-left 11px
        letter-spacing 3px
        position absolute
    .envirTitleBg
      margin-top 17px
      margin-left 10px
      margin-right 20px
      color #fff
      height 30px
      font-size 18px
      background-image url('../assets/asideImg/bigTit.png')
      background-repeat no-repeat
      line-height 30px
      .envirTitle
        color #FEFFFF
        // font-size 17px
        color #fff
        letter-spacing 6px
        font-weight bold
        line-height 30px
        padding-left 20px
        background-image url('../assets/asideImg/bigTit.png')
        background-repeat no-repeat
    .item1Content
      color #02F4F3
      margin-left 11px
      margin-top 10px
      // font-size 17px
      font-weight 600
    .item2Content
      // line-height 30px
    .home-item2
      background-image url('../assets/indexImg/titleBg2.png')
      background-size cover
    .home-item3
      margin-top 30px
    :nth-child(3n)
      margin-right 0
.map
  width 100%
  height 100%
</style>
