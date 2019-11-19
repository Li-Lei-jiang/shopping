<template>
  <div class="kuang">
    <div class="top">
      <div class="go-1" @click="upPage"><van-icon name="arrow-left" /></div>
      城市列表
    </div>
    <div>
      <form action="/" class="ipt">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch(value)"
          @cancel="onCancel"
        ></van-search>
      </form>
    </div>
    <div v-if="arr.length>0" class="shows">
      <div v-for="item in arr" :key="item.id"
           class="show_name" @click="checkcity(item)">{{item.name}}</div>
    </div>
    <div v-else>
      <div class="Tt_city">当前城市</div>
      <div class="butt_one">
        <van-button type="default" class="butt_ones">{{
          current_city
          }}</van-button>
      </div>
      <div class="Hot_city">热门城市</div>
      <div class="hot_search">
        <div class="butt_tow">
          <van-button
              type="default"
              class="butt_tows"
              v-for="item in hot_city"
              :key="item.id"
          >{{ item.name }}</van-button
          >
        </div>
      </div>
      <div>
        <div>
          <van-index-bar v-for="(item, index) in Obj" :key="index">
            <van-index-anchor :index="item" />
            <div v-for="(item1, index1) in cities[item]" :key="index1">
              <van-cell :title="item1.name" />
            </div>
          </van-index-bar>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import city from "../../../needful/city";
export default {
  name: "City",
  components: {},
  props: {},
  data() {
    return {
      cities: [],
      Obj: {},
      arr:[],
      value: "",
      hot_city: [],
      current_city: ""
    };
  },
  methods: {
    //拿到传过来的值
    getcity() {
      this.current_city = this.$route.query.city;
      // console.log(this.$route.query.city);
    },
    //导入的城市列表
    city() {
      this.cities = city.data.cities; //拿到城市数据 数据类型对象
      this.hot_city = city.data.hotCities; //拿到热门城市
      // console.log(city.data.cities);
      this.Obj = Object.keys(city.data.cities); //拿到大写字母标题
      // console.log(typeof (Object.keys(city.data.cities)));
    },
    //Search 组件提供了search和cancel事件，search事件在点击键盘上的搜索
    // /回车按钮后触发，cancel事件在点击搜索框右侧取消按钮时触发search
    // 确定搜索时触发	value: 输入框当前值 要获取 key 值
    onSearch(value) {
      if (value.trim() !== "") {
        // console.log(value);
        let arr1 = [];
        for (let i in this.cities) {
          this.cities[i].forEach(item => {
            if (item.name.includes(value)) {
          arr1.push(item);
            }
          });
        }
        this.arr = arr1
        console.log(arr1);
      }
      else {
        this.arr = [];
      }
    },
    onCancel() {
      this.arr = []
    },
    //搜索选中的城市
    checkcity(){
      // this.name =this.value;
    },
    //返回上一页
    upPage(){
      this.$router.back()
    }
  },
  mounted() {
    this.city();
    this.getcity();
  },
  created() {},
  filters: {
    getcity(value) {
      return value.indexOf(value);
    }
  },
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.top {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: white;
  margin-bottom: 3%;
}
.go-1 {
  position: fixed;
  padding-left: 5%;
}
.kuang {
  background: #e5e5e5;
}
.ipt {
  width: 90%;

  margin: 0 auto;
  height: 50px;
}
.Tt_city {
  height: 40px;
  line-height: 40px;
  padding-left: 4%;
}
.butt_one {
  background: white;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.butt_ones {
  margin-left: 5%;
  background: #e5e5e5;
  height: 30px;
  line-height: 30px;
}
.Host_sell {
  height: 40px;
  line-height: 40px;
  margin: 3% 0;
}
.Hot_city {
  height: 40px;
  line-height: 40px;
  padding-left: 4%;
}
.hot_search {
  display: flex;
  /*flex-wrap: wrap;*/
  /*justify-content: space-around;*/
  height: 80px;
  line-height: 40px;
  background: white;
  margin-bottom: 1%;
}
.butt_tow {
  margin: 0 auto;
  /*width: 60%;*/
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.butt_tows {
  background: #e5e5e5;
  height: 30px;
  line-height: 30px;
  /*text-align: center;*/
  width: 100px;
  margin: 1% 0;
}
  .shows{
    background:white;
  }
  .show_name{
    line-height: 50px;
    padding-left: 5%;
    height: 50px;
  }
</style>
