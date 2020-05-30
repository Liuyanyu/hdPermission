<template>
  <div style="width: 99%;height:100vh;" class="bg">
    <div style="width:100%;height:50px;margin:20px">
      <el-button type="primary" @click="add1Visible = true" style="margin:10px">新建分区</el-button>
    </div>

    <div style="width:21%;float:left;margin-left:2%;margin-right:2%;">
      <el-card class="box-card" body-style="padding:0">
        <div slot="header" class="clearfix">
          <span>分区名称</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div
          v-for="item in districtList"
          :key="item.districtId"
          class="text item textInput"
          @click="getByDislist(item.districtId)"
          style="height:50px;padding-left:20px;padding-right:20px"
        >
          <el-input
            v-if="disableName == 1"
            placeholder="请输入内容"
            style="width: 55%;height:50px;line-height:50px"
            v-model="item.districtName"
            :disabled="true"
            @blur="updateDistrictList(item.districtId,item.districtName)"
          ></el-input>
          <el-input
            v-if="disableName == 0"
            placeholder="请输入内容"
            style="width: 55%;height:50px;line-height:50px"
            v-model="item.districtName"
            :disabled="false"
            @blur="updateDistrictList(item.districtId,item.districtName)"
          ></el-input>
          <div style="float:right;line-height:50px">
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              @click="addDisStr(item.districtId)"
            ></el-button>
            <el-button type="warning" icon="el-icon-edit" circle @click="editName()"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delDistrictList(item.districtId)"
            ></el-button>
            <!-- <img src="../assets/irr/update.png" alt style="margin-right: 10px;" @click="editName()" />
            <img src="../assets/irr/remove.png" alt @click="delDistrictList(item.districtId)" />-->
          </div>
        </div>
      </el-card>
    </div>
    <div style="width:67%;float:right;margin-left:2%;margin-right:5%;position:relative">
      <el-card class="box-card" body-style="padding:0">
        <div slot="header" class="clearfix">
          <p style="text-align:center;font-size:15px;">所有设备</p>
        </div>
        <div style="display:flex;flex-wrap:wrap;line-height:50px;padding:20px;">
          <div class="strFor" style="color:#E6A23C;" v-for="item in disList">
            <div>
              <span class>{{item.strategyName}}</span>
              <span class="right">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  circle
                  @click="editStr(item.strategyId,item.strategyName,item.startYtd,item.endYtd,item.statrHms,item.endHms,item.openTime,item.openInterval)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="delStrategy(item.strategyId)"
                ></el-button>
              </span>
            </div>
            <div>
              <span style="margin-right:50px">季节时间：{{item.startYtd}}——{{item.endYtd}}</span>
              <span>{{item.openInterval}}天/次</span>
            </div>
            <div>
              <span class>默认开启时间：{{item.statrHms}}</span>
              <span class="right">默认开启时长：{{item.openTime}} 分</span>
            </div>
            <div>
              <span class>默认关闭时间：{{item.endHms}}</span>
              <span class="right">
                <el-button type="danger" plain @click="openStrategy(item.strategyId)">开启</el-button>
                <el-button type="success" plain @click="closeStrategy(item.strategyId)">关闭</el-button>
              </span>
            </div>
          </div>
          <div class="strFor" style="color:#409EFF;" v-for="item in deviceBox">
            <div>
              <span class>{{item.strategyName}}</span>
              <span class="right">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  circle
                  @click="editStr(item.strategyId,item.strategyName,item.startYtd,item.endYtd,item.statrHms,item.endHms,item.openTime,item.openInterval)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="delStrategy(item.strategyId)"
                ></el-button>
              </span>
            </div>
            <div>
              <span style="margin-right:50px">季节时间：{{item.startYtd}}——{{item.endYtd}}</span>
              <span>{{item.openInterval}}天/次</span>
            </div>
            <div>
              <span class>默认开启时间：{{item.statrHms}}</span>
              <span class="right">默认开启时长：{{item.openTime}} 分</span>
            </div>
            <div>
              <span class>默认关闭时间：{{item.endHms}}</span>

              <span class="right">
                <el-button type="danger" plain @click="openStrategy(item.strategyId)">开启</el-button>
                <el-button type="success" plain @click="closeStrategy(item.strategyId)">关闭</el-button>
              </span>
            </div>
          </div>
        </div>
        <!-- <div>
          <div class="bottom clearfix block">
            <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
          </div>
        </div>-->
      </el-card>
    </div>
    <el-dialog title="新建分区" :visible.sync="add1Visible">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="分区名称" prop="name">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDistrict">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="当前区域新建策略" :visible.sync="addVisible" style="letter-spacing: 3px">
      <el-form label-width="80px">
        <el-form-item label="策略名称">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="季节时间">
          <el-col :span="11">
            <el-date-picker
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="startYtd"
              type="date"
              placeholder="选择季节开始日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-date-picker
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="endYtd"
              type="date"
              placeholder="选择季节结束日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="开启时间">
          <el-col :span="11">
            <el-date-picker
              value-format="HH:mm:ss"
              format="HH:mm:ss"
              v-model="startHms"
              type="datetime"
              placeholder="选择开启时间"
              style="width: 100%;"
              @change="changeTime"
            ></el-date-picker>
          </el-col>
          <el-col id="endLine" class="line" :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11" id="endTime">
            <el-input
              v-model="endHms"
              style="width: 100%;height:30px;border-radius:5px"
              placeholder="不可选择"
              disabled="true"
            ></el-input>
            <!-- <el-date-picker
              value-format="HH:mm:ss"
              format="HH:mm:ss"
              v-model="endHms"
              dis
              type="datetime"
              placeholder=""
              style="width: 100%;"
            ></el-date-picker>-->
          </el-col>
        </el-form-item>
        <el-form-item label="开启时长">
          <el-col :span="11">
            <el-input v-model="value4"></el-input>
            <!-- <el-date-picker v-model="value4" type="date" placeholder="选择关闭时间" style="width: 100%;"></el-date-picker> -->
          </el-col>
        </el-form-item>
        <el-form-item label="开启间隔">
          <el-col :span="11">
            <el-input v-model="interval"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addStrategy">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改策略 -->
    <el-dialog title="修改当前策略" :visible.sync="editVisible">
      <el-form label-width="80px" :data="editCon">
        <el-form-item label="策略名称">
          <el-input v-model="editCon.strategyName"></el-input>
        </el-form-item>
        <el-form-item label="季节时间">
          <el-col :span="11">
            <el-date-picker
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="editCon.startYtd"
              type="date"
              placeholder="选择季节开始日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-date-picker
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="editCon.endYtd"
              type="date"
              placeholder="选择季节结束日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="开启时间">
          <el-col :span="11">
            <el-date-picker
              value-format="HH:mm:ss"
              format="HH:mm:ss"
              v-model="editCon.startHms"
              type="datetime"
              placeholder="选择开启时间"
              style="width: 100%;"
              @change="changeTime"
            ></el-date-picker>
          </el-col>
          <el-col id="endLine" class="line" :span="2" style="text-align: center;display:none">-</el-col>
          <el-col :span="11" style="display:none" id="endTime">
            <el-date-picker
              value-format="HH:mm:ss"
              format="HH:mm:ss"
              v-model="editCon.endHms"
              type="datetime"
              placeholder="选择关闭时间"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="开启时长">
          <el-col :span="11">
            <el-input v-model="editCon.openTime"></el-input>
            <!-- <el-date-picker v-model="value4" type="date" placeholder="选择关闭时间" style="width: 100%;"></el-date-picker> -->
          </el-col>
        </el-form-item>
        <el-form-item label="开启间隔">
          <el-col :span="11">
            <el-input v-model="editCon.openInterval"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editStrategy">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import https from "@/https.js";
