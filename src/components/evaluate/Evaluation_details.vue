<template>
  <div>
    <div class="top">
      <div class="back_go" @click="go_back"><van-icon name="arrow-left" /></div>
      <div>评价详细</div>
    </div>
    <div>
      <div>
        <div><img :src="goods[0].image" width="200" /></div>
        <div>
          <div>{{ names }}</div>
          <div>
            <van-rate
              v-model="value"
              allow-half
              void-icon="star"
              void-color="#eee"
            ></van-rate>
          </div>
        </div>
      </div>
      <div>{{ details.comment_time }}</div>
    </div>
    <div>
      评价内容: <span>{{ details.content }}</span>
    </div>
    <div><van-divider></van-divider></div>
    <div><img :src="goods[0].image_path" alt="" width="100" /></div>
    <div>{{ goods[0].name }}</div>
    <div @click="getadd(id)">
      <van-icon name="shopping-cart-o" size="1.5em" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Evaluation_details",
  components: {},
  props: {},
  data() {
    return {
      details: {},
      goods: [],
      names: "",
      value: "",
      image: "",
      id: ""
    };
  },
  methods: {
    //拿到已评价传来的参数
    getEvaluation() {
      this.details = this.$route.query.item;
      this.goods = this.details.goods;
      this.value = this.details.rate;
      this.names = this.$route.query.name;
      this.id = this.goods.id;
      console.log(this.goods, 11);
    },
    //返回上一页
    go_back() {
      this.$router.back();
    },
    getadd() {
      this.$dialog
        .confirm({
          title: "确认",
          message: "是否加入购物车？"
        })
        .then(
          this.$axios
            .req("/api/addShop", { id: this.id })
            .then(res => {
              console.log(res);
            })
            .catch(e => {
              console.log(e);
            })
        );
    }
  },
  mounted() {
    this.getEvaluation();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.top {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.back_go {
  position: fixed;
  padding-left: 4%;
}
</style>
