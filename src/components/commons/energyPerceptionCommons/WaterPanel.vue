<template>
  <div class="electricity__wrapper">
    <div class="water">
      <div class="waterMonitor">
        <div class="asideBg comTop">
          <span class="waterMonitorTit">用水感知</span>
          <span class="right">water monitoring</span>
        </div>
      </div>
      <div class="electricity-show-img">
        <div class="img-item">
          <div class="circle__wrapper">
            <div class="value" style="color:#00FFFF">{{ waterTotal }}</div>
            <div class="unit" style="color:#00FFFF">kw/h</div>
          </div>
          <div style="text-align:center;margin-top:4px;color:#00FFFF">
            总耗水量
          </div>
        </div>
        <div class="img-item">
          <div class="circle__wrapper">
            <div class="value" style="color:#00FFFF">
              {{ waterYesterday }}
            </div>
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
        <span>昨日节省水量</span>
        <span class="right">
          <span class="warnValue1 unitVal">{{ waterEconomizeWater }}</span>
          <span class="unitEle">kw/h</span>
        </span>
      </div>
      <div style="margin-top:10px">
        <span class="">昨日节省金额</span>
        <span class="right">
          <span class="warnValue1 unitVal">{{ waterEconomizeMoney }}</span>
          <span class="unitEle">kw/h</span>
        </span>
      </div>
      <div class="waterAlarm">
        <div class="asideBg1" style="margin-top:10px">
          <span class="waterMonitorTit">各项水量使用情况</span>
          <span class="right">water alarm record</span>
        </div>
        <img :src="PointsSectionBar" alt="" />

        <div class="comTop">
          <div class="percent">
            <span class="useTypeTit">补水井用水</span>
            <span class="percentValue">{{ useReplenishment }}</span
            ><span>m³</span>
            <div class="percentBg"></div>
            <div class="percentPrice"></div>
          </div>
          <div class="percentUnit">
            <span>34%</span>
          </div>
          <div style="clear:both"></div>
        </div>

        <div class="comTop">
          <div class="percent">
            <span class="useTypeTit">办公室用水</span>
            <span class="percentValue">{{ useWork }}</span
            ><span>m³</span>
            <div class="percentBg"></div>
            <div class="percentPrice"></div>
          </div>
          <div class="percentUnit">
            <span>34%</span>
          </div>
          <div style="clear:both"></div>
        </div>

        <div class="comTop">
          <div class="percent">
            <span class="useTypeTit">厕所用水</span>
            <span class="percentValue">{{ usewc }}</span
            ><span>m³</span>
            <div class="percentBg"></div>
            <div class="percentPrice"></div>
          </div>
          <div class="percentUnit">
            <span>34%</span>
          </div>
          <div style="clear:both"></div>
        </div>

        <div class="comTop">
          <div class="percent">
            <span class="useTypeTit">水源井用水</span>
            <span class="percentValue">{{ useSourceOfWater }}</span
            ><span>m³</span>
            <div class="percentBg"></div>
            <div class="percentPrice"></div>
          </div>
          <div class="percentUnit">
            <span>34%</span>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
    <div class="water">
      <div class="waterMonitor">
        <div class="asideBg1 comTop">
          <span class="waterMonitorTit">用水趋势</span>
          <span class="right">water monitoring</span>
        </div>
        <img :src="PointsSectionBar" alt="" />
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
<style lang="stylus" scoped></style>
<script>
import https from "@/https.js";
// import electricityIcon from "@assets/marker/electricityIcon.png";
import PointsSectionBar from "@assets/asideImg/PointsSectionBar.png";
import { type } from "os";
export default {
  name: "",
  components: {},
  directives: {},
  mixins: [],
  props: {},
  data() {
    return {
      // 左侧
      PointsSectionBar,
      waterEconomizeMoney: "",
      waterEconomizeWater: "",
      waterTotal: "",
      waterYesterday: "",
      // 各项水量使用情况
      useReplenishment: "",
      useWork: "",
      usewc: "",
      useSourceOfWater: "",
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
      WaterCategorySelectionValue: "智能区",
      WaterCategorySelectionOptions: [
        {
          WaterCategorySelectionValue: "智能区",
          WaterCategorySelectionLabel: "智能区"
        },
        {
          WaterCategorySelectionValue: "普通区",
          WaterCategorySelectionLabel: "普通区"
        },
        {
          WaterCategorySelectionValue: "办公区",
          WaterCategorySelectionLabel: "办公区"
        },
        {
          WaterCategorySelectionValue: "厕所",
          WaterCategorySelectionLabel: "厕所"
        },
        {
          WaterCategorySelectionValue: "补水井",
          WaterCategorySelectionLabel: "补水井"
        },
        {
          WaterCategorySelectionValue: "溢水井",
          WaterCategorySelectionLabel: "溢水井"
        },
        {
          WaterCategorySelectionValue: "水源井",
          WaterCategorySelectionLabel: "水源井"
        }
      ],
      getTime: {
        getStartTimeDate: "",
        getEndTimeDate: ""
      },
      watStartData: "",
      watEndData: "",
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
    that.waterListLeft();
    that.WaterUsageType();
  },
  methods: {
    // 能耗左侧
    waterListLeft() {
      var that = this;
      let param = {
        type: 3
      };
      https
        .fetchGet("soil/energy/type", param)
        .then(function(response) {
          console.log(response);
          var waterData = response.object;
          that.waterEconomizeMoney = waterData.economizeMoney;
          that.waterEconomizeWater = waterData.economizeWater;
          that.waterTotal = waterData.total;
          that.waterYesterday = waterData.yesterday;
          console.log(that.waterYesterday);
        })
        .catch(function() {});
    },
    //  各项水量使用情况
    WaterUsageType() {
      var that = this;
      https
        .fetchGet("soil/energy/type")
        .then(function(response) {
          console.log(response);
          var useType = response.object;
          that.useReplenishment = useType.Replenishment;
          that.useWork = useType.work;
          that.usewc = useType.wc;
          that.useSourceOfWater = useType.SourceOfWater;
          console.log(that.useSourceOfWater);
        })
        .catch(function() {});
    },
    // 各项水量管理图表
    demand() {
      var that = this;
      var useType = "";
      if (this.WaterCategorySelectionValue == "智能区") {
        useType = 1;
      } else if (this.WaterCategorySelectionValue == "普通区") {
        useType = 2;
      } else if (this.WaterCategorySelectionValue == "办公区") {
        useType = 3;
      } else if (this.WaterCategorySelectionValue == "厕所") {
        useType = 4;
      } else if (this.WaterCategorySelectionValue == "补水井") {
        useType = 5;
      } else if (this.WaterCategorySelectionValue == "溢水井") {
        useType = 6;
      } else if (this.WaterCategorySelectionValue == "水源井") {
        useType = 7;
      }
      let param = {
        startTime: that.getTime.getStartTimeDate,
        endTime: that.getTime.getEndTimeDate,
        type: useType
      };
      console.log(that.getTime.getStartTimeDate);
      console.log(that.getTime.getEndTimeDate);
      https
        .fetchGet("/soil/energy/waterChart", { param })
        .then(function(response) {
          // 开始
          that.watStartData = response.object.list;
          for (var i = 0; i < that.watStartData.length; i++) {
            that.startValue = that.watStartData[i].thisNum;
            that.startDate = that.watStartData[i].createTime;
          }
          //  结束
          that.watEndData = response.object.contrastList;
          for (var i = 0; i < that.watEndData.length; i++) {
            that.endValue = that.watEndData[i].thisNum;
            that.endDate = that.watEndData[i].createTime;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
