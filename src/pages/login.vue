<template>
  <div>
    <van-nav-bar
      title="小U商城用户登录"
      left-arrow
      right-text="注册"
      @click-right="$router.push('/reg')"
      @click-left="$router.push('/mine')"
    />
    <div class="wrap">
      <!-- <img src="../assets/images/orange.png" alt="" /> -->
      <!-- 表单项 -->
      <van-form @submit="denglu">
        <van-field
          v-model="userInfo.phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, validator, message: '请填写手机号' }]"
        />
        <van-field
          v-model="userInfo.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="login" style="margin: 16px">
          <van-button round block type="info" native-type="submit" class="login_button"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Login } from "../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      userInfo: {
        phone: "",
        password: "",
      },
      detail: "",
    };
  },
  beforeRouterEnter(to, from, next) {
    if ((from = "/detail")) {
      this.detail = this.$route.query.id;
      next();
      console.log(this.detail, "this.detail");
      console.log(this.$route.query.id, "this.$route.query.id");
    }
  },
  methods: {
    validator(val) {
      return /1\d{10}/.test(val);
    },
    denglu() {
      Login(this.userInfo).then((res) => {
        if (res.code == 200) {
          sessionStorage.setItem("user", JSON.stringify(res.list));
          Toast.success(res.msg);
          if ((this.detail = this.$route.query.id)) {
            this.$router.push({ path: "/detail", query: { id: this.detail } });
          } else {
            this.$router.push("/mine");
          }
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};
</script>
<style  scoped>
body {
  background-color: #999;
}
.wrap {
  width: 7.1rem;
  height: 13.4rem;
  background-color: #ffffff !important;
  margin: 0 auto;
  margin-top: 0.2rem;
  overflow: hidden;
  background-image:none;
}
.van-nav-bar {
  background: #ff6040;
  opacity: 0.8;
  font-family: Helvetica;
  font-size: 0.34rem;
  color: #ffffff;
}
.van-field {
  margin-top: 0.5rem;
}
.van-button {
  background: #ff6040;
  outline: none;
  border: 0;
  width: 6rem;
  height: 1rem;
  border-radius: 0;
  margin: 0 auto;
}
img {
  width: 3.6rem;
  height: 0.9rem;
  margin: 0 auto;
  margin-top: 4rem;
}
.wrap .login{
  width:unset;
  height:unset;
}
.login .login_button{
  text-align: center;
  font-size:18px;
  border-radius:6pc;
}
.van-cell{
  font-size:16px;
}
.van-nav-bar__content .van-nav-bar__title{
  font-size:17px;
}
</style>