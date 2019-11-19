<template>
  <div id="all">
    <div id="head">
      title
    </div>
    <div id="centers">
      <div>
        <div id="classify">
          <div
            class="taxon"
            v-for="(item, index) in goryName"
            :key="index"
            v-on:click="addClass(index)"
            v-bind:class="{ bgColors: index == left_index }"
            rel="external nofollow"
          >
            {{ item.mallCategoryName }}
          </div>
        </div>
      </div>
      <div id="details">
        <!--        这里的v-if作用是控制是否显示-->
        <div v-if="top_arr">
          <van-tabs v-model="activeName" @click="_click">
            <van-tab
              :name="item.mallSubId"
              v-for="(item, index) in top_arr"
              :key="index"
              :title="item.mallSubName"
            >
              <div
                v-for="(item, index) in allList"
                :key="index"
                id="particulars"
                @click="toDetailsage(item.id)"
              >
                <div class="tup">
                  <img :src="item.image_path" width="100" />
                </div>
                <div>
                  <div class="names">{{ item.name }}</div>
                  <div class="price">
                    <span class="sp1">￥{{ item.present_price }}</span>
                    <span class="sp2">{{ item.orl_price }}</span>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Classify",
  components: {},
  props: {},
  data() {
    return {
      current: 0, //动态循环点击事件
      activeKey: 0,
      activeName: "a",
      goryName: [], //分类总大类数据
      SubName: "", //分类详情名
      left_index: 0, //保存左边的index 值
      top_arr: [], //顶部导航的数组
      toparr_index: "", //顶部的id
      name: "", //保存得到的顶部id
      allList: [], //拿到所有详情类目的具体数据
      tolerant: "",
      page: "" //拿到第几页
    };
  },
  methods: {
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.goryName = res.data.category; //左边的类名
        this.init(); //加载初始化第0列0行的数据
        // console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    },
    addClass(index) {
      this.left_index = index; //保存左边的index 值//获取到左边顶部的类名组
      this.top_arr = this.goryName[this.left_index].bxMallSubDto; // 想要获取到top_arr数组的每一项索引,那么给一个点击事件
      // console.log(this.top_arr);
    },
    _click(name) {
      //获取到 top_arr里面的每一项id
      this.toparr_index = name; //这里的id 等于:name="item.mallSubId" 顶部的id
      // this.name = this.toparr_index;//这里的name是data中用于接收保存的name 这里相当于把顶部的id保存下来
      this.category(); //然后点击谁谁就调取
      console.log(this.toparr_index);
      //
    },
    async category() {
      //接口调取方法
      try {
        //这一步是点击后获得
        let res = await this.$api.category(this.toparr_index); //传值展示数据
        this.allList = res.dataList; //得到展示的数据
        // this.page = res.dataList.length;
        // console.log(this.page);
      } catch (e) {
        console.log(e);
      }
    },
    async init() {
      //接口调取方法
      try {
        //这里是默认加载项
        let res = await this.$api.category(
          this.goryName[0].bxMallSubDto[0].mallSubId
        ); //拿到0行0列的数据
        this.top_arr = this.goryName[0].bxMallSubDto; //得到顶部的第0个
        this.allList = res.dataList; //得到展示的数据
      } catch (e) {
        console.log(e);
      }
    },
    toDetailsage(id) {
      console.log(id);
      this.$router.push({ path: "/detailsage", query: { id: id }});
    }
  },
  mounted() {
    this.recommend();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.bgColors {
  /*background: #ff5700;*/
  background: white;
}
#all {
  background: #f1f8ff;
  position: relative;
}
#head {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  font-size: 25px;
  background: white;
  border-bottom: #cacaca 1px solid;
  position: relative;
}
#centers {
  display: flex;
}
#classify {
  width: 100px;
  padding: 0;
  font-family: 仿宋;
  color: #7d7e80;
  position: relative;
  /*margin-top: 50px;*/
  /*margin-right: 100px;*/
  left: 0;
  top: 0;
  z-index: 3;
}
.taxon {
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: #cacaca 1px solid;
}
#details {
  flex: 1;
  background: white;
}
#particulars {
  display: flex;
}
#particulars .tup {
  margin: 0 4%;
}
#particulars .names {
  white-space: nowrap; //文字强制一行
  text-overflow: ellipsis; //超出省略号
  overflow: hidden;
  width: 150px;
  color: red;
  font-weight: bold;
  font-family: 仿宋;
  margin: 5% 0;
}
#particulars .price {
  margin: 5% 0;
}
.price .sp1 {
  color: red;
  font-weight: bold;
  font-size: 20px;
  margin-right: 5%;
}
.price .sp2 {
  color: #7d7e80;
  text-decoration: line-through; //划去斜杠
  font-size: 15px;
}
</style>
