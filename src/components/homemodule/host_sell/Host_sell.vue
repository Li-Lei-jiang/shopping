<template>
  <div>
    <div class="Host_sell">
      <div class="titl"><span>热销商品</span></div>
    </div>
    <div class="i_mage">
      <div v-for="item in Host_sell" :key="item.id" class="i_mage_xh">
        <div class="tup"><img :src="item.image" width="187px" /></div>
        <div class="names">{{ item.name }}</div>
        <div class="cost">
          <span class="cost_pricp">{{ item.price }}</span>
          <span class="cost_mall">{{ item.mallPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Host_sell",
  components: {},
  props: {},
  data() {
    return {
      Host_sell: []
    };
  },
  methods: {
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.Host_sell = res.data.hotGoods;
        // console.log(this.F3_food);
      } catch (e) {
        console.log(e);
      }
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
.Host_sell {
  /*background: white;*/
  margin: 2% 0;
}
.titl {
  text-align: center;
  /*background: #eeeeee;*/
  color: #ff4444;
  font-weight: bold;
}
.titl span {
  width: 50px;
  /*background: #ff4444;*/
  /*border-radius: 50%;*/
  height: 50px;
  line-height: 50px;
  font-size: 25px;
  font-weight: bold;
  /*color: white;*/
}
.i_mage {
  display: flex;
  flex-wrap: wrap;
}
.i_mage_xh {
  width: 187px;
}
.i_mage .tup {
  width: 187px;
  margin: 0;
  padding: 0;
}
.names {
  white-space: nowrap; //文字强制一行
  text-overflow: ellipsis; //超出省略号
  overflow: hidden;
  width: 150px;
  color: red;
  font-weight: bold;
  margin: 5% 0;
}
.cost {
  text-align: center;
  width: 187px;
}
.cost_pricp {
  color: red;
  font-weight: bold;
  font-size: 20px;
  margin-right: 5%;
}
.cost_mall {
  color: #7d7e80;
  text-decoration: line-through; //划去斜杠
  font-size: 15px;
}
</style>
