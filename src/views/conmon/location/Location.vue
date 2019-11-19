<template>
  <div>
    <div class="left">
      <select class="left_gps"  @click="getcity(city)"  v-if="city">
        <option >{{city}}</option>
      </select>
      <span v-else class="show_jiaZ"><van-loading size="24px">加载中...</van-loading></span>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Location",
  components: {},
  props: {},
  data() {
    return {
      city: ""
    };
  },
  methods: {
    getcity(city){
      console.log(city,22);
      this.$router.push({path:'/city',query:{city:city}})
    },
  },
  mounted() {
   let _this= this;
    AMap.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: "RB"
      });

      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);

      function onComplete(data) {
        // data是具体的定位信息
        _this.city = data.addressComponent.city;
          // console.log(data,111);
      }

      function onError(data) {
        // 定位出错
        console.log(data);
      }
    });
  },
  created() {
    // this.plugin()
  },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
  .left{
    padding-left: 6%;
  }
#container {
  width: 300px;
  height: 180px;
}
.left_gps {
  border: 0;
  height: 50px;
  background: #f2f2f2;
}
  .show_jiaZ{
    position: fixed;
    left:-15px;top: 0;
  }
</style>
