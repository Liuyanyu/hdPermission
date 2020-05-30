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
        ></baidu-map>
      </div>
    </template>
    <div class="screen-left">
      <div class="screenLeft">
        <p class="asideTit">运营感知</p>
        <el-scrollbar style="height:95%">
          <div class="energy">
            <div class="asideTitEnergy">
              <span class="tilte">设备运营统计</span>
              <span class="tilteEnglish">Equipment operation statistics</span>
            </div>
            <template>
              <div class="waterTitle">
                <p class="warnTime">设备总数</p>
                <p class="warnTimeEnglish">The total number of Equipment</p>
                <p class="warnTime">设备故障</p>
                <p class="warnTimeEnglish">Equipment Trouble</p>
              </div>
              <div class="waterTitleValue">
                <p>95</p>
                <p>95</p>
              </div>
            </template>
            <div style="clear:both"></div>

            <div class="info__wrapper">
              <div
                class="info-item"
                v-for="(item, index) in yesterdayInfo"
                :key="index"
              >
                <div style="flex:1.2" class="info_Title">
                  <span>{{ item.label }}</span>
                </div>
                <div style="flex:3.2" class="info_Value">
                  <span class="openValue">开启 : {{ item.openValue }}</span>
                  <span class="openTotal">{{ item.openTotal }}</span>
                  <!-- :format="format" -->
                  <el-progress :percentage="70" color="#00FFFF"></el-progress>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="left-common-nav">
      <!-- <div class="left-common-nav-item__wrapper1" @click="soilItemClick">
        水质土壤
      </div>
      <div class="left-common-nav-item__wrapper2" @click="triffItemClick">
        交通
      </div>
      <div class="left-common-nav-item__wrapper3" @click="eleItemClick">
        电量感知
      </div>
      <div class="left-common-nav-item__wrapper4" @click="waterItemClick">
        水量感知
      </div>
      <div class="left-common-nav-item__wrapper5" @click="lightItemClick">
        全员照明
      </div>
      <div class="left-common-nav-item__wrapper6" @click="intellItemClick">
        智能安防
      </div>
      <div class="left-common-nav-item__wrapper7" @click="irrigItemClick">
        智能灌溉
      </div>
      <div class="left-common-nav-item__wrapper8" @click="curingItemClick">
        智能养护
      </div>
      <div class="left-common-nav-item__wrapper9" @click="landItemClick">
        智能景观
      </div> -->
      <div
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
import waterIcon from "@assets/marker/water.png";
import soilIcon from "@assets/marker/soil.png";
import irrIcon from "@assets/marker/irr.png";
import insertIcon from "@assets/marker/insert.png";
import trashIcon from "@assets/marker/trash.png";
import electricityIcon from "@assets/marker/electricityIcon.png";
import eleWaterIcon from "@assets/marker/waterIcon.png";
import smartIcon from "@assets/marker/smartLight.png";
import reactionIcon from "@assets/marker/reactionLight.png";
import ordinaryIcon from "@assets/marker/ordinaryLight.png";
import lawnIcon from "@assets/marker/lawnLight.png";

