<template>
  <div style="padding: 20px;">
    <el-button type="primary" @click="dialogVisible = true" style="margin:10px">用户增加</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
      <el-table-column prop="userPhone" label="手机号" width="180"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column label="操作" min-width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click.native="handlerDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click.native="handlerEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" @click.native="handlerLook(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="right page"
      @current-change="handleCurrentChange"
      :current-page="query.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="query.pageSize"
      layout="total, prev, pager, next"
      :total="query.total"
    ></el-pagination>
    <!-- 增加 -->
    <el-dialog title="增加用户" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="pass"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="添加角色">
          <el-select v-model="roleValue" placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog title="查看用户信息" :visible.sync="infoVisible" width="30%">
      <table border="0" cellspacing="0" cellpadding="0" :data="lookInfo">
        <tr>
          <td>用户名</td>
          <td>{{lookInfo.userName}}</td>
        </tr>
        <!-- <tr>
          <td>密码</td>
          <td>{{lookInfo.userPassword}}</td>
        </tr>-->
        <tr>
          <td>手机号</td>
          <td>{{lookInfo.userPhone}}</td>
        </tr>
        <tr>
          <td>角色</td>
          <td>{{lookInfo.roleName}}</td>
        </tr>
      </table>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑用户信息" :visible.sync="editVisible" width="30%">
      <el-form label-width="100px" class="demo-ruleForm" :data="editInfo">
        <el-form-item label="用户名">
          <el-input v-model="editInfo.userName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码">
          <el-input v-model="editInfo.userPassword"></el-input>
        </el-form-item>-->
        <el-form-item label="手机号">
          <el-input v-model="editInfo.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="添加角色" prop="cont">
          <el-select v-model="editInfo.roleName" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUser,
  getUser1,
  getadd,
  getedit,
  getRole,
  getDelete
} from "../api/user";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      infoVisible: false,
      editVisible: false,
      ruleForm: {
        name: "",
        pass: "",
        phone: "",
        userId: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [
          { required: true, message: "请输入密码", trigger: "change" },
          { max: 11, message: "长度为11个字符", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "change" }]
      },
      name: "",
      pass: "",
      phone: "",
      userId: "",
      lookInfo: [],
      editInfo: {},
      modleList: [],
      controlList: [],
      roleId: [],
      list: [],
      options: [
        {
          value: "",
          label: ""
        }
      ],
      value: "",
      roleList: [],
      roleOptions: [
        {
          value: "",
          label: ""
        }
      ],
      roleValue: "",
      query: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      valueId: ""
    };
  },
  created() {
    this.getUserList();
    var that = this;
    getUser()
      .then(res => {
        console.log(res);
        that.roleList = res.data.object.list.list;
        for (var i = 0; i < that.roleList.length; i++) {
          that.roleOptions.push({
            value: that.roleList[i].roleId,
            label: that.roleList[i].roleName
          });
          console.log(that.roleValue);
        }
      })
      .catch(() => {});
  },
  computed: {},
  mounted() {},
  methods: {
    // 所有用户列表
    getUserList() {
      var that = this;
      let param = {
        total: that.query.total,
        pagerNum: that.query.pageNum,
        pageSize: that.query.pageSize
      };
      getUser1(param)
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
        userId: row.userId
      };
      if (row.userId) {
        this.$confirm("确认删除吗?", "提示", {
          type: "warning"
        }).then(() => {
          getDelete(param)
            .then(res => {
              if (res.data.code == "00") {
                console.log("1111");
                that.getUserList();
              }
            })
            .catch(() => {});
        });
      }
    },
    // 增加
    submitForm() {
      var that = this;
      // 获取角色列表
      var param = {
        userName: that.name,
        passWord: that.pass,
        userPhone: that.phone,
        userRole: that.roleValue
      };
      getadd(param)
        .then(response => {
          console.log(response);
          if (response.data.code == "00") {
            that.dialogVisible = false;
            that.getUserList();
          } else {
            that.$message.error(response.data.msg);
          }
        })
        .catch(() => {});
    },
    // 编辑
    editForm() {
      var that = this;
      console.log(that.editInfo);
      console.log(that.value);
      // that.cont = that.editInfo.roleName
      console.log(that.cont);
      var param = {
        userId: that.editInfo.userId,
        userName: that.editInfo.userName,
        userPhone: that.editInfo.userPhone,
        roleId: that.editInfo.roleName
      };
      getedit(param)
        .then(response => {
          console.log(response);
          var data = response.data.object.user.userRole;
          console.log(data);
          for (var i = 0; i < that.options.length; i++) {
            console.log(that.options[i].value);
            if (data == that.options[i].value) {
              console.log(that.options[i].label);
              var a = that.options[i].label;
              that.cont = a;
            }
          }
          console.log(a);
          // that.tableData = [
          //   {
          //     userName: response.userName,
          //     userPhone: response.userPhone,
          //     roleName: a
          //   }
          // ];
          that.editVisible = false;
          that.getUserList();
        })
        .catch(() => {});
    },
    // 编辑弹框
    handlerEdit(row) {
      var that = this;
      this.editVisible = true;
      this.editInfo = row;
      console.log(this.editInfo);
      // this.value = this.editInfo.roleName;
      this.valueId = this.editInfo.roleId;
      console.log(row);
      // 获取角色列表
      getRole()
        .then(res => {
          console.log(res);
          that.list = res.data.object.list.list;
          console.log(that.list);
          for (var i = 0; i < that.list.length; i++) {
            console.log(that.list[i].roleName);
            that.options.push({
              value: that.list[i].roleId,
              label: that.list[i].roleName
            });
          }
        })
        .catch(() => {});
    },
    editRole(e, name) {
      console.log(e);
      console.log(name);
    },
    // 查看弹框
    handlerLook(row) {
      console.log(row);
      this.lookInfo = row;
      this.infoVisible = true;
    },
    // handleSizeChange(val) {
    //   this.query.pageSize = val;
    //   console.log(val);
    //   console.log(this.query.pageSize);
    //   this.getUserList();
    // },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      console.log(val);
      console.log(this.query.pageNum);
      this.getUserList();
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
  width: 100%;
  color: #1f2d3d;
  border-right: 1px solid #c8cbce;
  border-bottom: 1px solid #c8cbce;
}
table td {
  padding: 10px;
  border-left: 1px solid #c8cbce;
  border-top: 1px solid #c8cbce;
}
.el-checkbox {
  display: block;
}
</style>
