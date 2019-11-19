<template>
  <div>
    <div class="titles">
      <div class="go_backs" @click="goback"><van-icon name="arrow-left" /></div>
      <div>地址列表</div>
    </div>
    <!-- postal：邮编  default：不执行 -search-result：搜寻结果 -->
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      :change-default="value"
      :address-info="addressinfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="deleteAddress"
      @change-detail="onChangeDetail"
    ></van-address-edit>
  </div>
</template>

<script>
import { Toast } from "vant";
import area from "../../../needful/area";
export default {
  name: "Redact_location",
  components: {},
  props: {},
  data() {
    return {
      code:'',
      areaList: area, //地区选择列表
      content: {}, //返回的表单内容
      addressinfo: {}, //收货人信息初始值
      value: "", //是否选中
      name: "", //用户名
      tel: "", //电话
      address: "", //详情地址
      isDefault: "", //是否默认
      province: "", //省
      city: "", //市
      county: "", //区
      addressDetail: "" //详情地址
    };
  },
  methods: {
    //获取用户信息
    async user() {
      try {
        let res = await this.$api.user();
        this.name = res.userInfo.nickname;
      } catch (e) {
        console.log(e);
      }
    },
    //新增收货地址//保存按钮增加收货地址
    async onSave(content) {
      //传入默认回调参数
      // 参数：name:用户名,tel:电话，address:详情地址，isDefault：是否默认
      // province：省，city：市，county：区，addressDetail：详情地址，
      //areaCode：地区代码，id：修改地址时候要传id 需要使用原生的axios 传入整个对象
      try {
        //声明一个变量用来装详细地址
        let address = `${content.province}${content.city}${content.county}${content.addressDetail}`;
        content.address = address; //回调的地址赋值给声明的变量
        content.id = this.addressinfo ? this.addressinfo._id : undefined
        let res = await this.$api.postAddress(content); //传入的参数是默认的回调参数
        console.log(res);
        if (this.code === 200){
          Toast('添加/修改成功');
        } ;
      } catch (e) {
        console.log(e);
      }
    },
    //删除收货地址
    async deleteAddress() {
      try {
        let res = await this.$api.deleteAddress(this.addressinfo._id);
        if (this.code === 200){
          Toast.success('删除成功');;
          this.addressinfo = {};
          this.$router.push('/site')
        }
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //返回上一页
    goback() {
      this.$router.back();
    },
    //修改详细地址触发
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [];
      } else {
        this.searchResult = [];
      }
    },
  },
  mounted() {
    this.user();
    this.addressinfo = this.$route.query.item;
    //  console.log(this.addressinfo);
    //  console.log(this.addressinfo,333333333333333);
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
.go_backs {
  position: fixed;
  padding-left: 8%;
  font-size: 20px;
}
</style>
