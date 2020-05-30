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
    <div class="screenLeft">
      <p class="navTit">智慧照明</p>
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

import smartIcon from "@assets/marker/smartLight.png";
import reactionIcon from "@assets/marker/reactionLight.png";
import ordinaryIcon from "@assets/marker/ordinaryLight.png";
import lawnIcon from "@assets/marker/lawnLight.png";

import global from "@commons/lightTotal/global";
import smart from "@commons/lightTotal/smart";
import reaction from "@commons/lightTotal/reaction";
import ordinary from "@commons/lightTotal/ordinary";
import lawn from "@commons/lightTotal/lawn";

export default {
  directives: {},
  mixins: [],
  props: {},
  components: {
    global,
    smart,
    reaction,
    ordinary,
    lawn,
    CommonHeader,
    CommonFooter
  },
  data() {
    return {
      currentComponentName: "global",
      yesterday: "",
      yesterdayData: "",
      totalData: "",
      tatal: "",
      totalPrice: "",
      yesterDayPrice: "",
      navItems: [
        { label: "全局照明", componentName: "global" },
        { label: "智慧路灯", componentName: "smart" },
        { label: "感应路灯", componentName: "reaction" },
        { label: "普通路灯", componentName: "ordinary" },
        { label: "草坪灯", componentName: "lawn" }
      ],
      showImgInfo: [
        { value: "20", unit: "kw/h", isMoney: false, label: "总耗电量" },
        { value: "20", unit: "kw/h", isMoney: false, label: "昨日用电" },
        { value: "20", unit: "kw/h", isMoney: false, label: "节省电量" },
        { value: "20", unit: "万元", isMoney: true, label: "节省金额" }
      ],
      yesterdayInfo: [
        {
          label: "昨日节省电量",
          value: "1241982.09",
          unit: "km/h",
          state: true
        },
        {
          label: "昨日节省金额",
          value: "1241982.09",
          unit: "km/h",
          state: true
        }
      ],
      electricitySomeInfo: [
        {
          label: "智慧路灯",
          value: "2.3",
          unit: "kw/h",
          progress: "34",
          uping: true
        },
        {
          label: "感应路灯",
          value: "2.3",
          unit: "kw/h",
          progress: "34",
          uping: true
        },
        {
          label: "草坪灯",
          value: "2.3",
          unit: "kw/h",
          progress: "34",
          uping: true
        },
        {
          label: "普通灯",
          value: "2.3",
          unit: "kw/h",
          progress: "34",
          uping: true
        }
      ],
      failureLogging: [
        {
          label: "普通路灯",
          malfunc: "故障",
          solve: "已解决",
          time: "14:00:23"
        },
        {
          label: "普通路灯",
          malfunc: "故障",
          solve: "已解决",
          time: "14:00:23"
        },
        {
          label: "普通路灯",
          malfunc: "故障",
          solve: "已解决",
          time: "14:00:23"
        },
        {
          label: "普通路灯",
          malfunc: "故障",
          solve: "已解决",
          time: "14:00:23"
        },
        {
          label: "普通路灯",
          malfunc: "故障",
          solve: "已解决",
          time: "14:00:23"
        }
      ],
      waterStartChartData: "",
      waterStartCreatTime: "",
      waterStartTypeNum: "",

      waterEndChartData: "",
      waterEndCreatTime: "",
      waterEndTypeNum: "",

      soilStartChartData: "",
      soilStartCreatTime: "",
      soilStartTypeNum: "",

      soilEndChartData: "",
      soilEndCreatTime: "",
      soilEndTypeNum: "",

      center: { lng: 0, lat: 0 },
      zoom: 3,
      WaterCategorySelectionOptions: [
        {
          WaterCategorySelectionValue: "照明",
          WaterCategorySelectionLabel: "照明"
        },
        {
          WaterCategorySelectionValue: "办公区",
          WaterCategorySelectionLabel: "办公区"
        }
      ],
      WaterCategoryDefalutValue: "照明",
      timeIntervalValue: "日",
      timeIntervalOptions: [
        {
          timeIntervalValue: "年",
          timeIntervalLabel: "年"
        },
        {
          timeIntervalValue: "月",
          timeIntervalLabel: "月"
        },
        {
          timeIntervalValue: "日",
          timeIntervalLabel: "日"
        }
      ],
      timeIntervalValue1: "日",
      timeIntervalOptions1: [
        {
          timeIntervalValue1: "年",
          timeIntervalLabel1: "年"
        },
        {
          timeIntervalValue1: "月",
          timeIntervalLabel1: "月"
        },
        {
          timeIntervalValue1: "日",
          timeIntervalLabel1: "日"
        }
      ],
      // 开始和结束时间不能超过当天
      pickerStartTimeDate: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerEndTimeDate: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      getTime1: {
        getStartTimeDate: "",
        getEndTimeDate: "",
        getStartTimeMonth: "",
        getEndTimeMonth: "",
        getStartTimeYear: "",
        getEndTimeYear: ""
      },
      getTime2: {
        getStartTimeDate: "",
        getEndTimeDate: "",
        getStartTimeMonth: "",
        getEndTimeMonth: "",
        getStartTimeYear: "",
        getEndTimeYear: ""
      },
      s1: "",
      mapPoints: "",
      reacMapPoints: "",
      ordinaryMapPoints: "",
      lampMapPoints: "",
      soilMapPoints: "",
      myMap: {},
      MarkerObj: {},
      ordinaryResault: {},
      lawnResult: {},
      smartLiveStatus: {}
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    setTimeout(this.lightYesterday(), 200000);
  },
  methods: {
    drawChart() {
      let _this = this;
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      myChart1.setOption({
        grid: {
          y: 10,
          height: 80,
          y2: 20
        },
        xAxis: {
          type: "category",
          data: _this.waterCreatTime,
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        // color: ["#00b4fe", "#00b4fe", "#00b4fe"],
        series: [
          {
            data: _this.waterStartTypeNum,
            type: "line",
            smooth: true,
            color: "#ff0000",
            lineStyle: {
              color: "#ff0000"
            }
          },
          {
            data: _this.waterEndTypeNum,
            type: "line",
            smooth: true,
            color: "#04DDDA",
            lineStyle: {
              color: "#04DDDA"
            }
          }
        ]
      });
    },
    lightYesterday() {
      var _this = this;
      // format 扩展函数
      Date.prototype.format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
      var day1 = new Date();
      day1.setDate(day1.getDate() - 1);
      var s1 = day1.format("yyyy-MM-dd");
      console.log(s1);
      _this.s1 = s1;
      var electricType = "";
      if (this.WaterCategoryDefalutValue == "照明") {
        electricType = 1;
      } else if (this.WaterCategoryDefalutValue == "办公区") {
        electricType = 2;
      }
      let param = {
        startTime: _this.s1,
        endTime: _this.s1,
        type: electricType
      };
      https
        .fetchGet("/api/light/history", param)
        .then(function(response) {
          console.log(response);
          console.log(response.object.list);
          // 开始
          _this.waterStartChartData = response.object.list;
          _this.waterStartCreatTime = [];
          _this.waterStartTypeNum = [];
          for (var i = 0; i < _this.waterStartChartData.length; i++) {
            _this.waterStartCreatTime[i] =
              _this.waterStartChartData[i].createTime;
            _this.waterStartTypeNum[i] =
              _this.waterStartChartData[i].differenceValue;
          }
          console.log(_this.waterStartCreatTime);
          console.log(_this.waterStartTypeNum);
          // 结束
          _this.waterEndChartData = response.object.contrastList;
          _this.waterEndCreatTime = [];
          _this.waterEndTypeNum = [];
          for (var i = 0; i < _this.waterEndChartData.length; i++) {
            _this.waterEndCreatTime[i] = _this.waterEndChartData[i].createTime;
            _this.waterEndTypeNum[i] =
              _this.waterEndChartData[i].differenceValue;
          }
          console.log(_this.waterEndCreatTime);
          console.log(_this.waterEndTypeNum);
          _this.drawChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    lightDataDay() {
      var _this = this;
      var electricType = "";
      if (this.WaterCategoryDefalutValue == "照明") {
        electricType = 1;
      } else if (this.WaterCategoryDefalutValue == "办公区") {
        electricType = 2;
      }
      let param = {
        startTime: this.getTime1.getStartTimeDate,
        endTime: this.getTime1.getEndTimeDate,
        type: electricType
      };
      https
        .fetchGet("/api/light/history", param)
        .then(function(response) {
          console.log(response);
          console.log(response.object.list);
          // 开始
          _this.waterStartChartData = response.object.list;
          _this.waterStartCreatTime = [];
          _this.waterStartTypeNum = [];
          for (var i = 0; i < _this.waterStartChartData.length; i++) {
            _this.waterStartCreatTime[i] =
              _this.waterStartChartData[i].createTime;
            _this.waterStartTypeNum[i] =
              _this.waterStartChartData[i].differenceValue;
          }
          console.log(_this.waterStartCreatTime);
          console.log(_this.waterStartTypeNum);
          // 结束
          _this.waterEndChartData = response.object.contrastList;
          _this.waterEndCreatTime = [];
          _this.waterEndTypeNum = [];
          for (var i = 0; i < _this.waterEndChartData.length; i++) {
            _this.waterEndCreatTime[i] = _this.waterEndChartData[i].createTime;
            _this.waterEndTypeNum[i] =
              _this.waterEndChartData[i].differenceValue;
          }
          console.log(_this.waterEndCreatTime);
          console.log(_this.waterEndTypeNum);
          _this.drawChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    lightDataMonth() {
      var _this = this;
      var electricType = "";
      if (this.WaterCategoryDefalutValue == "照明") {
        electricType = 1;
      } else if (this.WaterCategoryDefalutValue == "办公区") {
        electricType = 2;
      }
      let param = {
        startTime: this.getTime1.getStartTimeMonth,
        endTime: this.getTime1.getEndTimeMonth,
        type: electricType
      };
      https
        .fetchGet("/api/light/history", param)
        .then(function(response) {
          console.log(response);
          console.log(response.object.list);
          // 开始
          _this.waterStartChartData = response.object.list;
          _this.waterStartCreatTime = [];
          _this.waterStartTypeNum = [];
          for (var i = 0; i < _this.waterStartChartData.length; i++) {
            _this.waterStartCreatTime[i] =
              _this.waterStartChartData[i].createTime;
            _this.waterStartTypeNum[i] =
              _this.waterStartChartData[i].differenceValue;
          }
          console.log(_this.waterStartCreatTime);
          console.log(_this.waterStartTypeNum);
          // 结束
          _this.waterEndChartData = response.object.contrastList;
          _this.waterEndCreatTime = [];
          _this.waterEndTypeNum = [];
          for (var i = 0; i < _this.waterEndChartData.length; i++) {
            _this.waterEndCreatTime[i] = _this.waterEndChartData[i].createTime;
            _this.waterEndTypeNum[i] =
              _this.waterEndChartData[i].differenceValue;
          }
          console.log(_this.waterEndCreatTime);
          console.log(_this.waterEndTypeNum);
          _this.drawChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    lightDataYear() {
      var _this = this;
      var electricType = "";
      if (this.WaterCategoryDefalutValue == "照明") {
        electricType = 1;
      } else if (this.WaterCategoryDefalutValue == "办公区") {
        electricType = 2;
      }
      let param = {
        startTime: this.getTime1.getStartTimeYear,
        endTime: this.getTime1.getEndTimeYear,
        type: electricType
      };
      https
        .fetchGet("/api/light/history", param)
        .then(function(response) {
          console.log(response);
          console.log(response.object.list);
          // 开始
          _this.waterStartChartData = response.object.list;
          _this.waterStartCreatTime = [];
          _this.waterStartTypeNum = [];
          for (var i = 0; i < _this.waterStartChartData.length; i++) {
            _this.waterStartCreatTime[i] =
              _this.waterStartChartData[i].createTime;
            _this.waterStartTypeNum[i] =
              _this.waterStartChartData[i].differenceValue;
          }
          console.log(_this.waterStartCreatTime);
          console.log(_this.waterStartTypeNum);
          // 结束
          _this.waterEndChartData = response.object.contrastList;
          _this.waterEndCreatTime = [];
          _this.waterEndTypeNum = [];
          for (var i = 0; i < _this.waterEndChartData.length; i++) {
            _this.waterEndCreatTime[i] = _this.waterEndChartData[i].createTime;
            _this.waterEndTypeNum[i] =
              _this.waterEndChartData[i].differenceValue;
          }
          console.log(_this.waterEndCreatTime);
          console.log(_this.waterEndTypeNum);
          _this.drawChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getStartDate1(value) {
      console.log("改变开始时间" + value);
      this.lightDataDay();
    },
    getEndDate1(value1) {
      console.log("改变结束时间" + value1);
      console.log(
        "开始时间" + this.getTime1.getStartTimeDate + "结束时间" + value1
      );
      this.lightDataDay();
    },
    getStartMonth1(value) {
      console.log("改变开始时间" + value);
      this.lightDataMonth();
    },
    getEndMonth1(value1) {
      console.log("改变结束时间" + value1);
      console.log(
        "开始时间" + this.getTime1.getStartTimeMonth + "结束时间" + value1
      );
      this.lightDataMonth();
    },
    getStartYear1(value) {
      console.log("改变开始时间" + value);
      this.lightDataYear();
    },
    getEndYear1(value1) {
      console.log("照明");
      console.log("改变结束时间" + value1);
      console.log(
        "开始时间" + this.getTime1.getStartTimeYear + "结束时间" + value1
      );
      this.lightDataYear();
    },
    // 故障记录
    getStartDate2(value) {
      console.log("改变开始时间" + value);
    },
    getEndDate2(value1) {
      console.log("改变结束时间" + value1);
      console.log(
        "开始时间" + this.getTime2.getStartTimeDate + "结束时间" + value1
      );
      let param = {
        startTime: this.getTime2.getStartTimeDate,
        endTime: value1
      };
      https
        .fetchGet("", param)
        .then(function(response) {
          console.log(response.object.list);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getStartMonth2(value) {
      console.log("改变开始时间" + value);
    },
    getEndMonth2(value1) {
      console.log("改变结束时间" + value1);
      console.log(
        "开始时间" + this.getTime2.getStartTimeMonth + "结束时间" + value1
      );
      let param = {
        startTime: this.getTime2.getStartTimeMonth,
        endTime: value1
      };
      https
        .fetchGet("", param)
        .then(function(response) {
          console.log(response.object.list);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getStartYear2(value) {
      console.log("改变开始时间" + value);
    },
    getEndYear2(value1) {
      console.log("改变结束时间" + value1);
      console.log(
        "开始时间" + this.getTime2.getStartTimeYear + "结束时间" + value1
      );
      let param = {
        startTime: this.getTime2.getStartTimeYear,
        endTime: value1
      };
      https
        .fetchGet("", param)
        .then(function(response) {
          console.log(response.object.list);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 智慧路灯实时状态
    smartLiveStatusData() {
      var that = this;
      https
        .fetchGet("url2/light/smartLightNow")
        .then(function(response) {
          console.log(response.object.list);
          var liveStatus = response.object.list;
          that.smartLiveStatus = liveStatus;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handler({ BMap, map }) {
      var _this = this;
      // 地图中心点
      this.center.lng = 116.302281;
      this.center.lat = 39.992571;
      this.zoom = 18;
      // var mapStyle = { style: "midnight" };
      // map.setMapStyle(mapStyle);
      map.enableScrollWheelZoom();
      let MarkerObj = {};

      // 智慧
      https
        .fetchGet("url2/light/list", { type: 3 })
        .then(function(response) {
          console.log(response.object.list);
          var smartData = response.object.list;
          console.log(smartData);
          var mapPoints = [];
          for (var i = 0; i < smartData.length; i++) {
            mapPoints.push({
              x: smartData[i].latitude,
              y: smartData[i].longitude,
              lightWay: smartData[i].lightWay
            });
          }
          _this.mapPoints = mapPoints;
          console.log(_this.mapPoints);
          // _this.smartLiveStatusData();
          // console.log(_this.data.smartLiveStatus)
          for (var i = 0; i < _this.mapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              `<div class="title" style=" display: flex">
              <button id="smartInfo"  class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">智慧路灯</button>
              <button id="smartPan" class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">控制面板</button>
              <button id="smartTab" class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">报表</button>
              </div>`;
            content = content + `<div id="smartInfoCon">`;
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
              `<div class="reportForm" id="smartPanCon" style="display:none">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">亮度设置:最高值:` +
              `110lux` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:70px">最低值:` +
              `101lux` +
              `</p>`;
            content = content + ` </div>`;
            content =
              content +
              `<div class="reportForm" id="smartTabCon" style="display:none">`;
            content = content + `<span>报表</span>`;
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
            markerFun(points, infoWindows);
            _this.markerFun(points, infoWindows, BMap, map, "1", smartIcon);
          }
          function markerFun(points, infoWindows) {
            var myIcon = new BMap.Icon(smartIcon, new BMap.Size(50, 50));
            var markers = new BMap.Marker(points, { icon: myIcon });
            // markers.setAnimation(BMAP_ANIMATION_BOUNCE);
            map.addOverlay(markers);
            var label = new BMap.Label(_this.mapPoints[i].lightWay, {
              offset: new BMap.Size(0, 42)
            });
            var labelStyle = {
              border: "0",
              color: "#000000"
            };
            label.setStyle(labelStyle);
            markers.setLabel(label);
            markers.addEventListener("click", function() {
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
        .fetchGet("url2/light/list", { type: 4 })
        .then(function(response) {
          console.log(response.object.list);
          var reacData = response.object.list;
          console.log(reacData);
          var reacMapPoints = [];
          for (var i = 0; i < reacData.length; i++) {
            reacMapPoints.push({
              x: reacData[i].latitude,
              y: reacData[i].longitude,
              lightWay: reacData[i].lightWay
            });
          }
          _this.reacMapPoints = reacMapPoints;

          for (var i = 0; i < _this.reacMapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              `<div class="title" style=" display: flex">
              <button id="reactionInfo"  class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">感应路灯</button>
              <button id="reactionPan" class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">控制面板</button>
              <button id="reactionTab" class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">报表</button>
              </div>`;
            content = content + `<div id="reactionInfoCon">`;
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
              `<div class="reportForm" id="reactionPanCon" style="display:none">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">亮度设置:最高值:` +
              `110lux` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:70px">最低值:` +
              `101lux` +
              `</p>`;
            content = content + ` </div>`;
            content =
              content +
              `<div class="reportForm" id="reactionTabCon" style="display:none">`;
            content = content + `<span>报表</span>`;
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
            markerFun(points, infoWindows);
          }
          function markerFun(points, infoWindows) {
            var soIcon = new BMap.Icon(reactionIcon, new BMap.Size(50, 50));
            var markers = new BMap.Marker(points, { icon: soIcon });
            map.addOverlay(markers);
            var label = new BMap.Label(_this.reacMapPoints[i].lightWay, {
              offset: new BMap.Size(0, 42)
            });
            var labelStyle = {
              border: "0",
              color: "#000000"
            };
            label.setStyle(labelStyle);
            markers.setLabel(label);
            // markers.setLabel(label);
            markers.addEventListener("click", function() {
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
        .fetchGet("url2/light/list", { type: 1 })
        .then(function(response) {
          var ordinData = response.object.list;
          console.log(ordinData);
          var ordinMapPoints = [];
          var result = [];
          var objOrd = {};
          for (var i = 0; i < ordinData.length; i++) {
            if (!objOrd[ordinData[i].lightWay]) {
              result.push(ordinData[i]);
              objOrd[ordinData[i].lightWay] = true;
            }
          }
          console.log(result);
          _this.ordinaryResault = result;
          for (var i = 0; i < _this.ordinaryResault.length; i++) {
            ordinMapPoints.push({
              x: _this.ordinaryResault[i].latitude,
              y: _this.ordinaryResault[i].longitude,
              lightWay: _this.ordinaryResault[i].lightWay
            });
          }
          _this.ordinMapPoints = ordinMapPoints;

          for (var i = 0; i < _this.ordinMapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              `<div class="title" style=" display: flex">
              <button id="ordinaryInfo"  class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">普通路灯</button>
              <button id="ordinaryPan" class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">控制面板</button>
              <button id="ordinaryTab" class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">报表</button>
              </div>`;
            content = content + `<div id="ordinaryInfoCon">`;
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
            content =
              content +
              `<div class="reportForm" id="ordinaryPanCon" style="display:none">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">亮度设置:最高值:` +
              `110lux` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:70px">最低值:` +
              `101lux` +
              `</p>`;
            content = content + ` </div>`;
            content =
              content +
              `<div class="reportForm" id="ordinaryTabCon" style="display:none">`;
            content = content + `<span>报表</span>`;
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
            markerFun(points, infoWindows);
          }
          function markerFun(points, infoWindows) {
            var soIcon = new BMap.Icon(ordinaryIcon, new BMap.Size(50, 50));
            var markers = new BMap.Marker(points, { icon: soIcon });
            map.addOverlay(markers);
            var label = new BMap.Label(_this.ordinMapPoints[i].lightWay, {
              offset: new BMap.Size(0, 42)
            });
            var labelStyle = {
              border: "0",
              color: "#000000"
            };
            label.setStyle(labelStyle);
            markers.setLabel(label);
            markers.addEventListener("click", function() {
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
        .fetchGet("url2/light/list", { type: 2 })
        .then(function(response) {
          console.log(response.object.list);
          var lawnData = response.object.list;
          console.log(lawnData);
          var lawnMapPoints = [];
          var result = [];
          var objOrd = {};
          for (var i = 0; i < lawnData.length; i++) {
            if (!objOrd[lawnData[i].lightWay]) {
              result.push(lawnData[i]);
              objOrd[lawnData[i].lightWay] = true;
            }
          }
          _this.lawnResult = result;
          for (var i = 0; i < _this.lawnResult.length; i++) {
            lawnMapPoints.push({
              x: _this.lawnResult[i].latitude,
              y: _this.lawnResult[i].longitude,
              lightWay: _this.lawnResult[i].lightWay
            });
          }
          _this.lawnMapPoints = lawnMapPoints;

          for (var i = 0; i < _this.lawnMapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              `<div class="title" style=" display: flex">
              <button id="lawnInfo"  class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">草坪灯</button>
              <button id="lawnPan" class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">控制面板</button>
              <button id="lawnTab" class="eleTit" style="flex:1;border: none;background-color: transparent;outline: none;">报表</button>
              </div>`;
            content = content + `<div id="lawnInfoCon">`;
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
              `<div class="reportForm" id="lawnPanCon" style="display:none">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">亮度设置:最高值:` +
              `110lux` +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:70px">最低值:` +
              `101lux` +
              `</p>`;
            content = content + ` </div>`;
            content =
              content +
              `<div class="reportForm" id="lawnTabCon" style="display:none">`;
            content = content + `<span>报表</span>`;
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
            markerFun(points, infoWindows);
            _this.markerFun(points, infoWindows, BMap, map, "4", lawnIcon);
          }
          function markerFun(points, infoWindows) {
            var soIcon = new BMap.Icon(lawnIcon, new BMap.Size(50, 50));
            var markers = new BMap.Marker(points, { icon: soIcon });
            map.addOverlay(markers);
            var label = new BMap.Label(_this.lawnMapPoints[i].lightWay, {
              offset: new BMap.Size(0, 42)
            });
            var labelStyle = {
              border: "0",
              color: "#000000"
            };
            label.setStyle(labelStyle);
            markers.setLabel(label);
            // markers.setLabel(label);
            markers.addEventListener("click", function() {
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
    handleNavItemClick(item) {
      var _this = this;
      _this.currentComponentName = item.componentName;
      if (_this.currentComponentName == "global") {
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
        console.log("111");
      } else if (_this.currentComponentName == "smart") {
        this.myMap.clearOverlays();
        this.MarkerObj["1"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        console.log("222");
      } else if (_this.currentComponentName == "reaction") {
        this.myMap.clearOverlays();
        this.MarkerObj["2"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        console.log("333");
      } else if (_this.currentComponentName == "ordinary") {
        this.myMap.clearOverlays();
        this.MarkerObj["3"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        console.log("444");
      } else if (_this.currentComponentName == "lawn") {
        this.myMap.clearOverlays();
        this.MarkerObj["4"].forEach(item => {
          this.myMap.addOverlay(item);
        });
        console.log("555");
      }
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
          // 智慧路灯
          var smartInfo = document.getElementById("smartInfo");
          smartInfo.onclick = function() {
            console.log("监测点");
            document.getElementById("smartInfoCon").style.display = "block";
            document.getElementById("smartPanCon").style.display = "none";
            document.getElementById("smartTabCon").style.display = "none";
          };
          var smartPan = document.getElementById("smartPan");
          smartPan.onclick = function() {
            console.log("控制面板");
            document.getElementById("smartInfoCon").style.display = "none";
            document.getElementById("smartPanCon").style.display = "block";
            document.getElementById("smartTabCon").style.display = "none";
          };
          var smartTab = document.getElementById("smartTab");
          smartTab.onclick = function() {
            console.log("报表");
            document.getElementById("smartInfoCon").style.display = "none";
            document.getElementById("smartPanCon").style.display = "none";
            document.getElementById("smartTabCon").style.display = "block";
          };
          // // 感应路灯
          var reactionInfo = document.getElementById("reactionInfo");
          reactionInfo.onclick = function() {
            console.log("监测点");
            document.getElementById("reactionInfoCon").style.display = "block";
            document.getElementById("reactionPanCon").style.display = "none";
            document.getElementById("reactionTabCon").style.display = "none";
          };
          var reactionPan = document.getElementById("reactionPan");
          reactionPan.onclick = function() {
            console.log("控制面板");
            document.getElementById("reactionInfoCon").style.display = "none";
            document.getElementById("reactionPanCon").style.display = "block";
            document.getElementById("reactionTabCon").style.display = "none";
          };
          var reactionTab = document.getElementById("reactionTab");
          reactionTab.onclick = function() {
            console.log("报表");
            document.getElementById("reactionInfoCon").style.display = "none";
            document.getElementById("reactionPanCon").style.display = "none";
            document.getElementById("reactionTabCon").style.display = "block";
          };
          // 普通路灯
          var ordinaryInfo = document.getElementById("ordinaryInfo");
          ordinaryInfo.onclick = function() {
            console.log("监测点");
            document.getElementById("ordinaryInfoCon").style.display = "block";
            document.getElementById("ordinaryPanCon").style.display = "none";
            document.getElementById("ordinaryTabCon").style.display = "none";
          };
          var ordinaryPan = document.getElementById("ordinaryPan");
          ordinaryPan.onclick = function() {
            console.log("控制面板");
            document.getElementById("ordinaryInfoCon").style.display = "none";
            document.getElementById("ordinaryPanCon").style.display = "block";
            document.getElementById("ordinaryTabCon").style.display = "none";
          };
          var ordinaryTab = document.getElementById("ordinaryTab");
          ordinaryTab.onclick = function() {
            console.log("报表");
            document.getElementById("ordinaryInfoCon").style.display = "none";
            document.getElementById("ordinaryPanCon").style.display = "none";
            document.getElementById("ordinaryTabCon").style.display = "block";
          };
          // 草坪灯
          var lawnInfo = document.getElementById("lawnInfo");
          lawnInfo.onclick = function() {
            console.log("监测点");
            document.getElementById("lawnInfoCon").style.display = "block";
            document.getElementById("lawnPanCon").style.display = "none";
            document.getElementById("lawnTabCon").style.display = "none";
          };
          var lawnPan = document.getElementById("lawnPan");
          lawnPan.onclick = function() {
            console.log("控制面板");
            document.getElementById("lawnInfoCon").style.display = "none";
            document.getElementById("lawnPanCon").style.display = "block";
            document.getElementById("lawnTabCon").style.display = "none";
          };
          var lawnTab = document.getElementById("lawnTab");
          lawnTab.onclick = function() {
            console.log("报表");
            document.getElementById("lawnInfoCon").style.display = "none";
            document.getElementById("lawnPanCon").style.display = "none";
            document.getElementById("lawnTabCon").style.display = "block";
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
  left 60%
  transform translateX(-50%)
  display flex
  &-item__wrapper
    // background-image url('~@assets/asideImg/unSelect.png')
    background-size 100% 100%
    background-position center center
    padding-left 42px
    width 68px
    height 32px
    display inline-flex
    align-items center
    line-height 1
    cursor pointer
    flex 1
    font-size 10px
    text-align center
    &:nth-of-type(n+2)
      margin-left 12px
    &:nth-child(1)
      background-image url('~@assets/asideImg/light1.png')
    &:nth-child(2)
      background-image url('~@assets/asideImg/light2.png')
    &:nth-child(3)
      background-image url('~@assets/asideImg/light3.png')
    &:nth-child(4)
      background-image url('~@assets/asideImg/light4.png')
    &:nth-child(5)
      background-image url('~@assets/asideImg/light5.png')
    &.active
      // background-image url('~@assets/asideImg/unSelect.png')
</style>
