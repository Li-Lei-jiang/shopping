<template>
  <div>
    <div class="titles">
      <div class="go_back" @click="go_back"><van-icon name="arrow-left" /></div>
      <div>我的收藏</div>
    </div>
    <div v-for="(item, index) in trove" :key="index">
      <div><img :src="item.image_path" alt="" width="100px" /></div>
      <div>{{ item.name }}</div>
      <div>{{ item.present_price }}</div>
      <div @click="rmdir(item)"><van-icon name="close" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collect",
  components: {},
  props: {},
  data() {
    return {
      trove: [], //装收藏的商品
      cid: "",
      code:'',
    };
  },
  methods: {
    //返回上一页
    go_back() {
      history.back();
    },
    //查询收藏商品
    async getCollection(page = 1) {
      try {
        let res = await this.$api.getCollection({ page });
        this.trove = res.data.list;
        console.log(this.trove);
        // console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //删除收藏
    async rmdir(item) {
      try {
        let res = await this.$api.cancelCollection(item.cid);
        this.getCollection()
        this.$toast('取消收藏成功');
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.getCollection();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.titles {
  line-height: 50px;
  height: 50px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}
.go_back {
  position: fixed;
  padding-left: 8%;
  font-size: 20px;
}
</style>
