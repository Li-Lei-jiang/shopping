<template>
  <div id="login">
    <div class="getback">
      <div><van-icon name="arrow-left" /></div>
    </div>
    <div class="login-bg">
      <div class="head">
        <div>登录 / 注册</div>
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
      <!--      验证手机码-->
      <div class="number">
        <div class="mobile">手机号码</div>
        <div class="note">
          <input
            type="text"
            placeholder="仅注册需要"
            height="40px"
            class="note-ipt"
          />
        </div>
      </div>
      <!--    短信验证码-->
      <div id="SMS">
        <van-cell-group>
          <van-field
            v-model="sms"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
          >
            <van-button slot="button" size="small" type="primary"
              >发送验证码</van-button
            >
          </van-field>
        </van-cell-group>
      </div>
      <!--      验证码-->
      <div id="verify">
        <div class="wenz">验证码</div>
        <div class="shur">
          <input type="text" placeholder="请输入验证码" v-model="auth_code" />
        </div>
        <div
          class="yanzm"
          v-html="verify_input"
          @click="changereplaceVerify"
        ></div>
      </div>
      <!--      登录注册按钮-->
      <div class="butt">
        <span><van-button type="primary" @click="login">登录</van-button></span>
        <span class="box2" @click="toregister"
          ><van-button type="danger">注册</van-button></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      // codes:'',
      sms: "",
      USERNAME: "", //输入的账号
      PASSWORD: "", //输入的密码
      auth_code: "", //输入的验证码
      verify_input: "" //得到的验证码
    };
  },
  methods: {
    //登录
    async login() {
      try {
        let res = await this.$api.login(
          this.USERNAME,
          this.PASSWORD,
          this.auth_code
        );
        // console.log(res);
        if (res.code === 200) {
          Dialog({ message: "登录成功" });
          this.goHomepage();
          this.keeplogin()
        } else if (res.code === -1) {
          Dialog({ message: "您还没有注册" });
        }
      } catch (e) {
        console.log(e);
      }
    },
    //登录默认验证码
    async getAverify() {
      try {
        let result = await this.$api.getAverify(); //得到默认的api
        this.result = result.substr(7); //处理aip
        this.$axios
          .req("/api" + this.result) //请求上面得到的api,注意，字符链接的方式
          .then(res => {
            //返回成功数据
            this.verify_input = res.data;
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
    //去注册页
    toregister() {
      this.$router.push("/register");
    },
    //去主页
    goHomepage() {
      this.$router.push("/homepage");
    },
    //保持登录
    async keeplogin(){
      try {
        let res = await this.$api.keeplogin()
        console.log(res);
      }catch (e) {
        console.log(e);;
      }
    },
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
  background-image: url("../../../public/th.jpg");
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
.number {
  display: flex;
  /*justify-content: space-between;*/
  height: 45px;
  line-height: 40px;
  margin: 2% 3%;
  border-bottom: 1px solid #cacaca;
}
.mobile {
  width: 100px;
  margin: 0 0 0 3%;
}
.note {
  height: 40px;
  flex: 1;
}
.note-ipt {
  height: 35px;
  width: 93%;
  flex: 1;
  border: 0;
}
#SMS {
  height: 50px;
  font-size: 15px;
  border-bottom: 1px solid #cacaca;
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
}
.box2 {
  margin-left: 10%;
}
</style>
