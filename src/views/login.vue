<template>
  <el-form
    :model="loginForm"
    ref="loginForm"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <h3 class="title">系统登录</h3>
    <el-form-item prop="userName">
      <el-input type="text" v-model="loginForm.userName" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <!-- <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button> -->
      <el-button
        type="primary"
        style="width:48%;margin-left:26%;"
        @click.native.prevent="login"
        :loading="logining"
      >登 录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getLogin } from "../api/login";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      logining: false,
      loginForm: {
        userName: "admin",
        password: "admin"
      },
      fieldRules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    login() {
      var that = this;
      this.loading = true;
      let param = {
        userName: this.loginForm.userName,
        passWord: this.loginForm.password
      };
      console.log(param);
      getLogin(param)
        .then(response => {
          console.log(response);
          if (response.data.code == "00") {
            console.log(response);
            window.localStorage.setItem("sessionId", response.data.object.sessionId);
            // that.userToken = JSON.stringify(res.object.sessionId);
            // that.changeLogin({ Authorization: that.userToken });
            that.$router.push({
              name: "permission",
              path: "../../src/views/permission.vue"
            });
          }
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
