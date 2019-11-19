<template>
  <div>
    <!--    头部-->
    <div id="head">
      <Location></Location>
      <div>
        <div id="SE">
          <van-search
            placeholder="请输入搜索关键词"
            v-model="value"
            @search="value"
            @blur="event"
            class="boxs"
          ></van-search>
        </div>
      </div>
      <div class="right" @click="search(value)">搜索</div>
    </div>
    <div v-if="value" class="shows">
      <div v-for="(item, index) in list" :key="index">
        <div class="names">{{ item.name }}</div>
      </div>
    </div>
<!--        底部-->
    <End></End>
  </div>
</template>

<script>
import Location from "./location/Location"; //定位
import End from "../end/End"; //底部
export default {
  name: "Home",
  components: {
    End,
    Location
  },
  props: {},
  data() {
    return {
      show: false,
      value: "",
      page: 1,
      list: [] //接收搜索到的数据
    };
  },
  methods: {
    //search    搜索 参数： value：搜索关键词
    async search(value) {
      try {
        this.value = value;
        let res = await this.$api.search(value);
        res.data.list.forEach(item => {
          if (item.name.indexOf(value) != -1) {
            this.list.push(item);
          }
        });
        console.log(this.list);
      } catch (e) {
        console.log(e);
      }
    },
    event() {
      this.list = [];
    },
    getContainer() {
      return document.querySelector("van-search");
    }
    //高德api
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style>
.van-search {
  width: 270px;
}
</style>
<style>
.left {
}
.left_gps {
  border: 0;
  background: #f2f2f2;
}
#head {
  z-index: 3;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #f2f2f2;
  line-height: 50px;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
}
#head .right {
  padding-right: 3%;
  color:  #666666;
}
/*头部*/
#SE {
  padding: 0;
  margin: 0;
  /*height: 50px;*/
  width: 90%;
}

.boxs{
  width: 100%;
  height: 50px;
  /*background: #666666;*/
}
.shows {
  background: white;
  width: 100%;
  position: absolute;
  z-index: 10;
  overflow: hidden;
}
.names {
  line-height: 50px;
  height: 50px;
  padding-left: 5%;
}
</style>
