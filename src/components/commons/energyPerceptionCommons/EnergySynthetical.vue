<template>
  <div class="welcome__wrapper">
    <div class="water">
      <div class="waterMonitor">
        <div class="asideBg comTop">
          <span class="waterMonitorTit">能耗详情</span>
          <span class="right">water monitoring</span>
        </div>
        <div class="comTop" style="margin-top:10px">
          <span style="line-height:20px">总节省金额</span>
          <p>Historical warning times</p>
          <p class="right hisWarn">
            <span class="warnValue unitVal">{{ enerTotalMoney }}</span>
            <span class="unitEle">元</span>
          </p>
        </div>
        <img :src="PointsSectionBar" alt="" />
        <div class="comTop">
          <span style="line-height:20px">总耗电量</span>
          <p class="warmTimeEng">Number of warnings yesterday</p>
          <p class="right hisWarn">
            <span class="warnValue unitVal">{{ enerLightTotal }}</span>
            <span class="unitEle">kw/h</span>
          </p>
        </div>
        <div class="comTop">
          <span style="line-height:20px">总节省电量</span>
          <p class="warmTimeEng">Number of warnings yesterday</p>
          <p class="right hisWarn">
            <span class="warnValue unitVal">{{ enerElectricitySaving }}</span>
            <span class="unitEle">kw/h</span>
          </p>
        </div>
        <div class="comTop">
          <span style="line-height:20px">总节省金额</span>
          <p class="warmTimeEng">Number of warnings yesterday</p>
          <p class="right hisWarn">
            <span class="warnValue unitVal">{{
              enerElectricitySavingMoney
            }}</span>
            <span class="unitEle">kw/h</span>
          </p>
        </div>
        <img :src="PointsSectionBar" alt="" />
        <div class="comTop">
          <span style="line-height:20px">总耗水量</span>
          <p class="warmTimeEng">Number of warnings yesterday</p>
          <p class="right hisWarn">
            <span class="warnValue unitVal">{{ enerWaterTotal }}</span>
            <span class="unitEle">kw/h</span>
          </p>
        </div>
        <div class="comTop">
          <span style="line-height:20px">总节省水量</span>
          <p class="warmTimeEng">Number of warnings yesterday</p>
          <p class="right hisWarn">
            <span class="warnValue unitVal">{{ enerWaterSaving }}</span>
            <span class="unitEle">kw/h</span>
          </p>
        </div>
        <div class="comTop">
          <span style="line-height:20px">总节省金额</span>
          <p class="warmTimeEng">Number of warnings yesterday</p>
          <p class="right hisWarn">
            <span class="warnValue unitVal">{{ enerWaterSavingMonry }}</span>
            <span class="unitEle">kw/h</span>
          </p>
        </div>
      </div>
    </div>
    <div class="water">
      <div class="waterMonitor">
        <div class="asideBg comTop" style="margin-top:15px;">
          <span class="waterMonitorTit">趋势详情</span>
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
              v-for="item in timeIntervalOptions"
              :key="item.timeIntervalValue"
              :label="item.timeIntervalLabel"
              :value="item.timeIntervalValue"
            ></option>
          </select>
          <span class="monitorPoint1">类别选择</span>
          <select class="sel" v-model="WaterCategorySelectionValue">
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
    </div>
  </div>
</template>
<script>
import https from "@/https.js";
// import electricityIcon from "@assets/marker/electricityIcon.png";
// import waterIcon from "@assets/marker/waterIcon.png";

import PointsSectionBar from "@assets/asideImg/PointsSectionBar.png";
export default {
  name: "",
  components: {},
  directives: {},
  mixins: [],
  props: {},
  data() {
    return {
      getTime1: {
        getStartTimeDate: "",
        getEndTimeDate: ""
      },
      PointsSectionBar,
      enerElectricitySaving: "",
      enerElectricitySavingMoney: "",
      enerWaterSaving: "",
      enerWaterSavingMonry: "",
      enerLightTotal: "",
      enerTotalMoney: "",
      enerWaterTotal: "",
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
      WaterCategorySelectionValue: "用电",
      WaterCategorySelectionOptions: [
        {
          WaterCategorySelectionValue: "用电",
          WaterCategorySelectionLabel: "用电"
        },
        {
          WaterCategorySelectionValue: "用水",
          WaterCategorySelectionLabel: "用水"
        }
      ],
      energyStartData: "",
      energyEndData: "",
      startValue: "",
      startDate: "",
      endValue: "",
      endDate: ""
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    var that = this;
    that.energyLeftList();
  },
  methods: {
    startTime(value) {
      console.log(value);
      this.getTime1.getStartTimeDate = value;
    },
    endTime(value) {
      console.log(value);
      this.getTime1.getEndTimeDate = value;
    },
    energyLeftList() {
      var that = this;
      let param = {
        type: 1
      };
      https
        .fetchGet("soil/energy/list", param)
        .then(function(response) {
          console.log(response);
          var energyData = response.object;
          console.log(energyData);
          that.enerElectricitySaving = energyData.ElectricitySaving;
          that.enerElectricitySavingMoney = energyData.ElectricitySavingMoney;
          that.enerWaterSaving = energyData.WaterSaving;
          that.enerWaterSavingMonry = energyData.WaterSavingMonry;
          that.enerLightTotal = energyData.lightTotal;
          that.enerTotalMoney = energyData.totalMoney;
          that.enerWaterTotal = energyData.waterTotal;
        })
        .catch(function() {});
    },
    demand() {
      var that = this;
      var energyType = "";
      if (that.WaterCategorySelectionValue == "用水") {
        energyType = 1;
      } else if (that.WaterCategorySelectionValue == "用电") {
        energyType = 2;
      }

      let param = {
        startTime: that.getTime1.getStartTimeDate,
        endTime: that.getTime1.getEndTimeDate,
        type: energyType
      };
      https.fetchGet("/soil/energy/chart", param).then(function(response) {
        // 开始
        that.energyStartData = response.object.list;
        for (var i = 0; i < that.energyEndData.length; i++) {
          that.startValue = that.energyEndData[i].thisNum;
          that.startDate = that.energyEndData[i].createTime;
        }
        //  结束
        that.energyEndData = response.object.contrastList;
        for (var i = 0; i < that.energyEndData.length; i++) {
          that.endValue = that.energyEndData[i].thisNum;
          that.endDate = that.energyEndData[i].createTime;
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped></style>
