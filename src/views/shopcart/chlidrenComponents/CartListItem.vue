<template>
  <div class="cart-list-item">
    <div class="check-button" >
      <check-button :value="cartProduct.checked" @checkClick="checkClick"/>
    </div>
    <div class="cart-left">
      <img :src="cartProduct.image" alt="">
    </div>
    <div class="cart-right">
      <span class="cart-title">{{ cartProduct.title }}</span>
      <span class="cart-desc">{{ cartProduct.desc }}</span>
      <div class="cart-bottom">
        <span class="cart-price left">￥{{ cartProduct.price }}</span>
        <span class="right">x{{ cartProduct.count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "CartListItem",
  props: {
    cartProduct: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      this.cartProduct.checked = !this.cartProduct.checked
    },

  }
}
</script>

<style scoped>
  .cart-list-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .cart-left {
    padding: 5px;
  }
  .check-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14%;
  }
  .cart-left img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .cart-right {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .cart-right .cart-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .cart-title, .cart-desc {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .cart-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .cart-bottom .cart-price {
    color: orangered;
  }
</style>
