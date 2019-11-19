<template>
  <div>
    <div class="F2">
      <div class="foo2"><span>2F</span>新鲜水果</div>
    </div>
    <div class="i_mage">
      <div v-for="item in F2_food" :key="item.id">
        <div class="tup"><img :src="item.image" width="187" /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "F2",
  components: {},
  props: {},
  data() {
    return {
      F2_food: []
    };
  },
  methods: {
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.F2_food = res.data.floor2;
        // console.log(this.F2_food);
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
.F2 {
  /*background: white;*/
  margin: 2% 0;
}
.foo2 {
  text-align: center;
  background: #eeeeee;
  color: #ff4444;
  font-weight: bold;
}
.foo2 span {
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
