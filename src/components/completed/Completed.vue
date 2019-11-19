<template>
  <div>
    <div class="mine">
      <div class="gobanck" @click="go_back"><van-icon name="arrow-left" /></div>
      我的订单
    </div>
    <div v-for="(item, index) in mylist" :key="index">
      <div>
        订单编号：<span>{{ item.order_id }}</span
        ><span>交易完成</span>
      </div>
      <div v-for="item1 in item.order_list" :key="item1.id">
        <van-card
          :num="item1.count"
          :price="item1.present_price"
          :title="item1.name"
          :thumb="item1.image_path"
        ></van-card>
        <div>
          共 <span>{{item1.count }}件商品 合计 {{ item1.count *item1.present_price }}元</span>
        </div>
      </div>
      <div>
        创建时间：<span>{{ item.add_time }}</span>
      </div>
      <div>
        收货地址：<span>{{ item.address }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Completed",
  components: {},
  props: {},
  data() {
    return {
      mylist: [],
      order_list: [],
      // sum:'',
    };
  },
  methods: {
    //订单查询参数：evaluate：用来判断是不是查询订单，默认false
    async getMyOrder() {
      try {
        let res = await this.$api.getMyOrder();
        this.mylist = res.list;
        console.log(this.mylist);
      } catch (e) {
        console.log(e);
      }
    },
    //返回上一页
    go_back(){
      this.$router.back()
    },
  },
  mounted() {
    this.getMyOrder();
  },
  created() {},
  filters: {},
  computed: {
    // sum() {
    //   let sum = 0;
    //   this.order_list.forEach(item => {
    //     sum += item.count * item.present_price;
    //   });
    //   return sum;
    // }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.mine {
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}
.gobanck {
  position: fixed;
  padding-left: 4%;
}
</style>
