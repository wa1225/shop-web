<!--修改地址-->
<template>
  <van-address-edit
    :area-list="areaList"
    :address-info="AddressInfo"
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
import { areaList } from "@vant/area-data";

export default {
  data() {
    return {
      areaList,
      searchResult: [],
      AddressInfo: {
        name: "",
        tel: "",
        country: "",
        province: "",
        city: "",
        county: "",
        areaCode: "",
        postalCode: "",
        addressDetail: "",
        isDefault: false,
        id: "",
        address: "",
      },
      contents: [],
      keys: "",
    };
  },
  mounted() {
    if (localStorage.getItem("addressEdit")) {
      console.log(this.$route.query.key);
      if (this.$route.query.key) {
        this.keys = this.$route.query.key;
        console.log(this.keys);
        let keys = this.keys;
        this.AddressInfo = JSON.parse(localStorage.getItem("addressEdit"))[
          keys
        ];
        console.log(this.AddressInfo);
      }
    }
  },
  methods: {
    onSave(content) {
      console.log(localStorage.historyData);
      this.$toast("modify");
      content.id = Date.now();
      console.log(content);
      this.contents = JSON.parse(localStorage.getItem("addressEdit"));
      let keys = this.$route.query.key;
      this.contents[keys] = content;
      localStorage.setItem("addressEdit", JSON.stringify(this.contents));
      console.log(localStorage.getItem("addressEdit"));
      this.$router.push("/addressList");
    },
    onDelete(content) {
      if (this.$route.query.key) {
        this.$toast("delete");
        this.contents = JSON.parse(localStorage.getItem("addressEdit"));
        let keys = this.$route.query.key;
        this.contents.splice(keys, 1);
        localStorage.setItem("addressEdit", JSON.stringify(this.contents));
        this.$router.push("/addressList");
      } else {
        this.$toast("选择数据后再删除");
      }
    },
  },
};
</script>

<style>
</style>