<template>
  <div class="common-header__wrapper">
    <div style="display:flex">
      <img
        src="@assets/footerImg/pitchOn-01.png"
        alt
        class="footImg"
        @click="redirectEnvironAware"
      />
      <img
        src="@assets/footerImg/pitchOn-04.png"
        alt
        class="footImg"
        @click="redirectEnergyPerception"
      />
      <img
        src="@assets/footerImg/pitchOn-02.png"
        alt
        class="footImg"
        @click="redirectTrafficManagement"
      />
      <img
        src="@assets/footerImg/pitchOn-05.png"
        alt
        class="footImg"
        @click="redirectIntelligentSecurity"
      />
      <img
        src="@assets/footerImg/pitchOn-08.png"
        alt
        class="footImg"
        @click="redirectCuring"
      />
      <img
        src="@assets/footerImg/pitchOn-07.png"
        alt
        class="footImg"
        @click="redirectIrrigate"
      />
      <img
        src="@assets/footerImg/pitchOn-06.png"
        alt
        class="footImg"
        @click="redirectLighting"
      />
      <img
        src="@assets/footerImg/pitchOn-09.png"
        alt
        class="footImg"
        @click="redirectLandscape"
      />
      <img
        src="@assets/footerImg/pitchOn-03.png"
        alt
        class="footImg"
        @click="redirectOperating"
      />
      <img src="@assets/footerImg/footerScroll.png" alt class="footerScroll" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonFooter",
  components: {},
  directives: {},
  mixins: [],
  props: {},
  data() {
    return {
      // pitchOn011,
      // imgArr:[ pitchOn01,pitchOn02,pitchOn03,pitchOn04,pitchOn05,pitchOn06,pitchOn07,pitchOn08,pitchOn09 ]
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    redirectEnvironAware() {
      this.$router.push({
        name: "environAware",
        path: "/src/views/environAware"
      });
    },
    redirectEnergyPerception() {
      this.$router.push({
        name: "energyPerception",
        path: "/src/views/energyPerception"
      });
    },
    redirectTrafficManagement() {
      this.$router.push({
        name: "trafficManagement",
        path: "/src/views/trafficManagement"
      });
    },
    redirectOperating() {
      this.$router.push({
        name: "operating",
        path: "/src/views/operating"
      });
    },
    redirectIntelligentSecurity() {
      this.$router.push({
        name: "intelligentSecurity",
        path: "/src/views/intelligentSecurity"
      });
    },
    redirectLighting() {
      this.$router.push({
        name: "lighting",
        path: "/src/views/lighting"
      });
    },
    redirectIrrigate() {
      this.$router.push({
        name: "irrigate",
        path: "/src/views/irrigate"
      });
    },
    redirectCuring() {
      this.$router.push({
        name: "curing",
        path: "/src/views/curing"
      });
    },
    redirectLandscape() {
      this.$router.push({
        name: "landscape",
        path: "/src/views/landscape"
      });
    }
  }
};
</script>

<style scoped>
.common-header__wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;
  padding: 4px 0 4px 15px;
}
.footerImg {
  flex: 1;
}
.container {
  position: relative;
}
.footImg {
  flex: 1;
  /* height: 55px; */
  width: 10%;
}
.footerScroll {
  flex: 1;
  animation: rotateImg 1s linear infinite;
  position: relative;
  margin-top: -68px;
}
* {
  margin: 0;
  padding: 0;
}
/* @keyframes rotateImg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
} */
</style>
