<template>
  <div>
    <div class="getback">
      <div><van-icon name="arrow-left" @click="go_back"/></div>
    </div>
    <!--    轮播图-->
    <div class="Recycling">
      <van-swipe :autoplay="3000" indicator-color="red">
        <van-swipe-item>
          <img :src="this.image" height="375" />
        </van-swipe-item>
        <van-swipe-item>
          <img :src="this.image_path" height="375" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 单个商品的详细数据-->
    <div class="titles">{{ goods_One.name }}</div>
    <div class="cost">￥{{ goods_One.present_price }}</div>
    <div class="box">
      <div>运费：{{ goods_One.__v }}</div>
      <div>剩余：{{ goods_One.amount }}</div>
      <div>
        收藏:
        <span
          ><van-icon
            name="like"
            :class="background"
            @click="_click(goods_One.id)"
        /></span>
      </div>
    </div>
    <div class="box1">
      <div class="box1-1">
        <div><van-icon name="shop-o" /></div>
        <div>有赞的店</div>
        <div class="box1-1-1" size="1.5em">官方</div>
      </div>
      <div class="box1-2"><span>进入店铺</span> <span> ></span></div>
    </div>
    <!--    商品详情-->
    <div>
      <van-tabs v-model="active">
        <van-tab title="商品详情">
          <div v-html="detail"></div>
        </van-tab>
        <van-tab title="商品评论">

        </van-tab>
      </van-tabs>
    </div>
    <!--    商品导航栏-->
    <div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          @click="toshop_cart"
        ></van-goods-action-icon>
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="addShopping"
        ></van-goods-action-button>
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="Buynow"
        ></van-goods-action-button>
      </van-goods-action>
      <div>
        <van-popup
          v-model="show"
          closeable
          close-icon="close"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <div class="goods">
            <div class="print"><img :src="this.image" width="100px" /></div>
            <div class="costs">
              <div>{{ this.goods_One.name }}</div>
              <div class="price">￥{{ goods_One.present_price }}</div>
            </div>
          </div>
          <div class="box3">
            <div class="box3_">
              <div>购买数量：</div>
              <div>
                剩余 {{ this.goods_One.amount }} 件 &nbsp;&nbsp;&nbsp;<span
                  >每人限购50件</span
                >
              </div>
            </div>
            <div><van-stepper v-model="value" min="0" max="50" /></div>
          </div>
          <div>
            <van-button
              type="danger"
              class="button_"
              @click="toCompute"
              size="1.5em"
              >立即购买</van-button
            >
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
// import { Dialog } from "vant";
export default {
  name: "Detailsage",
  components: {},
  props: {},
  data() {
    return {
      code: "", //返回信息/
      id: "", //接收的id
      goods_One: {}, //单个商品的详细数据
      image: "",
      image_path: "",
      detail: "", //商品详情的图片
      active: 2, //标签页自带的
      current_id: "", //当前商品的id
      show: false,
      value: 0, //进步器
      background: "width" //改变收藏的颜色
    };
  },
  methods: {
    //查询已平商品评价参数：
    async alreadyEvaluated(){
      try {
        let res = await this.$api.alreadyEvaluated();
        console.log(res);
      }catch (e) {
        console.log(e);
      }

    },
    //请求商品详情
    async goodOne() {
      try {
        this.getid();
        let res = await this.$api.goodOne(this.id); //这里的id是分类页传过来的
        this.goods_One = res.goods.goodsOne;
        this.image = this.goods_One.image;
        this.image_path = this.goods_One.image_path;
        this.detail = this.goods_One.detail;
        this.current_id = this.goods_One.id; //单个商品里面的id
        this.isCollection();
        // console.log(this.goods_One);
      } catch (e) {
        console.log(e);
      }
    },
    //接收单个商品的id
    getid() {
      this.id = this.$route.query.id;
      // console.log(this.id);
    },
    //跳转到购物车页面
    toshop_cart() {
      this.$router.push("/shoppingCart");
    },
    //加入购物车
    addShopping() {
      this.addShop(this.id);
    },
    //收藏单个
    async collection() {
      try {
        let res = await this.$api.collection(this.goods_One); //id:商品的id
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //取消收藏单个商品
    async cancelCollection() {
      try {
        let res = await this.$api.cancelCollection(this.current_id);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //查询是否都藏
    async isCollection() {
      try {
        let res = await this.$api.isCollection(this.current_id);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //切换搜藏与取消收藏
    _click() {
      this.flag = !this.flag;
      if (this.flag === true) {
        this.background = "red";
        this.collection(this.goods_One);
        Toast("已收藏");
      } else {
        this.background = "";
        this.cancelCollection(this.current_id);
        Toast("已取消收藏");
      }
    },

    //加入购物车
    async addShop() {
      try {
        let res = await this.$api.addShop(this.current_id); //id:商品的id
        if (res.code === 200) {
          Toast("成功加入购物车");
        }
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //去登录页面
    gologin() {
      this.$router.push("/login");
    },

    //控制弹窗是否显示
    Buynow() {
      this.show = false;
      if (this.show == false) {
        this.show = true;
      }
    },
    //去购物车
    toCompute() {
      this.$router.push("/clearing_house");
    },
    //返回上一页
    go_back(){
      history.back()
    },
  },
  mounted() {
    this.goodOne();
    this.alreadyEvaluated()
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>
<style scoped lang="scss">
.Recycling {
  height: 400px;
}
.getback {
  height: 30px;
  width: 30px;
  background: #787879;
  border-radius: 50%;
  text-align: left;
  margin: 2% 0 0 2%;
  position: fixed;
  z-index: 3;
}
.getback div {
  text-align: center;
  line-height: 30px;
  color: white;
  font-size: 20px;
}
.titles {
  height: 50px;
  line-height: 50px;
  padding-left: 3%;
  font-size: 16px;
}
.cost {
  color: #ff4444;
  padding-left: 3%;
}
.box {
  display: flex;
  justify-content: space-between;
  padding: 0 3% 0 3%;
  color: #9999a6;
  height: 40px;
  line-height: 40px;
}
.box1 {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  height: 40px;
  padding: 0 3% 0 3%;
}
.box1-1 {
  display: flex;
  justify-content: space-around;
  width: 150px;
}
.box1-1-1 {
  background: #ff4444;
  color: white;
  padding: 0 2%;
}
.print {
  position: fixed;
  bottom: 27%;
  left: 2%;
  /*display: flex;*/
  /* justify-content: space-between;*/
}
.goods {
  height: 100px;
  border-bottom: #e5e5e5 1px solid;
}
.costs {
  margin-left: 33%;
  height: 30px;
  line-height: 30px;
}
.price {
  color: #ff4444;
}
.box3 {
  display: flex;
  justify-content: space-between;
  height: 100px;
  line-height: 100px;
  padding: 0 3%;
  border-bottom: 1px solid #e5e5e5;
}
.box3_ {
  line-height: 50px;
}
.box3_ span {
  color: #ff4444;
}
.button_ {
  width: 100%;
  margin-top: 5%;
}
.shouc {
  /*background: #ff4444;*/
}
</style>
