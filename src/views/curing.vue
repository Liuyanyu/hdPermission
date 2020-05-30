<template>
  <div class="welcome__wrapper">
    <common-header></common-header>
    <router-view />

    <template>
      <baidu-map
        class="baidumap"
        :center="center"
        :zoom="zoom"
        @ready="handler"
        :averageCenter="true"
      >
        <div v-for="marker in garbageMarkers">
          <bm-marker
            :icon="{
              url: require('@assets/marker/trash.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="trashOpen(marker, marker.deviceId)"
          ></bm-marker>
          <bm-info-window
            :position="{ lng: marker.lng, lat: marker.lat }"
            :show="garbageShow"
          >
            <el-tabs v-model="mapActiveName" @tab-click="handleClick">
              <el-tab-pane label="基础面板" name="first">
                <!-- <p style="line-height: 17px;">
                  <span class="mapChartTit">提示信息：</span>
                  <span class="right"></span>
                </p>-->
                <p style="line-height: 17px;">
                  <span class="mapChartTit">设备状态：</span>
                  <span class="right">{{ marker.isOpen }}</span>
                </p>
                <p style="line-height: 17px;">
                  <span class="mapChartTit">纸类垃圾</span>
                  <span class="right">{{ marker.ddGarbeagePaper }}</span>
                </p>
                <p style="line-height: 17px;">
                  <span class="mapChartTit">可回收垃圾</span>
                  <span class="right">{{ marker.ddGarbeageRecyclable }}</span>
                </p>
                <p style="line-height: 17px;">
                  <span class="mapChartTit">其余垃圾</span>
                  <span class="right">{{ marker.ddGarbeageOther }}</span>
                </p>
                <p style="line-height: 17px;">
                  <span class="mapChartTit">累计清理次数</span>
                  <span class="right">{{ marker.lastWatering }}</span>
                </p>
              </el-tab-pane>
              <!-- <el-tab-pane label="控制面板" name="second">控制面板</el-tab-pane> -->
              <el-tab-pane label="报表" name="third">
                <span style="display: inline-block;width: 26%;">间隔选择</span>
              </el-tab-pane>
            </el-tabs>
          </bm-info-window>
        </div>
        <div v-for="item in insertMarkers">
          <bm-marker
            :icon="{
              url: require('@assets/marker/insert.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: item.lng, lat: item.lat }"
          ></bm-marker>
        </div>
      </baidu-map>
    </template>

    <div class="screenLeft">
      <p class="navTit">智能养护</p>
      <div class="scrollBar">
        <div class="water">
          <div class="waterMonitor">
            <div class="asideBg comTop">
              <span class="waterMonitorTit">智能垃圾桶感应数据</span>
              <span class="right">water monitoring</span>
            </div>
          </div>
          <div class="electricity-show-img">
            <div class="img-item">
              <div class="circle__wrapper">
                <div class="value" style="color:#00FFFF">{{ recyclable }}</div>
                <div class="unit" style="color:#00FFFF">次</div>
              </div>
              <div style="text-align:center;margin-top:4px;color:#00FFFF">
                瓶类垃圾
              </div>
            </div>
            <div class="img-item">
              <div class="circle__wrapper">
                <div class="value" style="color:#00FFFF">{{ pager }}</div>
                <div class="unit" style="color:#00FFFF">次</div>
              </div>
              <div style="text-align:center;margin-top:4px;color:#00FFFF">
                纸类垃圾
              </div>
            </div>
            <div class="img-item">
              <div class="circle__wrapper">
                <div class="value" style="color:#00FFFF">{{ other }}</div>
                <div class="unit" style="color:#00FFFF">次</div>
              </div>
              <div style="text-align:center;margin-top:4px;color:#00FFFF">
                其他垃圾
              </div>
            </div>
            <div class="img-item">
              <div class="circle__wrapper1">
                <div class="value" style="color:#FFAE11">{{ total }}</div>
                <div class="unit" style="color:#FFAE11">次</div>
              </div>
              <div style="text-align:center;margin-top:4px;color:#FFAE11">
                清理次数
              </div>
            </div>
          </div>
          <div class="asideBg comTop">
            <span class="waterMonitorTit">使用情況</span>
            <span class="right">water monitoring</span>
          </div>
          <div class="comTop">
            <div class="percent" v-for="item in trashUseLeft">
              <!-- <span>{{ item.ddGarbageId }}</span> -->
              <span style="counter-increment: listxh;">
                智能垃圾桶
                <span style="content:counter(listxh)"></span>
              </span>
              <span class="percentValue">{{ item.var4 }}</span>
              <span>m³</span>
            </div>
          </div>

          <div>
            <div class="comTop">
              <button
                class="pointLeft monitorPoint"
                style="width: 20%;margin-left: 67.5%"
                @click="trashDemand"
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
              <select class="sel" v-model="sortValue">
                <option
                  v-for="item in waterTypeList"
                  :key="item.sortValue"
                  :value="item.sortValue"
                  >{{ item.sortLabel }}</option
                >
              </select>
            </div>
            <div v-if="timeIntervalValue == '日'" class="comTop">
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
            <div v-if="timeIntervalValue == '月'" class="comTop">
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
            <div v-if="timeIntervalValue == '年'" class="comTop">
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
            <div class="chart" id="myChart2"></div>
          </div>
        </div>
        <div class="water">
          <div class="waterMonitor">
            <div class="asideBg comTop">
              <span class="waterMonitorTit">虫情趋势</span>
              <span class="right">water monitoring</span>
            </div>
          </div>
          <div class="comTop">
            <span>
              累计检测数量
              <span style="font-size: 18px;">{{ numAll }}</span>
              <span>个</span>
            </span>
            <span style="right:0;position:absolute">
              今日检测数量
              <span style="font-size: 18px;">{{ numNowDay }}</span>
              <span>个</span>
            </span>
          </div>
          <div>
            <div class="comTop">
              <span class="monitorPoint">间隔选择</span>
              <select name="sel" v-model="mapValue">
                <option
                  v-for="item in mapOptions"
                  :key="item.mapValue"
                  :label="item.mapLabel"
                  :value="item.mapValue"
                ></option>
              </select>
              <button
                class="pointLeft monitorPoint"
                style="width: 20%;margin-left: 28%;"
                @click="demand"
              >
                查询
              </button>
            </div>
            <div class="comTop">
              <div v-if="mapValue == '日'" class="comTop">
                <span class="monitorPoint">时间选择</span>
                <select v-model="mapYear" class style="margin-right:4%">
                  <option
                    v-for="item in selectYearList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <select v-model="mapMonth" class style="margin-right:4%">
                  <option
                    v-for="item in selectMonthList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <select v-model="mapDay" class style="margin-right:4%">
                  <option
                    v-for="item in selectDayList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <select
                  v-model="mapYear1"
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
                  v-model="mapMonth1"
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
                  v-model="mapDay1"
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
              <div v-if="mapValue == '月'" class="comTop">
                <span class="monitorPoint">时间选择</span>
                <select v-model="mapYear" style="margin-right: 4%;">
                  <option
                    v-for="item in selectYearList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <select v-model="mapMonth" class>
                  <option
                    v-for="item in selectMonthList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <!-- <div class="comTop" style="margin-left: 19%;"> -->
                <select
                  v-model="mapYear1"
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
                <select v-model="mapMonth1" class>
                  <option
                    v-for="item in selectMonthList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <!-- </div> -->
              </div>
              <div v-if="mapValue == '年'" class="comTop">
                <span class="monitorPoint">时间选择</span>
                <select v-model="mapYear" style="margin-right: 4%;">
                  <option
                    v-for="item in selectYearList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</option
                  >
                </select>
                <select
                  v-model="mapYear1"
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
            <div class="chart" id="myChart1"></div>
          </div>
        </div>
      </div>
    </div>

    <div
      style="float:right;right:50px;z-index:11;position:absolute;margin-top: 20px;"
    >
      <el-button type="danger" plain @click="warnVisible">告警记录</el-button>
    </div>
    <div class="warnBox" id="warnPanel">
      <common-warn></common-warn>
      <router-view />
    </div>

    <common-footer></common-footer>
    <router-view />
  </div>
</template>
<script>
import CommonHeader from "@commons/CommonHeader";
import CommonFooter from "@commons/CommonFooter";
import CommonWarn from "@commons/CommonWarn";
// import insertIcon from "@assets/marker/insert.png";
// import trashIcon from "@assets/marker/trash.png";

import https from "@/https.js";
export default {
  directives: {},
  mixins: [],
  components: { CommonHeader, CommonFooter, CommonWarn },
  props: {},
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      mapActiveName: "first",
      garbageMarkers: [],
      insertMarkers: [],
      garbageShow: false,
      value: "",
      mapOptions: [
        {
          mapValue: "年",
          mapLabel: "年"
        },
        {
          mapValue: "月",
          mapLabel: "月"
        },
        {
          mapValue: "日",
          mapLabel: "日"
        }
      ],
      mapValue: "日",
      waterStartChartData: "",
      waterStartCreatTime: "",
      waterStartTypeNum: "",

      waterEndChartData: "",
      waterEndCreatTime: "",
      waterEndTypeNum: "",

      waterTypeList: [
        { sortLabel: "全部", sortValue: "10" },
        { sortLabel: "垃圾桶01", sortValue: "1" },
        { sortLabel: "垃圾桶02", sortValue: "2" },
        { sortLabel: "垃圾桶03", sortValue: "3" },
        { sortLabel: "垃圾桶04", sortValue: "4" }
      ],
      sortValue: "1",
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
      selectYear: "2019",
      selectMonth: "06",
      selectDay: "15",
      selectYear1: "2020",
      selectMonth1: "02",
      selectDay1: "12",

      selectYear2: "2020",
      selectMonth2: "02",
      selectDay2: "02",
      selectYear3: "2020",
      selectMonth3: "03",
      selectDay3: "03",

      mapYear: "2020",
      mapMonth: "03",
      mapDay: "03",
      mapYear1: "2020",
      mapMonth1: "03",
      mapDay1: "05",
      numNowDay: "",
      numAll: "",
      showImgInfo: [
        { value: "20", unit: "kw/h", isMoney: false, label: "厨余垃圾" },
        { value: "20", unit: "kw/h", isMoney: false, label: "其他垃圾" },
        { value: "20", unit: "kw/h", isMoney: false, label: "可回收垃圾" },
        { value: "20", unit: "万元", isMoney: true, label: "有害垃圾" }
      ],
      electricitySomeInfo: [
        {
          label: "智能垃圾桶01",
          value: "2.3",
          unit: "次",
          progress: "34"
        },
        {
          label: "智能垃圾桶02",
          value: "2.3",
          unit: "次",
          progress: "34"
        },
        {
          label: "智能垃圾桶03",
          value: "2.3",
          unit: "次",
          progress: "34",
          uping: true
        },
        {
          label: "智能垃圾桶04",
          value: "2.3",
          unit: "次",
          progress: "34",
          uping: true
        }
      ],
      // waterStartChartData: "",
      // waterStartCreatTime: "",
      // waterStartTypeNum: "",

      // waterEndChartData: "",
      // waterEndCreatTime: "",
      // waterEndTypeNum: "",

      soilStartChartData: "",
      soilStartCreatTime: "",
      soilStartTypeNum: "",

      soilEndChartData: "",
      soilEndCreatTime: "",
      soilEndTypeNum: "",

      nsectPoints: [],
      trashPoints: [],

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
      s1: "",
      s2: "",
      total: "",
      other: "",
      pager: "",
      recyclable: "",
      trashUseLeft: [
        {
          ddGarbageId: "",
          var4: ""
        }
      ],
      unitTotal: "",
      getTime1: {
        getStartTimeDate: "",
        getEndTimeDate: ""
      },
      getTime2: {
        getStartTimeDate: "",
        getEndTimeDate: ""
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this.demand();
    this.getNowDayNum();
    this.getAllNum();
    // // 垃圾桶左侧
    this.trashLeft();
    this.trashUse();
    this.trashDemand();
    this.getPoint();
  },
  methods: {
    warnVisible() {
      var that = this;
      document.getElementById("warnPanel").style.display = "block";
      that.warnDialogVisible = true;
      https
        .fetchGet("/soil/warn/logList?warnLogClassify=301")
        .then(function(res) {
          console.log(res);
          var data = res.object.list.list;
          window.localStorage.setItem("irrWarn", JSON.stringify(data));
        })
        .catch(function(error) {
          console.log(error);
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
        .fetchGet("/url2/trash/now")
        .then(function(res) {
          var data = res.object.list;
          for (var i = 0; i < data.length; i++) {
            that.garbageMarkers.push({
              lng: data[i].longitude,
              lat: data[i].latitude,
              deviceId: data[i].ddGarbageId,
              ddGarbeagePaper: data[i].ddGarbeagePaper,
              ddGarbeageRecyclable: data[i].ddGarbeageRecyclable,
              ddGarbeageOther: data[i].ddGarbeageOther
            });
          }
          console.log(that.garbageMarkers);
        })
        .catch(function(error) {
          console.log(error);
        });

      https
        .fetchGet("/url2/insect/now")
        .then(function(res) {
          var data = res.object.list;
          for (var i = 0; i < data.length; i++) {
            that.insertMarkers.push({
              lng: data[i].longitude,
              lat: data[i].latitude,
              deviceId: data[i].deviceId
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    trashOpen(marker, id) {
      console.log(marker);
      console.log(id);
      var that = this;
      that.garbageShow = true;
    },
    trashClose() {
      var that = this;
      that.garbageShow = false;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 垃圾桶左侧
    trashLeft() {
      var that = this;
      https
        .fetchGet("url2/trash/left")
        .then(function(response) {
          var traLeft = response.object;
          that.total = traLeft.total;
          that.other = traLeft.other;
          that.pager = traLeft.pager;
          that.recyclable = traLeft.recyclable;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //垃圾桶使用情况
    trashUse() {
      var that = this;
      // var unitArr = [];
      // var uesult = 0;
      https
        .fetchGet("url2/trash/now")
        .then(function(response) {
          var traLeft = response.object.list;
          console.log(traLeft);
          that.trashUseLeft = traLeft;
          console.log(...that.trashUseLeft[i].var4);

          for (var i = 0; i <= that.trashUseLeft.length; i++) {
            console.log(that.trashUseLeft[i].var4);
            // that.unitTotal = traLeft[i].var4;
            // that.resultUnit += that.unitTotal;
            // console.log(that.resultUnit);
            // unitArr.push({
            //   ...that.trashUseLeft.var4
            // });
            // console.log(unitArr);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    demand() {
      var that = this;
      var startTime = "";
      var endTime = "";
      if (that.mapValue == "日") {
        startTime =
          that.selectYear + "-" + that.selectMonth + "-" + that.selectDay;
        endTime =
          that.selectYear1 + "-" + that.selectMonth1 + "-" + that.selectDay1;
      } else if (that.mapValue == "月") {
        startTime = that.selectYear + "-" + that.selectMonth;
        endTime = that.selectYear1 + "-" + that.selectMonth1;
      } else if (that.mapValue == "年") {
        startTime = that.selectYear;
        endTime = that.selectYear1;
      }
      let param = {
        startTime: startTime,
        endTime: endTime
      };
      https
        .fetchGet("url2/insect/getHistroyList", param)
        .then(function(res) {
          console.log(res);
          // 开始
          that.waterStartChartData = res.object.list;
          that.waterStartCreatTime = [];
          that.waterStartTypeNum = [];
          for (var i = 0; i < that.waterStartChartData.length; i++) {
            that.waterStartCreatTime[i] =
              that.waterStartChartData[i].createTime;
            that.waterStartTypeNum[i] = that.waterStartChartData[i].insectNum;
          }

          console.log(that.waterStartCreatTime);
          console.log(that.waterStartTypeNum);
          // 结束
          that.waterEndChartData = res.object.contrastList;
          that.waterEndCreatTime = [];
          that.waterEndTypeNum = [];
          for (var i = 0; i < that.waterEndChartData.length; i++) {
            that.waterEndCreatTime[i] = that.waterEndChartData[i].createTime;
            that.waterEndTypeNum[i] = that.waterEndChartData[i].insectNum;
          }
          console.log(that.waterEndCreatTime);
          console.log(that.waterEndTypeNum);
          that.drawChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    drawChart() {
      let that = this;
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      console.log(that.waterStartTypeNum);
      console.log(that.timeIntervalValue);
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
      console.log(that.xData);
      var options = {
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
            data: that.waterStartTypeNum,
            // data: 0,
            type: "line",
            smooth: true,
            color: "#00ffff",
            lineStyle: {
              color: "#00ffff"
            }
          },
          {
            data: that.waterEndTypeNum,
            // data: 1,
            type: "line",
            smooth: true,
            color: "#22ac38",
            lineStyle: {
              color: "#22ac38"
            }
          }
        ]
      };
      try {
        myChart.setOption(options);
      } catch (err) {
        console.log(err);
      }
    },
    trashDemand() {
      var that = this;
      var startTime = "";
      var endTime = "";
      if (that.timeIntervalValue == "日") {
        startTime =
          that.selectYear2 + "-" + that.selectMonth2 + "-" + that.selectDay2;
        endTime =
          that.selectYear3 + "-" + that.selectMonth3 + "-" + that.selectDay3;
      } else if (that.timeIntervalValue == "月") {
        startTime = that.selectYear2 + "-" + that.selectMonth2;
        endTime = that.selectYear3 + "-" + that.selectMonth3;
      } else if (that.timeIntervalValue == "年") {
        startTime = that.selectYear2;
        endTime = that.selectYear3;
      }
      let param = {
        startTime: startTime,
        endTime: endTime,
        type: that.sortValue
      };
      https
        .fetchGet("url2/trash/historyList", param)
        .then(function(res) {
          console.log(res);
          // 开始
          that.waterStartChartData = res.object.list;
          that.waterStartCreatTime = [];
          that.waterStartTypeNum = [];
          for (var i = 0; i < that.waterStartChartData.length; i++) {
            that.waterStartCreatTime[i] =
              that.waterStartChartData[i].createTime;
            that.waterStartTypeNum[i] = that.waterStartChartData[i].cleanNUM;
          }

          console.log(that.waterStartCreatTime);
          console.log(that.waterStartTypeNum);
          // 结束
          that.waterEndChartData = res.object.contrastList;
          that.waterEndCreatTime = [];
          that.waterEndTypeNum = [];
          for (var i = 0; i < that.waterEndChartData.length; i++) {
            that.waterEndCreatTime[i] = that.waterEndChartData[i].createTime;
            that.waterEndTypeNum[i] = that.waterEndChartData[i].cleanNUM;
          }
          console.log(that.waterEndCreatTime);
          console.log(that.waterEndTypeNum);
          that.cleanDrawChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cleanDrawChart() {
      let that = this;
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      console.log(that.waterStartTypeNum);
      console.log(that.timeIntervalValue);
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
      console.log(that.xData);
      var options = {
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
            data: that.waterStartTypeNum,
            // data: 0,
            type: "line",
            smooth: true,
            color: "#00ffff",
            lineStyle: {
              color: "#00ffff"
            }
          },
          {
            data: that.waterEndTypeNum,
            // data: 1,
            type: "line",
            smooth: true,
            color: "#22ac38",
            lineStyle: {
              color: "#22ac38"
            }
          }
        ]
      };
      try {
        myChart.setOption(options);
      } catch (err) {
        console.log(err);
      }
    },
    // 虫情趋势
    // 虫情 今日数量
    getNowDayNum() {
      var that = this;
      https
        .fetchGet("/url2/insect/nowDay")
        .then(function(res) {
          console.log(res);
          that.numNowDay = res.object.list;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 虫情 累计数量
    getAllNum() {
      var that = this;
      https
        .fetchGet("/url2/insect/all")
        .then(function(res) {
          that.numAll = res.object.list;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    drawChartInsert() {
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
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            data: _this.soilEndTypeNum,
            type: "line",
            smooth: true,
            color: "#04DDDA",
            lineStyle: {
              color: "#04DDDA"
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          }
        ]
      });
    },
    // 垃圾桶对比 默认昨天的数据
    getTrashBinData() {
      let params = {
        startTime: "2019-08-03",
        endTime: "2019-08-04",
        deviceId: "34"
      };
      https
        .fetchGet("/trash/historyList", params)
        .then(function(response) {
          console.log(response.object.list);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //虫情图表  默认
    getInsectPestSituaDefalutData() {
      https
        .fetchGet("/insect/getYesterDay")
        .then(function(response) {
          console.log(response.object.list);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //地图 垃圾桶位置
    getTrashBinLocationData() {
      https
        .fetchGet("/trash/now")
        .then(function(response) {
          console.log(response.object.list);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //地图 虫情位置
    getInsertData() {
      https
        .fetchGet("/insect/now")
        .then(function(response) {
          console.log(response.object.list);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.warnBox {
  opacity: 0.9;
  width: 50%;
  height: 60vh;
  background-color: #000;
  position: absolute;
  margin-left: 26%;
  margin-top: 10vh;
  position: absolute;
  display: none;
}
</style>