export default {
  directives: {},
   components: { CommonHeader, CommonFooter },
  mixins: [],
  props: {},
  data() {
    return {
      currentComponentName: "",
      yesterdayInfo: [
        {
          label: "水质监测设备",
          openValue: "58",
          openTotal: "128"
        },
        {
          label: "土壤监测设备",
          openValue: "58",
          openTotal: "128"
        },
        {
          label: "水质监测设备",
          openValue: "58",
          openTotal: "128"
        },
        {
          label: "土壤监测设备",
          openValue: "58",
          openTotal: "128"
        },
        {
          label: "照明设备",
          openValue: "58",
          openTotal: "128"
        },
        {
          label: "安防巡检设备",
          openValue: "58",
          openTotal: "128"
        },
        {
          label: "灌溉设备",
          openValue: "58",
          openTotal: "128"
        },
        {
          label: "智能垃圾桶设备",
          openValue: "58",
          openTotal: "128"
        },
        {
          label: "虫情监测设备",
          openValue: "58",
          openTotal: "128"
        },
        {
          label: "承载无人车设备",
          openValue: "58",
          openTotal: "128"
        },
        {
          label: "摄像头设备",
          openValue: "58",
          openTotal: "128"
        },
        {
          label: "无人清扫车",
          openValue: "58",
          openTotal: "128"
        },
        {
          label: "智能景观设备",
          openValue: "58",
          openTotal: "128"
        }
      ],
      navItems: [
        { label: "水质土壤", componentName: "waterSoil" },
        { label: "交通", componentName: "traffic" },
        { label: "电量感知", componentName: "electricQuantity" },
        { label: "水量感知", componentName: "WaterQuantity" },
        { label: "全员照明", componentName: "overallLight" },
        { label: "智能安防", componentName: "security" },
        { label: "智能灌溉", componentName: "irrigate" },
        { label: "智能养护", componentName: "curing" },
        { label: "智能景观", componentName: "curing" }
      ],
      center: { lng: 0, lat: 0 },
      zoom: 3,
      timeIntervalOptions: [
        {
          timeIntervalValue: "01",
          timeIntervalLabel: "年"
        },
        {
          timeIntervalValue: "02",
          timeIntervalLabel: "月"
        },
        {
          timeIntervalValue: "03",
          timeIntervalLabel: "日"
        }
      ],
      timeIntervalValue: "年",
      // formCards,
      myMap: {},
      MarkerObj: {}
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    // this.getWaterData();
  },
  methods: {
    handler({ BMap, map }) {
      var _this = this;
      // 地图中心点
      this.center.lng = 116.302281;
      this.center.lat = 39.992571;
      // 初始化地图 地图级别
      this.zoom = 18;
      // var mapStyle = { style: "midnight" };
      // map.setMapStyle(mapStyle);
      map.enableScrollWheelZoom();
      let MarkerObj = {};
      // 水
      https
        .fetchGet("/api/water/now")
        .then(function(response) {
          console.log(response.object.list);
          var waterData = response.object.list;
          console.log(waterData);
          var mapPoints = [];
          for (var i = 0; i < waterData.length; i++) {
            mapPoints.push({
              x: waterData[i].deviceLatitude,
              y: waterData[i].deviceLongitude,
              ph: waterData[i].ph,
              temp: waterData[i].temperature,
              dissolvedOxy: waterData[i].dissolvedOxygen,
              conduct: waterData[i].conductivity,
              turbi: waterData[i].turbidity
            });
          }
          _this.mapPoints = mapPoints;
          for (var i = 0; i < _this.mapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              ` <p><span onclick="markerInfo1()" style="margin-left:17%">智能监测点</span>
                   <span onclick="markerInfo2()" style="margin-left:20%">报表</span></p>`;
            content = content + `<div id="deviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">ph : ` +
              _this.mapPoints[i].ph +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">温度:` +
              _this.mapPoints[i].temp +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">溶解氧:` +
              _this.mapPoints[i].dissolvedOxy +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">电导率:` +
              _this.mapPoints[i].conduct +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">浊度:` +
              _this.mapPoints[i].turbi +
              `</p>`;
            content = content + `</div>`;
            content =
              content +
              `<div class="reportForm" id="reportForm" style="display:none">`;
            content = content + `<span>ph</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            var points = new BMap.Point(
              _this.mapPoints[i].y,
              _this.mapPoints[i].x
            ); //创建坐标点
            var opts = {
              width: 120,
              height: 150
            };
            var infoWindows = new BMap.InfoWindow(content, opts);
            _this.markerFun(points, infoWindows, BMap, map, "water", waterIcon);
            // markerFun(points, infoWindows);
            function markerFun(points, infoWindows) {
              var myIcon = new BMap.Icon(waterIcon, new BMap.Size(100, 100));
              var markers1 = new BMap.Marker(points, { icon: myIcon });
              map.addOverlay(markers1);
              markers1.addEventListener("click", function() {
                map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
              });
            }
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      // 土壤
      https
        .fetchGet("/api/soli/now")
        .then(function(response) {
          console.log(response.object.list);
          var soilData = response.object.list;
          console.log(soilData);
          var soilMapPoints = [];
          for (var i = 0; i < soilData.length; i++) {
            soilMapPoints.push({
              x: soilData[i].deviceLatitude,
              y: soilData[i].deviceLongitude,
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
              ` <p><span onclick="markerInfo1()" style="margin-left:17%">智能监测点</markerInfo1span><span onclick="markerInfo2()" style="margin-left:17%">报表</span></p>`;
            content = content + `<div id="deviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">土壤盐度:` +
              _this.soilMapPoints[i].sali +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">土壤温度:` +
              _this.soilMapPoints[i].temper +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">土壤湿度:` +
              _this.soilMapPoints[i].humi +
              `</p>`;
            content = content + `</div>`;
            content =
              content +
              `<div class="reportForm" id="reportForm" style="display:none">`;
            content = content + `<span>ph</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            var points = new BMap.Point(
              _this.soilMapPoints[i].y,
              _this.soilMapPoints[i].x
              // mapPoints[i].icon
            ); //创建坐标点
            var opts = {
              width: 250,
              height: 120
            };
            var infoWindows = new BMap.InfoWindow(content, opts);
            _this.markerFun(points, infoWindows, BMap, map, "soil", soilIcon);
            // markerFun(points, infoWindows);
            function markerFun(points, infoWindows) {
              var soIcon = new BMap.Icon(soilIcon, new BMap.Size(100, 100));
              var markers2 = new BMap.Marker(points, { icon: soIcon });

              map.addOverlay(markers2);
              markers2.addEventListener("click", function() {
                // debugger;
                map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
              });
            }
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      // 灌溉
      let param = {
        type: 11
      };
      https
        .fetchGet("/api/waterDevice/list", param)
        .then(function(response) {
          console.log(response.object.list);
          var irrigationtData = response.object.list;
          console.log(irrigationtData);
          var irrigPoints = [];
          for (var i = 0; i < irrigationtData.length; i++) {
            irrigPoints.push({
              x: irrigationtData[i].deviceLatitude,
              y: irrigationtData[i].deviceLongitude,
              inseName: irrigationtData[i].deviceName,
              inseNum: irrigationtData[i].status
            });
          }
          _this.irrigPoints = irrigPoints;

          for (var i = 0; i < _this.irrigPoints.length; i++) {
            var content = `<div class="deviceBg" style="background-color:#062737;color:#ffffff;opacity:0.9">`;
            content =
              content +
              ` <p style="display:flex"><span onclick="markerInfo1()" style="flex:1">` +
              _this.irrigPoints[i].inseName +
              `</span><span onclick="markerInfo2()" style="flex:1">控制面板</span><span onclick="markerInfo2()" style="flex:1">报表</span><span onclick="markerInfo2()" style="flex:1">视频</span></p>`;
            content = content + `<div id="deviceInfo">`;
            content = content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备状态:` +
              `正常` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">累计用水量:` +
              `10t` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">灌溉次数:` +
              `10` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">昨日灌溉次数:` +
              `2` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">昨日用水量:` +
              `1t` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">电池状态:` +
              `正常..` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">阀门状态:` +
              `开/关` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">灌溉控制:` +
              `4天/开启一次` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">剩余天数:` +
              `3天20小时37分钟` +
              `</p>`;
            content = content + `</div>`;
            content = content + `<div class="reportForm" id="reportForm">`;
            content = content + `<span style="display:none">ph</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            var points = new BMap.Point(
              _this.irrigPoints[i].y,
              _this.irrigPoints[i].x
            );
            //创建坐标点
            var opts = {
              width: 250,
              height: 250
            };
            var infoWindows = new BMap.InfoWindow(content, opts);
            _this.markerFun(
              points,
              infoWindows,
              BMap,
              map,
              "irrigation",
              irrIcon
            );
            // markerFun(points, infoWindows);
          }
          function markerFun(points, infoWindows) {
            var myIcon = new BMap.Icon(irrIcon, new BMap.Size(100, 100));
            var markers3 = new BMap.Marker(points, { icon: myIcon });
            map.addOverlay(markers3);
            markers3.addEventListener("click", function() {
              // debugger;
              map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
            });
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      // 虫情
      https
        .fetchGet("/api/insect/now")
        .then(function(response) {
          console.log(response.object.list);
          var insectData = response.object.list;
          console.log(insectData);
          var insectPoints = [];
          for (var i = 0; i < insectData.length; i++) {
            insectPoints.push({
              x: insectData[i].latitude,
              y: insectData[i].longitude,
              inseName: insectData[i].insectName,
              inseNum: insectData[i].insectNum
            });
          }
          _this.insectPoints = insectPoints;

          for (var i = 0; i < _this.insectPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              ` <p style="display:flex;text-align:center"><span onclick="markerInfo1()" style="flex:1">` +
              _this.insectPoints[i].inseName +
              `</span><span onclick="markerInfo2()"  style="flex:1">报表</span></p>`;
            content = content + `<div id="deviceInfo">`;
            content = content + `<p>昨日监测数值:` + 1010 + `</p>`;
            content = content + `<p>累计监测数值:` + 10000 + `</p>`;
            content = content + `</div>`;
            content = content + `<div class="reportForm" id="reportForm">`;
            content = content + `<span style="display:none">ph</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            var points = new BMap.Point(
              _this.insectPoints[i].y,
              _this.insectPoints[i].x
            );
            //创建坐标点
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
              "insect",
              insertIcon
            );

            // markerFun(points, infoWindows);
          }
          function markerFun(points, infoWindows) {
            var myIcon = new BMap.Icon(insertIcon, new BMap.Size(100, 100));
            var markers4 = new BMap.Marker(points, { icon: myIcon });
            map.addOverlay(markers4);
            markers4.addEventListener("click", function() {
              // debugger;
              map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
            });
          }

          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      // 垃圾桶
      https
        .fetchGet("/api/trash/now")
        .then(function(response) {
          console.log(response.object.list);
          var trashData = response.object.list;
          console.log(trashData);
          var trashPoints = [];
          for (var i = 0; i < trashData.length; i++) {
            trashPoints.push({
              x: trashData[i].deviceLatitude,
              y: trashData[i].deviceLongitude,
              garKitchen: trashData[i].ddGarbeageKitchen,
              garOther: trashData[i].ddGarbeageOther,
              garHarmful: trashData[i].ddGarbeageHarmful,
              garRecover: trashData[i].ddGarbeageRecover
            });
          }
          _this.trashPoints = trashPoints;
          for (var i = 0; i < _this.trashPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              ` <p style="display:flex;text-align:center">
              <span onclick="markerInfo1()" style="flex:1">智能监测点</span><span onclick="markerInfo2()" style="flex:1">报表</span></p>`;
            content = content + `<div id="deviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px;color:red">告警信息:` +
              `请及时清理智能垃圾桶` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备状态:` +
              `设备不在线` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">电量状态:` +
              `正常` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">累计满溢次数:` +
              `12` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">厨余垃圾满溢度:` +
              `10%` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">其他垃圾满溢度:` +
              `85%` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">有害垃圾满溢度:` +
              `20%` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">可回收垃圾满溢度:` +
              `30%` +
              `</p>`;
            content = content + `</div>`;
            content = content + `<div class="reportForm" id="reportForm">`;
            content = content + `<span>ph</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            var points = new BMap.Point(
              _this.trashPoints[i].y,
              _this.trashPoints[i].x
            ); //创建坐标点
            var opts = {
              width: 250,
              height: 200
            };
            var infoWindows = new BMap.InfoWindow(content, opts);
            _this.markerFun(points, infoWindows, BMap, map, "trash", trashIcon);
            // markerFun(points, infoWindows);
          }
          function markerFun(points, infoWindows) {
            var myIcon = new BMap.Icon(trashIcon, new BMap.Size(100, 100));
            var markers5 = new BMap.Marker(points, { icon: myIcon });
            // 把标注添加到地图上
            map.addOverlay(markers5);
            // markers.setLabel(label);
            markers5.addEventListener("click", function() {
              // debugger;
              map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
            });
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      // 电
      https
        .fetchGet("/api/electric/list")
        .then(function(response) {
          console.log(response.object.list);
          var waterData = response.object.list;
          console.log(waterData);
          var mapPoints = [];
          for (var i = 0; i < waterData.length; i++) {
            mapPoints.push({
              x: waterData[i].deviceLatitude,
              y: waterData[i].deviceLongitude,
              ph: waterData[i].ph,
              temp: waterData[i].temperature,
              dissolvedOxy: waterData[i].dissolvedOxygen,
              conduct: waterData[i].conductivity,
              turbi: waterData[i].turbidity
            });
          }
          _this.mapPoints = mapPoints;

          for (var i = 0; i < _this.mapPoints.length; i++) {
            var content = `<div class="deviceBg" style="background-color:#062737;color:#ffffff;">`;
            content =
              content +
              ` <p style="display:flex"><span onclick="markerInfo1()" style="flex:1">智能电表</span><span onclick="markerInfo2()" style="flex:1">控制面板</span><span onclick="markerInfo2()" style="flex:1">报表</span></p>`;
            content = content + `<div id="deviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备状态 : ` +
              `在线` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备功率:` +
              `100w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">实时功率:` +
              `68w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">累计用电量:` +
              `1110w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">昨日用电量:` +
              `11w` +
              `</p>`;
            content = content + `</div>`;
            content =
              content +
              `<div class="reportForm" id="reportForm" style="display:none">`;
            content = content + `<span>ph</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            var points = new BMap.Point(
              _this.mapPoints[i].y,
              _this.mapPoints[i].x
              // mapPoints[i].icon
            ); //创建坐标点
            var opts = {
              width: 120,
              height: 150
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
            // markerFun(points, infoWindows);
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
        .fetchGet("/api/watermeter/list")
        .then(function(response) {
          console.log(response.object.list);
          var soilData = response.object.list;
          console.log(soilData);
          var soilMapPoints = [];
          for (var i = 0; i < soilData.length; i++) {
            soilMapPoints.push({
              x: soilData[i].deviceLatitude,
              y: soilData[i].deviceLongitude,
              sali: soilData[i].salinity,
              temper: soilData[i].temperature,
              humi: soilData[i].humidity
            });
          }
          _this.soilMapPoints = soilMapPoints;

          for (var i = 0; i < _this.soilMapPoints.length; i++) {
            var content = `<div class="deviceBg" style="background-color:#062737;color:#ffffff;">`;
            content =
              content +
              ` <p style="display:flex"><span onclick="markerInfo1()" style="flex:1">智能水表</span><span onclick="markerInfo2()" style="flex:1">控制面板</span><span onclick="markerInfo2()" style="flex:1">报表</span></p>`;
            content = content + `<div id="deviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备状态 : ` +
              `在线` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备功率:` +
              `100w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">实时功率:` +
              `68w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">累计用水量:` +
              `1110w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">昨日用水量:` +
              `11w` +
              `</p>`;
            content = content + `</div>`;
            content =
              content +
              `<div class="reportForm" id="reportForm" style="display:none">`;
            content = content + `<span>ph</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            var points = new BMap.Point(
              _this.soilMapPoints[i].y,
              _this.soilMapPoints[i].x
              // mapPoints[i].icon
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
              eleWaterIcon
            );
            // markerFun(points, infoWindows);
          }
          function markerFun(points, infoWindows) {
            var soIcon = new BMap.Icon(eleWaterIcon, new BMap.Size(100, 100));
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
      // 智慧
      https
        .fetchGet("/api/light/list", { type: 1 })
        .then(function(response) {
          console.log(response.object.list);
          var smartData = response.object.list;
          console.log(smartData);
          var mapPoints = [];
          for (var i = 0; i < smartData.length; i++) {
            mapPoints.push({
              x: smartData[i].latitude,
              y: smartData[i].longitude
            });
          }
          _this.mapPoints = mapPoints;

          for (var i = 0; i < _this.mapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              ` <p style="display:flex">
              <span style="flex:1">智慧路灯</span>
              <span style="flex:1">控制面板</span>
              <span style="flex:1">报表</span></p>`;
            content = content + `<div id="deviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备功耗 : ` +
              `100w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备亮度:` +
              `1000lux` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">昨日用电量:` +
              `8w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">起始时间:` +
              `18:00-05:00` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">开关控制:` +
              `开 / 关` +
              `</p>`;
            content = content + `</div>`;
            content =
              content +
              `<div class="reportForm" id="reportForm" style="display:none">`;
            content = content + `<span>ph</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            var points = new BMap.Point(
              _this.mapPoints[i].y,
              _this.mapPoints[i].x
              // mapPoints[i].icon
            ); //创建坐标点
            var opts = {
              width: 120,
              height: 150
            };
            // var label = new BMap.Label(mapPoints[i].branch, {
            //   offset: new BMap.Size(25, 5)
            // });
            var infoWindows = new BMap.InfoWindow(content, opts);

            // markerFun(points);
            _this.markerFun(points, infoWindows, BMap, map, "1", smartIcon);
            // markerFun(points, infoWindows);
          }
          function markerFun(points, infoWindows) {
            var myIcon = new BMap.Icon(smartIcon, new BMap.Size(100, 100));
            var markers8 = new BMap.Marker(points, { icon: myIcon });
            // markers.setAnimation(BMAP_ANIMATION_BOUNCE);
            map.addOverlay(markers8);
            // markers.setLabel(label);
            markers8.addEventListener("click", function() {
              // debugger;
              map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
            });
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      // 感应
      https
        .fetchGet("/api/light/list", { type: 2 })
        .then(function(response) {
          console.log(response.object.list);
          var reacData = response.object.list;
          console.log(reacData);
          var reacMapPoints = [];
          for (var i = 0; i < reacData.length; i++) {
            reacMapPoints.push({
              x: reacData[i].latitude,
              y: reacData[i].longitude
            });
          }
          _this.reacMapPoints = reacMapPoints;

          for (var i = 0; i < _this.reacMapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              ` <p style=""display:flex>
              <span style="flex:1">智能监测点</span>
              <span style="flex:1">控制面板</span>
              <span style="flex:1">报表</span>
              </p>`;
            content = content + `<div id="deviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备功耗 : ` +
              `100w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备亮度:` +
              `1000lux` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">昨日用电量:` +
              `8w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">起始时间:` +
              `18:00-05:00` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">开关控制:` +
              `开 / 关` +
              `</p>`;
            content = content + `</div>`;
            content =
              content +
              `<div class="reportForm" id="reportForm" style="display:none">`;
            content = content + `<span>ph</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            var points = new BMap.Point(
              _this.reacMapPoints[i].y,
              _this.reacMapPoints[i].x
              // mapPoints[i].icon
            ); //创建坐标点
            var opts = {
              width: 250,
              height: 120
            };
            var infoWindows = new BMap.InfoWindow(content, opts);
            _this.markerFun(points, infoWindows, BMap, map, "2", reactionIcon);
            // markerFun(points, infoWindows);
          }
          function markerFun(points, infoWindows) {
            var soIcon = new BMap.Icon(reactionIcon, new BMap.Size(100, 100));
            var markers9 = new BMap.Marker(points, { icon: soIcon });
            map.addOverlay(markers9);
            // markers.setLabel(label);
            markers9.addEventListener("click", function() {
              // debugger;
              map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
            });
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      // 普通灯
      https
        .fetchGet("/api/light/list", { type: 3 })
        .then(function(response) {
          console.log(response.object.list);
          var ordinData = response.object.list;
          console.log(ordinData);
          var ordinMapPoints = [];
          for (var i = 0; i < ordinData.length; i++) {
            ordinMapPoints.push({
              x: ordinData[i].latitude,
              y: ordinData[i].longitude
            });
          }
          _this.ordinMapPoints = ordinMapPoints;

          for (var i = 0; i < _this.ordinMapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              ` <p style="display:flex">
              <span style="flex:1">普通灯</span>
              <span style="flex:1">控制面板</span>
              <span style="flex:1">报表</span></p>`;
            content = content + `<div id="deviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备功耗 : ` +
              `100w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备亮度:` +
              `1000lux` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">昨日用电量:` +
              `8w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">起始时间:` +
              `18:00-05:00` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">开关控制:` +
              `开 / 关` +
              `</p>`;
            content = content + `</div>`;
            content =
              content +
              `<div class="reportForm" id="reportForm" style="display:none">`;
            content = content + `<span>ph</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            var points = new BMap.Point(
              _this.ordinMapPoints[i].y,
              _this.ordinMapPoints[i].x
              // mapPoints[i].icon
            ); //创建坐标点
            var opts = {
              width: 250,
              height: 120
            };
            var infoWindows = new BMap.InfoWindow(content, opts);
            _this.markerFun(points, infoWindows, BMap, map, "3", ordinaryIcon);
            // markerFun(points, infoWindows);
          }
          function markerFun(points, infoWindows) {
            var soIcon = new BMap.Icon(ordinaryIcon, new BMap.Size(100, 100));
            var markers10 = new BMap.Marker(points, { icon: soIcon });
            map.addOverlay(markers10);
            _this.MarkerObj = { ..._this.MarkerObj, "1": markers10 };
            console.log(123);
            // markers.setLabel(label);
            markers10.addEventListener("click", function() {
              // debugger;
              map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
            });
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      // 草坪灯
      https
        .fetchGet("/api/light/list", { type: 4 })
        .then(function(response) {
          console.log(response.object.list);
          var lawnData = response.object.list;
          console.log(lawnData);
          var lawnMapPoints = [];
          for (var i = 0; i < lawnData.length; i++) {
            lawnMapPoints.push({
              x: lawnData[i].latitude,
              y: lawnData[i].longitude
            });
          }
          _this.lawnMapPoints = lawnMapPoints;

          for (var i = 0; i < _this.lawnMapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              ` <p style="display:flex">
              <span style="flex:1">草坪灯</span>
              <span style="flex:1">控制面板</span>
              <span style="flex:1">报表</span>
              </p>`;
            content = content + `<div id="deviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备功耗 : ` +
              `100w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">设备亮度:` +
              `1000lux` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">昨日用电量:` +
              `8w` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">起始时间:` +
              `18:00-05:00` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">开关控制:` +
              `开 / 关` +
              `</p>`;
            content = content + `</div>`;
            content =
              content +
              `<div class="reportForm" id="reportForm" style="display:none">`;
            content = content + `<span>ph</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            var points = new BMap.Point(
              _this.lawnMapPoints[i].y,
              _this.lawnMapPoints[i].x
              // mapPoints[i].icon
            ); //创建坐标点
            var opts = {
              width: 250,
              height: 120
            };
            var infoWindows = new BMap.InfoWindow(content, opts);
            _this.markerFun(points, infoWindows, BMap, map, "4", lawnIcon);
          }
          // function markerFun(points, infoWindows) {
          //   var soIcon = new BMap.Icon(lawnIcon, new BMap.Size(100, 100));
          //   var markers11 = new BMap.Marker(points, { icon: soIcon });
          //   MarkerObj["2"] = markers11;

          //   map.addOverlay(markers11);
          //   // markers.setLabel(label);
          //   markers11.addEventListener("click", function() {
          //     // debugger;
          //     map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
          //   });
          // }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      // _this.$options.methods.handleNavItemClick();
      // _this.handleNavItemClick(item, map);
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
    },
    handleNavItemClick(item) {
      var _this = this;
      _this.currentComponentName = item.componentName;
      if (_this.currentComponentName == "waterSoil") {
        this.myMap.clearOverlays();
        this.MarkerObj["water"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        this.MarkerObj["soil"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        console.log("111");
      } else if (_this.currentComponentName == "traffic") {
        this.myMap.clearOverlays();
        console.log("222");
      } else if (_this.currentComponentName == "electricQuantity") {
        this.myMap.clearOverlays();
        this.MarkerObj["electric"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        console.log("333");
      } else if (_this.currentComponentName == "WaterQuantity") {
        this.myMap.clearOverlays();
        this.MarkerObj["weater"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        console.log("444");
      } else if (_this.currentComponentName == "overallLight") {
        this.myMap.clearOverlays();
        this.MarkerObj["1"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        this.MarkerObj["2"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        this.MarkerObj["3"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        this.MarkerObj["4"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        console.log("555");
      } else if (_this.currentComponentName == "security") {
        this.myMap.clearOverlays();
        // this.MarkerObj["insect"].forEach(item => {
        //   this.myMap.addOverlay(item);
        // });
        console.log("666");
      } else if (_this.currentComponentName == "irrigate") {
        this.myMap.clearOverlays();
        this.MarkerObj["irrigation"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        console.log("777");
      } else if (_this.currentComponentName == "curing") {
        this.myMap.clearOverlays();
        this.MarkerObj["insect"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        this.MarkerObj["trash"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        console.log("888");
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@font-face
  font-family 'ariblkFont'
  src url('../assets/font/ariblk_0.ttf')
  font-weight normal
  font-style normal
@font-face
  font-family 'liFont'
  font-weight normal
  font-style normal
.left-common-nav
  position absolute
  top 80px
  left 27.5%
  // transform translateX(-50%)
  &-item__wrapper
    // background-image url('~@assets/asideImg/select.png')
    background-size 100% 100%
    background-position center center
    padding-left 55px
    width 95px
    height 45px
    display inline-flex
    align-items center
    line-height 1
    cursor pointer
    font-family liFont, sans-serif
    &:nth-of-type(n+2)
      // margin-left 12px
    &:nth-child(1)
       background-image url('~@assets/asideImg/envir1.png')
    &:nth-child(2)
       background-image url('~@assets/asideImg/triff1.png')
    &:nth-child(3)
       background-image url('~@assets/asideImg/triff1.png')
    &:nth-child(4)
       background-image url('~@assets/asideImg/wat1.png')
    &:nth-child(5)
       background-image url('~@assets/asideImg/light1.png')
    &:nth-child(6)
       background-image url('~@assets/asideImg/intell1.png')
    &:nth-child(7)
       background-image url('~@assets/asideImg/irrig1.png')
    &:nth-child(8)
       background-image url('~@assets/asideImg/curring1.png')
    &:nth-child(9)
       background-image url('~@assets/asideImg/land1.png')

    // &.active
    //   background-image url('~@assets/asideImg/unSelect.png')
p
  -webkit-margin-before 0
  -webkit-margin-after 0
select
  background-color rgb(2, 19, 39)
  color #C0C4CC
  width 130px
  font-size 13px
  height 20px
  line-height 20px
  border none
.welcome__wrapper >>> .el-scrollbar__wrap
  overflow-x auto
.welcome__wrapper
  width 100%
  height 100%
  overflow hidden
  position relative
  .screen-left,
  .screen-right
    position absolute
    z-index 2
    top 60px
    bottom 70px
    width 23.5%
  .screen-left
    left 10px
    .screenLeft
      background-image url('../assets/asideImg/asideBg.png')
      position absolute
      width 100%
      height 100%
      background-size cover
      text-align left
      z-index 2
  .screen-right
    right 30px
    .screenRight
      background-image url('../assets/asideImg/rightBotBg.png')
      position absolute
      width 100%
      height 96%
      background-size cover
      text-align left
      padding-right 20px
      z-index 2
      margin-top 4%
.baidumap
  width 100%
  height 100%
  position absolute
.asideTit
  position relative
  margin-top 8px
  margin-left 20px
  color #fff
  font-size 18px
  letter-spacing 4px
.asideTitEnergy
  margin-top 15px
  margin-left 20px
  margin-right 20px
  color #fff
  height 30px
  font-size 18px
  background-image url('../assets/asideImg/bigTit.png')
  background-repeat no-repeat
  line-height 30px
.tilte
  color #FEFFFF
  font-size 17px
  color #fff
  letter-spacing 6px
  font-weight bold
  line-height 30px
  padding-left 15px
  font-family FZLTTHK-GBK1-0
.tilteEnglish
  color #ffffff
  font-size 11px
  float right
  font-family FZYTK-GBK1-0
.waterTitle
  float left
  margin-left 20px
  font-size 15px
.warnTime
  line-height 25px
  font-family SourceHanSansCN-Regular
  font-size 14px
  color #FFFFFF
.warnTimeEnglish
  font-family SourceHanSansCN-Regular
  font-size 13px
  color #E6E6E6
.waterTitleValue
  float right
  margin-right 20px
  margin-top 6px
  font-size 32px
  // color #04DDDA
  color #F57800
  font-family ariblkFont, sans-serif
.chartChoice
  display flex
  margin-top 5px
  margin-left 20px
  margin-right 20px
  font-size 15px
.choice
  margin-right 10px
  font-size 14px
.dateChoice
  margin-top 5px
  margin-left 20px
.dateLeft
  margin-right 20px
.myChart
  height 140px
  background-color #021327
  margin-top 10px
  margin-left 20px
  margin-right 20px
.waterAlarmRecord
  margin-top 5px
  margin-left 20px
  margin-right 20px
  color #fff
  height 30px
  font-size 18px
  line-height 30px
.tilteAlarm
  color #FEFFFF
  font-size 17px
  color #fff
  letter-spacing 6px
  // font-weight bold
  line-height 30px
  font-family FZLTTHK-GBK1-0
.PointsSectionBar
  position relative
  left 20px
  top -10px
.yesterday-some-info
  margin-top 5px
  margin-left 20px
  margin-right 20px
  .info-item
    display flex
    padding 2px 0
    justify-content space-between
    .label
      color #ffffff
    .value
      color #ffffff
>>> .el-aside
  overflow none
.timeRange
  float left
  height 50px
  margin-right 10px
>>>.el-input--small .el-input__inner
  height 20px
  line-height 20px
  width 130px
  background-color #021327
  color #C0C4CC
  border none
>>>.el-input--small .el-input__icon
  line-height 20px
>>>.el-date-editor.el-input,
.el-date-editor.el-input__inner
  width 140px
>>>.el-input__suffix-inner
  margin-right 5px
.deviceBg
  background-image url('../assets/marker/deviceBg.png')
  width 274px
  height 200px
  background-size cover
  z-index 2
.reportForm
  display none
div
  color #ffffff
.info__wrapper
  margin-left 20px
  margin-right 20px
  .info-item
    display flex
    margin-top 10px
    .info_Title
      line-height 30px
    .info_Value
      .openValue
        color #00ffff
      .openTotal
        float right
        margin-right 17%
</style>
