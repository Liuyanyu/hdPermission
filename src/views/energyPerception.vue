<template>
  <div class="welcome__wrapper">
     <common-header></common-header> 
    <router-view />
    <template>
      <div id="map">
        <baidu-map
          class="baidumap"
          id="baidumap"
          :center="center"
          :zoom="zoom"
          @ready="handler"
        >
        </baidu-map>
      </div>
    </template>

    <div class="screenLeft"> 
      <p class="navTit">能耗感知系统</p>
      <div class="scrollBar">
        <component :is="currentComponentName"></component>
      </div>
    </div>

    <div class="left-common-nav">
      <div
        id="itemBg"
        class="left-common-nav-item__wrapper"
        :class="{ active: currentComponentName === item.componentName }"
        @click="handleNavItemClick(item)"
        v-for="item in navItems"
        :key="item.componentName"
      >
        {{ item.label }}
      </div>
    </div>
    <common-footer></common-footer> 
    <router-view />
  </div>
</template>
<script>
import CommonHeader from "@commons/CommonHeader";
import CommonFooter from "@commons/CommonFooter";
import https from "@/https.js";
import electricityIcon from "@assets/marker/electricityIcon.png";
import waterIcon from "@assets/marker/waterIcon.png";
import ElectricityPanel from "@commons/energyPerceptionCommons/ElectricityPanel";
import EnergySynthetical from "@commons/energyPerceptionCommons/EnergySynthetical";
import WaterPanel from "@commons/energyPerceptionCommons/WaterPanel";

