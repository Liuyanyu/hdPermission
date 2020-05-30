<template>
  <div class="electricity__wrapper">
    <div class="water">
      <div class="waterMonitor">
        <div class="asideBg comTop">
          <span class="waterMonitorTit">用电感知</span>
          <span class="right">water monitoring</span>
        </div>
      </div>
      <div class="electricity-show-img">
        <div class="img-item">
          <div class="circle__wrapper">
            <div class="value" style="color:#00FFFF">{{ enerTotal }}</div>
            <div class="unit" style="color:#00FFFF">kw/h</div>
          </div>
          <div style="text-align:center;margin-top:4px;color:#00FFFF">
            总耗电量
          </div>
        </div>
        <div class="img-item">
          <div class="circle__wrapper">
            <div class="value" style="color:#00FFFF">
              {{ eneryYesterday }}
            </div>
            <div class="unit" style="color:#00FFFF">kw/h</div>
          </div>
          <div style="text-align:center;margin-top:4px;color:#00FFFF">
            昨日用电
          </div>
        </div>
        <div class="img-item">
          <div class="circle__wrapper">
            <div class="value" style="color:#00FFFF">
              {{ enerData }}
            </div>
            <div class="unit" style="color:#00FFFF">kw/h</div>
          </div>
          <div style="text-align:center;margin-top:4px;color:#00FFFF">
            节省电量
          </div>
        </div>
        <div class="img-item">
          <div class="circle__wrapper1">
            <div class="value" style="color:#FFAE11">
              {{ enerMoney }}
            </div>
            <div class="unit" style="color:#FFAE11">万元</div>
          </div>
          <div style="text-align:center;margin-top:4px;color:#FFAE11">
            节省金额
          </div>
        </div>
      </div>
      <div style="margin-top:10px">
        <span class="warnTit">昨日节省电量</span>
        <span class="right">
          <span class="warnValue1 unitVal">{{ yesterdayData }}</span>
          <span class="unitEle">kw/h</span>
        </span>
      </div>
      <div style="margin-top:10px">
        <span class="warnTit">昨日节省金额</span>
        <span class="right">
          <span class="warnValue1 unitVal">{{ yesterdayMoney }}</span>
          <span class="unitEle">kw/h</span>
        </span>
      </div>
      <div class="waterAlarm">
        <div class="asideBg1" style="margin-top:10px">
          <span class="waterMonitorTit">各项电量使用情况</span>
          <span class="right">water alarm record</span>
        </div>
        <img :src="PointsSectionBar" alt="" />
        <div class="comTop">
          <div class="percent">
            <span>智能灌溉区</span>
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
            <span>普通灌溉区</span>
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
        <div class="asideBg1 comTop">
          <span class="waterMonitorTit">用电趋势</span>
          <span class="right">water monitoring</span>
        </div>
        <img :src="PointsSectionBar" alt="" />
      </div>

      <div>
        <div class="comTop">
          <span class="monitorPoint">间隔选择</span>
          <select name="sel">
            <option value="1">广州</option>
            <option value="2">深圳</option>
            <option value="3">山东</option>
            <option value="4">北京</option>
          </select>
          <!-- <input type="submit" value="查询"> -->
          <button class="pointLeft monitorPoint" style="width:19.5%">
            查询
          </button>
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
export default {
  name: "",
  components: {},
  directives: {},
  mixins: [],
  props: {},
  data() {
    return {
      PointsSectionBar,
      enerData: "",
      enerMoney: "",
      enerTotal: "",
      enerTesterday: "",
      yesterdayData: "",
      yesterdayMoney: ""
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    var that = this;
    that.waterLeftList();
    that.lightYesterDay();
  },
  methods: {
    waterLeftList() {
      var that = this;
      let param = {
        type: 2
      };
      https
        .fetchGet("soil/energy/list", param)
        .then(function(response) {
          console.log(response);
          var energyData = response.object;
          that.enerData = energyData.data;
          that.enerMoney = energyData.money;
          that.enerTotal = energyData.total;
          that.eneryYesterday = energyData.yesterday;
        })
        .catch(function() {});
    },
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
