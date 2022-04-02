<template>
  <div>
    <van-nav-bar
      title="订单"
      left-arrow
      @click-left="$router.push('/shop')"
    />
    <div class="order">您的订单已支付成功</div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.order{
    width:95%;
    margin:10px 2% 0 2%;
    text-align: center;
    line-height: 30px;
}
</style>