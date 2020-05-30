<template>
  <div class="welcome__wrapper">
    <div class="water">
      <div class="waterMonitor">
        <div class="asideBg comTop">
          <span class="waterMonitorTit">全局照明</span>
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
            总耗电量
          </div>
        </div>
        <div class="img-item">
          <div class="circle__wrapper">
            <div class="value" style="color:#00FFFF">{{ yesterday }}</div>
            <div class="unit" style="color:#00FFFF">kw/h</div>
          </div>
          <div style="text-align:center;margin-top:4px;color:#00FFFF">
            昨日用电
          </div>
        </div>
        <div class="img-item">
          <div class="circle__wrapper">
            <div class="value" style="color:#00FFFF">{{ data }}</div>
            <div class="unit" style="color:#00FFFF">kw/h</div>
          </div>
          <div style="text-align:center;margin-top:4px;color:#00FFFF">
            节省电量
          </div>
        </div>
        <div class="img-item">
          <div class="circle__wrapper1">
            <div class="value" style="color:#FFAE11">{{ money }}</div>
            <div class="unit" style="color:#FFAE11">kw/h</div>
          </div>
          <div style="text-align:center;margin-top:4px;color:#FFAE11">
            节省金额
          </div>
        </div>
      </div>
      <div class="comTop">
        <span>昨日节省电量</span>
        <span class="right">{{ yesterdayData }}</span>
      </div>
      <div class="comTop">
        <span class="">昨日节省金额</span>
        <span class="right">{{ yesterdayMoney }}</span>
      </div>
      <div class="waterAlarm">
        <div class="asideBg comTop">
          <span class="waterMonitorTit">各项电量使用情况</span>
          <span class="right">water alarm record</span>
        </div>
        <div class="comTop">
          <div class="percent">
            <span>智慧路灯</span>
            <span class="percentValue">4.8</span><span>m³</span>
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
            <span>感应路灯</span>
            <span class="percentValue">4.8</span><span>m³</span>
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
            <span>草坪灯</span>
            <span class="percentValue">4.8</span><span>m³</span>
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
            <span>普通灯</span>
            <span class="percentValue">4.8</span><span>m³</span>
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
        <div class="asideBg comTop">
          <span class="waterMonitorTit">用电趋势</span>
          <span class="right">water monitoring</span>
        </div>
      </div>

      <div>
        <div class="comTop">
          <button
            class="pointLeft monitorPoint"
            style="width: 20%;margin-left: 67.5%"
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
          <select name="sel" class="sel">
            <option value="1">广州</option>
            <option value="2">深圳</option>
            <option value="3">山东</option>
            <option value="4">北京</option>
          </select>
        </div>
      </div>

      <div class="chart"></div>

      <div class="waterAlarm">
        <div class="asideBg comTop">
          <span class="waterMonitorTit">故障记录</span>
          <span class="right">water alarm record</span>
        </div>
        <div class="comTop alarmStat">
          <span class="alaName">普通路灯1路</span>
          <span class="alaName" style="text-align:right;flex:1.5"
            >发生故障</span
          >
          <span class="alaName" style="text-align:right;flex:1.5">已解决</span>
          <span class="alaName" style="text-align:right;flex:1.5">时间</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import https from "@/https.js";
export default {
  name: "",
  components: {},
  directives: {},
  mixins: [],
  props: {},
  data() {
    return {
      data: "",
      money: "",
      total: "",
      yesterday: "",
      yesterdayData: "",
      yesterdayMoney: "",
      getTime1: {
        getStartTimeDate: "",
        getEndTimeDate: ""
      },
      getTime2: {
        getStartTimeDate: "",
        getEndTimeDate: ""
      },
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
      ]
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this.lightInfo();
    this.lightYesterDay();
  },
  methods: {
    lightInfo() {
      var that = this;
      https
        .fetchGet("/soil/light/info")
        .then(function(response) {
          var globalData = response.object;
          that.data = globalData.data.toFixed(2);
          that.money = globalData.money.toFixed(2);
          that.total = globalData.total;
          that.yesterday = globalData.yesterday;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 昨日
    lightYesterDay() {
      var that = this;
      https
        .fetchGet("/soil/light/yesterdayData")
        .then(function(response) {
          var globalData = response.object;
          that.yesterdayData = globalData.yesterdayData.toFixed(2);
          that.yesterdayMoney = globalData.yesterdayMoney.toFixed(2);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="stylus" scoped></style>
