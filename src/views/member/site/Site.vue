<template>
  <div>
    <div class="titles">
      <div class="go_back" @click="go_back"><van-icon name="arrow-left" /></div>
      <div>地址列表</div>
    </div>
    <div>
      <van-address-list
        v-model="checkedId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
      ></van-address-list>
    </div>
  </div>
</template>

<script>
// import { Toast } from "vant";

export default {
  name: "Site",
  components: {},
  props: {},
  data() {
    return {
      use_list: [],
      list: [],
      checkedId:0, //当前选中的
    };
  },
  methods: {
    //查询用户收货地址
    async getAddress() {
      try {
        let res = await this.$api.getAddress();
        this.use_list = res.address;
        this.list = this.use_list;
        let id = 1;
        this.list.forEach(item =>{
          item.id = id++
        })
        // console.log(this.list);
      } catch (e) {
        console.log(e);
      }
    },
    //返回上一页
    go_back() {
      history.back();
    },
    //去地址编辑页
    onAdd() {
      this.$router.push("/redact_location");
    },
    //修改地址
    onEdit(item) {
      this.$router.push({path:"/redact_location",query:{item:item}})
      // console.log(item);
    }
  },
  mounted() {
    // this.getDefaultAddress();
    this.getAddress();
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
.news_ {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.news {
  width: 100%;
}
.reminder {
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #cacaca;
}
</style>
