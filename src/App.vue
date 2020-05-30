<template> 
  <div id="app">
    <!-- <common-header></common-header> -->
    <router-view />
    <!-- <common-footer></common-footer> -->
  </div>
</template>
<script type="text/javascript" src=""></script>
<script>
// import CommonHeader from "@commons/CommonHeader";
// import CommonFooter from "@commons/CommonFooter";
export default {
  name: "app",
  // components: { CommonHeader, CommonFooter }
  // mounted() {
  //   const s = document.createElement("script");
  //   s.type = "text/javascript";
  //   s.src =
  //     "http://api.map.baidu.com/api?v=3.0&ak=yhGtwOULKUiUF4BIvyH75zGzLN0PdSrr";
  //   document.body.appendChild(s);
  // }
};
</script>

<style lang="stylus">
#app{
  width 100%
  height 100%
  overflow hidden
}
</style>
