<template>
  <div class="welcome__wrapper">
    <common-header></common-header>
    <router-view />
    <template> 
      <baidu-map
        class="baidumap"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @ready="handler"
        :averageCenter="true"
      >
        <div v-for="marker in markers">
          <!-- 正常 开 -->
          <bm-marker
            v-if="
              marker.isOpen == '开启' &&
                (marker.deviceType == 0 || marker.deviceType == 1)
            "
            :icon="{
              url: require('@assets/marker/irr1.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>
          <bm-marker
            v-if="
              marker.status == 1 &&
                (marker.deviceType == 5 ||
                  marker.deviceType == 6 ||
                  marker.deviceType == 7)
            "
            :icon="{
              url: require('@assets/marker/jin.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>
          <bm-marker
            v-if="marker.status == 1 && marker.deviceType == 3"
            :icon="{
              url: require('@assets/marker/wei.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>
          <!-- 正常 关 -->
          <bm-marker
            v-if="
              marker.isOpen == '关闭' &&
                (marker.deviceType == 0 || marker.deviceType == 1)
            "
            :icon="{
              url: require('@assets/marker/irr.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>

          <!-- 异常 -->
          <bm-marker
            v-if="marker.warnLogStatus == 2"
            :icon="{
              url: require('@assets/marker/irr2.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>
          <bm-marker
            v-if="
              marker.warnLogStatus == 2 &&
                (marker.deviceType == 5 ||
                  marker.deviceType == 6 ||
                  marker.deviceType == 7)
            "
            :icon="{
              url: require('@assets/marker/jin2.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>
          <bm-marker
            v-if="marker.warnLogStatus == 2 && marker.deviceType == 3"
            :icon="{
              url: require('@assets/marker/wei2.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>
          <!-- 离线 -->
          <bm-marker
            v-if="
              marker.status == 0 &&
                (marker.deviceType == 0 || marker.deviceType == 1)
            "
            :icon="{
              url: require('@assets/marker/irr3.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>
          <bm-marker
            v-if="
              marker.status == 0 &&
                (marker.deviceType == 5 ||
                  marker.deviceType == 6 ||
                  marker.deviceType == 7)
            "
            :icon="{
              url: require('@assets/marker/jin3.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>
          <bm-marker
            v-if="marker.status == 0 && marker.deviceType == 3"
            :icon="{
              url: require('@assets/marker/wei3.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>
          <bm-info-window
            :position="{ lng: markLocation.lng, lat: markLocation.lat }"
            :show="showFlag"
            v-loading="loading"
            style="height: 175px;"
          >
            <p style="color: #409eff;">{{ pointMark.deviceName }}</p>
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
                  <span class="mapChartTit">累计用水量：</span>
                  <span class="right">{{ pointMark.totalWatering }}m³</span>
                </p>
                <p style="line-height: 17px;">
                  <span class="mapChartTit">灌溉次数：</span>
                  <span class="right">{{ pointMark.totalWaterNum }}次</span>
                </p>
                <p style="line-height: 17px;">
                  <span class="mapChartTit">上月灌溉次数：</span>
                  <span class="right">{{ pointMark.lastWaterNum }}次</span>
                </p>
                <p style="line-height: 17px;">
                  <span class="mapChartTit">上月用水量：</span>
                  <span class="right">{{ pointMark.lastWatering }}m³</span>
                </p>
                <p>
                  <span class="mapChartTit" style="line-height: 35px;"
                    >阀门控制：</span
                  >
                  <el-button
                    type="success"
                    plain
                    style="right:70px;position: absolute;"
                    @click="openDevice(marker.deviceId)"
                    >开启</el-button
                  >
                  <el-button
                    type="danger"
                    plain
                    style="right:0px;position: absolute;"
                    @click="closeDevice(marker.deviceId)"
                    >关闭</el-button
                  >
                </p>
              </el-tab-pane>
              <!-- <el-tab-pane label="控制面板" name="second">控制面板</el-tab-pane> -->
              <el-tab-pane label="报表" name="third">
                <span style="display: inline-block;width: 26%;">间隔选择</span>
                <select
                  name="sel"
                  v-model="mapValue"
                  style="background-color:#fff;color:#000;width: 23%"
                >
                  <option
                    v-for="item in mapOptions"
                    :key="item.mapValue"
                    :label="item.mapLabel"
                    :value="item.mapValue"
                  ></option>
                </select>
                <button
                  @click="mapDemand"
                  style="right: 13px;float: right;position: absolute;background-color: #409eff;border: none;color: #ffffff;
                padding-left: 10px;padding-right: 11px;line-height: 16px;"
                >
                  查询
                </button>
                <div v-if="mapValue == '日'" class="comTop">
                  <span class="monitorPoint" style="width: 26%;">时间选择</span>
                  <select
                    v-model="mapYear"
                    class
                    style="background-color:#fff;color:#000;width: 23%"
                  >
                    <option
                      v-for="item in selectYearList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</option
                    >
                  </select>
                  <select
                    v-model="mapMonth"
                    class
                    style="background-color:#fff;color:#000;width: 23%"
                  >
                    <option
                      v-for="item in selectMonthList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</option
                    >
                  </select>
                  <select
                    v-model="mapDay"
                    class
                    style="background-color:#fff;color:#000;width: 23%"
                  >
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
                    style="background-color:#fff;color:#000;margin-left:26%;width: 23%"
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
                    style="background-color:#fff;color:#000;width: 23%"
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
                    style="background-color:#fff;color:#000;width: 23%"
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
                  <span class="monitorPoint" style="width: 26%;">时间选择</span>
                  <select
                    v-model="mapYear"
                    style="background-color:#fff;color:#000;width: 23%"
                  >
                    <option
                      v-for="item in selectYearList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</option
                    >
                  </select>
                  <select
                    v-model="mapMonth"
                    style="background-color:#fff;color:#000;width: 23%"
                  >
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
                    style="background-color:#fff;color:#000;margin-left:26%;width: 23%"
                    class="comTop"
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
                    style="background-color:#fff;color:#000;width: 23%"
                  >
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
                  <span class="monitorPoint" style="width: 26%;">时间选择</span>
                  <select
                    v-model="mapYear"
                    style="background-color:#fff;color:#000;width: 23%"
                  >
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
                    style="margin-left:26%;display:block;width: 23%;background-color:#fff;color:#000;"
                  >
                    <option
                      v-for="item in selectYearList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</option
                    >
                  </select>
                </div>
                <div class="chart" id="mapChart"></div>
              </el-tab-pane>
            </el-tabs>
          </bm-info-window>
        </div>
      </baidu-map>
    </template>

    <div class="screenLeft">
      <div class="water">
        <p class="navTit">智能灌溉</p>
        <div class="waterMonitor">
          <div class="asideBg comTop">
            <span class="waterMonitorTit">灌溉分析</span>
            <span class="right">water monitoring</span>
          </div>
        </div>
        <div class="electricity-show-img">
          <div class="img-item">
            <div class="circle__wrapper">
              <div class="value" style="color:#00FFFF">{{ total }}</div>
              <div class="unit" style="color:#00FFFF">kw/h</div>
            </div>
            <div style="text-align:center;margin-top:4px;color:#00FFFF">
              总耗水量
            </div>
          </div>
          <div class="img-item">
            <div class="circle__wrapper">
              <div class="value" style="color:#00FFFF">{{ yesterday }}</div>
              <div class="unit" style="color:#00FFFF">kw/h</div>
            </div>
            <div style="text-align:center;margin-top:4px;color:#00FFFF">
              昨日用水
            </div>
          </div>
          <div class="img-item">
            <div class="circle__wrapper">
              <div class="value" style="color:#00FFFF">
                {{ economizeWater }}
              </div>
              <div class="unit" style="color:#00FFFF">kw/h</div>
            </div>
            <div style="text-align:center;margin-top:4px;color:#00FFFF">
              节省水量
            </div>
          </div>
          <div class="img-item">
            <div class="circle__wrapper1">
              <div class="value" style="color:#FFAE11">
                {{ economizeMoney }}
              </div>
              <div class="unit" style="color:#FFAE11">万元</div>
            </div>
            <div style="text-align:center;margin-top:4px;color:#FFAE11">
              节省金额
            </div>
          </div>
        </div>
        <div style="margin-top:10px">
          <span>上月节省水量</span>
          <span class="right">m³</span>
        </div>
        <div style="margin-top:10px">
          <span class>上月节省金额</span>
          <span class="right">m³</span>
        </div>
        <div style="margin-top:10px">
          <span class>上月智能灌溉区用水量</span>
          <span class="right">{{ yesSmartTotal }}</span>
        </div>
        <div style="margin-top:10px">
          <span class>上月普通区灌溉用水量</span>
          <span class="right">{{ yesNormalTotal }}</span>
        </div>

        <div class="waterAlarm">
          <div class="asideBg" style="margin-top:10px">
            <span class="waterMonitorTit">各项水量使用情况</span>
            <span class="right">water alarm record</span>
          </div>
          <div class="comTop">
            <div class="percent">
              <span>智能灌溉区</span>
              <span class="percentValue">{{ smartTotal }}</span>
              <span>m³</span>
            </div>
            <el-progress :percentage="20"></el-progress>
            <div style="clear:both"></div>
          </div>
          <div class="comTop">
            <div class="percent">
              <span>普通灌溉区</span>
              <span class="percentValue">{{ normalTotal }}</span>
              <span>m³</span>
            </div>
            <el-progress :percentage="40"></el-progress>
            <div style="clear:both"></div>
          </div>
        </div>
      </div>
      <div class="water">
        <div class="waterMonitor">
          <div class="asideBg comTop">
            <span class="waterMonitorTit">用水趋势</span>
            <span class="right">water monitoring</span>
          </div>
        </div>

        <div>
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
                v-for="item in timeIntervaloptions"
                :key="item.timeIntervalValue"
                :label="item.timeIntervalLabel"
                :value="item.timeIntervalValue"
              ></option>
            </select>
            <span class="monitorPoint1">类别选择</span>
            <select class="sel" v-model="value">
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
            <span class="waterMonitorTit">土壤墒情记录</span>
            <span class="right">water alarm record</span>
          </div>
          <div class="comTop">
            <span class="monitorPoint">时间选择</span>
            <select
              v-model="selectWarnYear1"
              class
              style="margin-right:4%;width:18%"
            >
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select
              v-model="selectWarnMonth1"
              class
              style="margin-right:4%;width:18%"
            >
              <option
                v-for="item in selectMonthList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select
              v-model="selectWarnDay1"
              class
              style="margin-right:4%;width:18%"
            >
              <option
                v-for="item in selectDayList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <button
              class="pointLeft monitorPoint"
              style="width: 15%;margin-left:0"
            >
              查询
            </button>
          </div>
          <div class="comTop alarmStat">
            <span style="flex:1;text-align:left">灌溉用水</span>
            <span style="flex:1;text-align:left">灌溉时长</span>
            <span style="flex:1.5;text-align:center">起末土壤墒情</span>
            <span style="flex:1;text-align:right">上升比例</span>
            <span style="flex:1;text-align:center">时间</span>
          </div>
        </div>
      </div>
    </div>

    <div class="irrRight" id="review_box">
      <!-- <ul id="comment1">-->
      <el-alert type="error" v-for="item in uls" style="margin-bottom:20px"
        >{{ item }}设备故障请及时排查</el-alert
      >
      <!-- <li v-for="item in uls" style="line-height:40px;font-size:15px">{{item}}</li> -->
      <!-- </ul> -->
      <ul id="comment2"></ul>
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
    <!-- </el-dialog> -->
    <common-footer></common-footer>
    <router-view />
  </div>
</template>
<script>
import CommonHeader from "@commons/CommonHeader";
import CommonFooter from "@commons/CommonFooter";
import CommonWarn from "@commons/CommonWarn";
import Vue from "vue";
import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  ak: "yhGtwOULKUiUF4BIvyH75zGzLN0PdSrr"
});

// import { BmlMarkerClusterer } from "vue-baidu-map";
// import BmMarker from "vue-baidu-map/components/overlays/Marker";
// import irrIcon from "@assets/marker/irr.png";
// import soilIcon from "@assets/marker/soil.png";

// import irrIcon1 from "@assets/marker/irr1.png";
import https from "@/https.js";
export default {
  directives: {},
  // components: { CommonHeader, CommonFooter, BmlMarkerClusterer, BmMarker },
  components: { CommonHeader, CommonFooter, CommonWarn },
  mixins: [],
  props: {},
  data() {
    return {
      warnLogStatus: "",
      remark: "",
      warnLogId: "",
      tabId: "",
      errData: [],
      uls: [],
      markLocation: [],
      loading: true,
      pointMark: [],
      showFlag: false,
      infoWindow: {
        show: true,
        contents:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      warnDialogVisible: false,
      mapActiveName: "first",
      activeName: "not",
      markers: [],
      show: false,
      deviceStatus: [],
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
      mapYear: "2020",
      mapMonth: "03",
      mapDay: "03",
      mapYear1: "2020",
      mapMonth1: "03",
      mapDay1: "05",
      mapDeviceId: "",
      xData: [],
      xMapData: [],
      mapChartData: [],
      mapStartTime: [],
      mapStartNum: [],
      mapStartChartData: [],
      mapEndChartData: [],
      mapEndTime: [],
      mapEndNum: [],
      leiji: "",
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
      selectWarnYear1: "2019",
      selectWarnMonth1: "11",
      selectWarnDay1: "11",
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
      waterTypeList: [
        { label: "全部", value: "10" },
        { label: "普通灌溉区", value: "1" },
        { label: "智能灌溉区", value: "2" }
      ],
      options: [],
      value: "10",
      smart: "",
      normal: "",
      yesterday: "",
      total: "",
      economizeMoney: "",
      economizeWater: "",
      smartTotal: "",
      normalTotal: "",
      yesSmartTotal: "",
      yesNormalTotal: "",
      showImgInfo: [
        { value: "20", unit: "kw/h", isMoney: false, label: "总耗水量" },
        { value: "20", unit: "kw/h", isMoney: false, label: "昨日用水" },
        { value: "20", unit: "kw/h", isMoney: false, label: "节省水量" },
        { value: "20", unit: "万元", isMoney: true, label: "节省金额" }
      ],
      yesterdayInfo: [
        {
          label: "昨日节省水量",
          value: "1241982.09",
          unit: "km/h",
          state: true
        },
        {
          label: "昨日节省金额",
          value: "1241982.09",
          unit: "km/h",
          state: true
        },
        {
          label: "昨日智能灌溉区用水量",
          value: "1241982.09",
          unit: "km/h",
          state: true
        },
        {
          label: "昨日普通灌溉区用水量",
          value: "1241982.09",
          unit: "km/h",
          state: true
        }
      ],
      electricitySomeInfo: [
        {
          label: "智能灌溉区",
          value: "2.3",
          unit: "kw/h",
          progress: "34",
          uping: true
        },
        {
          label: "普通灌溉区",
          value: "2.3",
          unit: "kw/h",
          progress: "34",
          uping: true
        }
      ],
      failureLogging: [
        {
          label: "10t",
          irrTinme: "01:00:00",
          soilEnd: "7%~15%",
          ratio: "7%",
          time: "20:00:23"
        },
        {
          label: "10t",
          irrTinme: "01:00:00",
          soilEnd: "7%~15%",
          ratio: "7%",
          time: "20:00:23"
        },
        {
          label: "10t",
          irrTinme: "01:00:00",
          soilEnd: "7%~15%",
          ratio: "7%",
          time: "20:00:23"
        },
        {
          label: "10t",
          irrTinme: "01:00:00",
          soilEnd: "7%~15%",
          ratio: "7%",
          time: "20:00:23"
        }
      ],
      waterStartChartData: "",
      waterStartCreatTime: "",
      waterStartTypeNum: "",
      waterEndChartData: "",
      waterEndCreatTime: "",
      waterEndTypeNum: "",
      center: { lng: 0, lat: 0 },
      zoom: 5,
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
      categoryOptions: [
        {
          categoryIntervalValue: "普通区",
          categoryIntervalLabel: "智慧区"
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
      warnData: []
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this.IrrigateInfo();
    this.WaterNumTotal();
    this.yesWatTotal();
    this.demand();
    this.getWarnPoint();
    // this.roll(50);
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.302281;
      this.center.lat = 39.992571;
      this.zoom = 18;
      let mapStyle = { style: "midnight" };
      map.setMapStyle(mapStyle);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    infoWindowClose(marker) {
      // marker.showFlag = false;
      console.log(marker);
    },
    infoWindowOpen(marker) {
       console.log(marker);
      var that = this;
      that.markLocation = marker;
      that.loading = true;
      that.showFlag = true;
      that.mapDeviceId = marker.deviceId;
      console.log(marker);
      if (marker.warnLogStatus == 2) {
        console.log("异常");
        var r = confirm(marker.remark);
        if (r == true) {
          console.log("是");
          https
            .fetchGet("/soil/warn/logList?warnLogClassify=204")
            .then(function(res) {
              console.log(res);
              var data = res.object.list.list;
              console.log(data);
              that.$router.push({
                path: "/CommonWarn",
                query: { data: data, options: that.options }
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("否");
          https
            .fetchGet("/soil/waterDevice/ByInfo?deviceId=" + marker.deviceId)
            .then(function(res) {
              var data = res.object.list;
              that.pointMark = data;
              that.loading = false;
              console.log(that.pointMark);
              console.log(res);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      } else {
        console.log("正常");
        https
          .fetchGet("/soil/waterDevice/ByInfo?deviceId=" + marker.deviceId)
          .then(function(res) {
            var data = res.object.list;
            that.pointMark = data;
            that.loading = false;
            console.log(that.pointMark);
            console.log(res);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    handleClick(tab) {
      console.log(tab);
      console.log("1111");
      console.log(tab.index);
      if (tab.index == 1) {
        this.mapDemand();
      }
    },
    getWarnPoint() {
      var that = this;
      https
        .fetchGet("/soil/warn/logList?warnLogClassify=204")
        .then(function(res) {
          console.log(res);
          var data = res.object.list.list;
          that.uls = data.map(item => item.deviceName);
          that.errData = data;
          that.getPoint();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getPoint() {
      var that = this;
      https
        .fetchGet("/soil/waterDevice/list")
        .then(function(res) {
          var newData = res.object.list;
          for (var i = 0; i < newData.length; i++) {
            for (var j = 0; j < that.errData.length; j++) {
              if (newData[i].deviceId == that.errData[j].warnLogDeviceId) {
                newData[i].deviceInfo = that.errData[j];
              }
            }
          }
          console.log(newData);
          for (var i = 0; i < newData.length; i++) {
            if (newData[i].deviceInfo) {
              that.warnLogStatus = newData[i].deviceInfo.warnLogStatus;
              that.remark = newData[i].deviceInfo.remark;
              that.warnLogId = newData[i].deviceInfo.warnLogId;
            }
            that.markers.push({
              lng: newData[i].longitude,
              lat: newData[i].latitude,
              isOpen: newData[i].isOpen == "1" ? "开启" : "关闭",
              deviceId: newData[i].deviceId,
              deviceIntro: newData[i].deviceIntro,
              deviceType: newData[i].deviceType,
              status: newData[i].status,
              warnLogStatus: that.warnLogStatus,
              remark: that.remark,
              warnLogId: that.warnLogId
            });
            // 水表列表
            that.options.push({
              value: newData[i].deviceId,
              label: newData[i].deviceIntro
            });
          }
          console.log(that.markers);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    mapDemand() {
      var that = this;
      var startTime = "";
      var endTime = "";
      if (that.mapValue == "日") {
        startTime = that.mapYear + "-" + that.mapMonth + "-" + that.mapDay;
        endTime = that.mapYear1 + "-" + that.mapMonth1 + "-" + that.mapDay1;
      } else if (that.mapValue == "月") {
        startTime = that.mapYear + "-" + that.mapMonth;
        endTime = that.mapYear1 + "-" + that.mapMonth1;
      } else if (that.mapValue == "年") {
        startTime = that.mapYear;
        endTime = that.mapYear1;
      }
      let param = {
        startTime: startTime,
        endTime: endTime,
        deviceId: that.mapDeviceId,
        type: 1
      };
      // waterDevice/newDeviceChart
      https
        .fetchGet("/soil/waterDevice/newDeviceChart", param)
        .then(function(res) {
          console.log(res);
          // 开始
          that.mapStartChartData = res.object.list;
          that.mapStartTime = [];
          that.mapStartNum = [];
          for (var i = 0; i < that.mapStartChartData.length; i++) {
            that.mapStartTime[i] = that.mapStartChartData[i].createTime;
            that.mapStartNum[i] = that.mapStartChartData[i].thisNum;
          }
          // 结束
          that.mapEndChartData = res.object.contrastList;
          that.mapEndTime = [];
          that.mapEndNum = [];
          for (var i = 0; i < that.mapEndChartData.length; i++) {
            that.mapEndTime[i] = that.mapEndChartData[i].createTime;
            that.mapEndNum[i] = that.mapEndChartData[i].thisNum;
          }
          console.log(that.mapStartTime);
          console.log(that.mapStartNum);
          console.log(that.mapEndTime);
          console.log(that.mapEndNum);
          that.mapDrawChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    mapDrawChart() {
      let that = this;
      let mapChart = that.$echarts.init(document.getElementById("mapChart"));
      console.log(mapChart);
      if (that.mapValue == "日") {
        that.xMapData = [
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
      } else if (that.mapValue == "月") {
        that.xMapData = [
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
      } else if (that.mapValue == "年") {
        that.xMapData = [
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
      console.log(that.mapValue);
      console.log(that.xMapData);
      console.log(that.mapStartNum);
      console.log(that.mapEndNum);
      // try {
      //   mapChart.setOption(options);
      // } catch (err) {
      //   console.log(err);
      // }
      var mapOption = {
        grid: {
          y: 10,
          height: 80,
          y2: 20
        },
        xAxis: {
          type: "category",
          data: that.xMapData,
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
            data: that.mapStartNum,
            // data: 0,
            type: "line",
            smooth: true,
            color: "#00ffff",
            lineStyle: {
              color: "#00ffff"
            }
          },
          {
            data: that.mapEndNum,
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
        mapChart.setOption(mapOption);
      } catch (err) {
        console.log(err);
      }
    },
    openDevice(deviceId) {
      console.log(deviceId);
      var that = this;
      https
        .fetchPost("/url1/meter/water/v1/open?deviceId=" + deviceId)
        .then(function(res) {
          that.$message(res.msg);
          that.getPoint();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    closeDevice(deviceId) {
      console.log(deviceId);
      var that = this;
      https
        .fetchPost("/url1/meter/water/v1/close?deviceId=" + deviceId)
        .then(function(res) {
          that.$message(res.msg);
          that.getPoint();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    roll(t) {
      var that = this;
      var ul1 = document.getElementById("comment1");
      var ul2 = document.getElementById("comment2");
      var ulbox = document.getElementById("review_box");
      ul2.innerHTML = ul1.innerHTML;
      ulbox.scrollTop = 0; // 开始无滚动时设为0
      var timer = setInterval(that.rollStart, t); // 设置定时器，参数t用在这为间隔时间（单位毫秒），参数t越小，滚动速度越快
      // 鼠标移入div时暂停滚动
      ulbox.onmouseover = function() {
        console.log("1111");
        clearInterval(timer);
      };
      // 鼠标移出div后继续滚动
      ulbox.onmouseout = function() {
        timer = setInterval(that.rollStart, t);
      };
    },
    // 开始滚动函数
    rollStart() {
      // 上面声明的DOM对象为局部对象需要再次声明
      var ul1 = document.getElementById("comment1");
      var ul2 = document.getElementById("comment2");
      var ulbox = document.getElementById("review_box");
      // 正常滚动不断给scrollTop的值+1,当滚动高度大于列表内容高度时恢复为0
      if (ulbox.scrollTop >= ul1.scrollHeight) {
        ulbox.scrollTop = 0;
      } else {
        ulbox.scrollTop++;
      }
    },
    warnVisible() {
      var that = this;
      // document.getElementById("warnPanel").style.display = "block";
      // that.warnDialogVisible = true;
      console.log(that.options);
      https
        .fetchGet("/soil/warn/logList?warnLogClassify=204")
        .then(function(res) {
          console.log(res);
          var data = res.object.list.list;
          that.warnData = data;
          that.$router.push({
            path: "/CommonWarn",
            query: { data: data, options: that.options }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    isNumber: function(value) {
      if (value >= 1000) {
        return (
          Number((value / 10000).toString().match(/^\d+(?:\.\d{0,2})?/)) + "万"
        );
      } else if (value.toString().split(".").length > 2) {
        return Number(value.toString().match(/^\d+(?:\.\d{0,2})?/));
      } else {
        return value;
      }
    },
    demand() {
      var that = this;
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
      let param = {
        startTime: startTime,
        endTime: endTime,
        type: that.value
      };
      https
        .fetchGet("/soil/energy/newWaterChart", param)
        .then(function(res) {
          console.log(res);
          // 开始
          that.waterStartChartData = res.object.list;
          that.waterStartCreatTime = [];
          that.waterStartTypeNum = [];
          for (var i = 0; i < that.waterStartChartData.length; i++) {
            that.waterStartCreatTime[i] =
              that.waterStartChartData[i].createTime;
            that.waterStartTypeNum[i] = that.waterStartChartData[i].thisNum;
          }

          console.log(that.waterStartCreatTime);
          console.log(that.waterStartTypeNum);
          // 结束
          that.waterEndChartData = res.object.contrastList;
          that.waterEndCreatTime = [];
          that.waterEndTypeNum = [];
          for (var i = 0; i < that.waterEndChartData.length; i++) {
            that.waterEndCreatTime[i] = that.waterEndChartData[i].createTime;
            that.waterEndTypeNum[i] = that.waterEndChartData[i].thisNum;
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
            color: "#00ffff",
            lineStyle: {
              color: "#00ffff"
            }
          },
          {
            data: that.waterEndTypeNum,
            // data: 1,
            type: "line",
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
    // 灌溉分析 圆
    IrrigateInfo() {
      var that = this;
      https
        .fetchGet("/soil/waterDevice/left")
        .then(function(response) {
          that.yesterday = that.isNumber(response.object.yesterday);
          that.total = that.isNumber(response.object.total);
          that.economizeMoney = that.isNumber(response.object.economizeMoney);
          that.economizeWater = that.isNumber(response.object.economizeWater);
          console.log(that.yesterday);
          console.log(that.total);
          console.log(that.economizeMoney);
          console.log(that.economizeWater);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 昨日用水量
    yesWatTotal() {
      var _this = this;
      https
        .fetchGet("/soil/waterDevice/yesterdayWaterTotal")
        .then(function(response) {
          console.log(response);
          _this.yesSmartTotal = response.object.smart;
          _this.yesNormalTotal = response.object.nornal;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 各项水量使用情况 累计统计
    WaterNumTotal() {
      var that = this;
      https
        .fetchGet("/soil/waterDevice/WaterNumTotal")
        .then(function(response) {
          console.log(response);
          that.smartTotal = response.object.smart;
          that.normalTotal = response.object.nornal;
          that.smart =
            (that.smartTotal / (that.smartTotal + that.normalTotal)) * 100 +
            "%";
          that.normal =
            (that.normalTotal / (that.smartTotal + that.normalTotal)) * 100 +
            "%";
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.bm-view
  width 100%
  height 100%
  position absolute
>>>.el-progress-bar__inner
  background-color rgb(0, 255, 255)
  height 5px
>>>.el-progress-bar__outer
  height 2px !important
  border-radius 100px
  overflow inherit
  background-color rgb(0, 255, 255)
  position relative
  vertical-align middle
.mapAside
  line-height 20px
  margin 0px
  margin-left 10px
>>>.el-tabs__item.is-active
  // color: rgb(0, 255, 255);
  color #409EFF
.warnBox
  opacity 0.9
  width 50%
  height 60vh
  background-color #000
  position absolute
  margin-left 26%
  margin-top 10vh
  position absolute
  display none
</style>
