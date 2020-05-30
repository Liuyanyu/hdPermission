<template>
  <div style="padding: 20px;">
    <!-- <el-button type="primary" @click="dialogVisible = true" style="margin:10px;display: block">权限增加</el-button> -->
    <div>
      <span style="font-size: 20px;font-weight: bold;line-height: 50px;">查看权限</span>
      <span style="font-size: 20px;font-weight: bold;line-height: 50px;margin-left: 46%;">控制权限</span>
    </div>
    <el-table
      :data="tableData"
      style="width:49%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);display: inline-block"
    >
      <el-table-column prop="authorityName" label="权限名称" width="180"></el-table-column>
      <!-- <el-table-column prop="authorityId" label="权限Id" width="180"></el-table-column> -->
      <!-- <el-table-column prop="authorityParent" label="权限类型" width="180"></el-table-column> -->
      <el-table-column label="操作" min-width="220">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="danger" @click.native="handlerDelete(scope.row)">删除</el-button> -->
          <el-button size="mini" type="success" @click.native="handlerEdit(scope.row)">编辑</el-button>
          <!-- <el-button size="mini" type="warning" @click.native="handlerLook(scope.row)">查看</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="tableData1"
      style="width: 49%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);float:right"
    >
      <el-table-column prop="authorityName" label="权限名称" width="180"></el-table-column>
      <!-- <el-table-column prop="authorityId" label="权限Id" width="180"></el-table-column> -->
      <!-- <el-table-column prop="authorityParent" label="权限类型" width="180"></el-table-column> -->
      <el-table-column label="操作" min-width="220">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="danger" @click.native="handlerDelete(scope.row)">删除</el-button> -->
          <el-button size="mini" type="success" @click.native="handlerEdit(scope.row)">编辑</el-button>
          <!-- <el-button size="mini" type="warning" @click.native="handlerLook(scope.row)">查看</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="权限增加" :visible.sync="dialogVisible">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="权限名称" prop="autName">
          <el-input v-model="autName"></el-input>
        </el-form-item>
        <el-form-item label="权限编码" prop="autCode">
          <el-input v-model="autCode"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="autType">
          <el-input v-model="autType"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog title="查看用户信息" :visible.sync="infoVisible">
      <table border="0" cellspacing="0" cellpadding="0" v-if="lookInfo">
        <tr>
          <td>权限名称</td>
          <td>{{lookInfo.authorityName}}</td>
        </tr>
        <!-- <tr>
          <td>权限Id</td>
          <td>{{lookInfo.authorityId}}</td>
        </tr>-->
      </table>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑用户信息" :visible.sync="editVisible">
      <el-form label-width="100px" class="demo-ruleForm" :data="editInfo">
        <el-form-item label="权限名称">
          <el-input v-model="editInfo.authorityName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAll, getadd, getDelete, getUpdate } from "../api/permiss";
export default {
  data() {
    return {
      //  PermissData:[],
      dialogVisible: false,
      infoVisible: false,
      tableData: [],
      tableData1: [],
      autName: "",
      autCode: "",
      autType: "",
      lookInfo: [],
      editVisible: false,
      editInfo: {}
    };
  },
  created() {
    this.getPermissList();
  },
  computed: {},
  mounted() {},
  methods: {
    // 列表
    getPermissList() {
      var that = this;
      let param = {
        type: 1
      };
      let param1 = {
        type: 3
      };
      getAll(param)
        .then(res => {
          if (res.data.code == "00") {
            console.log(res);
            that.tableData = res.data.object.lsit;
          }
        })
        .catch(() => {});
      getAll(param1)
        .then(res => {
          if (res.data.code == "00") {
            console.log(res);
            that.tableData1 = res.data.object.lsit;
          }
        })
        .catch(() => {});
    },
    handlerEdit(row) {
      this.editVisible = true;
      this.editInfo = row;
      console.log(row);
    },
    // 删除
    handlerDelete(row) {
      var that = this;
      console.log(row);
      var param = {
        autId: row.authorityId
      };
      var qs = require("qs");
      if (row.authorityId) {
        this.$confirm("确认删除吗?", "提示", {
          type: "warning"
        }).then(() => {
          getDelete(param)
            .then(res => {
              if (res.data.code == "00") {
                that.getPermissList();
              }
            })
            .catch(() => {});
        });
      }
    },
    // 增加
    submitForm() {
      var that = this;
      var param = {
        autName: that.autName,
        autCode: that.autCode,
        type: that.autType
      };
      getadd(param)
        .then(res => {
          if (res.data.code == "00") {
            that.getPermissList();
            that.dialogVisible = false;
          }
        })
        .catch(() => {});
    },
    //查看
    handlerLook(row) {
      console.log(row);
      this.lookInfo = row;
      this.infoVisible = true;
    },
    // 编辑
    editForm() {
      var that = this;
      var param = {
        autId: that.editInfo.authorityId,
        autName: that.editInfo.authorityName,
        autCode: that.editInfo.authorityParent
      };
      getUpdate(param)
        .then(res => {
          console.log(res);
          that.editVisible = false;
        })
        .catch(() => {});
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
</style>
