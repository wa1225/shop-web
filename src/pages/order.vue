<!-- 订单页面 -->
<template>
  <div>
    <van-nav-bar
      title="确认订单"
      left-arrow
      @click-left="$router.push('/shop')"
    />
    <div class="top-nav">
      <div class="in-top" @click="jump">
        <span v-if="this.list.length == 0">请选择您的收货地址</span>
        <van-address-list :list="list" />
      </div>
    </div>

    <!-- 123 -->
    <div class="middle-a">
      <div class="top-one">
        <div>
          <i class="iconfont icongouwuche"></i>
          <span>品牌精选</span>
        </div>
        <div>
          <span>已免运费</span>
          <span></span>
          <span>
            <a href>领券</a>
          </span>
        </div>
      </div>
      <div v-for="(item, index) in cartlist" :key="index">
        <div class="goods-one">
          <a href="#">
            <img :src="item.img" alt />
            <div class="bbox">
              <span>{{item.goodsname}}</span>

              <div class="pic clearfix">
                <span>¥</span>
                <span>{{ item.price }}</span>
                <div class="fr">
                  <i class="iconfont icon-chenghao"></i>
                  <span class="span-1">{{ item.num }}</span>
                </div>
              </div>
              <div>
                <div class="div3">7天无理由退货</div>
                <div class="div4">特价</div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="div-aa">
        <span>发票类型</span>
        <div>
          <span class="www">不开发票</span>
          <i class="iconfont icongt"></i>
        </div>
      </div>

      <div class="div-aa">
        <span>售后免邮</span>
        <span>部分商家赠送</span>
      </div>

      <div class="div-aa">
        <span>买家留言</span>
        <span>填写内容需要与商家协商并确认，45字以内</span>
      </div>
    </div>
    <!-- 123 -->
    <div class="middle-b">
      <div class="div-aa">
        <span>商品金额</span>

        <span>¥{{ this.totalPrice }}</span>
      </div>
      <div class="div-aa div-ab">
        <span>优惠活动</span>
        <span>-¥0</span>
      </div>
      <div class="div-aa">
        <span>优惠券</span>
        <span>新人可用</span>
      </div>
      <div class="div-aa">
        <span>售后免邮</span>
        <span>部分商家赠送</span>
      </div>
      <div class="div-aa">
        <span>售后评价</span>
        <span>良好</span>
      </div>
    </div>
    <div class="fix-0">
      <div class="div-b">
        <span>合计</span>
        <span>已免运费</span>
      </div>
      <div class="div-c">
        <span>¥{{ this.totalPrice }}</span>
        <span>已优惠¥0元</span>
      </div>

      <div class="div-d">
        <button  @click="confirmOrder">确认订单</button>
      </div>
    </div>
  </div>
</template>
<script>
import { areaList } from "@vant/area-data";
import { getCartDelete } from "../util/axios";
export default {
  data() {
    return {
      areaList,
      list: [],
      cartlist: [],
      totalPrice: "",
    };
  },
  mounted() {
    // 地址栏的获取
    if (this.$route.query.id && this.$route.query.index) {
      if (localStorage.getItem("addressEdit")) {
        let contents = JSON.parse(localStorage.getItem("addressEdit"));
        contents.forEach((item) => {
          if ((item.id = this.$route.query.id)) {
            item.address = item.addressDetail;
          }
        });
        let addressSelectIndex = this.$route.query.index;
        this.list.push(contents[addressSelectIndex]);
      } else {
        return;
      }
    }
    // 商品信息的获取
    if (localStorage.getItem("cartlistEdit")) {
      this.cartlist = JSON.parse(localStorage.getItem("cartlistEdit"));
      console.log(this.cartlist);
    }
    // 订单总价的获取
    if (
      localStorage.getItem("cartlistEdit") &&
      localStorage.getItem("totalPrice")
    ) {
      this.totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
    }
  },
  methods: {
    jump() {
      this.$router.push("/addressList");
    },
    confirmOrder() {
      if (this.list.length !== 0) {
        this.cartlist.forEach((item,index)=>{
          console.log(item,index)
          console.log(item.id)
          console.log(this.cartlist[index].id)
          this.getCartDeletes(index)
        })
          this.$router.push({path:'/shop'})
      } else {
        this.$toast("请选择地址后再次确认订单信息");
      }
    },
    // 删除
    getCartDeletes(index) {
      getCartDelete({
        id: this.cartlist[index].id,
      });
    },
  },
};
</script>

<style scoped>
@import "../assets/css/order.css";
html {
  width: 100%;
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
  background-color: #f2f2f2;
}
.fix {
  min-width: 320px;
  max-width: 750px;
  position: fixed;
  width: 100%;
  height: 1.66rem;
  background-color: #fff;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  padding: 0.1rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.fix .text1 {
  width: 100%;
  height: 0.8rem;
  display: flex;
  justify-content: space-between;
}
.fix .text1 .sbox {
  width: 0.9rem;
  height: 0.78rem;
}
.fix .text1 .sbox a {
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #999999;
}
.fix .text1 .sbox .tu {
  position: relative;
  width: 0.36rem;
  height: 0.4rem;
}
.fix .text1 .sbox img {
  width: 0.36rem;
  height: 0.4rem;
  background-color: #fff;
}
.fix .text1 .sbox span {
  /* position: absolute;
    bottom: 0;
     left: 50%;
    transform: translateX(-50%); */
  font-size: 0.24rem;
  transform: scale(0.8);
}
.fix .text1 .sbox .shang-bg {
  position: absolute;
  top: 0;
  left: 0;

  z-index: 2;
}
.fix .text1 .sbox .xia-bg {
  position: absolute;
  top: 0;
  left: 0;

  z-index: 0;
}

.fix .text1 .sbox a:hover span {
  color: #ff6040;
}

.fix .text1 .sbox a:hover .shang-bg {
  z-index: -1;
}
.fix .text2 {
  width: 2.68rem;
  height: 0.68rem;
}
.fix .text2 img {
  width: 100%;
  height: 100%;
}
.van-address-item__edit {
  display: none;
}
.van-address-list__bottom {
  display: none;
}
.goods-one{
  margin-bottom:20px
}
</style>