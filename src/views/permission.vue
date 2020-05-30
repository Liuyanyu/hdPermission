<template>
  <div class="container">
    <div class="head">
      <span>海淀公园管理系统</span>
      <!-- <el-button @click="out" type="primary" class="out">退出</el-button> -->
    </div>
    <div class="nav">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :class="{active:currentPanel === item.panel}"
              @click="handleItem(item)"
              v-for="(item,index) in navItems"
              :key="index"
              :index="item.id"
            >
              <span slot="title">{{item.label}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content">
      <component :is="currentPanel"></component>
    </div>
  </div>
</template>

<script>
import person from "@/views/person";
import user from "@/views/user";
import role from "@/views/role";
import permiss from "@/views/permiss";
import grouping from "@/views/grouping";
import partition from "@/views/partition";
import strategy from "@/views/strategy";
export default {
  components: {
    person,
    user,
    role,
    permiss,
    grouping,
    partition,
    strategy
  },
  data() {
    return {
      currentPanel: "user",
      navItems: [
        { label: "用户管理", panel: "user", id: "1" },
        { label: "角色管理", panel: "role", id: "2" },
        // { label: "权限管理", panel: "permiss", id: "3" }
      ]
    };
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    out() {
      this.$router.push({
        name: "welcome",
        path: "/"
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleItem(item) {
      this.currentPanel = item.panel;
    }
  }
};
</script>

<style scoped lang="scss">
.el-submenu .el-menu-item{
  min-width:0
}
.container {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  // background: rgba(224, 234, 235, 0.1);
}
.head {
  width: 100%;
  height: 70px;
  background-color: #eeeeee;
  padding-left: 20px;
  line-height: 70px;
  font-size: 30px;
  letter-spacing: 2px;
}
.nav {
  width: 18%;
  float: left;
  border: 1px solid;
  margin-top: 70px;
  left: 0;
  bottom: 0;
  top: 0;
  position: absolute;
  background-color: rgb(84, 92, 100);
}
.content {
  width: 82%;
  float: right;
  // background-color: #cdcdcd;
  //  width: 99%;
  height: 100vh;
  // background-image: url("../assets/irr/bg.png");
  // background-repeat: no-repeat;
  // background-size: 100% auto;
}
>>> .el-submenu .el-menu {
  border: none;
  margin-left: 10%;
}
>>> .el-menu {
  /* border-right: solid 1px #e6e6e6; */
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #fff;
}
</style>
