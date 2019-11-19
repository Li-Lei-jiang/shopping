<template>
  <div class="recommend" >
    <div class="titl">商品推荐</div>
    <div class="titl_com"  >
      <div v-for="(item, index) in recommended" :key="index"  ref="wrapper">
        <div><img :src="item.image" alt="" width="140" /></div>
        <div class="names">{{ item.goodsName }}</div>
        <div class="cost">
          <span class="cost1">{{ item.mallPrice }}</span
          ><span class="cost2">￥{{ item.price }}</span>
        </div>
        <div class="select">
          <div class="select_left">
            <van-goods-action-icon
              icon="cart-o"
              text="购物车"
              style="background:#FECA3A ;width: 25px"
            ></van-goods-action-icon>
          </div>
          <div class="select_rig">
            <button style="border: 0;background: #FF4C38;">查看详情</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"; //插件
export default {
  name: "Recommend",
  components: {},
  props: {},
  data() {
    return {
      recommended: [] //拿到推荐的商品数组
    };
  },
  methods: {
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.recommended = res.data.recommend;
        this.$nextTick(() => {
          //这一坨都是引用的插件固定写法
          this.scroll = new BScroll(this.$refs.wrapper, {
            scrollX: true, //竖向平滑
            click: true, //可点击
            bounce: true ,//回弹
            // bounceTime: 1000
          });
        });
        // console.log(this.recommended);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.recommend();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.recommend {
  background: white;
  margin: 0;
  padding: 0;
}
.titl {
  height: 40px;
  line-height: 40px;
  padding-left: 3%;
  margin: 2% 0;
}
.titl_com {
  display: flex;
  width: 375px;
  overflow: hidden;
}
.names {
  padding: 0 4%;
  width: 100px;
  text-align: center;
  white-space: nowrap; //文字强制一行
  text-overflow: ellipsis; //超出省略号
  overflow: hidden;
  padding: 0 2%;
}
.cost {
  width: 100px;
  margin: 2% 0;
  text-align: center;
}
.cost1 {
  font-size: 20px;
  color: red;
}
.cost2 {
  font-size: 15px;
  color: #7d7e80;
  text-decoration: line-through; //划去斜杠
  margin-left: 5%;
}
.select {
  display: flex;
  /*justify-content:center;*/
  height: 50px;
  line-height: 50px;
  margin: 0 2%;
  padding: 0;
}
.select_left {
  /*background: #FECA3A;*/
  color: white;
  width: 10%;
}
.select_rig {
  color: white;
  border-radius: 0 2% 2% 0;
  width: 10%;
}
.select_rig button {
  width: 50px;
}
</style>
