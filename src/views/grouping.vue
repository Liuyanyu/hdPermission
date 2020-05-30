<template>
  <div style="width: 99%;height:100vh;" class="bg">
    <template>
      <baidu-map
        class="baidumap"
        :center="center"
        :zoom="zoom"
        @ready="handler"
        :averageCenter="true"
      >
        <div v-for="marker in markers">
          <bm-marker
            :icon="{url:require('@assets/marker/irr.png'), size: { width:40, height: 40 }}"
            :position="{lng: marker.lng, lat: marker.lat}"
            @click="infoWindowOpen(marker.deviceId)"
          ></bm-marker>
        </div>
      </baidu-map>
    </template>
    <el-button
      type="primary"
      plain
      style="position:absolute;z-index:100;float:right;right: 0;margin: 20px;"
      @click="isShow"
    >灌溉分组</el-button>
    <div style="width:100%;height:50px;">
      <el-button type="primary" @click="addVisible = true" style="margin:10px;position:absolute;z-index:999">新建分组</el-button>
    </div>

    <div id="moveDiv" class="moveDiv" style="display:none">
      <div class="leftPanel" id="leftPanel" style="display:block">
        <el-card class="box-card" style="padding:0px">
          <div slot="header" class="clearfix">
            <span>分组名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div
            v-for="item in groupList"
            :key="item.groupId"
            class="text item textInput"
            @click="getGrouprelList(item.groupId)"
            style="height:50px;padding-left:20px;padding-right:20px"
          >
            <el-input
              v-if="disableName == 1"
              placeholder="请输入内容"
              style="width: 60%;height:50px;line-height:50px"
              v-model="item.groupName"
              :disabled="true"
              @blur="updateGroupList(item.groupId,item.groupName)"
            ></el-input>

            <el-input
              v-if="disableName == 0"
              placeholder="请输入内容"
              style="width: 60%;height:50px;line-height:50px"
              v-model="item.groupName"
              :disabled="false"
              @blur="updateGroupList(item.groupId,item.groupName)"
            ></el-input>

            <div style="float:right;line-height:50px">
              <el-button type="warning" icon="el-icon-edit" circle @click="editName()"></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="delGroupList(item.groupId)"
              ></el-button>
              <!-- <img src="../assets/irr/update.png" alt style="margin-right: 10px;" @click="editName()" />
              <img src="../assets/irr/remove.png" alt @click="delGroupList(item.groupId)" />-->
            </div>
          </div>
        </el-card>
      </div>

      <div class="rightPanel" id="rightPanel" style="display:block">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 17px;margin-left: 45%;letter-spacing: 5px">所有设备</span>
            <el-button
              type="primary"
              plain
              @click="addDel"
              style="float:right;right: 130px;position: absolute;"
            >确定</el-button>
            <el-button type="danger" plain style="float:right;position: absolute;right: 60px;">取消</el-button>
            <el-button
              type="danger"
              icon="el-icon-close"
              circle
              @click="closeWarnBox"
              style="float:right;position: absolute;right: 20px;"
            ></el-button>
          </div>

          <!-- <div style="display:flex;flex-wrap:wrap;text-align:center;line-height:50px">
            <span style="width:10%" v-for="item in grouprelList">
              <span style="color:#D47400;font-size:15px">{{item.deviceName}}</span>
            </span>
          </div>-->
          <div style="margin:20px">
            <!-- 组里设备 黄 -->
            <div class="rightCon">
              <el-checkbox-group v-model="checkedgroup" @change="changeGroup" style="width:100%">
                <el-checkbox
                  style="color:#E6A23C;width:10%"
                  v-for="item in grouprelList"
                  :label="item"
                  :key="item.deviceId"
                >{{item.deviceName}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <!-- 未被分组设备 蓝-->
            <div class="rightCon">
              <el-checkbox-group v-model="changedFilt" @change="changeFilt" style="width:100%">
                <el-checkbox
                  style="color:#409EFF;width:10%"
                  v-for="item in filtList"
                  :label="item"
                  :key="item.deviceId"
                >{{item.deviceName}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <!-- 其他分组设备 灰-->
            <div class="rightCon">
              <el-checkbox-group v-model="changedAll" style="width:100%">
                <el-checkbox
                  style="color:#909291;width:10%"
                  v-for="item in allList"
                  :label="item"
                  :key="item.deviceId"
                >{{item.deviceName}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-card>
        <div>
          <div class="btn bottom clearfix">
            <!-- <el-button type="primary" plain @click="addDel">确定</el-button>
            <el-button type="danger" plain>取消</el-button>-->
          </div>
          <!-- <div class="block">
              <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
          </div>-->
        </div>
      </div>
    </div>

    <el-dialog title="新建分组" :visible.sync="addVisible">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="分组名称">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGroupList">提交</el-button>
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
      updateVisible: false,
      name: "",
      groupList: [],
      groupName: "",
      disableName: 1,
      grouprelList: "",
      groupreName: "",
      checkedgroup: [],
      filtList: [],
      allList: [],
      changedFilt: [],
      changedAll: [],
      groupId: "",
      result: [],
      newArr: [],
      center: { lng: 0, lat: 0 },
      zoom: 3,
      markers: []
    };
  },
  created() {
    this.getGroupList();
    this.getFiltrationList();
    this.getPoint();
    // function dragFunc(id) {
    //   var Drag = document.getElementById(id);
    //   Drag.onmousedown = function(event) {
    //     var ev = event || window.event;
    //     event.stopPropagation();
    //     var disX = ev.clientX - Drag.offsetLeft;
    //     var disY = ev.clientY - Drag.offsetTop;
    //     document.onmousemove = function(event) {
    //       var ev = event || window.event;
    //       Drag.style.left = ev.clientX - disX + "px";
    //       Drag.style.top = ev.clientY - disY + "px";
    //       Drag.style.cursor = "move";
    //     };
    //   };
    //   Drag.onmouseup = function() {
    //     document.onmousemove = null;
    //     this.style.cursor = "default";
    //   };
    // }
    // dragFunc("moveDiv");
  },
  computed: {},
  mounted() {},
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.302281;
      this.center.lat = 39.992571;
      this.zoom = 18;
      let mapStyle = { style: "midnight" };
      map.setMapStyle(mapStyle);
    },
    infoWindowOpen(id) {
      var that = this;
      console.log(id);
      https
        .fetchPost(
          "/soil/grouprel/add?groupId=" + that.groupId + "&deviceId=" + id
        )
        .then(function(res) {
          console.log(res);
          // getGrouprelList
          if (res.code == "00") {
            that.getGrouprelList(that.groupId);
            that.getFiltrationList();
            that.$message({
              type: "success",
              message: "添加成功!"
            });
          }
          if (res.code == "400") {
            that.$message(res.msg);
          }
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
          var data = res.object.list;
          for (var i = 0; i < data.length; i++) {
            that.markers.push({
              lng: data[i].longitude,
              lat: data[i].latitude,
              isOpen: data[i].isOpen == "1" ? "开启" : "关闭",
              deviceId: data[i].deviceId
            });
            // that.options.push({
            //   value: data[i].deviceId,
            //   label: data[i].deviceIntro
            // });
          }
          console.log(that.markers[0]);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    isShow() {
      document.getElementById("moveDiv").style.display = "block";
    },
    closeWarnBox() {
      document.getElementById("moveDiv").style.display = "none";
    },
    // 查询灌溉组
    getGroupList() {
      var that = this;
      https
        .fetchGet("/soil/watergroup/list")
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.groupList = res.object.list;
            that.groupName = that.groupList.map(item => item.groupName);
            console.log(that.groupList.map(item => item.groupName));
            console.log(that.groupList.map(item => item.groupId));
            that.getGrouprelList(that.groupList[0].groupId);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 添加灌溉组
    addGroupList() {
      var that = this;
      https
        .fetchPost("/soil/watergroup/add?groupName=" + that.name)
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.addVisible = false;
            that.getGroupList();
            that.$message(res.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 修改灌溉组
    updateGroupList(id, name) {
      console.log(id, name);
      var that = this;
      https
        .fetchPost(
          "/soil/watergroup/update?groupName=" + name + "&groupId=" + id
        )
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.$message(res.msg);
            that.disableName = 1;
          }
        })
        .catch(function(res) {
          console.log(res);
        });
    },
    editName() {
      this.disableName = 0;
    },
    // 删除灌溉组
    delGroupList(id) {
      var that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          https
            .fetchPost("/soil/watergroup/del?groupId=" + id)
            .then(function(res) {
              console.log(res);
              if (res.code == "00") {
                that.$message({
                  type: "success",
                  message: "删除成功!"
                });
                that.getGroupList();
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
    // 查询未被分组水表
    getFiltrationList() {
      var that = this;
      https
        .fetchGet("/soil/waterDevice/filtrationList")
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.filtList = res.object.list;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 查询某个组下的设备  查询其他分组设备
    getGrouprelList(id) {
      var that = this;
      that.groupId = id;
      console.log(that.groupId);
      // 查询某个组下的设备
      https
        .fetchGet("/soil/grouprel/list?groupId=" + id)
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.grouprelList = res.object.list;
            // that.checkedgroup = that.grouprelList;
            // that.groupreName = that.grouprelList.map(item => item.groupName);
            // console.log(that.grouprelList);
            // console.log(that.groupreName);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      // 查询其他分组设备
      https
        .fetchGet("/soil/waterDevice/grouplist?groupId=" + id)
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.allList = res.object.list;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addDel() {
      var that = this;
      console.log(that.changedFilt); //未被分组选中的 蓝 加
      console.log(that.checkedgroup); // 组里设备选中 黄 删
      for (var i = 0; i < that.changedFilt.length; i++) {
        https
          .fetchPost(
            "/soil/grouprel/add?groupId=" +
              that.groupId +
              "&deviceId=" +
              that.changedFilt[i].deviceId
          )
          .then(function(res) {
            console.log(res);
            // getGrouprelList
            if (res.code == "00") {
              that.getGrouprelList(that.groupId);
              that.getFiltrationList();
              that.$message({
                type: "success",
                message: "添加成功!"
              });
            }
            if (res.code == "400") {
              that.$message(res.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      //  删除灌溉组里的一个水表 刷新
      for (var i = 0; i < that.checkedgroup.length; i++) {
        https
          .fetchPost(
            "/soil/grouprel/del?relationId=" + that.checkedgroup[i].relationId
          )
          .then(function(res) {
            console.log(res);
            if (res.code == "00") {
              that.getGrouprelList(that.groupId);
              that.getFiltrationList();
              console.log("222");
              that.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    changeGroup(value) {
      console.log(value);
      console.log(this.checkedgroup);
    },
    changeFilt(value) {
      // var that = this;
      // console.log(this.changedFilt);
      console.log(value);
      // console.log(this.groupId);
      // console.log(value.map(item => item.deviceId));

      // that.grouprelList.push(...value);
      // if(that.grouprelList.map(item => item.groupName) !== value.map(item => item.groupName)){
      //    that.grouprelList.push(...value);
      // }
    }
  }
};
</script>

<style scoped lang="scss">
>>>.content[data-v-287aabe9] {
  width: 82%;
  float: right;
  height: 100vh;
  margin-top: -20px !important;
}
.item[data-v-2611a19d] {
  margin-bottom: 0px;
}
.textInput:hover {
  background-color: #b3d8ff;
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
.leftAside::-webkit-scrollbar {
  display: none;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  // width: 480px;
  height: 50vh;
  overflow-y: scroll;
}
>>> .el-card__body {
  padding: 0px;
}
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
.leftPanel {
  width: 19%;
  float: left;
  margin-left: 2%;
  margin-right: 2%;
  position: relative;
}
.rightPanel {
  width: 70%;
  // float: right;
  margin-left: 2%;
  margin-right: 5%;
  position: relative;
}
.rightCon {
  display: flex;
  flex-wrap: wrap;
  line-height: 50px;
  width: 100%;
}
.moveDiv {
  // // width:256px;
  // // height:146px;
  // background-color: white;
  position: absolute;
  top: 20%;
  // left: 30%;
  // transform: translateX(-50%) translateY(-50%);
  // -moz-transform: translateX(-50%) translateY(-50%);
  // -webkit-transform: translateX(-50%) translateY(-50%);
  // -ms-transform: translateX(-50%) translateY(-50%);
  // border-radius: 5px;
  // box-shadow: 3px 3px 10px blue;
}
</style>
