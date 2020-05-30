<template>
  <div style="padding: 20px;">
    <el-button type="primary" @click="dialogVisible = true" style="margin:10px">职称增加</el-button>

    <el-table :data="tableData" style="width: 100%;">
      <el-table-column prop="roleName" label="职称名称" width="180"></el-table-column>
      <el-table-column prop="roleRemark" label="职称描述" width="180"></el-table-column>
      <el-table-column label="操作" min-width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click.native="handlerDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click.native="handlerEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" @click.native="handlerLook(scope.row)">查看</el-button>
          <el-button size="mini" type="info" @click.native="handlerGive(scope.row)">授权</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="right page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.pageNum"
      :page-size="query.pageSize"
      layout="total, prev, pager, next"
      :total="query.total"
    ></el-pagination>

    <el-dialog title="职称增加" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="职称名称" prop="roleName">
          <el-input v-model="roleName"></el-input>
        </el-form-item>
        <el-form-item label="职称描述" prop="roleRemark">
          <el-input v-model="roleRemark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑职称信息" :visible.sync="editVisible" width="30%">
      <el-form label-width="100px" class="demo-ruleForm" :data="editInfo">
        <el-form-item label="职称名称">
          <el-input v-model="editInfo.roleName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="职称Id">
          <el-input v-model="editInfo.roleId"></el-input>
        </el-form-item>-->
        <el-form-item label="职称描述">
          <el-input v-model="editInfo.roleRemark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="当前职称信息" :visible.sync="infoVisible" width="30%">
      <table border="0" cellspacing="0" cellpadding="0" v-if="lookInfo">
        <tr>
          <td>职称名称</td>
          <td>{{lookInfo.roleName}}</td>
        </tr>
        <tr>
          <td>职称描述</td>
          <td>{{lookInfo.roleRemark}}</td>
        </tr>
      </table>
    </el-dialog>
    <!--授权  -->
    <el-dialog title="授权" :visible.sync="dialogFormVisible" width="29.5%" style="min-width:50%">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <div style="margin: 5px 0;"></div>
      <div style="font-weight: bold;font-size: 17px;line-height:30px">
        <span style="width:50%;display:inline-block">查看权限</span>
        <span style="width:50%;display:inline-block">控制权限</span>
      </div>
      <el-checkbox-group v-model="modulesed" @change="handleCheckedModelsChange">
        <!-- <el-checkbox
          style="display:block"
          v-for="(item,index) in modules"
          :label="item"
          :key="index"
        >{{item.moduleName}}</el-checkbox>-->
        <div style="float:left;width:50%;">
          <el-checkbox
            style="display:block"
            v-for="(item) in arr1"
            :label="item"
            :key="item"
          >{{item}}</el-checkbox>
        </div>
        <div>
          <!-- <p></p> -->
          <el-checkbox
            :disabled="dis"
            style="display:block;width:50%;"
            v-for="(item) in arr2"
            :label="item"
            :key="item"
          >{{item}}</el-checkbox>
        </div>
      </el-checkbox-group>
      <el-button type="primary" @click="setAut" style="position: relative;left: 80%;top: 10px;">提交</el-button>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUser,
  getadd,
  getDelete,
  getedit,
  getAut,
  getAuted,
  setAut
} from "../api/role";
export default {
  data() {
    return {
      //  roleData:[],
      dis: true,
      dialogVisible: false,
      infoVisible: false,
      dialogFormVisible: false,
      tableData: [],
      roleName: "",
      roleRemark: "",
      lookInfo: [],
      editVisible: false,
      editInfo: [],
      checkedCities: ["上海", "北京"],
      // modules: [
      //   {
      //     moduleId: "",
      //     moduleName: ""
      //   }
      // ],
      modules: [],
      modulesed: [],
      modulesedId: [],
      checkAll: false,
      isIndeterminate: true,
      rowRoleId: "",
      autArr: ["1", "2", "3"],
      test: [],
      query: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      arr: [],
      arr1: [],
      arr2: [],
      arr3: []
    };
  },
  created() {
    this.getRoleList();
    this.getModelList();
    // this.handleCheckedModelsChange();
    console.log(this.checkedCities);
  },
  computed: {},
  mounted() {},
  methods: {
    chooseType(e, val) {
      console.log(e);
      console.log(val);
      // this.test.push(val)
      // console.log(this.test);
    },
    // 列表
    getRoleList() {
      var that = this;
      console.log(that.query);
      let param = {
        total: that.query.total,
        pagerNum: that.query.pageNum,
        pageSize: that.query.pageSize
      };
      getUser(param)
        .then(res => {
          console.log(res);
          that.tableData = res.data.object.list.list;
          that.query.pageSize = res.data.object.list.pageSize;
          that.query.pageNum = res.data.object.list.pageNum;
          that.query.total = res.data.object.list.total;
        })
        .catch(() => {});
    },
    // 删除
    handlerDelete(row) {
      var that = this;
      console.log(row);
      var param = {
        roleId: row.roleId
      };
      if (row.roleId) {
        this.$confirm("确认删除吗?", "提示", {
          type: "warning"
        }).then(() => {
          getDelete(param)
            .then(res => {
              console.log(res);
              if (res.data.code == "00") {
                console.log("1111");
                that.getRoleList();
              }
            })
            .catch(() => {});
        });
      }
    },
    change1(id, e) {
      console.log(id);
      console.log(e);
    },
    // 增加
    submitForm() {
      var that = this;
      var param = {
        roleName: that.roleName,
        roleRemark: that.roleRemark
      };
      getadd(param)
        .then(response => {
          console.log(response);
          this.arr = response.data.data;
          console.log(this.arr);
          if (response.data.code == "00") {
            that.dialogVisible = false;
            that.getRoleList();
          }
        })
        .catch(() => {});
    },
    // 编辑
    editForm() {
      var that = this;
      var param = {
        roleId: that.editInfo.roleId,
        roleName: that.editInfo.roleName,
        roleRemark: that.editInfo.roleRemark
      };
      getedit(param)
        .then(response => {
          console.log(response);
          that.editVisible = false;
        })
        .catch(() => {});
    },
    // 编辑弹框
    handlerEdit(row) {
      this.editVisible = true;
      this.editInfo = row;
      console.log(row);
      console.log(this.editInfo);
    },
    // 查看
    handlerLook(row) {
      console.log(row);
      this.lookInfo = row;
      this.infoVisible = true;
    },
    // 所有权限列表
    getModelList() {
      var that = this;
      getAut()
        .then(res => {
          console.log(res);
          that.list = res.data.object.lsit;
          console.log(that.list);
          for (var i = 0; i < that.list.length; i++) {
            that.modules.push({
              moduleId: that.list[i].authorityId,
              moduleName: that.list[i].authorityName
            });
            if (that.list[i].type == 1) {
              // that.arr1.push({
              //   moduleId: that.list[i].authorityId,
              //   moduleName: that.list[i].authorityName
              // });
              that.arr1.push(that.list[i].authorityName);
            } else if (that.list[i].type == 3) {
              // that.arr2.push({
              //   moduleId: that.list[i].authorityId,
              //   moduleName: that.list[i].authorityName
              // });
              that.arr2.push(that.list[i].authorityName);
            }
          }
          console.log(that.arr1);
          console.log(that.arr2);
        })
        .catch(() => {});
    },

    // 授权弹框 已有权限
    handlerGive(row) {
      // var that = this;
      this.modulesed = [];
      this.dis = true;
      this.dialogFormVisible = true;
      this.rowRoleId = row.roleId;
      var params = {
        roleId: row.roleId
      };
      console.log(this.rowRoleId);
      getAuted(params)
        .then(res => {
          console.log(res);
          var modle = res.data.object.list;
          for (var i = 0; i < modle.length; i++) {
            this.modulesed.push(modle[i].authorityName);
            // this.modulesed.push({
            //   moduleId: modle[i].authorityId,
            //   moduleName: modle[i].authorityName
            // });
          }
          console.log(this.modulesed);
        })
        .catch(() => {});
    },
    handleCheckAllChange(val) {
      this.modulesed = val ? this.modules : [];
      this.isIndeterminate = false;
    },
    // unique(arr) {
    //   return Array.from(new Set(arr));
    // },

    unique(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] == arr[j]) {
            //第一个等同于第二个，splice方法删除第二个
            arr.splice(j, 1);
            j--;
          }
          console.log(arr);
        }
      }
      return arr;
    },
    handleCheckedModelsChange(value) {
      console.log(this.modulesed);
      console.log(this.list);
      console.log(value);
      var that = this;
      that.dis = false;
      that.test = [];
      for (var i = 0; i < this.list.length; i++) {
        for (var j = 0; j < this.modulesed.length; j++) {
          if (this.modulesed[j] == this.list[i].authorityName) {
            that.test.push(this.list[i].authorityId);
          }
        }
      }
      // console.log(this.modulesed);
      console.log(that.test);
      that.unique(that.test);
      console.log(that.test);
      // that.test = value.map(item => item.moduleId);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.modules.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.modules.length;
    },
    // 给职称授权
    setAut() {
      var that = this;
      console.log(that.rowRoleId);
      console.log(that.test);
      var params = {
        autArr: JSON.stringify(that.test),
        roleId: that.rowRoleId
      };

      setAut(params)
        .then(res => {
          console.log(res);
          that.dialogFormVisible = false;
          if (res.data.code == "00") {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            console.log(this.rowRoleId);
            var params = {
              roleId: this.rowRoleId
            };
            this.getAuted(params);
          }
        })
        .catch(() => {});
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleSizeChange(val) {
      this.query.pageSize = val;
      this.getRoleList();
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      console.log(val);
      console.log(this.query.pageNum);
      this.getRoleList();
    }
  }
};
</script>
<style scoped lang="scss">
table {
  color: #1f2d3d;
  border-right: 1px solid #c8cbce;
  border-bottom: 1px solid #c8cbce;
  width: 100%;
}
table td {
  padding: 10px;
  border-left: 1px solid #c8cbce;
  border-top: 1px solid #c8cbce;
}
// .el-checkbox {
//   display: block;
//   margin-right: 0 !important;
// }
// >>> .el-checkbox-group {
//   font-size: 0;
//   float: left;
//   width: 50%;
//   text-align: center;
// }
.el-checkbox:nth-child(10) {
  margin-top: -33%;
}
</style>
