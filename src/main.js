import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./http/api";
//vant
import Vant from "vant";
import "vant/lib/index.css";
//搜索
import { Search } from "vant";
//底部布局
import { Row, Col } from "vant";
//图标样式
import { Icon } from "vant";
//轮播图
import { Swipe, SwipeItem } from "vant";
//平滑滚动
// import BScroll from 'better-scroll'直接应用 不需要引入
//骨架屏
import { Skeleton } from "vant";
//侧边导航栏
import { Sidebar, SidebarItem } from 'vant';
//商品导航
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from 'vant';
//图片预览
import { ImagePreview } from 'vant';
//输入框
import { Field } from 'vant';
//图片剪切插件
import { Image } from 'vant';
//axios
import axios from "axios";
import http from "./http";
// //弹窗提示
// import { Dialog } from 'vant';
//评价星星
import { Rate } from 'vant';
//上传图片
import { Uploader } from 'vant';
//单选框
import { RadioGroup, Radio } from 'vant';
//轻提示
import { Toast } from 'vant';
import { Overlay } from 'vant';
//遮罩层
Vue.use(Overlay);
//弹出层
import { Popup } from 'vant';

Vue.use(Popup);
// 进步器
import { Stepper } from 'vant';

Vue.use(Stepper);
//地址编辑
import { AddressEdit } from 'vant';

Vue.use(AddressEdit);
//地址列表
import { AddressList } from 'vant';

Vue.use(AddressList);
//商品卡片
import { Card } from 'vant';

Vue.use(Card);
//分割线
import { Divider } from 'vant';

Vue.use(Divider);














Vue.use(Toast);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Uploader);
Vue.use(Rate);
// Vue.use(Dialog);
Vue.prototype.$axios = http;
Vue.use(Image);
Vue.use(Field);
Vue.use(ImagePreview);
//商品导航
Vue
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton);

Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Skeleton);
Vue.use(Swipe).use(SwipeItem);

Vue.use(Icon);
Vue.use(Row).use(Col);
Vue.use(Search);
Vue.use(Vant);

Vue.config.productionTip = false;
Vue.prototype.$api = api;
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
