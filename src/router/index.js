import Vue from "vue";
import VueRouter from "vue-router";
import Common from "../views/conmon/Common";
import End from "../views/end/End";
import Homepage from "../views/homepage/Homepage";

Vue.use(VueRouter);

const routes = [
  {
    //重定向
    path: "/",
    redirect:'/Homepage'
  },
  {
    //主页
    path: "/homepage",
    component: Common,//公共页
    children: [
      {
        path: "",
        name: "homepage",
        component:Homepage
      }
    ]
  },
  {
    //分类
    path: "/classify",
    component:End,
    children: [
      {
        path: "",
        name: "classify",
        component: () => import("../components/classify/Classify")
      }
    ]
  },
  {
    //会员中心
    path: "/member",
    component: End,
    children: [
      {
        path: "",
        name: "member",
        component: () => import("../views/member/Member")
      }
    ]
  },
  {
    //购物车
    path: "/shoppingCart",
    component: End,
    children: [
      {
        path: "",
        name: "shoppingCart",
        component: () => import("../views/shoppingCart/ShoppingCart")
      }
    ]
  },
  {
    //详情页
    path: "/detailsage",
    name: "detailsage",
    component: () => import("../components/classify/detailsage/Detailsage")
  },
  {
    //城市列表页
    path: "/city",
    name: "city",
    component: () => import("../views/conmon/location/City")
  },
  {
    //结算页
    path: "/clearing_house",
    name: "clearing_house",
    component: () => import("../components/clearing_house/Clearing_house")
  },
  {
    //登录页
    path: "/login",
    name: "login",
    component: () => import("../components/login/Login")
  },
  {
    //注册页
    path: "/register",
    name: "register",
    component: () => import("../components/register/Register")
  },
  {
    //全部订单
    path: "/allindent",
    name: "allindent",
    component: () => import("../views/member/allindent/Allindent")
  },
  {
    //收藏
    path: "/collect",
    name: "collect",
    component: () => import("../views/member/collect/Collect")
  },
  {
    //地址管理
    path: "/site",
    name: "site",
    component: () => import("../views/member/site/Site")
  },
  {
    //编辑地址
    path: "/redact_location",
    name: "redact_location",
    component: () => import("../views/member/site/Redact_location")
  },
  {
    //最近浏览
    path: "/latest",
    name: "latest",
    component: () => import("../views/member/latest/Latest")
  },
  {
    //个人中心
    path: "/personalData",
    name: "personalData",
    component: () => import("../views/member/personalData/PersonalData")
  },
  {
    //我的订单
    path: "/bill",
    name: "bill",
    component: () => import("../components/bill/Bill")
  },
  {
    //评价
    path: "/evaluate",
    name: "evaluate",
    component: () => import("../components/evaluate/Evaluate")
  },
  {
    //评价晒单页
    path: "/evaluation_List",
    name: "evaluation_List",
    component: () => import("../components/evaluate/Evaluation_List")
  },
  {
    //评价详情页
    path: "/evaluation_details",
    name: "evaluation_details",
    component: () => import("../components/evaluate/Evaluation_details")
  },
  {
    //已完成
    path: "/completed",
    name: "completed",
    component: () => import("../components/completed/Completed")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
