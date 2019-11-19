<template>
  <div>
    <div class="getback" @click="tomember">
      <div><van-icon name="arrow-left" /></div>
    </div>
    <div class="top">个人资料</div>
    <div class="personal">gighuym</div>
    <div class="personal">头像</div>
    <div class="personal">
      用户名 <span class="personal_txt cole">{{ user_data.username }}</span>
    </div>
    <div class="personal">
      昵称
      <input type="text" class="personal_txt" v-model="user_data.nickname" />
    </div>
    <div class="personal">
      性别 <input type="text" class="personal_txt" v-model="user_data.gender" />
    </div>
    <div class="personal">邮箱</div>
    <div class="personal">出生年月</div>
    <div class="box">
      <van-button type="primary" class="butt">保存</van-button>
    </div>
    <div class="box" @click="tomember">
      <van-button type="default" class="butt">取消</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalData",
  components: {},
  props: {},
  data() {
    return {
      user_data: {}, //得到用户数据
      gender: "", //性别
      username: "", //用户名
      nickname: "", //昵称
      id: "", //id
      year: "", //年
      month: "", //月
      day: "", //日
      avatar: "" //头像
    };
  },
  methods: {
    //获取用户信息
    async user() {
      try {
        let res = await this.$api.user();
        this.user_data = res.userInfo;
        //初始化
        this.username = res.userInfo.username;
        this.nickname = res.userInfo.nickname;
        this.id = res.userInfo.id;
        this.year = res.userInfo.year;
        this.month = res.userInfo.month;
        this.day = res.userInfo.day;
        this.avatar = res.userInfo.avatar;
        console.log(this.user_data);
        // alert(11)
      } catch (e) {
        console.log(e);
      }
    },
    //返回按钮
    tomember() {
      this.$router.push("/member");
    }
    //保存
    // saveUser(){},
  },
  mounted() {
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
.getback {
  height: 30px;
  width: 30px;
  text-align: left;
  margin: 2% 0 0 2%;
  position: fixed;
}
.getback div {
  text-align: center;
  line-height: 30px;
  font-size: 25px;
}
.top {
  height: 50px;
  line-height: 50px;
  /*background: #e30c7b;*/
  text-align: center;
  font-size: 20px;
  border-bottom: 1px solid #f5f6f8;
}
.personal {
  height: 60px;
  line-height: 60px;
  padding-left: 5%;
  border-bottom: #f5f6f8;
}
.personal_txt {
  margin-left: 10%;
  height: 30px;
  border: 0;
}
.cole {
  color: #cacaca;
}
.butt {
  height: 50px;
  width: 200px;
  margin: 3% 0;
}
.box {
  text-align: center;
}
</style>
