<template>
  <div>
    <div class="top">
      <div class="back_go" @click="go_back"><van-icon name="arrow-left" /></div>
      <div>最近浏览</div>
    </div>
    <div v-for="(item,index) in all_record" :key="index">
      <van-card
          :price="item.present_price"
          :title="item.name"
          :thumb="item.image_path"
      ></van-card>
      <div @click="delete_record(index)"><van-icon name="close" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Latest",
  components: {},
  props: {},
  data() {
    return {
      all_record:[],
      No_list:[],
      Yes_list:[],
    };
  },
  methods: {
    //返回上一页
    go_back() {
      this.$router.back();
    },
    //拿到未评价和已评价
    // async alreadyEvaluated(){
    //   try {
    //     let res = await this.$api.alreadyEvaluated();
    //     this.Yes_list = res.data.list
    //     this.Yes_list.forEach(item=>{
    //       this.all_record.push(item)
    //     })
    //     console.log(this.all_record);
    //     // console.log(res);
    //   }catch (e) {
    //     console.log(e);
    //   }
    // },
    async tobeEvaluated(){
      try {
        let res = await this.$api.tobeEvaluated();
        this.No_list = res.data.list;
        this.No_list.forEach(item=>{
          this.all_record.push(item)
        })
        // console.log(this.all_record);
      }catch (e) {
        console.log(e);
      }
    },
  //删除记录
    delete_record(index){
      this.all_record.splice(this.all_record.indexOf(index),1)
      this.$toast('删除成功')

    },
  },
  mounted() {
    this.tobeEvaluated();
    // this.alreadyEvaluated();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.top {
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e5e5e5;
}
.back_go {
  position: fixed;
  padding-left: 4%;
  left: 0;
  top: 0;
}
</style>
