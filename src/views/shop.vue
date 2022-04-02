<template>
  <div>
    <div class="top">
      <h3>购物车</h3>
    </div>
    <div class="nav">
      <ul>
        <li class="active">全部( 20 )</li>
        <li>降价( 4 )</li>
        <li>常卖( 2 )</li>
        <li>分类 ↕</li>
      </ul>
    </div>
    <div class="title">
      <div class="left">
        <p>小U自营</p>
      </div>
      <div class="right">
        <span>以免运费</span>
        <span>|</span>
        <a href="#">领卷</a>
      </div>
    </div>
    <div class="list" v-if="cartlist.length > 0">
      <van-swipe-cell v-for="(item, index) in cartlist" :key="item.id">
        <van-card
          :num="item.num"
          :price="item.price"
          desc="描述信息"
          :title="item.goodsname"
          class="goods-card"
          :thumb="item.img"
        >
          <template #tag>
            <input v-model="item.select" value="item.select" type="checkbox" />
          </template>
          <template #footer>
            <van-stepper
              v-model="item.num"
              min="1"
              max="8"
              @plus="plus(index)"
              @minus="minus(index)"
            />
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="getCartDelete(index)"
          />
        </template>
      </van-swipe-cell>
      <!-- <ul>
        <li>
          <div class="left">
            <input value="Item 1" type="checkbox" />
            <img src="../assets/images/commodity/01.png" alt />
          </div>
          <div class="right">
            <h3>溪牧原山茶花洁面泡沫 氨基...</h3>
            <p>敏感肌可用，控油祛痘、男女可...</p>
            <a href="#">粉色 50ML ⬇</a>
            <span class="sp1">比加入时降低￥100</span>
            <font class="f1">
              <span>￥</span>999
            </font>
            <font class="f2">￥1099</font>
            <button class="btn1">-</button>
            <i>1</i>
            <button class="btn2">+</button>
          </div>
        </li>
        <li>
          <div class="left">
            <input value="Item 1" type="checkbox" />
            <img src="../assets/images/commodity/02.png" alt />
          </div>
          <div class="right">
            <h3>溪牧原山茶花洁面泡沫 氨基...</h3>
            <p>敏感肌可用，控油祛痘、男女可...</p>
            <a href="#">粉色 50ML ⬇</a>
            <span class="sp1">比加入时降低￥100</span>
            <font class="f1">
              <span>￥</span>999
            </font>
            <font class="f2">￥1099</font>
            <button class="btn1">-</button>
            <i>1</i>
            <button class="btn2">+</button>
          </div>
        </li>
        <li>
          <div class="left">
            <input value="Item 1" type="checkbox" />
            <img src="../assets/images/commodity/03.png" alt />
          </div>
          <div class="right">
            <h3>溪牧原山茶花洁面泡沫 氨基...</h3>
            <p>敏感肌可用，控油祛痘、男女可...</p>
            <a href="#">粉色 50ML ⬇</a>
            <span class="sp1">比加入时降低￥100</span>
            <font class="f1">
              <span>￥</span>999
            </font>
            <font class="f2">￥1099</font>
            <button class="btn1">-</button>
            <i>1</i>
            <button class="btn2">+</button>
          </div>
        </li>
      </ul>-->
    </div>
    <div class="list" v-else>
      <van-empty description="购物车空空如也，快来消费吧" />
    </div>
    <div class="foot">
      <div class="left">
        <input v-model="SelectedAll" type="checkbox" />
        <p>全选</p>
      </div>
      <p class="p1">
        <span>合计</span>
        <i>已免运费</i>
      </p>
      <p class="p2">
        <span>{{ getTotal.totalPrice }}</span>
        <i>已优惠￥0元</i>
      </p>
      <button @click="order()">结算</button>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { getCartList, getCartEdit, getCartDelete } from "../util/axios";
export default {
  data() {
    return {
      cartlist: [],
      checked: false,
      totalPrice:""
    };
  },
  mounted() {
    this.getCartList();
  },
  computed: {
    getTotal() {
      let proList = this.cartlist.filter((item) => {
        return item.select;
      });
      let totalPrice = 0;
      for (var i = 0; i < proList.length; i++) {
        // 总价累加
        totalPrice += proList[i].num * proList[i].price;
      }
      this.totalPrice = totalPrice
      return { totalPrice: totalPrice };
    },
    // 检测是否全选
    SelectedAll: {
      get() {
        if (this.cartlist.length !== 0) {
          return this.cartlist.every((item) => item.select);
        }
      },
      set(x) {
        this.cartlist.forEach((item) => (item.select = x));
      },
    },
  },
  methods: {
    // 数量增加
    async plus(index) {
      await getCartEdit({
        id: this.cartlist[index].id,
        type: 2,
      });
      this.getCartList();
    },
    // 数量减少
    async minus(index) {
      await getCartEdit({
        id: this.cartlist[index].id,
        type: 1,
      });
      this.getCartList();
    },
    // 获取列表
    async getCartList() {
      this.cartlist = await getCartList({
        uid: JSON.parse(sessionStorage.getItem("user")).uid,
      });
      console.log(this.cartlist);
      var that = this;
      this.cartlist.map((item) => {
        that.$set(item, "select", false);
      });
    },
    // 删除
    async getCartDelete(index) {
      await getCartDelete({
        id: this.cartlist[index].id,
      });
      this.getCartList();
    },
    // 结算按钮
    order(){
      let contents = this.cartlist.filter(item=>{
        return item.select
      })
      console.log(contents,this.totalPrice)
      localStorage.setItem('cartlistEdit',JSON.stringify(contents))
      localStorage.setItem('totalPrice',JSON.stringify(this.totalPrice))
      console.log(localStorage.getItem('cartlistEdit'))
      console.log(localStorage.getItem('totalPrice'))
      if(contents.length !== 0){
        this.$router.push('/order')
      }else{
        this.$toast('请选择商品后再进行结算')
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("user")) {
      next();
    } else {
      Dialog.confirm({
        title: "未登录",
        message: "请登录后再进购物车",
      })
        .then(() => {
          next("/login");
        })
        .catch(() => {
          // on cancel
        });
    }
  },
};
</script>

<style src="../assets/css/shop.css" scoped>
/* @import "../assets/css/shop.css"; */
</style>
