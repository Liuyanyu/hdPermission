<template>
  <div class="welcome__wrapper">
    <common-header></common-header>
    <router-view />
    <template>
      <!-- <div id="map">
        <baidu-map class="baidumap" id="baidumap" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
      </div> -->
      <baidu-map
        class="baidumap"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @ready="handler"
        :averageCenter="true"
      >
        <div v-for="marker in markers">
          <bm-marker
            :icon="{
              url: require('@assets/marker/car.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen()"
          ></bm-marker>
          <bm-info-window
            :position="{ lng: marker.lng, lat: marker.lat }"
            :show="showFlag"
            style="height: 100px;"
          >
            <p style="color:#409EFF">{{ marker.parkingName }}</p>
            <p style="line-height: 20px;">
              <span class="mapChartTit">总停车位：</span>
              <span class="right">{{ marker.parkingTotalNum }}</span>
            </p>
            <p style="line-height: 20px;">
              <span class="mapChartTit">剩余车位：</span>
              <span class="right">{{ marker.now }}</span>
            </p>
            <p style="line-height: 20px;">
              <span class="mapChartTit">今日停泊车次：</span>
              <span class="right">{{ marker.count }}</span>
            </p>
          </bm-info-window>
        </div>
      </baidu-map>
    </template>

    <div class="screenLeft">
      <p class="navTit">交通详情</p>
      <div class="scrollBar">
        <div class="water">
          <div class="waterMonitor">
            <div class="asideBg comTop">
              <span class="waterMonitorTit">在园人数</span>
              <span class="right">water monitoring</span>
            </div>
            <div class="comTop" style="margin-top:10px">
              <span>今日入园人数</span>
              <p class="lineHeightValue">Historical warning times</p>
              <p class="right hisWarn">
                <span class="warnValue">{{ inFlowDateTotal }}</span>
                <span>人</span>
              </p>
            </div>
            <div class="comTop" style="margin-top:10px">
              <span>当前在园人数</span>
              <p class="warmTimeEng lineHeightValue">
                Number of warnings yesterday
              </p>
              <p class="right hisWarn">
                <span class="warnValue">{{ inFlowDateToday }}</span>
                <span>人</span>
              </p>
            </div>
          </div>
          <div>
            <div class="asideBg comTop" style="margin-top:15px">
              <span class="waterMonitorTit">入园人数趋势</span>
              <span class="right">water monitoring</span>
            </div>
            <div class="comTop">
              <button
                class="pointLeft monitorPoint"
                style="width: 20%;margin-left: 67.5%"
                @click="demand"
              >
                查询
              </button>
            </div>

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
            <div>
              <div v-if="timeIntervalValue == '日'" class="comTop">
                <span class="monitorPoint">时间选择</span>
                <select v-model="selectYear" class style="margin-right:4%">
                  <option
                    v-for="item in selectYearList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <select v-model="selectMonth" class style="margin-right:4%">
                  <option
                    v-for="item in selectMonthList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <select v-model="selectDay" class style="margin-right:4%">
                  <option
                    v-for="item in selectDayList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <select
                  v-model="selectYear1"
                  class="comTop"
                  style="margin-right:4%;margin-left:19%"
                >
                  <option
                    v-for="item in selectYearList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <select
                  v-model="selectMonth1"
                  class="comTop"
                  style="margin-right:4%"
                >
                  <option
                    v-for="item in selectMonthList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <select
                  v-model="selectDay1"
                  class="comTop"
                  style="margin-right:4%"
                >
                  <option
                    v-for="item in selectDayList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
              </div>
              <div v-if="timeIntervalValue == '月'" class="comTop">
                <span class="monitorPoint">时间选择</span>
                <select v-model="selectYear" style="margin-right: 4%;">
                  <option
                    v-for="item in selectYearList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <select v-model="selectMonth" class>
                  <option
                    v-for="item in selectMonthList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <!-- <div class="comTop" style="margin-left: 19%;"> -->
                <select
                  v-model="selectYear1"
                  style="margin-right: 4%;margin-left: 19%;"
                  class="comTop"
                >
                  <option
                    v-for="item in selectYearList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <select v-model="selectMonth1" class>
                  <option
                    v-for="item in selectMonthList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <!-- </div> -->
              </div>
              <div v-if="timeIntervalValue == '年'" class="comTop">
                <span class="monitorPoint">时间选择</span>
                <select v-model="selectYear" style="margin-right: 4%;">
                  <option
                    v-for="item in selectYearList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <select
                  v-model="selectYear1"
                  class="comTop"
                  style="margin-left: 19%;display:block"
                >
                  <option
                    v-for="item in selectYearList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
              </div>
            </div>
          </div>
          <div class="chart" id="myChart1"></div>
        </div>
        <div class="water">
          <div class="waterMonitor">
            <div class="asideBg comTop" style="margin-top:15px">
              <span class="waterMonitorTit">停车场数据</span>
              <span class="right">water monitoring</span>
            </div>
            <div class="comTop" style="margin-top:10px">
              <span>剩余车位</span>
              <p class="lineHeightValue">Historical warning times</p>
              <p class="right hisWarn">
                <span class="warnValue">{{ now }}</span>
                <span>次</span>
              </p>
            </div>
            <div class="comTop" style="margin-top:10px">
              <span>今日累计车次</span>
              <p class="warmTimeEng lineHeightValue">
                Number of warnings yesterday
              </p>
              <p class="right hisWarn">
                <span class="warnValue">{{ count }}</span>
                <span>次</span>
              </p>
            </div>
          </div>
          <div>
            <div class="comTop" style="margin-top:25px">
              <span class="monitorPoint">间隔选择</span>
              <select name="sel" v-model="timeIntervalValue1">
                <option
                  v-for="item in timeIntervalOptions1"
                  :key="item.timeIntervalValue1"
                  :label="item.timeIntervalLabel1"
                  :value="item.timeIntervalValue1"
                ></option>
              </select>
              <button
                class="pointLeft monitorPoint"
                style="width:19.5%;margin-left:28.5%"
                @click="demandPark"
              >
                查询
              </button>
            </div>
            <div v-if="timeIntervalValue1 == '日'" class="comTop">
              <label class="monitorPoint">时间选择</label>
              <select v-model="selectYear2" class style="margin-right:4%">
                <option
                  v-for="item in selectYearList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
              <select v-model="selectMonth2" class style="margin-right:4%">
                <option
                  v-for="item in selectMonthList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
              <select v-model="selectDay2" class style="margin-right:4%">
                <option
                  v-for="item in selectDayList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectYear3"
                class="comTop"
                style="margin-right:4%;margin-left:19%"
              >
                <option
                  v-for="item in selectYearList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectMonth3"
                class="comTop"
                style="margin-right:4%"
              >
                <option
                  v-for="item in selectMonthList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectDay3"
                class="comTop"
                style="margin-right:4%"
              >
                <option
                  v-for="item in selectDayList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
            </div>
            <div v-if="timeIntervalValue1 == '月'" class="comTop">
              <label class="monitorPoint">时间选择</label>
              <select v-model="selectYear2" style="margin-right: 4%;">
                <option
                  v-for="item in selectYearList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
              <select v-model="selectMonth2" class>
                <option
                  v-for="item in selectMonthList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectYear3"
                style="margin-right: 4%;margin-left: 19%;"
                class="comTop"
              >
                <option
                  v-for="item in selectYearList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
              <select v-model="selectMonth3" class>
                <option
                  v-for="item in selectMonthList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
            </div>
            <div v-if="timeIntervalValue1 == '年'" class="comTop">
              <label class="monitorPoint">时间选择</label>
              <select v-model="selectYear2" style="margin-right: 4%;">
                <option
                  v-for="item in selectYearList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectYear3"
                class="comTop"
                style="margin-left: 19%;display:block"
              >
                <option
                  v-for="item in selectYearList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
            </div>
          </div>
          <div class="chart" id="myChart2"></div>
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
import https from "@/https.js";
import carIcon from "@assets/marker/car.png";
export default {
  directives: {},
  mixins: [],
  components: { CommonHeader, CommonFooter },
  props: {},
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 5,
      showFlag: false,
      inFlowDateTotal: "",
      inFlowDateToday: "",

      startinFlowDateValue: [],
      endinFlowDateValue: [],

      // 停车场
      carinFlowDateStartData: "",
      carinFlowDateStartTime: "",
      carinFlowDateStartValue: "",

      carinFlowDateEndData: "",
      carinFlowDateEndTime: "",
      carinFlowDateEndValue: "",

      count: "",
      now: "",

      WaterCategorySelectionValue: "全部",
      WaterCategorySelectionOptions: [
        {
          WaterCategorySelectionValue: "全部",
          WaterCategorySelectionLabel: "全部"
        },
        {
          WaterCategorySelectionValue: "东门入园人数",
          WaterCategorySelectionLabel: "东门入园人数"
        },
        {
          WaterCategorySelectionValue: "西门入园人数",
          WaterCategorySelectionLabel: "西门入园人数"
        }
      ],
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
      selectYearList: [
        { value: "2019", label: "2019" },
        { value: "2020", label: "2020" }
      ],
      selectMonthList: [
        { value: "01", label: "01" },
        { value: "02", label: "02" },
        { value: "03", label: "03" },
        { value: "04", label: "04" },
        { value: "05", label: "05" },
        { value: "06", label: "06" },
        { value: "07", label: "07" },
        { value: "08", label: "08" },
        { value: "09", label: "09" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" }
      ],
      selectDayList: [
        { value: "01", label: "01" },
        { value: "02", label: "02" },
        { value: "03", label: "03" },
        { value: "04", label: "04" },
        { value: "05", label: "05" },
        { value: "06", label: "06" },
        { value: "07", label: "07" },
        { value: "08", label: "08" },
        { value: "09", label: "09" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
        { value: "13", label: "13" },
        { value: "14", label: "14" },
        { value: "15", label: "15" },
        { value: "16", label: "16" },
        { value: "17", label: "17" },
        { value: "18", label: "18" },
        { value: "19", label: "19" },
        { value: "20", label: "20" },
        { value: "21", label: "21" },
        { value: "22", label: "22" },
        { value: "23", label: "23" },
        { value: "24", label: "24" },
        { value: "25", label: "25" },
        { value: "26", label: "26" },
        { value: "27", label: "27" },
        { value: "28", label: "28" },
        { value: "29", label: "29" },
        { value: "30", label: "30" },
        { value: "31", label: "31" }
      ],
      // 人数
      selectYear: "2020",
      selectMonth: "03",
      selectDay: "11",
      selectYear1: "2020",
      selectMonth1: "03",
      selectDay1: "12",
      // 车位
      selectYear2: "2020",
      selectMonth2: "03",
      selectDay2: "11",
      selectYear3: "2020",
      selectMonth3: "03",
      selectDay3: "12",

      // 在园人数图表
      startValue: "",
      startDate: "",
      endValue: "",
      endData: "",
      inFlowDateStartData: "",
      inFlowDateEndData: "",
      //停车场图表
      carStartVal: "",
      carStartDate: "",
      carEndVal: "",
      carEndData: "",
      carInStartData: "",
      carInEndData: "",

      pumpMapPoints: [],
      markers: []
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this.getinFlowDateTotal();
    this.demand();
    this.demandPark();
    this.getPoint();
  },
  methods: {
    // 左侧入园人数
    getinFlowDateTotal() {
      var that = this;
      https
        .fetchGet("url2/people/total")
        .then(function(res) {
          console.log(res);
          // 入园人数
          that.inFlowDateTotal = res.object.total;
          console.log(that.inFlowDateTotal);
          // 在园人数
          that.inFlowDateToday = res.object.total - res.object.outFlow;
          console.log(that.inFlowDateToday);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 入园人数图表
    demand() {
      var that = this;
      var inFlowDateType = "";
      var startTime = "";
      var endTime = "";
      if (that.timeIntervalValue == "日") {
        startTime =
          that.selectYear + "-" + that.selectMonth + "-" + that.selectDay;
        endTime =
          that.selectYear1 + "-" + that.selectMonth1 + "-" + that.selectDay1;
      } else if (that.timeIntervalValue == "月") {
        startTime = that.selectYear + "-" + that.selectMonth;
        endTime = that.selectYear1 + "-" + that.selectMonth1;
      } else if (that.timeIntervalValue == "年") {
        startTime = that.selectYear;
        endTime = that.selectYear1;
      }
      if (that.WaterCategorySelectionValue == "总入园人数") {
        inFlowDateType = 1;
      }
      if (that.WaterCategorySelectionValue == "东门入园人数") {
        inFlowDateType = 2;
      } else if (that.WaterCategorySelectionValue == "西门入园人数") {
        inFlowDateType = 3;
      }
      let param = {
        startTime: startTime,
        endTime: endTime,
        type: inFlowDateType
      };
      https
        .fetchGet("/url2/people/history", param)
        .then(function(res) {
          that.inFlowDateStartData = res.object.list;
          that.startDate = [];
          that.startValue = [];
          for (var i = 0; i < that.inFlowDateStartData.length; i++) {
            that.startValue[i] = that.inFlowDateStartData[i].inFlow;
            that.startDate[i] = that.inFlowDateStartData[i].createTime;
          }
          console.log(that.startValue);
          console.log(that.startDate);
          that.inFlowDateEndData = res.object.contrastList;
          that.endData = [];
          that.endValue = [];
          for (var i = 0; i < that.inFlowDateEndData.length; i++) {
            that.endValue[i] = that.inFlowDateEndData[i].inFlow;
            that.endData[i] = that.inFlowDateEndData[i].createTime;
          }
          console.log(that.endValue);
          console.log(that.endData);
          that.drawChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    drawChart() {
      let that = this;
      console.log(that.xData);
      console.log(that.startValue);
      console.log(that.endValue);
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      if (that.timeIntervalValue == "日") {
        that.xData = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24"
        ];
      } else if (that.timeIntervalValue == "月") {
        that.xData = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31"
        ];
      } else if (that.timeIntervalValue == "年") {
        that.xData = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12"
        ];
      }
      myChart1.setOption({
        grid: {
          y: 10,
          height: 80,
          y2: 20
        },
        xAxis: {
          type: "category",
          data: that.xData,
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
            data: that.startValue,
            type: "line",
            smooth: true,
            color: "#00ffff",
            lineStyle: {
              color: "#00ffff"
            }
          },
          {
            data: that.endValue,
            type: "line",
            smooth: true,
            color: "#22ac38",
            lineStyle: {
              color: "#22ac38"
            }
          }
        ]
      });
    },
    // 停车场图表
    demandPark() {
      var that = this;
      var startTime = "";
      var endTime = "";
      if (that.timeIntervalValue1 == "日") {
        startTime =
          that.selectYear2 + "-" + that.selectMonth2 + "-" + that.selectDay2;
        endTime =
          that.selectYear3 + "-" + that.selectMonth3 + "-" + that.selectDay3;
      } else if (that.timeIntervalValue1 == "月") {
        startTime = that.selectYear2 + "-" + that.selectMonth2;
        endTime = that.selectYear3 + "-" + that.selectMonth3;
      } else if (that.timeIntervalValue1 == "年") {
        startTime = that.selectYear2;
        endTime = that.selectYear3;
      }

      let param = {
        startTime: startTime,
        endTime: endTime
      };
      https
        .fetchGet("url2/parking/chart", param)
        .then(function(res) {
          console.log(res);
          that.carInStartData = res.object.list;
          that.carStartVal = [];
          that.carStartDate = [];
          for (var i = 0; i < that.carInStartData.length; i++) {
            that.carStartVal[i] = that.carInStartData[i].carInflow;
            that.carStartDate[i] = that.carInStartData[i].createTime;
          }
          console.log(that.carStartVal);
          that.carInEndData = res.object.contrastList;
          that.carEndVal = [];
          that.carEndData = [];
          for (var i = 0; i < that.carInEndData.length; i++) {
            that.carEndVal[i] = that.carInEndData[i].carInflow;
            that.carEndData[i] = that.carInEndData[i].createTime;
          }
          console.log(that.carEndVal);
          that.drawinFlowDateChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    drawinFlowDateChart() {
      var that = this;

      if (that.timeIntervalValue1 == "日") {
        that.inFlowDate = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24"
        ];
      } else if (that.timeIntervalValue1 == "月") {
        that.inFlowDate = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31"
        ];
      } else if (that.timeIntervalValue1 == "年") {
        that.inFlowDate = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12"
        ];
      }
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      myChart2.setOption({
        grid: {
          y: 10,
          height: 80,
          y2: 20
        },
        xAxis: {
          type: "category",
          data: that.inFlowDate,
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
            data: that.carStartVal,
            type: "line",
            smooth: true,
            color: "#00ffff",
            lineStyle: {
              color: "#00ffff"
            }
          },
          {
            data: that.carEndVal,
            type: "line",
            smooth: true,
            color: "#22ac38",
            lineStyle: {
              color: "#22ac38"
            }
          }
        ]
      });
    },
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.302281;
      this.center.lat = 39.992571;
      this.zoom = 18;
      let mapStyle = { style: "midnight" };
      map.setMapStyle(mapStyle);
    },
    getPoint() {
      var that = this;
      https
        .fetchGet("url2/parking/now")
        .then(function(res) {
          var data = res.object.list;
          for (var i = 0; i < data.length; i++) {
            that.markers.push({
              lng: data[i].longitude,
              lat: data[i].latitude,
              deviceId: data[i].parkingId,
              parkingName: data[i].parkingName,
              now: data[i].now,
              count: data[i].count,
              parkingTotalNum: data[i].parkingTotalNum
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    infoWindowClose(marker) {
      marker.showFlag = false;
      console.log(marker);
    },
    infoWindowOpen() {
      this.showFlag = true;
    }
    // handler({ BMap, map }) {
    //   var _this = this;
    //   // 地图中心点
    //   this.center.lng = 116.302281;
    //   this.center.lat = 39.992571;
    //   this.zoom = 17;
    //   // var mapStyle = { style: "midnight" };
    //   // map.setMapStyle(mapStyle);
    //   map.enableScrollWheelZoom();
    //   // map.setMapType(BMAP_PERSPECTIVE_MAP);
    //   // 停车场
    //   https
    //     .fetchGet("url2/parking/now")
    //     .then(function(response) {
    //       var pumpData = response.object.list;
    //       console.log(pumpData);
    //       var pumpMapPoints = [];
    //       for (var i = 0; i < pumpData.length; i++) {
    //         pumpMapPoints.push({
    //           x: pumpData[i].latitude,
    //           y: pumpData[i].longitude,
    //           parkingName: pumpData[i].parkingName,
    //           now: pumpData[i].now,
    //           count: pumpData[i].count,
    //           parkingTotalNum: pumpData[i].parkingTotalNum
    //         });
    //         _this.count = pumpData[i].count;
    //         _this.now = pumpData[i].now;
    //       }
    //       _this.pumpMapPoints = pumpMapPoints;

    //       for (var i = 0; i < _this.pumpMapPoints.length; i++) {
    //         var content = `<div class="deviceBg">`;
    //         content =
    //           content +
    //           `<div class="title" style=" display: flex">
    //               <button id="waterName" style="flex:1;border: none;background-color: transparent;outline: none;">水循环水泵</button>
    //               <button id="waterTab" style="flex:1;border: none;background-color: transparent;outline: none;">控制面板</button></div>`;
    //         content = content + `<div id="deviceInfo">`;
    //         content =
    //           content +
    //           `<p style="line-height:20px;margin:0px;margin-left:10px">位置 : ` +
    //           _this.pumpMapPoints[i].parkingName +
    //           `</p>`;
    //         content =
    //           content +
    //           `<p style="line-height:20px;margin:0px;margin-left:10px">总停车位 : ` +
    //           _this.pumpMapPoints[i].parkingTotalNum +
    //           `</p>`;
    //         content =
    //           content +
    //           `<p style="line-height:20px;margin:0px;margin-left:10px">剩余车位 : ` +
    //           _this.pumpMapPoints[i].now +
    //           `</p>`;
    //         content =
    //           content +
    //           `<p style="line-height:20px;margin:0px;margin-left:10px">今日停泊车次 : ` +
    //           _this.pumpMapPoints[i].count +
    //           `</p>`;
    //         content = content + `</div>`;
    //         content =
    //           content +
    //           `<div class="reportForm" id="reportForm" style="display:none">`;
    //         content = content + `<span>阀门控制</span>`;
    //         content = content + ` </div>`;
    //         content += `</div>`;
    //         //创建坐标点
    //         var points = new BMap.Point(
    //           _this.pumpMapPoints[i].y,
    //           _this.pumpMapPoints[i].x
    //         );
    //         var opts = {
    //           width: 120,
    //           height: 125
    //         };
    //         var infoWindows = new BMap.InfoWindow(content, opts);
    //         markerFun(points, infoWindows);
    //         function markerFun(points, infoWindows) {
    //           var puIcon = new BMap.Icon(carIcon, new BMap.Size(100, 100));
    //           var markers = new BMap.Marker(points, { icon: puIcon });

    //           map.addOverlay(markers);

    //           var label = new BMap.Label(_this.pumpMapPoints[i].parkingName, {
    //             offset: new BMap.Size(-20, 40)
    //           });
    //           var labelStyle = {
    //             border: "0",
    //             color: "#000000"
    //           };
    //           label.setStyle(labelStyle);
    //           markers.setLabel(label);
    //           markers.addEventListener("click", function() {
    //             map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
    //           });
    //         }
    //         if (!infoWindows.isOpen()) {
    //           infoWindows.addEventListener("open", function(e) {
    //             var waterName = document.getElementById("waterName");
    //             waterName.onclick = function() {
    //               console.log("监测点");
    //               document.getElementById("deviceInfo").style.display = "block";
    //               document.getElementById("reportForm").style.display = "none";
    //             };
    //             var waterTab = document.getElementById("waterTab");
    //             waterTab.onclick = function() {
    //               console.log("报表");
    //               document.getElementById("deviceInfo").style.display = "none";
    //               document.getElementById("reportForm").style.display = "block";
    //             };
    //           });
    //         } else {
    //           var waterName = document.getElementById("waterName");
    //           waterName.onclick = function() {
    //             console.log("监测点");
    //             document.getElementById("deviceInfo").style.display = "block";
    //             document.getElementById("reportForm").style.display = "none";
    //           };
    //           var waterTab = document.getElementById("waterTab");
    //           waterTab.onclick = function() {
    //             console.log("报表");
    //             document.getElementById("deviceInfo").style.display = "none";
    //             document.getElementById("reportForm").style.display = "block";
    //           };
    //         }
    //       }
    //       console.log(content);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
  }
};
</script>
<style lang="stylus" scoped>
.baidumap
  width 100%
  height 100%
  position absolute
</style>
