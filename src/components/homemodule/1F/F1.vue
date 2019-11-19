<template>
  <div class="F1">
    <div class="fool"><span>1F</span>休闲食品</div>
    <div class="i_mage">
      <div  v-for="item in F1_food" :key="item.id">
        <div class="tup"><img :src="item.image" width="187"/></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "F1",
  components: {},
  props: {},
  data() {
    return {
      F1_food: []
    };
  },
  methods: {
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.F1_food = res.data.floor1;
        // console.log(this.F1_food);
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
.F1 {
  /*background: white;*/
  margin: 2% 0;
}
.fool {
  text-align: center;
  background: #eeeeee;
  color: #ff4444;
  font-weight: bold;
}
.fool span {
  width: 50px;
  background: #ff4444;
  border-radius: 50%;
  height: 50px;
  line-height: 50px;
  font-size: 25px;
  font-weight: bold;
  color: white;
}
  .i_mage{
    display: flex;
    flex-wrap: wrap;
  }
  .tup{
    width: 187px;
    margin: 0;
    padding: 0;
  }
</style>
