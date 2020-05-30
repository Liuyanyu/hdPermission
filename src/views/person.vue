<template>
  <div style="padding: 20px;">
    <table border="0" cellspacing="0" cellpadding="0" v-if="tableData">
      <tr>
        <td>用户名</td>
        <td>{{tableData.userName}}</td>
      </tr>
      <tr>
        <td>手机号</td>
        <td>{{tableData.userPhone}}</td>
      </tr>
      <tr>
        <td>角色名称</td>
        <td>{{tableData.userRole}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import https from "@/https.js";
import axios from "axios";
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: true,
      citied: [],
      tableData: []
    };
  },
  created() {
    this.getUserInfo();
  },
  computed: {},
  mounted() {},
  methods: {
    getUserInfo() {
      var that = this;
      console.log("1");

      // axios
      //   .get(
      //     "/urlSS/read/hdpark/user/getUser?sessionId=" +
      //       window.localStorage.getItem("sessionId")
      //   )
      //   .then(function(res) {
      //     console.log("2");
      //     console.log(res);
      //     that.tableData = res.data.object.user;
      //     console.log(that.tableData);
      //   })
      //   .catch(function(res) {
      //     console.log(res);
      //   });

      axios
        .get(
          "/url2/user/getUser?sessionId=" +
            window.localStorage.getItem("sessionId")
        )
        .then(function(res) {
          console.log("2");
          console.log(res);
          that.tableData = res.data.object.user;
          console.log(that.tableData);
        })
        .catch(function(res) {
          console.log(res);
        });
    }
  }
};
</script>

<style scoped lang="scss">
table {
  color: #1f2d3d;
  border-right: 1px solid #c8cbce;
  border-bottom: 1px solid #c8cbce;
  width: 20%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
table td {
  padding: 10px;
  border-left: 1px solid #c8cbce;
  border-top: 1px solid #c8cbce;
}
</style>  
