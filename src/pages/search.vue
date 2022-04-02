<!-- 搜索页面 -->
<template>
  <div class="box">
    <!-- 上侧搜索栏 -->
    <div class="header-search">
      <div class="header-search-inside">
        <button class="search-reset" @click="reset()">返回</button>
        <input
          class="search-input"
          type="text"
          placeholder="搜索商品，发现更多"
          v-model="queryForm.inputValues"
        />
        <button class="search-button" @click="search()">搜索</button>
      </div>
    </div>
    <ul class="blank_input" v-show="this.state">
      <li v-for="item in list" :key="item.id" @click="hotSearchClick(item.id)">
        {{ item.catename }}
      </li>
      <span v-show="this.nodata">无数据</span>
    </ul>
    <!-- 热门搜索 -->
    <div v-show="this.hot_search" class="hot-search">
      <span class="hot-search-span">热门搜索</span>
      <ul>
        <li v-for="item in search_input" :key="item.id">
          <button @click="hotSearchClick(item.id)">{{ item.catename }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCate } from "../util/axios";
export default {
  data() {
    return {
      queryForm: {
        inputValues: "",
      },
      search_input: [
        {
          id: "1",
          ccNm: "家用电器",
        },
        {
          id: "2",
          ccNm: "手机通讯",
        },
        {
          id: "3",
          ccNm: "电脑办公",
        },
        {
          id: "4",
          ccNm: "家居",
        },
        {
          id: "5",
          ccNm: "服装",
        },
        {
          id: "6",
          ccNm: "男鞋",
        },
        {
          id: "7",
          ccNm: "女鞋",
        },
        {
          id: "8",
          ccNm: "化妆品",
        },
        {
          id: "9",
          ccNm: "运动户外",
        },
      ],
      // 判断搜索下拉列表是否展示
      state: false,
      list: [],
      hot_search: true,
      nodata: false,
    };
  },
  mounted(){
    this.getCate()
  },
  methods: {
        //获取首页分类
    async getCate() {
      // console.log(res.list)
      this.search_input = await getCate({});
      console.log(this.search_input);
    },
    //   热门搜索选项点击方法
    hotSearchClick(id) {
      console.log(id);
      this.$router.push({
        path:'/first_show',
        query:{
          id
        }
      })
    },
    //   顶部导航栏搜索方法
    search() {
      this.list = []
      console.log("我搜索了", this.queryForm.inputValues);
      if (
        this.queryForm.inputValues !== "" &&
        this.queryForm.inputValues !== null
      ) {
        let val = "";
        val = this.queryForm.inputValues;
        this.search_input.some((item) => {
          if (val == item.catename) {
            this.list.push(item);
            this.state = true;
            this.nodata = false;
            this.hot_search = false
            console.log(this.list)
            return true
          } else {
            console.log("无数据");
            this.state = true;
            this.nodata = true;
            this.hot_search = false
          }
        });
      } else {
        console.log("请输入后在进行搜索");
        this.state = false;
        this.nodata = false;
      }
    },
    // 返回按钮点击方法
    reset() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
/* 最外侧 */
.box {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  box-sizing: border-box;
  flex-direction: column;
  background-color: #fff;
}
/* 顶部搜索栏 */
.header-search {
  width: 100%;
  height: 50px;
  background-color: yellow;
  position: relative;
}
/* 顶部搜索内栏 */
.header-search-inside {
  width: 100%;
  height: 30px;
  position: absolute;
  top: 9px;
  left: 0;
  line-height: 30px;
}
/* 顶部搜索输入框 */
.search-input {
  border: 1px solid black;
  width: 65%;
  height: 100%;
  border-radius: 6px;
  padding-left: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
/* 顶部搜索显示下拉框 */
.blank_input {
  /* border: 1px solid black; */
  width: 65%;
  height: 200px;
  border-radius: 6px;
  padding-left: 10px;
  margin-left: 51px;
  margin-right: 10px;
  background-color: #fff;
  z-index: 10;
  margin-top: 20px;
}
.blank_input li {
  border: 1px solid black;
  list-style: none;
  display: inline-block;
  height: 25px;
  text-align: center;
  line-height: 22px;
  background-color: #e8e8e8;
  border-radius: 6px;
  margin-bottom: 5%;
  padding: 2px;
}
/* 顶部搜索按钮 */
.search-button {
  float: right;
  margin-right: 10px;
}
/* 顶部返回按钮 */
.search-reset {
  margin-left: 10px;
  float: left;
}
/* 热门搜索 */
.hot-search {
  width: 100%;
  height: 200px;
}
/* 热门搜索四个字 */
.hot-search-span {
  display: block;
  width: calc(100%-20px);
  height: 15px;
  margin-top: 20px;
  padding-left: 20px;
  margin-bottom: 20px;
}
.hot-search ul li {
  list-style: none;
  display: inline-block;
  width: 25%;
  height: 25px;
  text-align: center;
  line-height: 22px;
  background-color: #e8e8e8;
  border-radius: 6px;
  margin-left: 6%;
  margin-bottom: 5%;
  padding: 5px 0px;
}
/* 搜索分类 */
.shop-class {
  width: 100%;
  flex: 1;
}
</style>