<!-- 商品详情页 -->
<template>
  <div>
    <div class="sides" @click="reset">
      <van-nav-bar :title="deil.goodsname" left-arrow />
    </div>
    <van-tabs disabled="false">
      <van-tab title="商品">
        <img :src="deil.img" alt="" class="imgurl" />
        <div class="price">
          <p class="p1">￥{{ deil.price }}</p>
          <p class="p2">￥12.00</p>
        </div>
        <div class="title">
          <h3>{{ deil.goodsname }}</h3>
        </div>
        <div class="tag">
          <van-tag type="warning">11.11限时299起</van-tag>
        </div>
        <div class="num">
          <p>购买数量</p>
          <van-stepper v-model="num" min="1" max="8" />
        </div>
        <div class="guige">
          <h3>商品属性</h3>
          <p>
            {{ deil.specsname }}:
            <van-tag v-for="item in attrs" :key="item" type="success">{{
              item
            }}</van-tag>
          </p>
        </div>
        <div class="xiangqing">
          <p>商品详情:</p>
          <div v-html="deil.description"></div>
        </div>
      </van-tab>
      <van-tab title="评价"></van-tab>
      <van-tab title="详情"></van-tab>
      <van-tab title="推荐"></van-tab>
    </van-tabs>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="cratAdd"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
import { getinfo, getCartAdd } from "../util/axios";
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      deil: [],
      attrs: [],
      num: 1,
    };
  },
  mounted() {
    console.log(this.$route.query.id);
    this.getinfo();
  },
  methods: {
    async getinfo() {
      let res = await getinfo({
        id: this.$route.query.id,
      });
      (this.deil = res[0]), (this.attrs = res[0].specsattr.split(","));
      // console.log(this.deil[0])
      console.log(this.attrs);
    },
    async cratAdd() {
      if (!sessionStorage.getItem("user")) {
        Dialog.confirm({
          title: "未登录",
          message: "请登录后再将商品加入购物车",
        })
          .then(() => {
            this.$router.push({path:"/login",query:{id:this.$route.query.id}})
          })
          .catch(() => {
            // on cancel
          });
      } else {
        let res = await getCartAdd({
          uid: JSON.parse(sessionStorage.getItem("user")).uid,
          goodsid: this.deil.id,
          num: this.num,
        });

        if (res.code == 200) {
          Toast.success(res.msg);
          this.$router.push("/shop");
        } else if(res.code == 403){
          Toast.fail(res.msg);
          this.$router.push("/login")
        }
        // this.$router.push('/shop')
      }
    },
    reset() {
      this.$router.push({ path: "/list", query: { id: this.$route.query.fid } });
    },
  },
};
</script>

<style src='../assets/css/detail.css' scoped>
</style>
