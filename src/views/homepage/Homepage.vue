<template>
  <div class="shopping ">
    <div id="index" ref="wrappers">
      <div>
        <!--      &lt;!&ndash;  轮播图&ndash;&gt;-->
        <div>
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item
              id="wheel"
              v-for="(item, index) in slides"
              :key="index"
              ><img :src="item.image" alt="" height="200px"
            /></van-swipe-item>
          </van-swipe>
        </div>
        <!--      &lt;!&ndash;                导航&ndash;&gt;-->
        <div id="text">
          <div class="colo">
            <div class="tup">
              <div v-for="(item, index) in category" :key="index">
                <img :src="item.image" alt="" height="60px" />
                <span>{{ item.mallCategoryName }}</span>
              </div>
            </div>
          </div>
        </div>
        <!--      &lt;!&ndash;    广告&ndash;&gt;-->
        <div>
          <img
            src="http://images.baixingliangfan.cn/advertesPicture/20180404/20180404085441_850.gif"
            alt=""
            width="360xp"
            id="adRate"
          />
        </div>
        <!--    商品推荐-->
        <Recommend></Recommend>
        <!--            &lt;!&ndash;    1F&ndash;&gt;-->
        <F1></F1>
        <!--      &lt;!&ndash;            &lt;!&ndash;    2f&ndash;&gt;&ndash;&gt;-->
        <F2></F2>
        <!--      &lt;!&ndash;            &lt;!&ndash;    3f&ndash;&gt;&ndash;&gt;-->
        <F3></F3>
        <!--            &lt;!&ndash;    热销商品&ndash;&gt;-->
        <Host_sell></Host_sell>
        <div style="margin-bottom: 50px;height: 50px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"; //插件
import F1 from "../../components/homemodule/1F/F1";
import F2 from "../../components/homemodule/2F/F2";
import F3 from "../../components/homemodule/3F/F3";
import Host_sell from "../../components/homemodule/host_sell/Host_sell";
import Recommend from "../../components/homemodule/recommend/Recommend";
export default {
  name: "Homepage",
  components: {
    F1,
    Recommend,
    F2,
    F3,
    Host_sell
  },
  props: {},
  data() {
    return {
      slides: "",
      category: []
    };
  },
  methods: {
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.slides = res.data.slides;
        this.category = res.data.category;
        // console.log(this.category);
        // console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.recommend();
    this.$nextTick(() => {
      // 这一坨都是引用的插件固定写法
      this.scroll = new BScroll(this.$refs.wrappers, {
        scrollY: true, //竖向平滑
        click: true, //可点击
        bounce: true //回弹
        // bounceTime: 1000
      });
    });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style>
.shopping {
  margin: 0;
  padding: 0;
  background: #ededed;
}
#index {
  /*  overflow: hidden;*/
  height: 667px;
  margin-top: 50px;
  width: 100%;
}
#text {
  margin: 3% 0;
  padding: 0;
  height: 94px;
}
#text .colo {
  background: white;
  border-radius: 5%;
  margin: 0 2%;
  padding: 3%;
}
#text .tup {
  display: flex;
  justify-content: space-around;
}

#adRate {
  margin: 3% 0;
  text-align: center;
}
</style>
