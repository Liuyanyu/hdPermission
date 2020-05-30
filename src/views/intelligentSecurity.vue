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
      <div class="water">
        <p class="navTit">智能安防</p>
        <div class="waterMonitor">
          <div class="asideBg comTop">
            <span class="waterMonitorTit">入园人数</span>
            <span class="right">water monitoring</span>
          </div>
          <div class="comTop">
            <span>今日在园人数</span>
            <p class="lineHeightValue">Historical warning times</p>
            <p class="right hisWarn">
              <span class="warnValue">{{ inFlowToday }}</span>
              <span>次</span>
            </p>
          </div>
        </div>
        <div>
          <div class="comTop">
            <span class="monitorPoint">间隔选择</span>
            <select name="sel" v-model="timeIntervalValue">
              <option
                v-for="item in timeIntervalOptions"
                :key="item.timeIntervalValue"
                :label="item.timeIntervalLabel"
                :value="item.timeIntervalValue"
              ></option>
            </select>
            <span class="monitorPoint1">类别选择</span>
            <select v-model="WaterCategorySelectionValue" class="sel">
              <option
                v-for="item in WaterCategorySelectionOptions"
                :key="item.WaterCategorySelectionValue"
                :label="item.WaterCategorySelectionLabel"
                :value="item.WaterCategorySelectionValue"
              ></option>
            </select>
          </div>
        </div>
        <div class="chart"></div>
        <div class="reminderCon">
          <p class="reminder">
            {{ warn1 }}
          </p>
        </div>
      </div>
      <div class="water">
        <div class="waterMonitor">
          <div class="asideBg comTop">
            <span class="waterMonitorTit">告警统计</span>
            <span class="right">water monitoring</span>
          </div>
          <div class="comTop">
            <span>今日告警次数</span>
            <p class="lineHeightValue">Historical warning times</p>
            <p class="right hisWarn">
              <span class="warnValue">{{ cameraNum }}</span>
              <span>次</span>
            </p>
          </div>
        </div>
        <div>
          <div class="comTop">
            <span class="monitorPoint">间隔选择</span>
            <select name="sel" v-model="timeIntervalValue1">
              <option
                v-for="item in timeIntervalOptions1"
                :key="item.timeIntervalValue1"
                :label="item.timeIntervalLabel"
                :value="item.timeIntervalValue1"
              ></option>
            </select>
            <span class="monitorPoint1">类别选择</span>
            <select v-model="WaterCategorySelectionValue" class="sel">
              <option
                v-for="item in WaterCategorySelectionOptions"
                :key="item.WaterCategorySelectionValue"
                :label="item.WaterCategorySelectionLabel"
                :value="item.WaterCategorySelectionValue"
              ></option>
            </select>
          </div>
        </div>

        <div class="chart"></div>
        <div class="reminderCon">
          <p class="reminder">
            {{ warn1 }}
          </p>
          <p class="reminder">
            {{ warn2 }}
          </p>
        </div>
        <div class="waterAlarm">
          <div class="asideBg comTop">
            <span class="waterMonitorTit">巡更点</span>
            <span class="right">water alarm record</span>
          </div>
        </div>
      </div>
    </div>
     <common-footer></common-footer> 
    <router-view />
  </div>
