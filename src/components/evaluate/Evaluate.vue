<template>
  <div>
    <div class="getback" @click="tomember">
      <div><van-icon name="arrow-left" /></div>
    </div>
    <div class="top">评价中心</div>
    <div class="bg_print"></div>
    <div class="evaluate_select">
      <van-tabs v-model="active">
        <van-tab title="待评价" >
          <div v-for="(item,index) in No_list" :key="index">
            <div><img :src="item.image_path" alt="" width="150px"></div>
            <div>{{item.name}}</div>
            <div @click="tobask(item)">
              <div><van-icon name="chat" /></div>
              <div >评论晒单</div>
            </div>
          </div>

        </van-tab>
        <van-tab title="已评价">
          <div v-for="(item,index) in Yes_list" :key="index">
            <div v-for="(item1,index1) in item.goods" :key="index1">
              <div><img :src="item1.image" alt="" width="100"></div>
              <div>{{item1.name}}</div>
              <div @click="todetails(item,name)">
                <div><van-icon name="chat" /></div>
                <div >评论详情</div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Evaluate",
  components: {},
  props: {},
  data() {
    return {
      active: "1",
      No_list:[],
      Yes_list:[],
      No_id:'',
      goods:[],
      name:'',//用户名
    };
  },
  methods: {
    //查询待评价
    async tobeEvaluated() {
      try {
        let res = await this.$api.tobeEvaluated();
        this.No_list = res.data.list;
        // console.log(this.No_list);
      } catch (e) {
        console.log(e);
      }
    },
    //查询已评价
    async alreadyEvaluated() {
      try {
        let res = await this.$api.alreadyEvaluated( );
        this.Yes_list = res.data.list
        console.log(this.Yes_list);
      } catch (e) {
        console.log(e);
      }
    },
    //获取用户名
    async user() {
      try {
        let res = await this.$api.user();
        this.name = res.userInfo.nickname;
        // console.log(this.name);
        //
      } catch (e) {
        console.log(e);
      }
    },
    //返回按钮
    tomember() {
      this.$router.push("/member");
    },
    tobask(item){
      console.log(item);
      this.$router.push({path:"/evaluation_List",query:{item}});
    },
    todetails(item,name){
      // console.log(item,name);
      this.$router.push({path:"/evaluation_details",query:{item,name:this.name}})
    },
  },
  mounted() {
    this.tobeEvaluated()
    this.alreadyEvaluated()
    this.user()
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
.bg_print {
  height: 150px;
  background-image: url("../../../public/evaluate.jpg");
}
.evaluate_select {
  position: absolute;
  z-index: 3;
  width: 95%;
  /*background: #ff4444;*/
  height: 50px;
  line-height: 50px;
  top: 47.667vw;
  left: 2.5%;
  box-shadow: 2px 5px 5px #cacaca;
}
</style>
