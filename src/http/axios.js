import axios from "axios"; //引入axios

const server = axios.create({
  baseURL: "/api", //设定api
  timeout: 20000 //返回超时
});

//http response  拦截器
server.interceptors.response.use(response => {
  return response.data; //直接拿到想要的data 数据
});
export default server;