export default {
  data() {
    return {
      addVisible: false,
      add1Visible: false,
      disableName: 1,
      editVisible: false,
      groupName: [
        { value: 1, label: "高地势区域" },
        { value: 1, label: "低地势区域" },
        { value: 1, label: "智能灌溉区域" }
      ],
      deviceBox: [],
      disList: [],
      districtList: [],
      name: "",
      value: "",
      startYtd: "",
      endYtd: "",
      startHms: "",
      endHms: "",
      value4: "30",
      interval: "",
      options: [{ value: "1", label: "开启" }, { value: "2", label: "关闭" }],
      districtId: "",
      quId: "",
      editCon: []
    };
  },
  created() {
    this.getDistrictList();
    this.getAllStrategy();
  },
  computed: {},
  mounted() {},
  methods: {
    // 查询所有分区
    getDistrictList() {
      var that = this;
      https
        .fetchGet("/soil/district/list")
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.districtList = res.object.list;
            that.groupName = that.districtList.map(item => item.districtName);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 添加一个分区
    addDistrict() {
      var that = this;
      https
        .fetchPost("/soil/district/add?districtName=" + that.name)
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.add1Visible = false;
            that.getDistrictList();
            that.$message(res.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 删除一个分区
    delDistrictList(id) {
      var that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          https
            .fetchPost("/soil/district/del?districtId=" + id)
            .then(function(res) {
              console.log(res);
              if (res.code == "00") {
                that.$message({
                  type: "success",
                  message: "删除成功!"
                });
                that.getDistrictList();
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改一个分区
    updateDistrictList(id, name) {
      console.log(id, name);
      var that = this;
      https
        .fetchPost(
          "/soil/district/update?districtName=" + name + "&districtId=" + id
        )
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.$message(res.msg);
            that.disableName = 1;
            that.$message(res.msg);
          }
        })
        .catch(function(res) {
          console.log(res);
        });
    },
    editName() {
      this.disableName = 0;
    },
    submit() {
      this.tableDataLeft.push(this.name);
      this.dialogVisible = false;
    },
    // 查询所有灌溉策略
    getAllStrategy() {
      var that = this;
      https
        .fetchPost("/soil/strategy/list")
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.deviceBox = res.object.list;
            console.log(that.deviceBox);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 查询某个分区的策略
    getByDislist(id) {
      var that = this;
      that.quId = id;
      console.log(id);
      https
        .fetchPost("/soil/strategy/ByDislist?districtId=" + id)
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.disList = res.object.list;
            console.log(that.disList);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addDisStr(id) {
      this.districtId = id;
      this.addVisible = true;
    },
    // 获取时间
    changeTime() {
      // document.getElementById("endLine").style.display = "block";
      // document.getElementById("endTime").style.display = "block";
      var that = this;
      console.log(that.districtId);
      console.log(that.startHms);
      console.log(that.value4);
      https
        .fetchPost(
          "/soil/strategy/getTime?districtId=" +
            that.districtId +
            "&startH=" +
            that.startHms +
            "&openTime=" +
            that.value4
        )
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.endHms = res.object.time;
            console.log(that.endHms);
            // that.$message(res.msg);
            // that.getByDislist();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 添加灌溉策略
    addStrategy() {
      console.log(this.name);
      console.log(this.startYtd);
      console.log(this.endYtd);
      console.log(this.startHms);
      console.log(this.endHms);
      console.log(this.districtId);
      document.getElementById("endLine").style.display = "block";
      document.getElementById("endTime").style.display = "block";
      var that = this;
      https
        .fetchPost(
          "/soil/strategy/add?strategyName=" +
            that.name +
            "&startYtd=" +
            that.startYtd +
            "&endYtd=" +
            that.endYtd +
            "&startHms=" +
            that.startHms +
            "&endHms=" +
            that.endHms +
            "&districtId=" +
            that.districtId +
            "&openInterval=" +
            that.interval
        )
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.addVisible = false;
            that.$message(res.msg);
            that.getByDislist(that.quId);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 删除策略
    delStrategy(id) {
      console.log(id);
      var that = this;
      https
        .fetchPost("/soil/strategy/del?strategyId=" + id)
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.$message(res.msg);
            that.getByDislist(that.quId);
            that.getAllStrategy();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 开启设定好的策略
    openStrategy(id) {
      var that = this;
      console.log(id);
      https
        .fetchPost("/soil/strategy/open?strategyId=" + id)
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.$message(res.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 关闭设定好的策略
    closeStrategy(id) {
      var that = this;
      console.log(id);
      https
        .fetchPost("/soil/strategy/close?strategyId=" + id)
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.$message(res.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    editStr(
      id,
      name,
      startYtd,
      endYtd,
      statrHms,
      endHms,
      openTime,
      openInterval
    ) {
      this.editCon = {
        strategyId: id,
        strategyName: name,
        startYtd: startYtd,
        endYtd: endYtd,
        startHms: statrHms,
        endHms: endHms,
        openTime: openTime,
        openInterval: openInterval
      };
      console.log(this.editCon);
      this.editVisible = true;
    },
    editStrategy() {
      var that = this;
      var qs = require("qs");
      var params = {
        strategyId: that.editCon.strategyId,
        strategyName: that.editCon.strategyName,
        startYtd: that.editCon.startYtd,
        endYtd: that.editCon.endYtd,
        startHms: that.editCon.startHms,
        endHms: that.editCon.endHms,
        openTime: that.editCon.openTime,
        openInterval: that.editCon.openInterval
      };
      https
        .fetchPost("/soil/strategy/update", qs.stringify(params))
        .then(function(res) {
          console.log(res);
          that.editVisible = false;
          that.getAllStrategy();
          that.getByDislist(that.quId);
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
.textInput:hover {
  background-color: #b3d8ff;
}
.block {
  position: absolute;
  width: 32%;
  margin-left: 34%;
  bottom: 10px;
}
.leftAside::-webkit-scrollbar {
  display: none;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.box-card {
  // width: 480px;
  height: 70vh;
  overflow-y: scroll;
}
// >>>.el-card__body{
//   padding: 0;
// }
.box-card::-webkit-scrollbar {
  display: none;
}
>>> .el-dialog {
  position: relative;
  margin: 0 auto 50px;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 30%;
  margin-top: 20vh !important;
}
.strFor {
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
}
</style>
