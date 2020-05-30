<template>
  <div class="data-card__wrapper" ref="cardWrap">
    <div class="card-title">{{ title }}</div>
    <div class="card-content">
      <div
        class="card-content-form"
        v-for="(formItem, index) in formArr"
        :key="index"
      >
        <el-form label-width="auto">
          <el-form-item
            :label="item.label"
            v-for="item in formItem"
            :key="item.field"
          >
            <span :title="item.value">{{ item.value }}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
// import utils from "./../util/index.js";
export default {
  name: "",
  components: {},
  directives: {},
  // mixins: [utils],
  props: {
    title: {},
    formItems: {}
  },
  data() {
    return {
      formArr: []
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.$nextTick(() => {
      let a = getComputedStyle(this.$el);
      if (parseFloat(a.width) > 400) {
        this.formArr = this.chunk(this.formItems, 4);
      } else {
        this.formArr = [this.formItems];
      }
    });
  },
  methods: {}
};
</script>
<style lang="stylus" scoped>
@import '~@assets/custom_el_form.styl'
@import '~@assets/mixins.styl'

definition-el-form-item('.data-card__wrapper',28px,0)

.data-card__wrapper >>> .el-form{
	overflow hidden
}
.data-card__wrapper >>> .el-form-item__content
	ellipis()
.data-card__wrapper >>> .el-form-item__label
	color #fff
	padding-left 10px
	ellipis()
.data-card__wrapper
	width 100%;
	background rgba(0,0,0,.6)
	color #fff
	border-radius 5px
	padding-bottom 15px
	.card-title
		font-family cursive
		height 38px
		font-size 24px
		display inline-flex
		align-items center
		padding-left 20px
		box-sizing border-box
	.card-content
		display flex
		flex-wrap wrap
		.card-content-form{
			flex 1
			min-width 200px
			display flex
			justify-content center
			overflow hidden
		}
</style>
