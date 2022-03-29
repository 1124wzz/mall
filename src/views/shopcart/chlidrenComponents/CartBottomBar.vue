<template>
  <div class="cart-bottom-bar">
    <check-button class="check-button"
                  :value="isActive"
                  @checkClick="btnClick"/>
    <span class="all-check">全选</span>
    <span class="totalPrice">合计:￥{{totalPrice}}</span>
    <span class="settlement" @click="calculation">去结算({{length}})</span>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters({
      list: 'cartList',
      length: 'cartLength'
    }),
    totalPrice() {
      return this.list.filter((item) => item.checked).reduce((prev,item) => {
        return prev + item.price*item.count
      }, 0).toFixed(2)
    },
    isActive() {
      if(this.list.length === 0) return false
      return !this.list.find(item => !item.checked)
    },
  },
  methods: {
    btnClick() {
      if(this.isActive) {
        this.list.forEach(item => item.checked = false)
      }else {
        this.list.forEach(item => item.checked = true)
      }
    },
    calculation() {
      if(!this.isActive) {
        this.$toast.show('请先添加商品!', 1500)
      }
    }
  }
}
</script>

<style scoped>
  .cart-bottom-bar {
    position: fixed;
    bottom: 44px;
    display: flex;
    align-items: center;
    height: 44px;
    width: 100%;
    background-color: #eeeeee;
  }
  .check-button {
    margin-left: 10px!important;
  }
  .all-check {
    margin-left: 10px;
  }
  .totalPrice {
    display: flex;
    margin-left: 50px;
    flex: 1;
  }
  .settlement {
    display: flex;
    width: 120px;
    justify-content: center;
    align-items: center;
    background-color: red;
    color: white;
    height: 44px;
  }
</style>
