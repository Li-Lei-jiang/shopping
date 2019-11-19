<template>
  <div>
    <router-view />
    <div id="end">
      <van-row type="flex" justify="center">
        <div class="end-icon" @click="goHome">
          <van-icon name="wap-home-o" size="1.5em" />
          <div>商城</div>
        </div>
        <div class="end-icon" @click="goClassify">
          <van-icon name="wap-nav" size="1.5em" />
          <div>分类</div>
        </div>
        <div class="end-icon" @click="shoppingCart">
          <van-icon name="shopping-cart" size="1.5em" />
          <div>购物车</div>
        </div>
        <div class="end-icon" @click="tomember">
          <van-icon name="contact" size="1.5em" />
          <div>我的</div>
        </div>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "End",
  components: {},
  props: {},
  data() {
    return {
      Tab: true
    };
  },
  methods: {
    goClassify() {
      this.$router.push("/classify");
      this.Tab = !this.Tab;
    },
    goHome() {
      this.$router.push("/homepage");
      this.Tab = !this.Tab;
    },
    shoppingCart() {
      this.$router.push("/shoppingCart");
      this.Tab = !this.Tab;
    },
    tomember() {
      this.$router.push("/member");
      this.Tab = !this.Tab;
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>
<style>
.red {
  color: #ff5700;
}
</style>
<style scoped lang="scss">
#end {
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 10;
}
#end .van-row {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
#end .end-icon {
  line-height: 15px;
  font-size: 14px;
}
</style>
