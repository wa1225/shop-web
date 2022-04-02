<!--新增地址-->
<template>
  <van-address-edit
  :area-list="areaList"
  show-postal
  show-delete
  show-set-default
  show-search-result
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
/>
</template>

<script>
import { areaList } from '@vant/area-data';

export default {
  data() {
    return {
      areaList,
      contents:[],
    };
  },
  mounted(){
  },
  methods: {
    onSave(content) {
      this.$toast('save');
      content.id = Date.now();
      console.log(content)
      if(localStorage.getItem('addressEdit')){
        this.contents = JSON.parse(localStorage.getItem('addressEdit'))
        content.isDefault = false
      }else{
        content.isDefault = true
      }
      this.contents.push(content)
      localStorage.setItem('addressEdit',JSON.stringify(this.contents))
      console.log(localStorage.getItem('addressEdit'))
      this.$router.push('/addressList')
    },
    onDelete() {
      this.$toast('delete');
    },
  },
};
</script>

<style>

</style>