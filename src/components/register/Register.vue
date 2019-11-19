<template>
  <div id="login">
    <div class="getback" @click="tologin">
      <div><</div>
    </div>
    <div class="login-bg">
      <div class="head">
        <div>注册</div>
      </div>
      <!--      输入用户密码账号-->
      <div class="uses">
        <div class="impot">
          <input type="text" placeholder="USERNAME" v-model="USERNAME" />
        </div>
        <div class="impot">
          <input type="text" placeholder="PASSWORD" v-model="PASSWORD" />
        </div>
      </div>
      <!--      验证码-->
      <div id="verify">
        <div class="wenz">验证码</div>
        <div class="shur">
          <input type="text" placeholder="请输入验证码" v-model="auth_code" />
        </div>
        <div class="yanzm" v-html="codes" @click="changereplaceVerify"></div>
      </div>
      <!--  注册按钮-->
      <div class="butt">
        <span
          ><van-button type="primary" @click="register">注册</van-button></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "Register",
  components: {},
  props: {},
  data() {
    return {
      codes: "", //获取到的验证码
      USERNAME: "", //输入的账号
      PASSWORD: "", //输入的密码
      auth_code: "" //输入的验证码
    };
  },
  methods: {
    //注册
    async register() {
      console.log(this.USERNAME);
      console.log(this.PASSWORD);
      console.log(this.auth_code);
      try {
        let res = await this.$api.register(
          this.USERNAME,
          this.PASSWORD,
          this.auth_code
        );
        console.log(res);
        if (res.code === 200) {
          Dialog({ message: "注册成功" });
          this.tologin();
        } else if (res.code === -1) {
          Dialog({ message: "用户名已存在" });
        }
      } catch (e) {
        console.log(e);
      }
    },
    //注册默认验证码
    async getAverify() {
      try {
        let res = await this.$api.getAverify();
        this.res = res.substr(7);
        // console.log(this.res);
        this.$axios
          .req("/api" + this.res)
          .then(res => {
            //返回成功数据
            this.codes = res.data;
            // console.log(res);
          })
          .catch(err => {
            //返回失败数据
            console.log(err);
          });
      } catch (e) {
        console.log(e);
      }
    },
    //请求更换验证码
    changereplaceVerify() {
      this.getAverify();
    },
    //去登录界面
    tologin() {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.changereplaceVerify();
  },
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
  background: #787879;
  border-radius: 50%;
  text-align: left;
  margin: 2% 0 0 2%;
  position: fixed;
}
.getback div {
  text-align: center;
  line-height: 30px;
}
#login {
  margin: 0;
  padding: 0;
  background-image: url("../../../public/login.jpg");
  height: 100vh;
  /*position: relative;*/
}
.login-bg {
  background: white;
  width: 95%;
  position: relative;
  top: 20%;
  left: 2.5%;
}
.head {
  line-height: 40px;
  height: 40px;
  font-size: 20px;
  padding: 2% 0 0 5%;
}
.uses {
  margin: 0 0 0 5%;
}
.impot {
  height: 41px;
  line-height: 40px;
  margin: 3% 3% 0 0;
  border-bottom: 1px solid #cacaca;
}
.impot input {
  border: 0;
  margin: 0;
  padding: 0;
}
#verify {
  display: flex;
  /*justify-content: space-between;*/
  height: 50px;
  line-height: 50px;
  margin: 3%;
}
#verify .yanzm {
  width: 28%;
  height: 48px;
  /*background: #1aad19;*/
  margin: 0 3%;
}
.yanzm input {
  /*background: #ff4444;*/
  width: 100%;
  height: 40px;
  border: 0;
}
#verify .shur {
  height: 48px;
  width: 40%;
  /*border-bottom: 1px solid #cacaca;*/
}
.shur input {
  height: 45px;
  border: 0;
  width: 100%;
}
#verify .wenz {
  height: 48px;
  line-height: 50px;
  margin: 0 3%;
}
.butt {
  margin: 5% 0 5% 3%;
  height: 130px;
  line-height: 100px;
  text-align: center;
}
</style>
