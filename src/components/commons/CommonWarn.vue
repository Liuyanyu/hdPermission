<template>
  <div style="padding: 20px;" class="container">
    <el-tabs
      v-model="activeName"
      @tab-click="handleWarnClick"
      style="height:60vh"
    >
      <el-tab-pane
        label="全部"
        name="all"
        style="color:#ffffff;margin-left:10px"
      >
        <el-select v-model="value1" placeholder="设备选择" class="xuan">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="warnLogStatus" placeholder="状态选择" class="xuan">
          <el-option
            v-for="item in options1"
            :key="item.warnLogStatus"
            :label="item.name"
            :value="item.warnLogStatus"
          ></el-option>
        </el-select>
        <el-date-picker
          class="timePicker"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          v-model="startYtd1"
          type="date"
          placeholder="选择日期"
          style="width:14%"
        ></el-date-picker>
        <el-date-picker
          class="timePicker"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          v-model="endYtd1"
          type="date"
          placeholder="选择日期"
          style="width:14%"
        ></el-date-picker>
        <el-button
          type="primary"
          style=" margin-right: 7px"
          @click="warnDemand1"
          >查询</el-button
        >
        <span class="leiji">累计告警次数:0</span>
        <span style="margin-right:2%;" class="leiji">今日告警次数:0</span>
        <!-- <el-button
          type="danger"
          icon="el-icon-close"
          circle
          @click="closeWarnBox"
        ></el-button> -->
        <div class="main" style="height:72vh;overflow-y: scroll;margin-top:2vh">
          <div class="aside" v-for="item in allLog">
            <div class="warnTit">
              <div class="box1">
                <el-button
                  type="primary"
                  plain
                  v-if="item.warnLogStatus == 3 || item.warnLogStatus == 4"
                  style="margin-right: 20px;"
                  >人工处理</el-button
                >
                <el-button
                  type="success"
                  plain
                  v-if="item.warnLogStatus == 2"
                  style="margin-right: 20px;"
                  >自动处理</el-button
                >
                <el-button
                  type="danger"
                  plain
                  v-if="item.warnLogStatus == 1"
                  style="margin-right: 20px;"
                  >未处理</el-button
                >
                <span style="color:#E17014">{{ item.deviceName }}</span>
                <span
                  class="right"
                  v-if="item.warnLogStatus == 3"
                  style="color:#0E8B28"
                  >已完成</span
                >
                <span
                  class="right"
                  v-if="item.warnLogStatus == 4"
                  style="color:#FC7C15"
                  >正在进行</span
                >
              </div>
              <div style="color:#C0C1C1">
                <el-row :gutter="20">
                  <el-col :span="14">告警原因及建议：{{ item.remark }}</el-col>
                  <el-col :span="4" style="text-align: right;"
                    >负责人：{{ item.disposePeople }}</el-col
                  >
                  <el-col :span="6" style="text-align: right;">{{
                    item.warnLogCreateTime
                  }}</el-col>
                </el-row>
              </div>
              <div style="color:#15C8DB">
                <el-row :gutter="20">
                  <el-col :span="6"
                    >提示时间：{{ item.warnLogCreateTime }}</el-col
                  >
                  <el-col :span="6">结束时间：{{ item.disposeTime }}</el-col>
                  <el-col :span="6" style="text-align: right;"
                    >响应时间：{{ item.TimeDifference }}</el-col
                  >
                  <el-col :span="6" style="text-align: right;"
                    >持续时间：{{ item.TimeDifference }}</el-col
                  >
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="人工处理" name="labour">
        <el-select v-model="value1" placeholder="设备选择" class="xuan">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="warnLogStatus" placeholder="状态选择" class="xuan">
          <el-option
            v-for="item in options1"
            :key="item.warnLogStatus"
            :label="item.name"
            :value="item.warnLogStatus"
          ></el-option>
        </el-select>
        <el-date-picker
          class="timePicker"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          v-model="startYtd1"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <el-date-picker
          class="timePicker"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          v-model="endYtd1"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <el-button
          type="primary"
          style=" margin-right: 7px"
          @click="warnDemand1"
          >查询</el-button
        >
        <span class="leiji">累计告警次数:0</span>
        <span style="margin-right:2%;" class="leiji">今日告警次数:0</span>
        <!-- <el-button
          type="danger"
          icon="el-icon-close"
          circle
          @click="closeWarnBox"
        ></el-button> -->
        <div class="main" style="height: 72vh;overflow-y: scroll;">
          <div class="aside" v-for="item in labourLog">
            <div class="warnTit">
              <div class="box1">
                <el-button
                  type="primary"
                  plain
                  v-if="item.warnLogStatus == 3 || item.warnLogStatus == 4"
                  style="margin-right: 20px;"
                  >人工处理</el-button
                >
                <el-button
                  type="success"
                  plain
                  v-if="item.warnLogStatus == 2"
                  style="margin-right: 20px;"
                  >自动处理</el-button
                >
                <el-button
                  type="danger"
                  plain
                  v-if="item.warnLogStatus == 1"
                  style="margin-right: 20px;"
                  >未处理</el-button
                >
                <span style="color:#E17014">{{ item.deviceName }}</span>
                <span
                  class="right"
                  v-if="item.warnLogStatus == 3"
                  style="color:#0E8B28"
                  >已完成</span
                >
                <span
                  class="right"
                  v-if="item.warnLogStatus == 4"
                  style="color:#FC7C15"
                  >正在进行</span
                >
              </div>
              <div style="color:#C0C1C1">
                <el-row :gutter="20">
                  <el-col :span="14">告警原因及建议：{{ item.remark }}</el-col>
                  <el-col :span="4" style="text-align: right;"
                    >负责人：{{ item.disposePeople }}</el-col
                  >
                  <el-col :span="6" style="text-align: right;">{{
                    item.warnLogCreateTime
                  }}</el-col>
                </el-row>
              </div>
              <div style="color:#15C8DB">
                <el-row :gutter="20">
                  <el-col :span="6"
                    >提示时间：{{ item.warnLogCreateTime }}</el-col
                  >
                  <el-col :span="6">结束时间：{{ item.disposeTime }}</el-col>
                  <el-col :span="6" style="text-align: right;"
                    >响应时间：{{ item.TimeDifference }}</el-col
                  >
                  <el-col :span="6" style="text-align: right;"
                    >持续时间：{{ item.TimeDifference }}</el-col
                  >
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="自动处理" name="self">
        <el-select v-model="value1" placeholder="设备选择" class="xuan">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- <el-select v-model="warnLogStatus" placeholder="状态选择" class="xuan">
          <el-option
            v-for="item in options1"
            :key="item.warnLogStatus"
            :label="item.name"
            :value="item.warnLogStatus"
          ></el-option>
        </el-select> -->
        <el-date-picker
          class="timePicker"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          v-model="startYtd1"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <el-date-picker
          class="timePicker"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          v-model="endYtd1"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <el-button
          type="primary"
          style=" margin-right: 7px"
          @click="warnDemand1"
          >查询</el-button
        >
        <span class="leiji">累计告警次数:0</span>
        <span style="margin-right:2%;" class="leiji">今日告警次数:0</span>
        <!-- <el-button
          type="danger"
          icon="el-icon-close"
          circle
          @click="closeWarnBox"
        ></el-button> -->
        <div class="main" style="height: 72vh;overflow-y: scroll;">
          <div class="aside" v-for="item in selfLog">
            <div class="warnTit">
              <div class="box1">
                <el-button
                  type="primary"
                  plain
                  v-if="item.warnLogStatus == 3 || item.warnLogStatus == 4"
                  style="margin-right: 20px;"
                  >人工处理</el-button
                >
                <el-button
                  type="success"
                  plain
                  v-if="item.warnLogStatus == 2"
                  style="margin-right: 20px;"
                  >自动处理</el-button
                >
                <el-button
                  type="danger"
                  plain
                  v-if="item.warnLogStatus == 1"
                  style="margin-right: 20px;"
                  >未处理</el-button
                >
                <span style="color:#E17014">{{ item.deviceName }}</span>
                <span
                  class="right"
                  v-if="item.warnLogStatus == 3"
                  style="color:#0E8B28"
                  >已完成</span
                >
                <span
                  class="right"
                  v-if="item.warnLogStatus == 4"
                  style="color:#FC7C15"
                  >正在进行</span
                >
              </div>
              <div style="color:#C0C1C1">
                <el-row :gutter="20">
                  <el-col :span="14">告警原因及建议：{{ item.remark }}</el-col>
                  <el-col :span="4" style="text-align: right;"
                    >负责人：{{ item.disposePeople }}</el-col
                  >
                  <el-col :span="6" style="text-align: right;">{{
                    item.warnLogCreateTime
                  }}</el-col>
                </el-row>
              </div>
              <div style="color:#15C8DB">
                <el-row :gutter="20">
                  <el-col :span="6"
                    >提示时间：{{ item.warnLogCreateTime }}</el-col
                  >
                  <el-col :span="6">结束时间：{{ item.disposeTime }}</el-col>
                  <el-col :span="6" style="text-align: right;"
                    >响应时间：{{ item.TimeDifference }}</el-col
                  >
                  <el-col :span="6" style="text-align: right;"
                    >持续时间：{{ item.TimeDifference }}</el-col
                  >
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="未处理" name="not">
        <el-select v-model="value1" placeholder="设备选择" class="xuan">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- <el-select v-model="warnLogStatus" placeholder="状态选择" class="xuan">
          <el-option
            v-for="item in options1"
            :key="item.warnLogStatus"
            :label="item.name"
            :value="item.warnLogStatus"
          ></el-option>
        </el-select> -->
        <el-date-picker
          class="timePicker"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          v-model="startYtd1"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <el-date-picker
          class="timePicker"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          v-model="endYtd1"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <el-button
          type="primary"
          style=" margin-right: 7px"
          @click="warnDemand1"
          >查询</el-button
        >
        <span class="leiji">累计告警次数:0</span>
        <span style="margin-right:2%;" class="leiji">今日告警次数:0</span>
        <!-- <el-button
          type="danger"
          icon="el-icon-close"
          circle
          @click="closeWarnBox"
        ></el-button> -->
        <div class="main" style="height: 72vh;overflow-y: scroll;">
          <div class="aside" v-for="item in notLog">
            <div class="warnTit">
              <div class="box1">
                <el-button
                  type="primary"
                  plain
                  v-if="item.warnLogStatus == 3 || item.warnLogStatus == 4"
                  style="margin-right: 20px;"
                  >人工处理</el-button
                >
                <el-button
                  type="success"
                  plain
                  v-if="item.warnLogStatus == 2"
                  style="margin-right: 20px;"
                  >自动处理</el-button
                >
                <el-button
                  type="danger"
                  plain
                  v-if="item.warnLogStatus == 1"
                  style="margin-right: 20px;"
                  >未处理</el-button
                >
                <span style="color:#E17014">{{ item.deviceName }}</span>
                <el-button type="primary" plain class="right">未处理</el-button>
              </div>
              <div style="color:#C0C1C1">
                <el-row :gutter="20">
                  <el-col :span="14">告警原因及建议：{{ item.remark }}</el-col>
                  <!-- <el-col :span="4" style="text-align: right;">负责人：{{item.disposePeople}}</el-col> -->
                  <!-- <el-col :span="6" style="text-align: right;">{{item.warnLogCreateTime}}</el-col> -->
                </el-row>
              </div>
              <div style="color:#15C8DB">
                <el-row :gutter="20">
                  <el-col :span="7"
                    >提示时间：{{ item.warnLogCreateTime }}</el-col
                  >
                  <el-button
                    type="primary"
                    plain
                    class="right"
                    @click="dispose(item.warnLogId)"
                    >去处理</el-button
                  >
                  <!-- <el-col :span="7">结束时间：{{item.disposeTime}}</el-col>
                  <el-col :span="5" style="text-align: right;">响应时间：{{item.TimeDifference}}</el-col>
                  <el-col :span="5" style="text-align: right;">持续时间：{{item.TimeDifference}}</el-col>-->
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import https from "@/https.js";
export default {
  data() {
    return {
      options: [],
      value1: "",
      options1: [
        { warnLogStatus: 3, name: "已完成" },
        { warnLogStatus: 4, name: "正在进行" }
      ],
      warnLogStatus: "",
      startYtd1: "",
      endYtd1: "",
      allLog: [],
      labourLog: [],
      selfLog: [],
      notLog: [],
      activeName: "not",
      warnData: []
    };
  },
  created() {
    console.log(this.$route.query);
    var that = this;
    var data = that.$route.query.data;
    var warnData = Object.values(data);
    console.log(that.$route.query.options);
    // array: point.map(item => item.deviceIntro)
    that.options = that.$route.query.options;
    that.allLog = data;
    console.log(typeof data);
    for (var i = 0; i < warnData.length; i++) {
      console.log("111111");
      if (warnData[i].warnLogStatus == 1) {
        that.notLog.push({ ...warnData[i] });
      } else if (warnData[i].warnLogStatus == 2) {
        that.selfLog.push({ ...warnData[i] });
        console.log(that.selfLog);
      } else if (
        warnData[i].warnLogStatus == 3 ||
        warnData[i].warnLogStatus == 4
      ) {
        that.labourLog.push(warnData[i]);
        console.log(that.labourLog);
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {
    handleWarnClick(tab) {
      console.log(tab);
      console.log(tab.index);
      console.log(typeof tab);
      this.tabId = tab.index;
    },
    warnDemand1() {
      console.log(11111);
      var that = this;
      if (that.tabId == 0) {
        https
          .fetchGet(
            "/soil/warn/logList?deviceId=" +
              that.value1 +
              "&startTime=" +
              that.startYtd1 +
              "&endTime=" +
              that.endYtd1 +
              "&warnLogStatus=" +
              that.warnLogStatus
          )
          .then(function(res) {
            console.log(res);
            that.allLog = res.object.list.list;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (that.tabId == 1) {
        https
          .fetchGet(
            "/soil/warn/logList?deviceId=" +
              that.value1 +
              "&startTime=" +
              that.startYtd1 +
              "&endTime=" +
              that.endYtd1 +
              "&warnLogStatus=" +
              3
          )
          .then(function(res) {
            console.log(res);
            that.labourLog = res.object.list.list;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (that.tabId == 2) {
        https
          .fetchGet(
            "/soil/warn/logList?deviceId=" +
              that.value1 +
              "&startTime=" +
              that.startYtd1 +
              "&endTime=" +
              that.endYtd1 +
              "&warnLogStatus=" +
              1
          )
          .then(function(res) {
            console.log(res);
            that.selfLog = res.object.list.list;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (that.tabId == 3) {
        https
          .fetchGet(
            "/soil/warn/logList?deviceId=" +
              that.value1 +
              "&startTime=" +
              that.startYtd1 +
              "&endTime=" +
              that.endYtd1 +
              "&warnLogStatus=" +
              1
          )
          .then(function(res) {
            console.log(res);
            that.notLog = res.object.list.list;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    closeWarnBox() {
      console.log("1111");
      document.getElementById("warnPanel").style.display = "none";
    },
    dispose(warnLogId) {
      var that = this;
      var sessId = window.localStorage.getItem("sessionId");
      console.log(sessId);
      https
        .fetchGet(
          "/soil/warn/disposal?warnLogId=" + warnLogId + "&sessionId=" + sessId
        )
        .then(function(res) {
          console.log(res);
          that.$message(res.msg);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  width: 80%;
  margin-left: 10%;
  margin-top: 30px;
}
.closeWarnBox {
  display: inline;
  float: right;
  right: 10px;
  position: absolute;
}
.timePicker {
  width: 18% !important;
  margin-right: 1%;
}

.leiji {
  line-height: 40px;
  font-size: 15px;
  width: 13% !important;
  display: inline-block;
  text-align: right;
  color: #000000;
}

.warnTit {
  width: 93%;
  box-shadow: 0 2px 6px 0 #eeeeee;
  padding: 20px;
  line-height: 30px;
  font-size: 13px;
  margin-top: 20px;
  margin-left: 1%;
}

.box1 {
  height: 40px;
}
.main::-webkit-scrollbar {
  display: none;
}
>>> .timePicker[data-v-775895c8] {
  width: 14% !important;
}
.xuan {
  width: 12%;
  margin-right: 1%;
  margin-left: 1%;
}
</style>
