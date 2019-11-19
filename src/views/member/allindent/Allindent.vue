<template>
  <div>
    <div class="getback">
      <div @click="tomeber"><van-icon name="arrow-left" /></div>
    </div>
    <div class="top">我的订单</div>
    <div>
      <van-tabs v-model="activeName">
        <van-tab title="全部" name="a">内容 1</van-tab>
        <van-tab title="待支付" name="b">内容 2</van-tab>
        <van-tab title="待发货" name="c">内容 3</van-tab>
        <van-tab title="待收获" name="c">内容 3</van-tab>
        <van-tab title="已收货" name="c">内容 3</van-tab>
        <van-tab title="已完成" name="c">内容 3</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Allindent",
  components: {},
  props: {},
  data() {
    return {
      activeName: 'a'
    };
  },
  methods: {
    //返回键
    tomeber() {
      this.$router.push("/member");
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

<style scoped lang="scss">
.getback {
  height: 30px;
  width: 30px;
  text-align: left;
  margin: 2% 0 0 2%;
  position: fixed;
}
.getback div {
  text-align: center;
  line-height: 30px;
  font-size: 25px;
}
.top {
  height: 50px;
  line-height: 50px;
  /*background: #e30c7b;*/
  text-align: center;
  font-size: 20px;
  border-bottom: 1px solid #f5f6f8;
}
</style>
