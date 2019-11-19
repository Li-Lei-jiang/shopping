<template>
  <div>
    <div class="headline">
      <div class="box_left" @click="go_back">
        <van-icon name="arrow-left" />
      </div>
      <div>订单结算</div>
    </div>
    <div class="ues_peo">
      <div>
        收货人：<span>{{ default_address.addressDetail }}</span>
      </div>
      <div>
        电话号码: <span>{{ default_address.tel }}</span>
      </div>
    </div>
    <div class="site">
      <div class="location ">
        <div><van-icon name="location-o" size="1.5em" /></div>
        <div>{{ default_address.address }}</div>
      </div>
      <div><van-icon name="arrow" /></div>
    </div>
    <div class="hint">(收获不便时，可选择免费待收服务)</div>
    <div class="bg_img"></div>
    <!--    商品展示区-->
    <div v-for="(item, index) in lsit" :key="index">
      <van-card
        :num="item.count"
        :price="item.present_price"
        :title="item.name"
        :thumb="item.image_path"
      ></van-card>
    </div>
    <!--    底部结算区-->
    <div>
      <van-submit-bar :price="sum()" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Clearing_house",
  components: {},
  props: {},
  data() {
    return {
      code: "",
      lsit: [], //接收传过来的数据
      price: "", //价格
      checked: 0,
      default_address: {}, //接收的默认地址信息
      present_price: "", //现在的价格
      count: "", //商品的数量
      args: {},
      arr: []
    };
  },
  methods: {
    //获取到传过来的商品列表
    getlist() {
      this.arr = [];
      this.lsit = this.$route.query.count_item;
      this.lsit.forEach(item => {
        this.arr.push(item.cid);
      });
    },
    go_back() {
      history.back();
    }, //返回上一页
    //提交结算 // address:收货地址,tel:电话，orderId：所有商品的id，
    //  totalPrice：总价格,idDirect:用来判断是购物车结算还是直接购买,count:商品数量

    //
    async onSubmit() {
      try {
        this.args = {
          address: this.default_address.address,
          tel: this.default_address.tel,
          orderId: this.arr,
          totalPrice: this.sum(),
          idDirect: false,
          count: this.lsit[0].count
        };
        let res = await this.$api.placeOrder(this.args);
        Toast("支付成功一共支付" + "this.sum()" + " 元");
        this.$router.push("/completed");
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //价格计算
    sum() {
      let sum = 0;
      this.lsit.forEach(item => {
        sum += item.present_price * item.count * 100;
      });
      return sum;
    },
    //获取默认地址
    async getDefaultAddress() {
      try {
        let res = await this.$api.getDefaultAddress();
        this.default_address = res.defaultAdd;
      } catch (e) {
        console.log(e);
      }
    }
    //获取对象的参数
  },
  mounted() {
    this.getlist();
    this.getDefaultAddress();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.headline {
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}
.box_left {
  position: fixed;
  padding-left: 5%;
  font-size: 20px;
}
.ues_peo {
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
  height: 30px;
  line-height: 30px;
}
.site {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  padding: 0 8%;
}
.location {
  display: flex;
}
.hint {
  text-align: center;
  color: #ff4444;
}
.bg_img {
  background-image: url("../../../public/caitiao.jpg");
  height: 8px;
  margin: 3% 0;
}
.Showcase {
  height: 150px;
  line-height: 150px;
}
</style>
