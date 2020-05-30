<template>
  <div class="welcome__wrapper">
    <common-header></common-header> 
    <router-view />
    <template>
      <div id="map">
        <baidu-map class="baidumap"
                   id="baidumap"
                   :center="center"
                   :zoom="zoom"
                   @ready="handler"></baidu-map>
      </div>
    </template>

    <div class="screen-left">
      <div class="screenLeft">
        <p class="asideTit">智能景观</p>
        <el-scrollbar style="height:95%">
          <div class="energy">
            <div class="asideTitEnergy">
              <span class="tilte">设备感应情况</span>
              <span class="tilteEnglish">Equipment induction</span>
            </div>
            <template>
              <div class="waterTitle">
                <p class="warnTime">当前感应次数</p>
                <p class="warnTimeEnglish">Current induction frequency</p>
              </div>
              <div class="waterTitleValue">
                <p>{{ reactionTotal }}</p>
              </div>
            </template>
            <div style="clear:both;"></div>
            <div class="yesterday-some-info">

              <div class="info-item"
                   v-for="item in yesterdayInfo">
                <div class="label">{{ item.interationId }}</div>
                <div class="value">{{ item.differenceNum }}</div>
              </div>

              <!-- <div class="info-item">
                <div class="label">{{reacList}}</div>
                <div class="value">{{reacListValue}}</div>
              </div> -->

            </div>
            <div class="chartChoice">
              <div>
                <span class="choice">间隔选择</span>
                <select v-model="timeIntervalValue">
                  <option v-for="item in timeIntervalOptions"
                          :key="item.timeIntervalValue"
                          :label="item.timeIntervalLabel"
                          :value="item.timeIntervalValue"></option>
                </select>
              </div>
            </div>
            <div class="dateChoice">
              <div v-if="timeIntervalValue == '日'">
                <label class="timeRange">时间范围</label>
                <el-date-picker class="dateLeft"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                @change="getStartDate1"
                                v-model="getTime1.getStartTimeDate"
                                :picker-options="pickerStartTimeDate">
                </el-date-picker>
                <el-date-picker type="date"
                                placeholder="选择日期"
                                @change="getEndDate1"
                                value-format="yyyy-MM-dd"
                                v-model="getTime1.getEndTimeDate"
                                :picker-options="pickerEndTimeDate">
                </el-date-picker>
              </div>
              <div v-if="timeIntervalValue == '月'">
                <label class="timeRange">时间范围</label>
                <el-date-picker class="dateLeft"
                                type="month"
                                placeholder="选择月"
                                value-format="yyyy-MM"
                                @change="getStartMonth1"
                                v-model="getTime1.getStartTimeMonth"
                                :picker-options="pickerStartTimeDate">
                </el-date-picker>
                <el-date-picker type="month"
                                placeholder="选择月"
                                value-format="yyyy-MM"
                                @change="getEndMonth1"
                                v-model="getTime1.getEndTimeMonth"
                                :picker-options="pickerEndTimeDate">
                </el-date-picker>
              </div>
              <div v-if="timeIntervalValue == '年'">
                <label class="timeRange">时间范围</label>
                <el-date-picker class="dateLeft"
                                align="right"
                                type="year"
                                placeholder="选择年"
                                value-format="yyyy"
                                @change="getStartYear1"
                                v-model="getTime1.getStartTimeYear"
                                :picker-options="pickerStartTimeDate">
                </el-date-picker>
                <el-date-picker align="right"
                                type="year"
                                placeholder="选择年"
                                value-format="yyyy"
                                @change="getEndYear1"
                                v-model="getTime1.getEndTimeYear"
                                :picker-options="pickerEndTimeDate">
                </el-date-picker>
              </div>
            </div>

            <div id="myChart1"
                 class="myChart"></div>
          </div>
          <div class="energy">
            <div class="asideTitEnergy">
              <span class="tilte">憩心亭太阳能系统</span>
              <span class="tilteEnglish">Trends in water</span>
            </div>
            <template>
              <div class="waterTitle">
                <p class="warnTime">蓄电池电量</p>
                <p class="warnTimeEnglish">Battery Weight Ah</p>
              </div>
              <div class="waterTitleValue">
                <p>95</p>
              </div>
            </template>
            <div style="clear:both;"></div>
            <div class="yesterday-some-info">
              <div class="info-item"
                   v-for="item in electricQuantity"
                   :key="item.label">
                <div class="label">{{ item.label }}</div>
                <div class="value">{{ item.value }}</span>
                </div>
              </div>
            </div>
            <div class="chartChoice">
              <div>
                <span class="choice">间隔选择</span>
                <select v-model="timeIntervalValue1">
                  <option v-for="item in timeIntervalOptions1"
                          :key="item.timeIntervalValue1"
                          :label="item.timeIntervalLabel1"
                          :value="item.timeIntervalValue1"></option>
                </select>
              </div>
            </div>
            <div class="chartChoice">
              <div v-if="timeIntervalValue1 == '日'">
                <label class="timeRange">时间范围</label>
                <el-date-picker class="dateLeft"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                @change="getStartDate2"
                                v-model="getTime2.getStartTimeDate"
                                :picker-options="pickerStartTimeDate">
                </el-date-picker>
                <el-date-picker type="date"
                                placeholder="选择日期"
                                @change="getEndDate2"
                                value-format="yyyy-MM-dd"
                                v-model="getTime2.getEndTimeDate"
                                :picker-options="pickerEndTimeDate">
                </el-date-picker>
              </div>
              <div v-if="timeIntervalValue1 == '月'">
                <label class="timeRange">时间范围</label>
                <el-date-picker class="dateLeft"
                                type="month"
                                placeholder="选择月"
                                value-format="yyyy-MM"
                                @change="getStartMonth2"
                                v-model="getTime2.getStartTimeMonth"
                                :picker-options="pickerStartTimeDate">
                </el-date-picker>
                <el-date-picker type="month"
                                placeholder="选择月"
                                value-format="yyyy-MM"
                                @change="getEndMonth2"
                                v-model="getTime2.getEndTimeMonth"
                                :picker-options="pickerEndTimeDate">
                </el-date-picker>
              </div>
              <div v-if="timeIntervalValue1 == '年'">
                <label class="timeRange">时间范围</label>
                <el-date-picker class="dateLeft"
                                align="right"
                                type="year"
                                placeholder="选择年"
                                value-format="yyyy"
                                @change="getStartYear2"
                                v-model="getTime2.getStartTimeYear"
                                :picker-options="pickerStartTimeDate">
                </el-date-picker>
                <el-date-picker align="right"
                                type="year"
                                placeholder="选择年"
                                value-format="yyyy"
                                @change="getEndYear2"
                                v-model="getTime2.getEndTimeYear"
                                :picker-options="pickerEndTimeDate">
                </el-date-picker>
              </div>
            </div>

            <div id="myChart2"
                 class="myChart"></div>
          </div>
        </el-scrollbar>
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
export default {
  directives: {},
  components: { CommonHeader, CommonFooter },
  mixins: [],
  props: {},
  data() {
    return {
      yesterdayInfo:null,

      // yesterdayInfo: [
      //   {
      //     label: "",
      //     value: ""
      //   }
      // ],

      // yesterdayInfo: [
      //   {
      //     label: "雨水花园设备",
      //     value: "576"
      //   },
      //   {
      //     label: "互动跑道01",
      //     value: "576"
      //   },
      //   {
      //     label: "互动跑道01",
      //     value: "576"
      //   },
      //   {
      //     label: "雨水花园设备",
      //     value: "576"
      //   },
      //   {
      //     label: "互动跑道01",
      //     value: "576"
      //   },
      //   {
      //     label: "互动跑道01",
      //     value: "576"
      //   }
      // ],
      electricQuantity: [
        {
          label: "累计转换电池量",
          value: "576"
        },
        {
          label: "节约金额",
          value: "576"
        },
        {
          label: "昨日转换电量",
          value: "576"
        },
        {
          label: "累计转换电池量",
          value: "576"
        }
      ],
      reactionTotal: "",
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
      // 间隔选择
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
      
      center: { lng: 0, lat: 0 },
      zoom: 3,
      
    };
  },
  computed: {},
  watch: {},
  mounted() {
   
  },
  created() {
     this.reactionNumList();
  },
  methods: {
    // 设备感应情况
    // 设备感应次数及列表
    reactionNumList() {
      var _this = this;
      https
        .fetchGet("/api/interation/InerationTotal")
        .then(function(response) {
          // 总次数
          _this.reactionTotal = response.object.total;
          // 列表次数
          var yesterdayInfoList = response.object.list;
          console.log(yesterdayInfoList)
          _this.yesterdayInfo = yesterdayInfoList
          console.log(_this.yesterdayInfo.length)
        })
        .catch(function() {});
    },

    // 表格
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
            // label: {
            //   normal: {
            //     show: true,
            //     position: "top"
            //   }
            // }
          }
        ]
      });
    },
    // 感应次数图表日
    reactionDay() {
      var _this = this;
      let param = {
        startTime: this.getTime1.getStartTimeDate,
        endTime: this.getTime1.getEndTimeDate
      };
      https
        .fetchGet("/api/interation/selectInterationId", param)
        .then(function(response) {
          // 开始
          _this.waterStartChartData = response.object.list;
          _this.waterStartCreatTime = [];
          _this.waterStartTypeNum = [];
          for (var i = 0; i < _this.waterStartChartData.length; i++) {
            _this.waterStartCreatTime[i] =
              _this.waterStartChartData[i].createTime;
            _this.waterStartTypeNum[i] =
              _this.waterStartChartData[i].differenceNum;
          }

          // 结束
          _this.waterEndChartData = response.object.contrastList;
          _this.waterEndCreatTime = [];
          _this.waterEndTypeNum = [];
          for (var i = 0; i < _this.waterEndChartData.length; i++) {
            _this.waterEndCreatTime[i] = _this.waterEndChartData[i].createTime;
            _this.waterEndTypeNum[i] = _this.waterEndChartData[i].differenceNum;
          }

          _this.drawChart();
        })
        .catch(function(error) {});
    },
    // 感应次数图表月
    reactionMonth() {
      var _this = this;

      let param = {
        startTime: this.getTime1.getStartTimeMonth,
        endTime: this.getTime1.getEndTimeMonth
      };
      https
        .fetchGet("/api/interation/selectInterationId", param)
        .then(function(response) {
          // 开始
          _this.waterStartChartData = response.object.list;
          _this.waterStartCreatTime = [];
          _this.waterStartTypeNum = [];
          for (var i = 0; i < _this.waterStartChartData.length; i++) {
            _this.waterStartCreatTime[i] =
              _this.waterStartChartData[i].createTime;
            _this.waterStartTypeNum[i] =
              _this.waterStartChartData[i].differenceNum;
          }

          // 结束
          _this.waterEndChartData = response.object.contrastList;
          _this.waterEndCreatTime = [];
          _this.waterEndTypeNum = [];
          for (var i = 0; i < _this.waterEndChartData.length; i++) {
            _this.waterEndCreatTime[i] = _this.waterEndChartData[i].createTime;
            _this.waterEndTypeNum[i] = _this.waterEndChartData[i].differenceNum;
          }

          _this.drawChart();
        })
        .catch(function(error) {});
    },
    // 感应次数图表年
    reactionYear() {
      var _this = this;
      let param = {
        startTime: this.getTime1.getStartTimeYear,
        endTime: this.getTime1.getEndTimeYear
      };
      https
        .fetchGet("/api/interation/selectInterationId", param)
        .then(function(response) {
          // 开始
          _this.waterStartChartData = response.object.list;
          _this.waterStartCreatTime = [];
          _this.waterStartTypeNum = [];
          for (var i = 0; i < _this.waterStartChartData.length; i++) {
            _this.waterStartCreatTime[i] =
              _this.waterStartChartData[i].createTime;
            _this.waterStartTypeNum[i] =
              _this.waterStartChartData[i].differenceNum;
          }

          // 结束
          _this.waterEndChartData = response.object.contrastList;
          _this.waterEndCreatTime = [];
          _this.waterEndTypeNum = [];
          for (var i = 0; i < _this.waterEndChartData.length; i++) {
            _this.waterEndCreatTime[i] = _this.waterEndChartData[i].createTime;
            _this.waterEndTypeNum[i] = _this.waterEndChartData[i].differenceNum;
          }

          _this.drawChart();
        })
        .catch(function(error) {});
    },
    // 日 开始时间
    getStartDate1(value) {
      this.reactionDay();
    },
    // 日 结束时间
    getEndDate1(value1) {
      console.log(
        "开始时间" + this.getTime1.getStartTimeDate + "结束时间" + value1
      );
      this.reactionDay();
    },
    // 月 开始时间
    getStartMonth1(value) {
      this.reactionMonth();
    },
    // 月 结束时间
    getEndMonth1(value1) {
      console.log(
        "开始时间" + this.getTime1.getStartTimeMonth + "结束时间" + value1
      );
      this.reactionMonth();
    },
    // 年 开始时间
    getStartYear1(value) {
      this.reactionYear();
    },
    // 年 结束时间
    getEndYear1(value1) {
      console.log(
        "开始时间" + this.getTime1.getStartTimeYear + "结束时间" + value1
      );
      this.reactionYear();
    },
    // 憩心亭太阳能系统
    drawChartSoil() {
      let _this = this;
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      myChart2.setOption({
        grid: {
          y: 10,
          height: 80,
          y2: 20
        },
        xAxis: {
          type: "category",
          data: _this.soilStartCreatTime,
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
        series: [
          {
            data: _this.soilStartTypeNum,
            type: "line",
            smooth: true,
            color: "#ff0000",
            lineStyle: {
              color: "#ff0000"
            }
          },
          {
            data: _this.soilEndTypeNum,
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
    solarenergyDay() {
      var _this = this;
      let param = {
        startTime: this.getTime2.getStartTimeDate,
        endTime: this.getTime2.getEndTimeDate
      };
      https
        .fetchGet("/api/solarenergy/selectByTime", param)
        .then(function(response) {
          // 开始
          _this.soilStartChartData = response.object.list;
          _this.soilStartCreatTime = [];
          _this.soilEndTypeNum = [];
          for (var i = 0; i < _this.soilStartChartData.length; i++) {
            _this.waterStartCreatTime[i] =
              _this.soilStartCreatTime[i].createTime;
            _this.soilEndTypeNum[i] =
              _this.soilStartChartData[i].differenceValue;
          }

          // 结束
          _this.soilEndChartData = response.object.contrastList;
          _this.soilStartCreatTime = [];
          _this.soilEndTypeNum = [];
          for (var i = 0; i < _this.soilEndChartData.length; i++) {
            _this.soilStartCreatTime[i] = _this.soilEndChartData[i].createTime;
            _this.soilEndTypeNum[i] = _this.soilEndChartData[i].differenceValue;
          }

          _this.drawChartSoil();
        })
        .catch(function(error) {});
    },
    solarenergyMonth() {
      var _this = this;
      let param = {
        startTime: this.getTime2.getStartTimeMonth,
        endTime: this.getTime2.getEndTimeMonth
      };
      https
        .fetchGet("/api/solarenergy/selectByTime", param)
        .then(function(response) {
          // 开始
          _this.soilStartChartData = response.object.list;
          _this.soilStartCreatTime = [];
          _this.soilStartTypeNum = [];
          for (var i = 0; i < _this.soilStartChartData.length; i++) {
            _this.soilStartCreatTime[i] =
              _this.soilStartChartData[i].createTime;
            _this.soilStartTypeNum[i] =
              _this.soilStartChartData[i].differenceValue;
          }

          // 结束
          _this.soilEndChartData = response.object.contrastList;
          _this.soilEndCreatTime = [];
          _this.soilEndTypeNum = [];
          for (var i = 0; i < _this.soilEndChartData.length; i++) {
            _this.soilEndCreatTime[i] = _this.soilEndChartData[i].createTime;
            _this.soilEndTypeNum[i] = _this.soilEndChartData[i].differenceValue;
          }

          _this.drawChartSoil();
        })
        .catch(function(error) {});
    },
    solarenergyYear() {
      var _this = this;
      let param = {
        startTime: this.getTime2.getStartTimeYear,
        endTime: this.getTime2.getEndTimeYear
      };
      https
        .fetchGet("/api/solarenergy/selectByTime", param)
        .then(function(response) {
          // 开始
          _this.soilStartChartData = response.object.list;
          _this.soilStartCreatTime = [];
          _this.soilStartTypeNum = [];
          for (var i = 0; i < _this.soilStartChartData.length; i++) {
            _this.soilStartCreatTime[i] =
              _this.soilStartChartData[i].createTime;
            _this.soilStartTypeNum[i] =
              _this.soilStartChartData[i].differenceValue;
          }

          // 结束
          _this.soilEndChartData = response.object.contrastList;
          _this.soilEndCreatTime = [];
          _this.soilEndTypeNum = [];
          for (var i = 0; i < _this.soilEndChartData.length; i++) {
            _this.soilEndCreatTime[i] = _this.soilEndChartData[i].createTime;
            _this.soilEndTypeNum[i] = _this.soilEndChartData[i].differenceValue;
          }

          _this.drawChartSoil();
        })
        .catch(function(error) {});
    },
    getStartDate2(value) {},
    getEndDate2(value1) {
      console.log(
        "开始时间" + this.getTime2.getStartTimeDate + "结束时间" + value1
      );
      let param = {
        startTime: this.getTime2.getStartTimeDate,
        endTime: value1
      };
      https
        .fetchGet("", param)
        .then(function(response) {})
        .catch(function(error) {});
    },
    getStartMonth2(value) {},
    getEndMonth2(value1) {
      console.log(
        "开始时间" + this.getTime2.getStartTimeMonth + "结束时间" + value1
      );
      let param = {
        startTime: this.getTime2.getStartTimeMonth,
        endTime: value1
      };
      https
        .fetchGet("", param)
        .then(function(response) {})
        .catch(function(error) {});
    },
    getStartYear2(value) {},
    getEndYear2(value1) {
      console.log(
        "开始时间" + this.getTime2.getStartTimeYear + "结束时间" + value1
      );
      let param = {
        startTime: this.getTime2.getStartTimeYear,
        endTime: value1
      };
      https
        .fetchGet("", param)
        .then(function(response) {})
        .catch(function(error) {});
    },
    handler({ BMap, map }) {
      // 初始化地图

      // 地图中心点
      this.center.lng = 116.302281;
      this.center.lat = 39.992571;
      // 初始化地图 地图级别
      this.zoom = 17;
      var mapStyle = { style: "midnight" };
      map.setMapStyle(mapStyle);
      map.enableScrollWheelZoom();
      //设置标注的图标  图片大小
      var icon = new BMap.Icon(
        "../assets/environAwareImg/SmartWaterMeter-02.png",
        new BMap.Size(100, 100)
      );
      var point = new BMap.Point(116.3040681, 39.99498639);

      //设置标注的经纬度
      var marker = new BMap.Marker(point, {
        icon: icon
      });
      var mapPoints = [
        { x: 39.99498639, y: 116.3040681, title: "A", con: "我是A" },
        { x: 39.9949914, y: 116.3041305, title: "A", con: "我是A" },
        { x: 39.99334137, y: 116.3007059, title: "A", con: "我是A" },
        { x: 39.99396071, y: 116.3012227, title: "A", con: "我是A" }
      ];

      var i = 0;
      // 把标注添加到地图上
      map.addOverlay(marker);

      function markerFun(points, label, infoWindows) {
        var markers = new BMap.Marker(points);
        map.addOverlay(markers);
        markers.setLabel(label);
        markers.addEventListener("click", function(event) {
          map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
        });
      }
      for (; i < mapPoints.length; i++) {
        var points = new BMap.Point(mapPoints[i].y, mapPoints[i].x); //创建坐标点
        var opts = {
          width: 250,
          height: 100,
          title: mapPoints[i].title,
          icon: icon
        };
        var label = new BMap.Label(mapPoints[i].branch, {
          offset: new BMap.Size(25, 5)
        });
        var infoWindows = new BMap.InfoWindow(mapPoints[i].con, opts);
        markerFun(points);
      }

      var content = "<table>";
      content = content + "<tr><td>智能监测点</td><td>报表</td></tr>";
      content = content + "<tr><td> PH：</td><td>7</td></tr>";
      content = content + "<tr><td> 温度：</td><td>10°</td></tr>";
      content = content + "<tr><td> 溶解氧：</td><td>9mg/L</td></tr>";
      content = content + "<tr><td> 电导率：</td><td>5s</td></tr>";
      content = content + "<tr><td> 浊度：</td><td>3JTU</td></tr>";
      content += "</table>";
      var infowindow = new BMap.InfoWindow(content);
      marker.addEventListener("click", function() {
        this.openInfoWindow(infowindow);
      });

      //点击地图，获取经纬度坐标
      // map.addEventListener("click", function(e) {
      //   document.getElementById("aa").innerHTML =
      //     "经度坐标：" + e.point.lng + " &nbsp;纬度坐标：" + e.point.lat;
      // });
    }
  }
};
</script>
<style lang="stylus" scoped>
// 数字
@font-face
  font-family 'ariblkFont'
  src url('../assets/font/ariblk_0.ttf')
  font-weight normal
  font-style normal
.warmLog
  display flex
  line-height 25px
>>> [data-v-f381c9b4] .el-progress-bar__inner
  background-color #00FFFF
.err
  color #FFAE11
.resolved
  color #11DF49
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
  color #04DDDA
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
</style>
