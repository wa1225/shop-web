<template>
  <van-address-list
    v-model="chosenAddressId"
    :list="list"
    :disabled-list="disabledList"
    disabled-text="以下地址超出配送范围"
    default-tag-text="默认"
    @add="onAdd"
    @edit="onEdit"
    @select="onSelect"
  />
</template>

<script>
export default {
  data() {
    return {
      chosenAddressId: "",
      list: [],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号",
        },
      ],
      addressIndex: "",
      addressSelectId: "",
      addressSelectIndex:"",
    };
  },
  mounted() {
    if (localStorage.getItem("addressEdit")) {
      const addressList = JSON.parse(localStorage.getItem("addressEdit"));
      addressList.forEach((item) => {
        item.address = item.addressDetail;
      });
      // console.log(addressList)
      // addressList.address = JSON.parse(
      //   localStorage.getItem("addressEdit")
      // ).addressDetail;
      // this.list.push(addressList);
      this.list = addressList;
      console.log(this.list);
    } else {
      return;
    }
    console.log(localStorage.getItem("addressEdit"));
  },
  methods: {
    onAdd() {
      this.$toast("新增地址");
      this.$router.push("/addressEdit");
    },
    onEdit(item) {
      // console.log(item)
      this.list.forEach((items, index) => {
        // console.log(items)
        if (item === items) {
          this.addressIndex = index;
        }
      });
      this.$toast("编辑地址:" + this.addressIndex);
      console.log(this.addressIndex);
      this.$router.push({
        path: "/addressModify",
        query: {
          key: this.addressIndex,
        },
      });
    },
    Edit(content) {
      this.list.push(content);
    },
    onSelect(content) {
      console.log(this.chosenAddressId);
      console.log(content);
      let contents = JSON.parse(localStorage.getItem("addressEdit"));
      if (contents) {
        contents.forEach((item,index) => {
          if (item.id == content.id) {
            this.addressSelectId = item.id;
            this.addressSelectIndex = index;
          }
        });
        console.log(this.addressSelectId);
        console.log(this.addressSelectIndex)
      }
      this.$router.push({
        path:"/order",
        query:{
          id:this.addressSelectId,
          index:this.addressSelectIndex
        }
      })
    },
  },
};
</script>

<style>
</style>