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
      <p class="navTit">环境感知</p>
      <div class="scrollBar">
        <div class="water">
          <div class="waterMonitor">
            <div class="asideBg comTop">
              <span class="waterMonitorTit">水质监测</span>
              <span class="right">water monitoring</span>
            </div>
            <div class="comTop">
              <span>今日告警次数</span>
              <p class="lineHeightValue">Historical warning times</p>
              <p class="right hisWarn">
                <span class="warnValue">{{ hisWarnNum }}</span>
                <span>次</span>
              </p>
            </div>
            <div class="comTop">
              <span>昨日告警次数</span>
              <p class="warmTimeEng lineHeightValue">
                Number of warnings yesterday
              </p>
              <p class="right hisWarn">
                <span class="warnValue">{{ yesWarnNum }}</span>
                <span>次</span>
              </p>
            </div>
          </div>
          <div>
            <div class="comTop">
              <span class="monitorPoint">监测点</span>

              <select v-model="waterMonitorPointValue" style="width:44%">
                <option
                  v-for="item in waterMonitorPointoptions"
                  :key="item.waterMonitorPointValue"
                  :label="item.waterMonitorPointLabel"
                  :value="item.waterMonitorPointValue"
                ></option>
              </select>

              <button
                class="pointLeft monitorPoint"
                style="width:19.5%"
                @click="demand"
              >
                查询
              </button>
            </div>

            <div class="comTop">
              <span class="monitorPoint">间隔选择</span>
              <select name="sel" v-model="timeIntervalValue">
                <option
                  v-for="item in timeIntervaloptions"
                  :key="item.timeIntervalValue"
                  :label="item.timeIntervalLabel"
                  :value="item.timeIntervalValue"
                ></option>
              </select>
              <span class="monitorPoint1">类别选择</span>
              <select class="sel" v-model="value" @change="WaterPointList">
                <option
                  v-for="item in waterTypeList"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.label }}</option
                >
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
          <div class="waterAlarm">
            <div class="asideBg comTop">
              <span class="waterMonitorTit">水质报警记录</span>
              <span class="right">water alarm record</span>
            </div>
            <div class="comTop">
              <span class="monitorPoint">监测点</span>
              <select v-model="waterMonitorPointValue" style="width:44%">
                <option
                  v-for="item in waterMonitorPointoptions"
                  :key="item.waterMonitorPointValue"
                  :label="item.waterMonitorPointLabel"
                  :value="item.waterMonitorPointValue"
                ></option>
              </select>
              <button
                class="pointLeft monitorPoint"
                style="width:19.5%"
                @click="demand"
              >
                查询
              </button>
            </div>
            <div class="comTop">
              <span class="monitorPoint">时间选择</span>
              <select v-model="selectWarnYear" class style="margin-right:4%">
                <option
                  v-for="item in selectYearList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
              <select v-model="selectWarnMonth" class style="margin-right:4%">
                <option
                  v-for="item in selectMonthList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
              <select v-model="selectWarnDay" class style="margin-right:4%">
                <option
                  v-for="item in selectDayList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
            </div>
          </div>
        </div>
        <div class="water">
          <div class="waterMonitor">
            <div class="asideBg comTop">
              <span class="waterMonitorTit">土壤监测</span>
              <span class="right">water monitoring</span>
            </div>
          </div>

          <div>
            <div class="comTop">
              <span class="monitorPoint">监测点</span>
              <select v-model="soilMonitorPointValue" style="width:44%">
                <option
                  v-for="item in soilMonitorPointoptions"
                  :key="item.soilMonitorPointValue"
                  :label="item.soilMonitorPointLabel"
                  :value="item.soilMonitorPointValue"
                ></option>
              </select>
              <button
                class="pointLeft monitorPoint"
                style="width:19.5%"
                @click="soilDemand"
              >
                查询
              </button>
            </div>
            <div class="comTop">
              <span class="monitorPoint">间隔选择</span>
              <select v-model="timeIntervalValue1">
                <option
                  v-for="item in timeIntervaloptions1"
                  :key="item.timeIntervalValue1"
                  :label="item.timeIntervalLabel1"
                  :value="item.timeIntervalValue1"
                ></option>
              </select>
              <span class="monitorPoint1">类别选择</span>
              <select class="sel" v-model="soilCategorySelectionValue">
                <option
                  v-for="item in soilCategorySelectionoptions"
                  :key="item.soilCategorySelectionValue"
                  :label="item.soilCategorySelectionLabel"
                  :value="item.soilCategorySelectionValue"
                ></option>
              </select>
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

          <div class="waterAlarm">
            <div class="asideBg comTop">
              <span class="waterMonitorTit">土壤报警记录</span>
              <span class="right">water alarm record</span>
            </div>
            <div class="comTop">
              <span class="monitorPoint">监测点</span>
              <select v-model="waterMonitorPointValue" style="width:44%">
                <option
                  v-for="item in waterMonitorPointoptions"
                  :key="item.waterMonitorPointValue"
                  :label="item.waterMonitorPointLabel"
                  :value="item.waterMonitorPointValue"
                ></option>
              </select>
              <button
                class="pointLeft monitorPoint"
                style="width:19.5%"
                @click="demand"
              >
                查询
              </button>
            </div>
            <div class="comTop">
              <span class="monitorPoint">时间选择</span>
              <select v-model="selectWarnYear1" class style="margin-right:4%">
                <option
                  v-for="item in selectYearList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
              <select v-model="selectWarnMonth1" class style="margin-right:4%">
                <option
                  v-for="item in selectMonthList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
              <select v-model="selectWarnDay1" class style="margin-right:4%">
                <option
                  v-for="item in selectDayList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</option
                >
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="screenRight">
      <div>
        <div style="width:80%;height:200px;border:1px soild"></div>
        <p style="text-align:center">空气良好，可以正常参加户外活动</p>
      </div>
      <div style="display:flex;margin-top:20px">
        <div style="flex:1;text-align:center">
          <img src="@assets/asideImg/r1.png" alt />
          <p>无需戴口罩</p>
        </div>
        <div style="flex:1;text-align:center">
          <img src="@assets/asideImg/r2.png" alt />
          <p>适宜外出</p>
        </div>
        <div style="flex:1;text-align:center">
          <img src="@assets/asideImg/r3.png" alt />
          <p>适宜开窗</p>
        </div>
        <div style="flex:1;text-align:center">
          <img src="@assets/asideImg/r4.png" alt />
          <p>关闭净化器</p>
        </div>
      </div>
      <div style="margin-top:20px;height:130px">
        <div style="width:70%;float:left;display:inline;" v-for="item in test">
          <p style="font-size:15px;line-height:30px">{{ item.condTxt }}</p>
          <p style="font-size:20px;line-height:30px">{{ item.cityName }}</p>
          <p style="font-size:15px;line-height:30px">{{ item.tmp }}</p>
          <p style="font-size:15px;line-height:30px">
            空气质量：{{ item.qlty }}
          </p>
        </div>
        <div style="width:25%;float:right;display:inline">
          <img :src="weaNowImg" alt />
        </div>
      </div>
      <div style="color:#00FF3C">
        <div style="width:50%;display:inline-block">
          <p>PM2.5</p>
          <el-progress :percentage="pm25" color="#007920"></el-progress>
        </div>
        <div style="width:50%;float:right;">
          <p>O₃</p>
          <el-progress :percentage="o3" color="#007920"></el-progress>
        </div>
        <div style="width:50%;display:inline-block">
          <p>NO₂</p>
          <el-progress :percentage="no2" color="#007920"></el-progress>
        </div>
        <div style="width:50%;float:right">
          <p>CO</p>
          <el-progress :percentage="co" color="#007920"></el-progress>
        </div>
      </div>
      <div style="margin-top:20px">
        <div
          style="width:30%;height:100px;display:inline-block;margin-right:3%;text-align:center"
          v-for="item in weathFore"
        >
          <img :src="condCode" alt style="width:40px" />
          <p>{{ item.predictDay }}</p>
          <p style="line-height:20px">{{ item.tmpMax }}</p>
        </div>
        <!-- <div style="width:30%;height:100px;border:1px solid yellow;display:inline-block">

        </div>
        <div style="width:30%;height:100px;border:1px solid yellow;display:inline-block">

        </div>-->
      </div>
      <div v-for="item in weathFore" style="text-align:center;display: flex;">
        <span style="flex: 1;line-height: 40px;">{{ item.predictDay }}</span>
        <img
          src="@assets/asideImg/sun1.png"
          alt
          style="width:40px;height:40px"
        />
        <span style="flex: 1;line-height: 40px;">{{ item.sr }}</span>
        <img
          src="@assets/asideImg/sun2.png"
          alt
          style="width:40px;height:40px"
        />
        <span style="flex: 1;line-height: 40px;">{{ item.ss }}</span>
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
// import axios from "axios";
// import PointsSectionBar from "@assets/asideImg/PointsSectionBar.png";
import waterIcon from "@assets/marker/water.png";
import soilIcon from "@assets/marker/soil.png";
import pumpIcon from "@assets/marker/pump.png";
// import bg from "@assets/marker/bg.png";
// import r1 from "@assets/asideImg/r1.png";
// import r2 from "@assets/asideImg/r2.png";
// import r3 from "@assets/asideImg/r3.png";
// import r4 from "@assets/asideImg/r4.png";
// import sun1 from "@assets/asideImg/sun1.png";
// import sun2 from "@assets/asideImg/sun2.png";
// import weatherImg from "@assets/asideImg/r2.png";
export default {
  name: "TestTwo",
  directives: {},
  components: { CommonHeader, CommonFooter },
  mixins: [],
  props: {},
  data() {
    return {
      // 水质
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
      deviceList: "",
      waterTypeList: [
        { label: "污泥浓度", value: "bm17237555682058_39" },
        { label: "电导率", value: "bm17265614737915_38" },
        { label: "酸碱度", value: "bm17319994931077_40" },
        { label: "溶解氧", value: "bm17426014786329_42" }
      ],
      // waterType: "污泥浓度",
      value: "bm17237555682058_39",
      xData: [],

      selectWarnYear: "2019",
      selectWarnMonth: "10",
      selectWarnDay: "10",
      // 土壤
      selectYear2: "2019",
      selectMonth2: "07",
      selectDay2: "12",
      selectYear3: "2020",
      selectMonth3: "02",
      selectDay3: "15",

      soilXDate: [],

      selectWarnYear1: "2019",
      selectWarnMonth1: "11",
      selectWarnDay1: "11",

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
      mapPoints: [],
      soilMapPoints: [],
      pumpMapPoints: [],
      // 水质监测 监测点 下拉列表
      waterMonitorPointoptions: [
        {
          waterMonitorPointValue: "监测点1",
          waterMonitorPointLabel: "监测点1"
        }
      ],
      waterId: "",
      waterDefaultDevice: "监测点1",
      waterMonitorPointValue: "监测点1",
      // 水质监测 类别选择 下拉列表

      // 水质报警记录
      // 时间选择
      getWaterWarnTime: "",

      // 监测点
      waterAlarmMonitorPointoptions: [
        {
          waterAlarmMonitorPointValue: "监测点1",
          waterAlarmMonitorPointLabel: "监测点1"
        }
      ],
      // 默认水质监测点和类型
      waterAlarmMonitorPointValue: "监测点1",
      //  土壤监测点 下拉列表
      soilMonitorPointoptions: [
        {
          soilMonitorPointValue: "监测点1",
          soilMonitorPointLabel: "监测点1"
        }
      ],
      soilMonitorPointValue: "监测点1",
      soilCategorySelectionoptions: [
        {
          soilCategorySelectionValue: "土壤盐度",
          soilCategorySelectionLabel: "土壤盐度"
        },
        {
          soilCategorySelectionValue: "土壤温度",
          soilCategorySelectionLabel: "土壤温度"
        },
        {
          soilCategorySelectionValue: "土壤湿度",
          soilCategorySelectionLabel: "土壤湿度"
        }
      ],
      soilCategorySelectionValue: "土壤湿度",
      // 土壤报警记录
      soilAlarmMonitorPointoptions: [
        {
          soilAlarmMonitorPointValue: "监测点1",
          soilAlarmMonitorPointLabel: "监测点1"
        }
      ],
      soilAlarmMonitorPointValue: "监测点1",
      soilChoiceData: "",
      timeIntervalValue: "日",
      timeIntervaloptions: [
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
      timeIntervaloptions1: [
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
        getEndTimeDate: ""
      },
      getTime2: {
        getStartTimeDate: "",
        getEndTimeDate: ""
      },
      // 气象
      pm25: "",
      o3: "",
      no2: "",
      co: "",
      weaNowImg: "",
      predictDay: "",
      weekWeather: [],
      sr: "",
      ss: "",
      // 地图
      center: { lng: 0, lat: 0 },
      zoom: 3,
      // 水质信息
      waterDataMap: [
        {
          waterDeviceLatitude: "",
          waterDeviceLongitude: "",
          waterPH: "",
          waterTemperature: "",
          waterDissolvedOxygen: "",
          waterConductivity: "",
          waterTurbidity: "",
          waterState: ""
        }
      ],
      condCode: "",
      paramYes: {},
      s1: "",
      // 左侧
      hisWarnNum: "",
      yesWarnNum: "",
      test: "",
      weathFore: ""
    };
  },
  computed: {},
  watch: {},
  mounted() {
    // this.drawChart();
  },
  created() {
    this.getSunData();
    this.getWeatherData();
    this.warnCountList();
    this.WaterPointList();
    this.demand();
    this.soilDemand();
  },
  methods: {
    format(percentage) {
      return percentage > 50 ? "良" : `${percentage}%`;
    },
    WaterPointList() {
      var that = this;
      console.log(that.waterType);
      https
        .fetchGet("/url1/sensor/water/v1/list")
        .then(function(res) {
          console.log(res);
          var deviceList = res.data.list;
          var DeviceIdList = [];
          for (var i = 0; i < deviceList.length; i++) {
            console.log(that.value);
            console.log(deviceList[i].modelId);
            // for (var j = 0; j < that.waterTypeList.length; j++) {
            if (deviceList[i].modelId == that.value) {
              that.waterMonitorPointValue = deviceList[0].deviceId;
              DeviceIdList.push({
                waterMonitorPointValue: deviceList[i].deviceId,
                waterMonitorPointLabel: deviceList[i].deviceName
              });
              that.waterMonitorPointoptions = [...DeviceIdList];
            }
            // }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 水质监测告警次数
    warnCountList() {
      var that = this;
      https
        .fetchGet("/url1/warn/log/todayList")
        .then(function(res) {
          console.log(res);
          that.hisWarnNum = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });

      https
        .fetchGet("/url1/warn/log/yesterdayList")
        .then(function(res) {
          console.log(res);
          that.yesWarnNum = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 水质监测查询https://hdpark.dreamdeck.cn/dd-web1/web/read/hdpark/water/chart?startTime=2019-11-01&endTime=2019-12-12&type=2&deviceId=ddsw585474979936577_78
    demand() {
      var that = this;
      var waterType1 = "";
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
      if (this.value == "bm17237555682058_39") {
        waterType1 = 1;
      } else if (this.value == "bm17265614737915_38") {
        waterType1 = 3;
      } else if (this.value == "bm17319994931077_40") {
        waterType1 = 4;
      } else if (this.value == "bm17426014786329_42") {
        waterType1 = 5;
      }
      console.log(waterType1);
      let param = {
        startTime: startTime,
        endTime: endTime,
        type: waterType1,
        deviceId: that.waterMonitorPointValue
      };
      console.log(param);

      https
        .fetchGet("/soil/water/newChart", param)
        .then(function(res) {
          console.log(res);
          // 开始
          that.waterStartChartData = res.object.list;
          that.waterStartCreatTime = [];
          that.waterStartTypeNum = [];
          for (var i = 0; i < that.waterStartChartData.length; i++) {
            that.waterStartCreatTime[i] =
              that.waterStartChartData[i].createTime;
            if (waterType1 == 1) {
              that.waterStartTypeNum[i] = that.waterStartChartData[i].turbidity;
            } else if (waterType1 == 3) {
              that.waterStartTypeNum[i] = that.waterStartChartData[i].ec4;
            } else if (waterType1 == 4) {
              that.waterStartTypeNum[i] = that.waterStartChartData[i].ph6;
            } else if (waterType1 == 5) {
              that.waterStartTypeNum[i] = that.waterStartChartData[i].do18;
            }
          }
          console.log(that.waterStartCreatTime);
          console.log(that.waterStartTypeNum);
          // 结束
          that.waterEndChartData = res.object.contrastList;
          that.waterEndCreatTime = [];
          that.waterEndTypeNum = [];
          for (var i = 0; i < that.waterEndChartData.length; i++) {
            that.waterEndCreatTime[i] = that.waterEndChartData[i].createTime;
            // that.waterEndTypeNum[i] = that.waterEndChartData[i].value;
            if (waterType1 == 1) {
              that.waterEndTypeNum[i] = that.waterEndChartData[i].turbidity;
            } else if (waterType1 == 3) {
              that.waterEndTypeNum[i] = that.waterEndChartData[i].ec4;
            } else if (waterType1 == 4) {
              that.waterEndTypeNum[i] = that.waterEndChartData[i].ph6;
            } else if (waterType1 == 5) {
              that.waterEndTypeNum[i] = that.waterEndChartData[i].do18;
            }
          }
          console.log(that.waterEndCreatTime);
          console.log(that.waterEndTypeNum);
          that.drawChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 水质监测点图表
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

    soilDemand() {
      var that = this;
      var soliType = "";
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
      if (this.soilCategorySelectionValue == "土壤温度") {
        soliType = 1;
      } else if (this.soilCategorySelectionValue == "土壤湿度") {
        soliType = 2;
      } else if (this.soilCategorySelectionValue == "土壤盐度") {
        soliType = 3;
      }
      let param1 = {
        startTime: startTime,
        endTime: endTime,
        type: soliType,
        deviceId: that.soilMonitorPointValue
      };
      console.log(param1);
      https.fetchGet("/soil/soli/chart", param1).then(function(res) {
        console.log(res);
        // 开始
        that.soilStartChartData = res.object.list;
        that.soilStartCreatTime = [];
        that.soilStartTypeNum = [];

        // if (soliType == 1) {
        //   for (var i = 0; i < that.soilStartChartData.length; i++) {
        //     that.soilStartCreatTime[i] = that.soilStartChartData[i].createTime;
        //     that.soilStartTypeNum[i] = that.soilStartChartData[i].salinity;
        //   }
        // } else if (soliType == 2) {
        //   for (var i = 0; i < that.soilStartChartData.length; i++) {
        //     that.soilStartCreatTime[i] = that.soilStartChartData[i].createTime;
        //     that.soilStartTypeNum[i] = that.soilStartChartData[i].temperature;
        //   }
        // } else if (soliType == 3) {
        //   for (var i = 0; i < that.soilStartChartData.length; i++) {
        //     that.soilStartCreatTime[i] = that.soilStartChartData[i].createTime;
        //     that.soilStartTypeNum[i] = that.soilStartChartData[i].humidity;
        //     console.log(that.soilStartTypeNum);
        //   }
        // }
        for (var i = 0; i < that.soilStartChartData.length; i++) {
          that.soilStartCreatTime[i] = that.soilStartChartData[i].createTime;
          // that.soilStartTypeNum[i] = that.soilStartChartData[i].salinity;
          if (soliType == 1) {
            that.soilStartTypeNum[i] = that.soilStartChartData[i].temperature;
          } else if (soliType == 2) {
            that.soilStartTypeNum[i] = that.soilStartChartData[i].humidity;
          } else if (soliType == 3) {
            that.soilStartTypeNum[i] = that.soilStartChartData[i].salinity;
          }
        }

        console.log(that.soilStartCreatTime);
        console.log(that.soilStartTypeNum);
        // 结束
        that.soilEndChartData = res.object.contrastList;
        that.soilEndCreatTime = [];
        that.soilEndTypeNum = [];
        for (var i = 0; i < that.soilEndChartData.length; i++) {
          that.soilEndCreatTime[i] = that.soilEndChartData[i].createTime;
          that.soilEndTypeNum[i] = that.soilEndChartData[i].temperature;
        }
        that.drawChartSoil();
      });
    },
    // 土壤监测点图表
    drawChartSoil() {
      let that = this;
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      if (that.timeIntervalValue1 == "日") {
        that.soilXDate = [
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
        that.soilXDate = [
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
        that.soilXDate = [
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

      var soilOption = {
        grid: {
          y: 10,
          height: 80,
          y2: 20
        },
        xAxis: {
          type: "category",
          data: that.soilXDate,
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
            data: that.soilStartTypeNum,
            type: "line",
            smooth: true,
            color: "#00ffff",
            lineStyle: {
              color: "#00ffff"
            }
          },
          {
            data: that.soilEndTypeNum,
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
        myChart2.setOption(soilOption);
      } catch (err) {
        console.log(err);
      }
    },

    // 右侧光照强度信息
    getSunData() {
      console.log("111");
      var _this = this;
      https
        .fetchGet("/url2/weather/forecast")
        .then(function(response) {
          console.log(response);
          var sunData = response.object.waterPredictList;
          console.log(sunData);
          _this.weathFore = sunData;
          for (var i = 0; i < sunData.length; i++) {
            // _this.weekWeather = sunData[i].predictDay;
            // _this.sr = sunData[i].sr;
            // _this.ss = sunData[i].ss;
            _this.condCode =
              "https://cdn.heweather.com/cond_icon/" +
              sunData[i].condCode +
              ".png";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 右侧实时天气情况数据
    getWeatherData() {
      var _this = this;
      https
        .fetchGet("/url2/weather/now")
        .then(function(response) {
          console.log(response);
          var weathNow = response.object.list;
          for (var i = 0; i < weathNow.length; i++) {
            _this.test = response.object.list;
            _this.pm25 = weathNow[i].pm25;
            _this.o3 = weathNow[i].o3;
            _this.no2 = weathNow[i].no2;
            _this.co = weathNow[i].co;

            _this.weaNowImg =
              "https://cdn.heweather.com/cond_icon/" +
              weathNow[i].condCode +
              ".png";
          }
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
      this.zoom = 17;
      // var mapStyle = { style: "midnight" };
      // map.setMapStyle(mapStyle);
      map.enableScrollWheelZoom();
      // map.setMapType(BMAP_PERSPECTIVE_MAP);
      // 水
      https
        .fetchGet("soil/water/now")
        .then(function(response) {
          var waterData = response.object.list;
          console.log(waterData);
          var mapPoints = [];
          // var DeviceIdList = [];
          for (var i = 0; i < waterData.length; i++) {
            // _this.waterMonitorPointValue = waterData[0].deviceId;
            // DeviceIdList.push({
            //   waterMonitorPointValue: waterData[i].deviceId,
            //   waterMonitorPointLabel: waterData[i].logId
            // });
            // _this.waterMonitorPointoptions = [...DeviceIdList];
            console.log(_this.waterMonitorPointoptions);
            mapPoints.push({
              x: waterData[i].latitude,
              y: waterData[i].longitude,
              sludge: waterData[i].sludge,
              ec4: waterData[i].ec4,
              ph6: waterData[i].ph6,
              do18: waterData[i].do18,
              logId: waterData[i].logId,
              deviceId: waterData[i].deviceId
            });
          }
          _this.mapPoints = mapPoints;
          for (var i = 0; i < _this.mapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              `<div class="title" style=" display: flex"><button id="waterName" style="flex:1;border: none;background-color: transparent;outline: none;">基础面板</button><button id="waterTab" style="flex:1;border: none;background-color: transparent;outline: none;">报表</button></div>`;
            content =
              content + `<div id="deviceInfo" style="margin-top: 10px;>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px"><span>提示信息</span>` +
              `<span style="float:right">` +
              `测试</span></p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px"><span>PH</span>` +
              `<span style="float:right">` +
              _this.mapPoints[i].ph6 +
              `ph</span></p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px"><span>浊度</span>` +
              `<span style="float:right">` +
              _this.mapPoints[i].sludge +
              `FTU</span></p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px"><span>电导率</span>` +
              `<span style="float:right">` +
              _this.mapPoints[i].ec4 +
              `s</span></p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px"><span>溶解氧</span>` +
              `<span style="float:right">` +
              _this.mapPoints[i].do18 +
              `mg/L</span></p>`;
            content = content + `</div>`;
            content =
              content +
              `<div class="reportForm" id="reportForm" style="display:none">`;
            content = content + `<span>ph</span>`;
            content = content + ` </div>`;
            content += `</div>`;

            // var labelCon = _this.mapPoints[i].logId; // console.log(labelCon);
            //创建坐标点
            var points = new BMap.Point(
              _this.mapPoints[i].y,
              _this.mapPoints[i].x
            );
            var opts = {
              width: 120,
              height: 125
            };
            var infoWindows = new BMap.InfoWindow(content, opts);

            markerFun(points, infoWindows);

            function markerFun(points, infoWindows) {
              var myIcon = new BMap.Icon(waterIcon, new BMap.Size(28, 35));
              var markers = new BMap.Marker(points, { icon: myIcon });

              map.addOverlay(markers);

              var label = new BMap.Label(_this.mapPoints[i].logId, {
                offset: new BMap.Size(-50, 32)
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
            if (!infoWindows.isOpen()) {
              infoWindows.addEventListener("open", function(e) {
                var waterName = document.getElementById("waterName");
                waterName.onclick = function() {
                  console.log("监测点");
                  document.getElementById("deviceInfo").style.display = "block";
                  document.getElementById("reportForm").style.display = "none";
                };
                var waterTab = document.getElementById("waterTab");
                waterTab.onclick = function() {
                  console.log("报表");
                  document.getElementById("deviceInfo").style.display = "none";
                  document.getElementById("reportForm").style.display = "block";
                };
              });
            } else {
              var waterName = document.getElementById("waterName");
              waterName.onclick = function() {
                console.log("监测点");
                document.getElementById("deviceInfo").style.display = "block";
                document.getElementById("reportForm").style.display = "none";
              };
              var waterTab = document.getElementById("waterTab");
              waterTab.onclick = function() {
                console.log("报表");
                document.getElementById("deviceInfo").style.display = "none";
                document.getElementById("reportForm").style.display = "block";
              };
            }
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      // 土壤
      https
        .fetchGet("soil/soli/now")
        .then(function(response) {
          console.log(11111111111111111111111111111111111111111111111111111);
          var soilData = response.object.list;
          console.log(soilData);
          var soilMapPoints = [];
          var soilDeviceIdList = [];
          for (var i = 0; i < soilData.length; i++) {
            _this.soilMonitorPointValue = soilData[0].deviceId;
            console.log(_this.soilMonitorPointValue);
            soilDeviceIdList.push({
              soilMonitorPointValue: soilData[i].deviceId,
              soilMonitorPointLabel: soilData[i].deviceName
            });
            console.log(soilDeviceIdList);
            _this.soilMonitorPointoptions = [...soilDeviceIdList];
            console.log(_this.soilMonitorPointoptions);

            soilMapPoints.push({
              x: soilData[i].latitude,
              y: soilData[i].longitude,
              salinity: soilData[i].salinity,
              humidity: soilData[i].humidity,
              temperature: soilData[i].temperature,
              deviceName: soilData[i].deviceName
            });
          }
          _this.soilMapPoints = soilMapPoints;

          for (var i = 0; i < _this.soilMapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              `<div class="title" style=" display: flex"><button id="soilName" style="flex:1;border: none;background-color: transparent;outline: none;">智能监测点</button><button id="soilTab" style="flex:1;border: none;background-color: transparent;outline: none;">报表</button></div>`;
            content = content + `<div id="soilDeviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px"><span>提示信息</span>` +
              `<span style="float:right">` +
              `FTU</span></p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px"><span>土壤温度</span>` +
              `<span style="float:right">` +
              _this.soilMapPoints[i].temperature +
              `℃</span></p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px"><span>土壤湿度</span>` +
              `<span style="float:right">` +
              _this.soilMapPoints[i].humidity +
              `%</span></p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px"><span>土壤盐度</span>` +
              `<span style="float:right">` +
              _this.soilMapPoints[i].turbidity +
              `μs/cm</span></p>`;

            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">土壤盐度:` +
              _this.soilMapPoints[i].salinity +
              "°" +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">土壤温度:` +
              _this.soilMapPoints[i].humidity +
              "%" +
              `</p>`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">土壤湿度:` +
              _this.soilMapPoints[i].temperature +
              "%" +
              `</p>`;
            content = content + `</div>`;
            content =
              content +
              `<div class="reportForm" id="soilReportForm" style="display:none">`;
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
              height: 85
            };
            var infoWindows = new BMap.InfoWindow(content, opts);
            markerFun(points, infoWindows);
            function markerFun(points, infoWindows) {
              var soIcon = new BMap.Icon(soilIcon, new BMap.Size(28, 35));
              var markers = new BMap.Marker(points, { icon: soIcon });

              map.addOverlay(markers);
              var label = new BMap.Label(_this.soilMapPoints[i].deviceName, {
                offset: new BMap.Size(-35, 32)
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
            if (!infoWindows.isOpen()) {
              infoWindows.addEventListener("open", function(e) {
                var waterName = document.getElementById("soilName");
                waterName.onclick = function() {
                  console.log("监测点");
                  document.getElementById("soilDeviceInfo").style.display =
                    "block";
                  document.getElementById("soilReportForm").style.display =
                    "none";
                };
                var waterTab = document.getElementById("soilTab");
                waterTab.onclick = function() {
                  console.log("报表");
                  document.getElementById("soilDeviceInfo").style.display =
                    "none";
                  document.getElementById("soilReportForm").style.display =
                    "block";
                };
              });
            }
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
      // 水泵
      https
        .fetchGet("soil/pump/list")
        .then(function(response) {
          var pumpData = response.object.list;
          console.log(pumpData);
          var pumpMapPoints = [];
          for (var i = 0; i < pumpData.length; i++) {
            pumpMapPoints.push({
              x: pumpData[i].latitude,
              y: pumpData[i].longitude,
              deviceName: pumpData[i].deviceName
            });
          }
          _this.pumpMapPoints = pumpMapPoints;
          for (var i = 0; i < _this.pumpMapPoints.length; i++) {
            var content = `<div class="deviceBg">`;
            content =
              content +
              `<div class="title" style=" display: flex">
                  <button id="waterName" style="flex:1;border: none;background-color: transparent;outline: none;">水循环水泵</button>
                  <button id="waterTab" style="flex:1;border: none;background-color: transparent;outline: none;">控制面板</button></div>`;
            content = content + `<div id="deviceInfo">`;
            content =
              content +
              `<p style="line-height:20px;margin:0px;margin-left:10px">名称 : ` +
              _this.pumpMapPoints[i].deviceName +
              `</p>`;
            content = content + `</div>`;
            content =
              content +
              `<div class="reportForm" id="reportForm" style="display:none">`;
            content = content + `<span>阀门控制</span>`;
            content = content + ` </div>`;
            content += `</div>`;
            //创建坐标点
            var points = new BMap.Point(
              _this.pumpMapPoints[i].y,
              _this.pumpMapPoints[i].x
            );
            var opts = {
              width: 120,
              height: 125
            };
            var infoWindows = new BMap.InfoWindow(content, opts);

            markerFun(points, infoWindows);

            function markerFun(points, infoWindows) {
              var puIcon = new BMap.Icon(pumpIcon, new BMap.Size(40, 55));
              var markers = new BMap.Marker(points, { icon: puIcon });

              map.addOverlay(markers);

              var label = new BMap.Label(_this.pumpMapPoints[i].deviceName, {
                offset: new BMap.Size(-25, 40)
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
            if (!infoWindows.isOpen()) {
              infoWindows.addEventListener("open", function(e) {
                var waterName = document.getElementById("waterName");
                waterName.onclick = function() {
                  console.log("监测点");
                  document.getElementById("deviceInfo").style.display = "block";
                  document.getElementById("reportForm").style.display = "none";
                };
                var waterTab = document.getElementById("waterTab");
                waterTab.onclick = function() {
                  console.log("报表");
                  document.getElementById("deviceInfo").style.display = "none";
                  document.getElementById("reportForm").style.display = "block";
                };
              });
            } else {
              var waterName = document.getElementById("waterName");
              waterName.onclick = function() {
                console.log("监测点");
                document.getElementById("deviceInfo").style.display = "block";
                document.getElementById("reportForm").style.display = "none";
              };
              var waterTab = document.getElementById("waterTab");
              waterTab.onclick = function() {
                console.log("报表");
                document.getElementById("deviceInfo").style.display = "none";
                document.getElementById("reportForm").style.display = "block";
              };
            }
          }
          console.log(content);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
