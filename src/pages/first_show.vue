<!-- 一级分类展示页面 -->
<template>
  <div>
    <!-- 标题 -->
    <div class="top">
      <button class="reset" @click="reset()">
        <van-icon name="revoke" />返回
      </button>
      <span class="">小U商城</span>
    </div>
    <!-- 搜索栏 -->
    <div class="search_cation">
      <div class="search_content">
        <span class="iconfont">&#xe50b;</span>
        <input type="text" name="search" placeholder="按内容搜索" />
      </div>
      <!-- nav栏目 -->
      <div class="nav">
        <ul>
          <li class="active">综合推荐</li>
          <li>销量</li>
          <li>价格<span class="iconfont">&#xe692;</span></li>
          <li>好评度</li>
          <li>店铺</li>
          <li><span class="iconfont">&#xe50e;</span>筛选</li>
        </ul>
      </div>
    </div>

    <!-- 筛选双11 -->
    <div class="double">
      <h1>筛选11.11大促商品</h1>
    </div>

    <!-- 商品列表 -->
    <div class="wrap">
      <div
        class="list"
        v-for="item in send"
        :key="item.id"
        @click="deil(item.id)"
      >
        <div class="left">
          <img :src="item.img" alt="图片消失了" />
        </div>
        <div class="right">
          <h3>{{ item.catename }}</h3>
          <p class="p1">敏感肌可用,控油祛痘、男女可用...</p>
          <font>
            <span class="sp1"><i>￥</i>{{ item.price }}</span>
            <span class="sp2">￥{{ item.market_price }}</span>
            <span class="sp3">999人已付款</span>
          </font>
          <p class="p2">11.11限时299元起</p>
          <p class="p3">
            <span>999条评论</span>
            <span>99.9%好评</span>
          </p>
        </div>
      </div>
      <div class="showData" v-show="this.showData">错误...数据消失了</div>
    </div>
  </div>
</template>

<script>
import { getTree } from "../util/axios";
export default {
  data() {
    return {
      send: [],
      activeKey: 0,
      showData: false,
    };
  },
  mounted() {
    console.log(-1);
    console.log(this.$route.query.id);
    this.getTree();
  },
  methods: {
    async getTree() {
      this.activeKey = this.$route.query.id;
      console.log(this.activeKey, "this.activeKey");
      const like = await getTree();
      console.log(like, "like");
      like.forEach((item) => {
        console.log(item.id == this.activeKey);
        if (item.id == this.activeKey) {
          if (item.children) {
            this.showData = false;
            this.send = item.children;
            console.log(this.send, "this.send", item.children, "item.children");
            console.log(item.id, "item.id", this.activeKey, "this.activeKey");
          } else {
            this.showData = true;
            console.log("无数据");
          }
          // throw ""
        }
      });
      console.log(this.send, "this.send");
    },
    // 返回按钮点击方法
    reset() {
      this.$router.push("/home");
    },
    deil(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style src='../assets/css/list.css' scoped>
.box {
  width: 100%;
  height: 100%;
}
.box ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.box ul li {
  width: 100%;
  height: 150px;
  margin-top: 10%;
}
.box ul li a {
  width: 100%;
  height: 100%;
}
.box ul li img {
  width: 40%;
  margin-left: 10%;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10%;
}
.showData {
  width: 90%;
  height: 150px;
  text-align: center;
  line-height: 150px;
  border: 1px solid black;
  border-radius: 6px;
  margin: 10% 4%;
}
/* 顶部返回按钮 */
.search-reset {
  margin-left: 10px;
  margin-top: 10px;
  float: left;
  border: 1px solid black;
  border-radius: 6px;
  text-align: center;
  padding: 8px 10px;
}
</style>