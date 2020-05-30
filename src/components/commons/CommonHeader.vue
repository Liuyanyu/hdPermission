<template>
  <div class="header">
    <span class="headerTit">海淀公园智慧综合展示管理平台</span>
    <span class="headerTitEng">
      HAIDIAN
      <span class="headerTitEng1">SMART</span> PARK
    </span>
    <span class="headerCompany">北京甲板智慧科技有限公司</span>
    <span class="dateNow" style="color:#ffffff;font-size:20px;  line-height:55px;">{{ currentTime }}</span>
    <!-- <span
      @click="promiss"
    style="color: #ffffff;font-size: 16px;float: right;right: 100px;position: absolute;line-height: 50px;">管理系统</span>-->
    <el-button @click="promiss" type="primary" class="out">管理系统</el-button>
    <!-- <span class="login" @click="promiss">管理系统</span> -->
  </div>
</template>
<script>
export default {
  name: "CommonHeader",
  components: {},
  directives: {},
  mixins: [],
  props: {},
  data() {
    return {
      timer: "", //定义一个定时器的变量
      currentTime: new Date() // 获取当前时间
    };
  },
  created() {
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function() {
      _this.currentTime = //修改数据date
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ": " +
        new Date().getSeconds();
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    promiss() {
      this.$router.push({
        name: "permission",
        path: "/src/views/permission"
      });
    }
  }
};
</script>
<style lang="stylus" scoped></style>