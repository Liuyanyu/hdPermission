<template>
  <div style="width: 99%;height:100vh;" class="bg">
    <div style="width:100%;height:50px;margin:20px">
      <el-button type="primary" @click="addVisible = true" style="margin:10px">新建分区</el-button>
    </div>

    <div style class="leftPanel">
      <el-card class="box-card" body-style="padding:0">
        <div slot="header" class="clearfix">
          <span>分区名称</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div
          v-for="item in districtList"
          :key="item.districtId"
          class="text item textInput"
          @click="getRelList(item.districtId)"
          style="height:50px;padding-left:20px;padding-right:20px"
        >
          <el-input
          v-if="disableName == 1"
            placeholder="请输入内容"
            style="width: 60%;height:50px;line-height:50px"
            v-model="item.districtName"
            :disabled="true"
            @blur="updateDistrictList(item.districtId,item.districtName)"
          ></el-input>
          <el-input
           v-if="disableName == 0"
            placeholder="请输入内容"
            style="width: 60%;height:50px;line-height:50px"
            v-model="item.districtName"
            :disabled="false"
            @blur="updateDistrictList(item.districtId,item.districtName)"
          ></el-input>

          <div style="float:right;line-height:50px">
            <!-- <el-button type="primary" icon="el-icon-plus" circle @click="addRel(item.districtId)"></el-button> -->
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
    <div style class="rightPanel">
      <el-card class="box-card" body-style="padding:0">
        <div slot="header" class="clearfix">
          <p style="text-align:center;font-size:15px;">所有设备</p>
        </div>
        <div class="rightAside">
          <!-- 分区下的组 -->
          <div class="asideCon" style="color:#E6A23C" v-for="item in relList">
            <div class="groupTitBox">
              <!-- <el-checkbox-group v-model="checkedgroup"  @change="changeGroup" style="width:100%" > 
                <el-checkbox style="color:#E6A23C;" v-for="item in relList" :label="item" :key="item.deviceId" >{{item.groupName}}</el-checkbox> 
              </el-checkbox-group>-->
              <span class="titCon">{{item.groupName}}</span>
              <el-button
                class="titBtn"
                type="primary"
                icon="el-icon-minus"
                circle
                @click="delRel(item.relationId)"
              ></el-button>
            </div>
            <div class="groupTit">
              <div class="groupConFor">
                <div class="groupCheckBox">
                  <el-checkbox-group
                    v-model="checkedgroup"
                    @change="changeGroup"
                    style="width:100%"
                  >
                    <el-checkbox
                      style="color:#E6A23C;"
                      v-for="item in deviceName"
                      :label="item"
                      :key="item.deviceId"
                    >{{item.deviceName}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
            <!-- <div>
              <el-button
                style="float:right;margin-top:10px;margin-right:10px"
                type="primary"
                icon="el-icon-plus"
                circle
              ></el-button>
            </div>-->
          </div>
          <!-- 没有被分区的组 -->
          <div class="asideCon" style="color:#409EFF;" v-for="item in filtList">
            <p class="groupTitBox">
              <span class="titCon">{{item.groupName}}</span>
              <el-button
                type="primary"
                icon="el-icon-plus"
                circle
                class="titBtn"
                @click="addRel(item.groupId)"
              ></el-button>
              <!-- <el-button
                class="titBtn"
                type="primary"
                icon="el-icon-minus"
                circle
                @click="delRel(item.relationId)"
              ></el-button>-->
            </p>
            <div class="groupTit">
              <div v-for class="groupConFor">
                <div class="groupCheckBox">
                  <el-checkbox-group v-model="changedFilt" @change="changeFilt" style="width:100%">
                    <el-checkbox
                      style="color:#409EFF;"
                      v-for="item in filtListDevice"
                      :label="item"
                      :key="item.deviceId"
                    >{{item.deviceName}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
            <!-- <div>
              <el-button
                style="float:right;margin-top:10px;margin-right:10px"
                type="primary"
                icon="el-icon-plus"
                circle
              ></el-button>
            </div>-->
          </div>
          <!-- 其他被分区的组 -->
          <div class="asideCon" style="color:#909291;" v-for="item in otherList">
            <p class="groupTitBox">
              <span class="titCon">{{item.groupName}}</span>
              <el-button
                class="titBtn"
                type="primary"
                icon="el-icon-minus"
                circle
                @click="delRel(item.relationId)"
              ></el-button>
            </p>
            <div class="groupTit">
              <div v-for class="groupConFor">
                <div class="groupCheckBox">
                  <el-checkbox-group v-model="changedAll" style="width:100%">
                    <el-checkbox
                      style="color:#909291;"
                      v-for="item in allList"
                      :label="item"
                      :key="item.deviceId"
                    >{{item.deviceName}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
            <!-- <div>
              <el-button
                style="float:right;margin-top:10px;margin-right:10px"
                type="primary"
                icon="el-icon-plus"
                circle
              ></el-button>
            </div>-->
          </div>
        </div>
        <div>
          <!-- <div class="btn bottom clearfix">
            <el-button type="primary" plain>确定</el-button>
            <el-button type="danger" plain>取消</el-button>
          </div>-->
          <!-- <div class="block">
            <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
          </div>-->
        </div>
      </el-card>
    </div>
    <el-dialog title="新建分区" :visible.sync="addVisible">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="分区名称" prop="name">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDistrict">提交</el-button>
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
      name: "",
      newName: "",
      newId: "",
      districtList: [],
      disableName: 1,
      groupName: [],
      deviceBox: [],
      districtId: "",
      deviceName: [],
      checkedgroup: [],
      relList: [],
      filtList: [],
      filtListDevice: [],
      changedFilt: [],
      changedAll: [],
      allList: [],
      quId: "",
      otherList:[]
    };
  },
  created() {
    this.getDistrictList();
    this.getFiltList();
    this.getFiltrationList();
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
            that.addVisible = false;
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
    // 查询分区下的组及水表 其他被分区的组及水表
    getRelList(id) {
      var that = this;
      that.quId = id;
      console.log(id);
      console.log(that.quId);
      https
        .fetchGet("/soil/districtRel/list?districtId=" + id)
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            console.log(res);
            that.relList = res.object.list;
            for (var i = 0; i < that.relList.length; i++) {
              https
                .fetchGet(
                  "/soil/grouprel/list?groupId=" + that.relList[i].groupId
                )
                .then(function(res) {
                  console.log(res);
                  if (res.code == "00") {
                    that.deviceName = res.object.list;
                    // that.checkedgroup = that.deviceName;
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      https
        .fetchGet("/soil/watergroup/groupList?districtId=" + id)
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            console.log(res);
            that.otherList = res.object.list;
            for (var i = 0; i < that.otherList.length; i++) {
              https
                // .fetchGet(
                //   "/soil/waterDevice/grouplist?groupId="+that.otherList[i].groupId
                // )
                .fetchGet(
                  "/soil/grouprel/list?groupId=" + that.otherList[i].groupId
                )
                .then(function(res) {
                  console.log(res);
                  if (res.code == "00") {
                    that.allList = res.object.list;
                    // that.checkedgroup = that.deviceName;
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeGroup(value) {
      console.log(value);
    },
    // 向分区里添加一个组
    addRel(id) {
      var that = this;
      console.log(that.quId);
      this.$confirm("確定添加, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          https
            .fetchPost(
              "/soil/districtRel/add?districtId=" + that.quId + "&groupId=" + id
            )
            .then(function(res) {
              console.log(res);
              that.getFiltList();
              that.getFiltrationList();
              that.$message(res.msg);
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
    // addNewDistrict() {
    //   var that = this;
    //   https
    //     .fetchPost(
    //       "/soil/districtRel/add?districtId=" +
    //         that.districtId +
    //         "&groupId=" +
    //         that.groupId
    //     )
    //     .then(function(res) {
    //       console.log(res);
    //       that.getRelList(that.districtId);
    //       that.$message(res.msg);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
    // 删除分区里的一个组
    delRel(id) {
      console.log(id);
      var that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          https
            .fetchPost("/soil/districtRel/del?relationId=" + id)
            .then(function(res) {
              console.log(res);
              if (res.code == "00") {
                that.getRelList(that.quId);
                that.getFiltList();
                that.getFiltrationList();
                that.$message({
                  type: "success",
                  message: "删除成功!"
                });
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
    // 未被分区的组
    getFiltList() {
      var that = this;
      https
        .fetchGet("/soil/watergroup/filtrationList")
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            console.log(res);
            that.filtList = res.object.list;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 未被分区组的水表
    getFiltrationList() {
      var that = this;
      https
        .fetchGet("/soil/waterDevice/filtrationList")
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.filtListDevice = res.object.list;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeFilt(value) {
      console.log(value);
    }
  }
};
</script>

<style scoped lang="scss">
.textInput:hover {
  background-color: #b3d8ff;
}
.leftBg {
  //   background-image: url("../assets/irr/leftBg.png");
  //   background-repeat: repeat-y;
  width: 19%;
  float: left;
  margin-left: 2%;
  margin-right: 2%;
  border: 1px solid;
}
.rightBg {
  //   background-image: url("../assets/irr/rightBg.png");
  //   background-repeat: repeat-x;

  width: 70%;
  float: right;
  margin-left: 2%;
  margin-right: 5%;
  border: 1px solid;
  height: 65vh;
  position: relative;
}
.btn {
  position: absolute;
  bottom: 30px;
  text-align: center;
  margin-left: 44%;
  width: 12%;
}
.block {
  position: absolute;
  width: 32%;
  margin-left: 34%;
  bottom: 70px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.leftAside::-webkit-scrollbar {
  // display: none;
}
.box-card {
  // width: 480px;
  height: 60vh;
  overflow-y: scroll;
}
.box-card::-webkit-scrollbar {
  // display: none;
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
.leftPanel {
  width: 19%;
  float: left;
  margin-left: 2%;
  margin-right: 2%;
}
.rightPanel {
  width: 70%;
  float: right;
  margin-left: 2%;
  margin-right: 5%;
  position: relative;
}
.rightAside {
  display: flex;
  flex-wrap: wrap;
  line-height: 50px;
  padding: 20px;
  padding-top: 0;
}
.asideCon {
  width: 100%;
  // height: 200px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
}
.groupTitBox {
  background-color: #eeeeee;
  padding: 10px;
  height: 20px;
}
.titCon {
  float: left;
  line-height: 20px;
}
.titBtn {
  float: right;
  margin-top: -5px;
}
.groupTit {
  width: 95%;
  float: left;
}
.groupConFor {
  display: inline-block;
  text-align: center;
}
.groupCheckBox {
  display: flex;
  flex-wrap: wrap;
  line-height: 50px;
  width: 100%;
}
</style>