</template>
<script>
import https from "@/https.js";
import cameraIconSuc from "@assets/marker/cameraSuccess.png";
import doorIcon from "@assets/marker/door.png";
import pointIcon from "@assets/marker/point.png";
// import cameraIconErr from "@assets/marker/cameraError.png";
import CommonHeader from "@commons/CommonHeader";
import CommonFooter from "@commons/CommonFooter";
export default {
  directives: {},
  components: { CommonHeader, CommonFooter },
  mixins: [],
  props: {},
  data() {
    return {
      inFlowTotal: "",
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
      inFlowToday: "",
      warn1: "",
      warn2: "",
      doorPoints: [],
      patrolPoints: [],
      cameraNum: "",
      WaterCategorySelectionValue: "总入园人数",
      WaterCategorySelectionOptions: [
        {
          WaterCategorySelectionValue: "总入园人数",
          WaterCategorySelectionLabel: "总入园人数"
        },
        {
          WaterCategorySelectionValue: "东门入园人数",
          WaterCategorySelectionLabel: "东门入园人数"
        },
        {
          WaterCategorySelectionValue: "西门入园人数",
          WaterCategorySelectionLabel: "西门入园人数"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getInflowTotal();
  },
  created() {
    this.inParkYeaterday();
    this.warnTime();
    this.cameraTotal();
  },
  methods: {
    // 在园人数
    getInflowTotal() {
      var _this = this;
      https
        .fetchGet("url2/people/total")
        .then(function(response) {
          console.log(response);
          // 东门
          var eastPark = response.object.east;
          var inFlowEast = eastPark.inFlow;
          var outFlowEast = eastPark.outFlow;
          // 西门
          var westPark = response.object.west;
          var inFlowWest = westPark.inFlow;
          var outFlowWest = westPark.outFlow;

          // 在园人数
          _this.inFlowToday =
            inFlowEast + inFlowWest - outFlowEast - outFlowWest;
          console.log(_this.inFlowToday);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 告警次数
    cameraTotal() {
      var _this = this;
      https
        .fetchGet("url2/camera/total")
        .then(function(response) {
          console.log(response);
          _this.cameraNum = response.object.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 预测告警
    warnTime() {
      var that = this;
      https
        .fetchGet("url2/camera/warnTime")
        .then(function(response) {
          console.log(response);
          that.warn1 = response.object.list;
        })
        .catch(function(error) {
          console.log(error);
        });
      https
        .fetchGet("url2/camera/tips")
        .then(function(response) {
          console.log(response);
          that.warn2 = response.object.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
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
    inParkYeaterday() {
      var _this = this;
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
      let param = {
        startTime: _this.s1,
        endTime: _this.s1
      };
      https
        .fetchGet("/api/people/history", param)
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
            _this.waterStartTypeNum[i] = _this.waterStartChartData[i].inFlow;
          }
          console.log(_this.waterStartCreatTime);
          console.log(_this.waterStartTypeNum);
          // 结束
          _this.waterEndChartData = response.object.contrastList;
          _this.waterEndCreatTime = [];
          _this.waterEndTypeNum = [];
          for (var i = 0; i < _this.waterEndChartData.length; i++) {
            _this.waterEndCreatTime[i] = _this.waterEndChartData[i].createTime;
            _this.waterEndTypeNum[i] = _this.waterEndChartData[i].inFlow;
          }
          console.log(_this.waterEndCreatTime);
          console.log(_this.waterEndTypeNum);
          _this.drawChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    inParkDay() {
      var _this = this;
      let param = {
        startTime: this.getTime1.getStartTimeDate,
        endTime: this.getTime1.getEndTimeDate
      };
      https
        .fetchGet("/api/people/history", param)
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
            _this.waterStartTypeNum[i] = _this.waterStartChartData[i].inFlow;
          }
          console.log(_this.waterStartCreatTime);
          console.log(_this.waterStartTypeNum);
          // 结束
          _this.waterEndChartData = response.object.contrastList;
          _this.waterEndCreatTime = [];
          _this.waterEndTypeNum = [];
          for (var i = 0; i < _this.waterEndChartData.length; i++) {
            _this.waterEndCreatTime[i] = _this.waterEndChartData[i].createTime;
            _this.waterEndTypeNum[i] = _this.waterEndChartData[i].inFlow;
          }
          console.log(_this.waterEndCreatTime);
          console.log(_this.waterEndTypeNum);
          _this.drawChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    inParkMonth() {
      var _this = this;
      let param = {
        startTime: this.getTime1.getStartTimeMonth,
        endTime: this.getTime1.getEndTimeMonth
      };
      https
        .fetchGet("/api/people/history", param)
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
            _this.waterStartTypeNum[i] = _this.waterStartChartData[i].inFlow;
          }
          console.log(_this.waterStartCreatTime);
          console.log(_this.waterStartTypeNum);
          // 结束
          _this.waterEndChartData = response.object.contrastList;
          _this.waterEndCreatTime = [];
          _this.waterEndTypeNum = [];
          for (var i = 0; i < _this.waterEndChartData.length; i++) {
            _this.waterEndCreatTime[i] = _this.waterEndChartData[i].createTime;
            _this.waterEndTypeNum[i] = _this.waterEndChartData[i].inFlow;
          }
          console.log(_this.waterEndCreatTime);
          console.log(_this.waterEndTypeNum);
          _this.drawChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    inParkYear() {
      var _this = this;
      let param = {
        startTime: this.getTime1.getStartTimeYear,
        endTime: this.getTime1.getEndTimeYear
      };
      https
        .fetchGet("/api/people/history", param)
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
            _this.waterStartTypeNum[i] = _this.waterStartChartData[i].inFlow;
          }
          console.log(_this.waterStartCreatTime);
          console.log(_this.waterStartTypeNum);
          // 结束
          _this.waterEndChartData = response.object.contrastList;
          _this.waterEndCreatTime = [];
          _this.waterEndTypeNum = [];
          for (var i = 0; i < _this.waterEndChartData.length; i++) {
            _this.waterEndCreatTime[i] = _this.waterEndChartData[i].createTime;
            _this.waterEndTypeNum[i] = _this.waterEndChartData[i].inFlow;
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
      this.inParkDay();
    },
    getEndDate1(value1) {
      console.log("改变结束时间" + value1);
      console.log(
        "开始时间" + this.getTime1.getStartTimeDate + "结束时间" + value1
      );
      this.inParkDay();
    },
    getStartMonth1(value) {
      console.log("改变开始时间" + value);
      this.inParkMonth();
    },
    getEndMonth1(value1) {
      console.log("改变结束时间" + value1);
      console.log(
        "开始时间" + this.getTime1.getStartTimeMonth + "结束时间" + value1
      );
      this.inParkMonth();
    },
    getStartYear1(value) {
      console.log("改变开始时间" + value);
      this.inParkYear();
    },
    getEndYear1(value1) {
      console.log("改变结束时间" + value1);
      console.log(
        "开始时间" + this.getTime1.getStartTimeYear + "结束时间" + value1
      );
      this.inParkYear();
    },
    // 告警统计
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
    handler({ BMap, map }) {
      var _this = this;
      // 地图中心点
      this.center.lng = 116.302281;
      this.center.lat = 39.992571;
      // 初始化地图 地图级别
      this.zoom = 17;
      // var mapStyle = { style: "midnight" };
      // map.setMapStyle(mapStyle);
      map.enableScrollWheelZoom();
      // 摄像头
      https
        .fetchGet("url2/camera/all")
        .then(function(response) {
          console.log(response);
          var cameraData = response.object.list;
          var mapPoints = [];
          for (var i = 0; i < cameraData.length; i++) {
            mapPoints.push({
              x: cameraData[i].latitude,
              y: cameraData[i].longitude,
              cameraName: cameraData[i].cameraName,
              var1: cameraData[i].var1
            });
          }
          _this.mapPoints = mapPoints;

          for (var i = 0; i < _this.mapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              `<div class="title" style=" display: flex"><button id="waterName" style="flex:1;border: none;background-color: transparent;outline: none;">智能监测点</button><button id="waterTab" style="flex:1;border: none;background-color: transparent;outline: none;">报表</button></div>`;
            content = content + `<div id="deviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">机型 : ` +
              _this.mapPoints[i].cameraName +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">地址 : ` +
              _this.mapPoints[i].var1 +
              `</p>`;
            content = content + `</div>`;
            content += `</div>`;
            //创建坐标点
            var points = new BMap.Point(
              _this.mapPoints[i].y,
              _this.mapPoints[i].x
            );
            var opts = {
              width: 120,
              height: 40
            };
            var infoWindows = new BMap.InfoWindow(content, opts);

            markerFun(points, infoWindows);

            function markerFun(points, infoWindows) {
              var myIcon = new BMap.Icon(cameraIconSuc, new BMap.Size(28, 35));
              var markers = new BMap.Marker(points, { icon: myIcon });
              // markers.setAnimation(BMAP_ANIMATION_BOUNCE);

              map.addOverlay(markers);

              var label = new BMap.Label(_this.mapPoints[i].cameraName, {
                offset: new BMap.Size(0, 32)
              });
              var labelStyle = {
                border: "0",
                color: "#000000"
              };
              label.setStyle(labelStyle);
              markers.setLabel(label);

              markers.addEventListener("click", function() {
                map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
              });
            }
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      // 管理处
      https
        .fetchGet("url2/door/list")
        .then(function(response) {
          console.log(response);
          var doorData = response.object.list;
          var doorPoints = [];
          for (var i = 0; i < doorData.length; i++) {
            doorPoints.push({
              x: doorData[i].deviceLatitude,
              y: doorData[i].deviceLongitude,
              deviceName: doorData[i].deviceName
            });
          }
          _this.doorPoints = doorPoints;
          console.log(_this.doorPoints);
          for (var i = 0; i < _this.doorPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              `<div class="title" style=" display: flex"><button id="waterName" style="flex:1;border: none;background-color: transparent;outline: none;">智能监测点</button><button id="waterTab" style="flex:1;border: none;background-color: transparent;outline: none;">报表</button></div>`;
            content = content + `<div id="deviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">名称 : ` +
              _this.doorPoints[i].deviceName +
              `</p>`;
            content = content + `</div>`;
            content += `</div>`;
            //创建坐标点
            var points = new BMap.Point(
              _this.doorPoints[i].y,
              _this.doorPoints[i].x
            );
            var opts = {
              width: 120,
              height: 40
            };
            var infoWindows = new BMap.InfoWindow(content, opts);

            markerFun(points, infoWindows);

            function markerFun(points, infoWindows) {
              var doIcon = new BMap.Icon(doorIcon, new BMap.Size(28, 35));
              var markers = new BMap.Marker(points, { icon: doIcon });
              // markers.setAnimation(BMAP_ANIMATION_BOUNCE);

              map.addOverlay(markers);

              var label = new BMap.Label(_this.doorPoints[i].deviceName, {
                offset: new BMap.Size(-20, 42)
              });
              var labelStyle = {
                border: "0",
                color: "#000000"
              };
              label.setStyle(labelStyle);
              markers.setLabel(label);

              markers.addEventListener("click", function() {
                map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
              });
            }
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      //巡更点
      https
        .fetchGet("url2/security/pointList")
        .then(function(response) {
          console.log(response);
          var pointListData = response.object.list;
          var patrolPoints = [];
          for (var i = 0; i < pointListData.length; i++) {
            patrolPoints.push({
              x: pointListData[i].deviceLatitude,
              y: pointListData[i].deviceLongitude,
              deviceName: pointListData[i].deviceName
            });
          }
          _this.patrolPoints = patrolPoints;
          console.log(_this.patrolPoints);
          for (var i = 0; i < _this.patrolPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              `<div class="title" style=" display: flex"><button id="waterName" style="flex:1;border: none;background-color: transparent;outline: none;">智能监测点</button><button id="waterTab" style="flex:1;border: none;background-color: transparent;outline: none;">报表</button></div>`;
            content = content + `<div id="deviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">巡更点位置 : ` +
              _this.patrolPoints[i].deviceName +
              `</p>`;
            content = content + `</div>`;
            content += `</div>`;
            //创建坐标点
            var points = new BMap.Point(
              _this.patrolPoints[i].y,
              _this.patrolPoints[i].x
            );
            var opts = {
              width: 120,
              height: 40
            };
            var infoWindows = new BMap.InfoWindow(content, opts);
            markerFun(points, infoWindows);
            function markerFun(points, infoWindows) {
              var poIcon = new BMap.Icon(pointIcon, new BMap.Size(40, 40));
              var markers = new BMap.Marker(points, { icon: poIcon });
              // markers.setAnimation(BMAP_ANIMATION_BOUNCE);
              map.addOverlay(markers);
              var label = new BMap.Label(_this.patrolPoints[i].deviceName, {
                offset: new BMap.Size(-26, 40)
              });
              var labelStyle = {
                border: "0",
                color: "#000000"
              };
              label.setStyle(labelStyle);
              markers.setLabel(label);
              markers.addEventListener("click", function() {
                map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
              });
            }
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 智能安防图表
    getPeopleAmountData() {
      let params = { startTime: "2019-08-03", endTime: "", doorId: "1" };
      https
        .fetchGet("/people/history", params)
        .then(function(response) {
          console.log(response.object.contrastList);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.hasInspection
  width 50px
  height 25px
  background url('../assets/intelligenSecurity/hasInspection.png')
  background-repeat no-repeat
  float left
  margin-right 10px
  line-height 20px
  text-align center
  font-size 12px
.noInspection
  width 50px
  height 25px
  background url('../assets/intelligenSecurity/NoInspection.png')
  background-repeat no-repeat
  float left
  margin-right 10px
  line-height 20px
  text-align center
  font-size 12px
.unfinished
  width 50px
  height 25px
  background url('../assets/intelligenSecurity/unfinished.png')
  background-repeat no-repeat
  float left
  margin-right 20px
  line-height 20px
  text-align center
  font-size 12px
</style>
