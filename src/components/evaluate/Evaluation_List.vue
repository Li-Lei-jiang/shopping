<template>
  <div>
    <div class="top">
      <div class="getback" @click="toevaluate">
        <van-icon name="arrow-left" size="1.5em" />
      </div>
      <div>评价中心</div>
    </div>
    <div class="star_level">
      <div class="commodity_img">
        <img :src="Obj.image_path" alt="" width="100" />
      </div>
      <div class="estimate">
        <div>商品评价</div>
        <div class="star">
          <van-rate
            v-model="value"
            allow-half
            @change="change"
            void-icon="star"
            void-color="#eee"
          ></van-rate>
        </div>
      </div>
    </div>
    <div class="compile">
      <input
        type="textarea"
        placeholder="说说你的购买感受吧~~"
        class="eisodic"
        v-model="text"
      />
    </div>
    <div>
      <van-uploader v-model="fileList" multiple />
    </div>
    <div class="butts">
      <van-radio-group v-model="radio">
        <van-radio name="1" v-mold="false">匿名评价</van-radio>
      </van-radio-group>
    </div>
    <div class="box">
      <van-button type="primary" class="butt" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Evaluation_List",
  components: {},
  props: {},
  data() {
    return {
      value: 2.5, //评分的值
      radio: "0 ", //是否匿名评价
      false: false,
      Obj: {}, //接收传过来的对象
      id: "", //商品的id
      observer: {}, //自创对象
      text: "", //评论输入的内容
      fileList: [
        //上传的图片文件
        { url: "" }
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      ]
    };
  },
  methods: {
    //拿到传过来的待评论商品对象
    geObj() {
      this.Obj = this.$route.query.item;
      this.id = this.Obj.cid;
      console.log(this.Obj);
      this.comment(this.Obj);
    },
    //商品评价商品评论(id,rate,content, anonymous(是否匿名), _id, order_id, image=[])
    async comment() {
      try {
        this.observer = {
          id: this.id,
          rate: this.value,
          content: this.text,
          image: [],
          anonymous: this.radio,
          _id: this.Obj._id,
          order_id: this.Obj.order_id
        };
        let res = await this.$api.comment(this.observer);

        //
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    change(val) {
      this.value = val;
      console.log(this.value);
    },
    //提交评价
    submit() {
      this.comment();
      this.$toast("提交评论成功");
      this.$router.push("/evaluate");
    },
    // //查询单个评价
    // async evaluateOne () {
    //   try {
    //     let res = await this.$api.evaluateOne (this.id_);
    //     console.log(res);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },

    //返回按钮
    toevaluate() {
      this.$router.push("/evaluate");
    },
    // 返回布尔值
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        Toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.geObj();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.getback {
  height: 50px;
  width: 50px;
  text-align: left;
  padding-left: 4%;
  position: fixed;
}
.top {
  text-align: center;
  line-height: 50px;
  height: 50px;
  border-bottom: 1px solid #e5e5e5;
}
/*. getback div{*/
/*  !*height: 50px;*!*/
/*  !*line-height: 50px;*!*/
/*  !*!*background: #e30c7b;*!*!*/
/*  !*text-align: center;*!*/
/*  !*font-size: 20px;*!*/
/*  !*border-bottom: 1px solid #f5f6f8;*!*/
/*}*/
.star_level {
  display: flex;
  margin: 3% 0;
}
.commodity_img {
  width: 100px;
  height: 100px;
  margin-left: 3%;
}
.estimate {
  padding-left: 10%;
}
.star {
  margin: 5% 0;
}
.compile {
  background: #f6f6f6;
  height: 200px;
  width: 100%;
  line-height: 16px;
}
.eisodic {
  height: 20px;
  width: 100%;
  background: #f6f6f6;
  border: 0;
}
.box {
  text-align: center;
  /*width: 70%*/
}
.butt {
  height: 50px;
  width: 200px;
  margin: 3% 0;
}
.butts {
  height: 50px;
  line-height: 50px;
}
</style>