export default {
  directives: {},
  mixins: [],
  props: {},
  components: {
    ElectricityPanel,
    EnergySynthetical,
    WaterPanel,
    CommonHeader,
    CommonFooter
  },
  data() {
    return {
      currentComponentName: "EnergySynthetical",
      center: { lng: 0, lat: 0 },
      zoom: 3,
      // 水质监测 监测点 下拉列表
      navItems: [
        { label: "能耗感知", componentName: "EnergySynthetical" },
        { label: "用电感知", componentName: "ElectricityPanel" },
        { label: "用水感知", componentName: "WaterPanel" }
      ],
      left: 0,
      top: 0,
      myMap: {},
      MarkerObj: {}
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    // 面板切换
    handleNavItemClick(item) {
      var _this = this;
      _this.currentComponentName = item.componentName;
      if (_this.currentComponentName == "EnergySynthetical") {
        _this.style.backgroundImage = "url(~@assets/asideImg/energy2.png)";
        this.myMap.clearOverlays();
        this.MarkerObj["electric"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        this.MarkerObj["weater"].forEach(item => {
          this.myMap.addOverlay(item);
        });
      } else if (_this.currentComponentName == "ElectricityPanel") {
        this.myMap.clearOverlays();
        this.MarkerObj["electric"].forEach(item => {
          this.myMap.addOverlay(item);
        });
      } else if (_this.currentComponentName == "WaterPanel") {
        this.myMap.clearOverlays();
        this.MarkerObj["weater"].forEach(item => {
          this.myMap.addOverlay(item);
        });
      }
    },
    handler({ BMap, map }) {
      var _this = this;
      // 地图中心点
      this.center.lng = 116.302281;
      this.center.lat = 39.992571;
      this.zoom = 17;
      // var mapStyle = { style: "midnight" };
      // map.setMapStyle(mapStyle);
      map.enableScrollWheelZoom();
      let MarkerObj = {};
      // 电
      https
        .fetchGet("/api/electric/list")
        .then(function(response) {
          console.log(response);
          console.log(response.object.list);
          var energyData = response.object.list;
          console.log(energyData);
          var energyMapPoints = [];
          for (var i = 0; i < energyData.length; i++) {
            energyMapPoints.push({
              x: energyData[i].latitude,
              y: energyData[i].longitude,
              deviceName: energyData[i].deviceName
            });
          }
          _this.energyMapPoints = energyMapPoints;
          for (var i = 0; i < _this.energyMapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              `<div class="title" style=" display: flex">
              <button id="eleInfo"  class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">智能电表</button>
              <button id="elePan" class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">控制面板</button>
              <button id="eleTab" class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">报表</button>
              </div>`;
            content = content + `<div id="eleInfoCon">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备状态 : ` +
              _this.energyMapPoints[i].deviceName +
              `</p>`;
            content = content + `</div>`;
            content =
              content +
              `<div class="reportForm" id="elePanCon" style="display:none">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">电压设置警告值:最小值:` +
              `180V` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:111px">最大值:` +
              `260V` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">电流预警值:` +
              `10A` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">智能电功率设置预警值:` +
              `10W` +
              `</p>`;
            content = content + ` </div>`;
            content =
              content +
              `<div class="reportForm" id="eleTabCon" style="display:none">`;
            content = content + `<span>报表</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            var points = new BMap.Point(
              _this.energyMapPoints[i].y,
              _this.energyMapPoints[i].x
              // energyMapPoints[i].icon
            ); //创建坐标点
            var opts = {
              width: 120,
              height: 120
            };
            var infoWindows = new BMap.InfoWindow(content, opts);
            _this.markerFun(
              points,
              infoWindows,
              BMap,
              map,
              "electric",
              electricityIcon
            );
            markerFun(points, infoWindows);
          }
          function markerFun(points, infoWindows) {
            var myIcon = new BMap.Icon(
              electricityIcon,
              new BMap.Size(100, 100)
            );
            var markers6 = new BMap.Marker(points, { icon: myIcon });
            map.addOverlay(markers6);
            markers6.addEventListener("click", function() {
              map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
            });
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      // 水
      https
        .fetchGet("/url1/waterDevice/list")
        .then(function(response) {
          console.log(response.object.list);
          var soilData = response.object.list;
          console.log(soilData);
          var soilMapPoints = [];
          for (var i = 0; i < soilData.length; i++) {
            soilMapPoints.push({
              x: soilData[i].latitude,
              y: soilData[i].longitude,
              sali: soilData[i].salinity,
              temper: soilData[i].temperature,
              humi: soilData[i].humidity
            });
          }
          _this.soilMapPoints = soilMapPoints;
          for (var i = 0; i < _this.soilMapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              `<div class="title" style=" display: flex">
              <button id="eleWatInfo"  class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">智能水表</button>
              <button id="eleWatTab" class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">报表</button>
              </div>`;
            content = content + `<div id="eleWatInfoCon">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备状态 : ` +
              `正常` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">累计用水量:` +
              `10t` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">昨日用水量:` +
              `1t` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">电池状态:` +
              `正常` +
              `</p>`;
            content = content + `</div>`;
            content =
              content +
              `<div class="reportForm" id="eleWatTabCon" style="display:none">`;
            content = content + `<span>报表</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            var points = new BMap.Point(
              _this.soilMapPoints[i].y,
              _this.soilMapPoints[i].x
              // energyMapPoints[i].icon
            ); //创建坐标点
            var opts = {
              width: 250,
              height: 120
            };
            var infoWindows = new BMap.InfoWindow(content, opts);
            _this.markerFun(
              points,
              infoWindows,
              BMap,
              map,
              "weater",
              waterIcon
            );
            markerFun(points, infoWindows);
          }
          function markerFun(points, infoWindows) {
            var soIcon = new BMap.Icon(waterIcon, new BMap.Size(100, 100));
            var markers7 = new BMap.Marker(points, { icon: soIcon });
            // markers.setAnimation(BMAP_ANIMATION_DROP);
            map.addOverlay(markers7);
            // markers.setLabel(label);
            markers7.addEventListener("click", function() {
              // debugger;
              map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
            });
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });

      map.clearOverlays();
      this.myMap = map;
    },
    markerFun(points, infoWindows, BMap, map, type, icon) {
      let _this = this;
      var soIcon = new BMap.Icon(icon, new BMap.Size(100, 100));
      var markers11 = new BMap.Marker(points, { icon: soIcon });
      // MarkerObj["2"] = markers11;
      _this.MarkerObj = {
        ..._this.MarkerObj,
        [type]: [...(_this.MarkerObj[type] || []), markers11]
      };
      map.addOverlay(markers11);
      // markers.setLabel(label);
      markers11.addEventListener("click", function() {
        // debugger;
        map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
      });
      if (!infoWindows.isOpen()) {
        infoWindows.addEventListener("open", function() {
          var eleInfo = document.getElementById("eleInfo");
          eleInfo.onclick = function() {
            console.log("监测点");
            document.getElementById("eleInfoCon").style.display = "block";
            document.getElementById("elePanCon").style.display = "none";
            document.getElementById("eleTabCon").style.display = "none";
          };
          var elePan = document.getElementById("elePan");
          elePan.onclick = function() {
            console.log("控制面板");
            document.getElementById("eleInfoCon").style.display = "none";
            document.getElementById("elePanCon").style.display = "block";
            document.getElementById("eleTabCon").style.display = "none";
          };
          var eleTab = document.getElementById("eleTab");
          eleTab.onclick = function() {
            console.log("报表");
            document.getElementById("eleInfoCon").style.display = "none";
            document.getElementById("elePanCon").style.display = "none";
            document.getElementById("eleTabCon").style.display = "block";
          };
          // 能耗水
          var eleWatInfo = document.getElementById("eleWatInfo");
          eleWatInfo.onclick = function() {
            console.log("监测点");
            document.getElementById("eleWatInfoCon").style.display = "block";
            document.getElementById("eleWatInfoCon").style.display = "none";
            document.getElementById("eleWatInfoCon").style.display = "none";
          };
          var eleWatTab = document.getElementById("eleWatTab");
          eleWatTab.onclick = function() {
            console.log("控制面板");
            document.getElementById("eleWatTabCon").style.display = "none";
            document.getElementById("eleWatTabCon").style.display = "block";
            document.getElementById("eleWatTabCon").style.display = "none";
          };
        });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.left-common-nav
  position absolute
  top 80px
  left 50%
  transform translateX(-50%)
  &-item__wrapper
    // background-image url('~@assets/asideImg/unSelect.png')
    background-size 100% 100%
    background-position center center
    padding-left 55px
    width 100px
    height 50px
    display inline-flex
    align-items center
    line-height 1
    cursor pointer
    &:nth-of-type(n+2)
      margin-left 12px
    &:nth-child(1)
      background-image url('~@assets/asideImg/energy2.png')
    &:nth-child(2)
      background-image url('~@assets/asideImg/elect1.png')
    &:nth-child(3)
      background-image url('~@assets/asideImg/wat1.png')
    &.active
      // background-image url('~@assets/asideImg/unSelect.png')
</style>
