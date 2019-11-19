<template>
  <div id="menber">
    <div class="top">会员中心</div>
    <div class="bgcole">
      <div class="set" @click="personalData">
        <van-icon name="setting-o" size="1.5em" />
      </div>
      <div class="headportrait">
        <van-image
          round
          width="5rem"
          height="5rem"
          :src="uers.avatar"
        ></van-image>
      </div>
      <div class="use">
        欢迎您: <span>{{ uers.nickname }}</span>
      </div>
      <div class="esc" @click=" Out">
        {{ show }}
      </div>
    </div>
    <div class="operation">
      <div >
        <van-icon name="balance-pay" size="2em" />
        <div>待付款</div>
      </div>
      <div>
        <van-icon name="free-postage" size="2em" />
        <div>待发货</div>
      </div>
      <div >
        <van-icon name="points" size="2em" />
        <div>待收货</div>
      </div>
      <div @click="evaluate">
        <van-icon name="thumb-circle-o"  size="2em" />
        <div>评价</div>
      </div>
      <div @click="completed">
        <van-icon name="like-o" size="2em" />
        <div>已完成</div>
      </div>
    </div>
    <div class="order">
      <div class="row" @click="toallindent">
        <van-icon name="records" size="1.5em" class="ico"></van-icon>
        <span class="box1">全部订单</span> <span class="box2"> > </span>
      </div>
      <div class="row" @click="tocollect">
        <van-icon name="star-o" size="1.5em" class="ico"></van-icon>
        <span class="box1">收藏商品</span> <span class="box2"> > </span>
      </div>
      <div class="row" @click="tosite">
        <van-icon name="location-o" size="1.5em" class="ico"></van-icon>
        <span class="box1">地址管理</span> <span class="box2"> > </span>
      </div>
      <div class="row" @click="tolatest">
        <van-icon name="eye-o" size="1.5em" class="ico"></van-icon>
        <span class="box1">最近浏览</span> <span class="box2"> > </span>
      </div>
    </div>
  </div>
</template>

<script>
// import { Dialog } from "vant";
export default {
  name: "Member",
  components: {},
  props: {},
  data() {
    return {
      code: "",
      show: "退出登录",
      flag: false,
      uers: [] //装用户数据
    };
  },
  methods: {
    //退出登录
    async loginOut() {
      try {
        let res = await this.$api.loginOut();
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //退出确认
    Out() {
      this.flag = !this.flag;
      if (this.flag === true) {
        this.$dialog
          .confirm({
            title: "退出",
            message: "确认退出吗？"
          })
          .then(() => {
            this.loginOut();
            this.gologin();
            this.show = "登录";
          });
      } else {
        this.show = "退出登录";
      }
    },
    //获取用户信息
    async user() {
      try {
        let res = await this.$api.user();
        this.uers = res.userInfo;
        // console.log(this.uers);
        //
      } catch (e) {
        console.log(e);
      }
    },
    //跳转路由部分
    //全部订单
    toallindent() {
      this.$router.push("/allindent");
    },
    //收藏
    tocollect() {
      this.$router.push("/collect");
    },
    //管理
    tosite() {
      this.$router.push("/site");
    },
    //最近浏览
    tolatest() {
      this.$router.push("/latest");
    },
    //个人中心
    personalData() {
      this.$router.push("/personalData");
    },
    //评价
    evaluate() {
      this.$router.push("/evaluate");
    },
    //已完成
    completed() {
      this.$router.push("/completed");
    },
    //退出后去登陆
    gologin() {
      this.$router.push("/login");
    }
  },
  mounted() {
    // this.loginOut();
    this.user();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#menber {
  margin: 0;
  padding: 0;
}
.top {
  text-align: center;
  font-size: 25px;
  /*font-weight: bold;*/
  margin: 2% 0;
}
.bgcole {
  height: 200px;
  background: #e30c7b;
}
.set {
  text-align: right;
  color: white;
  padding: 3% 3% 0 0;
}
.headportrait {
  text-align: center;
}
.use {
  font-size: 25px;
  text-align: center;
  margin: 2% 0;
  color: white;
}
.esc {
  text-align: center;
  color: white;
  margin: 2% 0;
}
.operation {
  display: flex;
  justify-content: space-around;
  margin: 5% 0;
  height: 70px;
  /*line-height: 60px;*/
  border-bottom: 1px solid #cacaca;
}
.operation div {
  text-align: center;
}
.order {
  margin-left: 3%;
  line-height: 50px;
  height: 50px;
}
.row {
  height: 50px;
  line-height: 50px;
  position: relative;
  border-bottom: 1px solid #cacaca;
}
.ico {
  height: 50px;
  line-height: 50px;
}
.box1 {
  height: 50px;
  line-height: 50px;
  margin-left: 3%;
}
.box2 {
  height: 50px;
  line-height: 50px;
  position: absolute;
  right: 8%;
  font-size: 20px;
}
</style>
