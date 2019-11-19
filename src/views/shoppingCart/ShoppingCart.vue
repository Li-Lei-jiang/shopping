<template>
  <div>
    <div class="text">购物车</div>
    <div class="box">
      <div class="box-1">
        <input type="checkbox" @click="allcheck" v-model="check" />全选
      </div>
      <div class="box_1">
        <div>合计：<span>￥{{sum}}</span></div>
        <div>确认订单</div>
      </div>
    </div>
    <div class="box2">
      <span @click="deleteShop"
        ><van-button type="danger">删除</van-button></span
      >
      <span
        ><van-button type="danger" @click="clearing_house(count_item)"
          >去结算</van-button
        ></span
      >
    </div>
    <div v-for="(item, index) in shopList" :key="index" class="commodity_list">
      <div class="box3">
        <div class="shop_price_">
          <input type="checkbox" v-model="item.check" @click="checks(index)" />
        </div>
        <div class="shop_price">
          <div><img :src="item.image_path" alt="" width="100" /></div>
          <div class="box4">
            <div class="box4_1">{{ item.name }}</div>
            <div class="price_count">
              <span>{{ item.present_price }}</span>
              <span
                ><van-stepper v-model="item.count" @change="editCart(item)"
              /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
// import { Stepper } from "vant";
export default {
  name: "ShoppingCart",
  components: {},
  props: {},
  data() {
    return {
      shopList: [], //购物车所有的商品
      value: 1, //进步器默认
      check: false, //全选选中与否
      // all_cost:'',
      // check_commodity:[],
      id: [],
      count: "",
      present_price: "",
      editCart_data: [],
      count_item: [] //装选中结算的数据
    };
  },
  methods: {
    //获取购物车数据
    async getCard() {
      try {
        let res = await this.$api.getCard();
        //得到购物车的所有数据
        this.shopList = res.shopList;
        console.log(this.shopList);
      } catch (e) {
        console.log(e);
      }
    },
    //判断单个是否选中
    checks(index) {
      this.shopList[index].check = !this.shopList[index].check;
    },
    // 全选与反选
    allcheck() {
      this.shopList.forEach(item => {
        item.check = !this.check;
      });
    },
    //加减商品
    editCart(item) {
      this.$axios.req("/api/editCart", {
          id: item.cid,
          count: item.count,
          mallPrice: item.mallPrice,
          value: item.count,
        })
        .then(res => {
          this.editCart_data = res.data; //增加 减少返回结果
          console.log(this.editCart_data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除
    async deleteShop() {
      try {
        this.id = [];
        this.shopList.forEach(item => {
          if (item.check === true) {
            this.id.push(item.cid);
          } //为true 就加入到数组里面
        });
        // console.log(this.id);
        Dialog({ title: "提示", message: "确认删除商品吗？" });

        let res = await this.$api.deleteShop(this.id);
        this.getCard();
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //去结算
    clearing_house(count_item) {
      this.shopList.forEach(item => {
        if (item.check === true) {
          this.count_item.push(item);
        } //为true 就加入到数组里面
      });
      if(this.count_item.length >0){
        this.$router.push({
          path: "/clearing_house",
          query: { count_item: count_item }
        });
      }else {
        this.$toast('请选择要结算的商品')
      }
    },
    //计算总价

  },
  mounted() {
    this.getCard();
  },
  created() {},
  filters: {},
  computed: {
    sum() {
      let sum = 0;
      this.shopList.forEach(item=>{
        if (item.check){
          sum += item.present_price * item.count
        } ;
      })
      return sum
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.text {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-bottom: #cccccc 1px solid;
}
.box {
  display: flex;
  justify-content: space-between;
  height: 80px;
  line-height: 80px;
  border-bottom: #cccccc 1px solid;
}
.box-1 {
  padding-left: 2%;
}
.box_1 {
  line-height: 40px;
  /*padding-right: 20%;*/
  text-align: center;
  width: 100px;
}
.box2 {
  padding: 2%;
  text-align: right;
}
.box2 span {
  padding-left: 5%;
}
.box3 {
  display: flex;
  flex-direction: row;
}
.commodity_list {
  display: flex;
  height: 100px;
}
.shop_price {
  display: flex;
  justify-content: space-between;
}
.shop_price_ {
  line-height: 100px;
}
.price_count {
  display: flex;
  margin-top: 25px;
  line-height: 25px;
  height: 25px;
}
.price_count span {
  margin: 0 6%;
}
.box4 {
}
.box4_1 {
  padding: 2% 0;
  margin: 4% 0 0 0;
}
</style>
