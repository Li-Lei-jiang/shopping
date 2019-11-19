<template>
  <div>
    <div class="F3">
      <div class="food3"><span>F3</span>营养奶品</div>
    </div>
    <div class="i_mage">
      <div v-for="item in F3_food" :key="item.id">
        <div class="tup"><img :src="item.image" width="187" /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "F3",
  components: {},
  props: {},
  data() {
    return {
      F3_food: []
    };
  },
  methods: {
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.F3_food = res.data.floor3;
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
.F3 {
  /*background: white;*/
  margin: 2% 0;
}
.food3 {
  text-align: center;
  background: #eeeeee;
  color: #ff4444;
  font-weight: bold;
}
.food3 span {
  width: 50px;
  background: #ff4444;
  border-radius: 50%;
  height: 50px;
  line-height: 50px;
  font-size: 25px;
  font-weight: bold;
  color: white;
}
.i_mage {
  display: flex;
  flex-wrap: wrap;
}
.tup {
  width: 187px;
  margin: 0;
  padding: 0;
}
</style>
