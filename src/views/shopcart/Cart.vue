<template>
  <div id="cart">
    <nav-bar class="cart-nav"><div slot="center">购物车({{length}})</div></nav-bar>
    <scroll class="content" :pull-up-load="true" ref="scroll">
      <cart-list/>
    </scroll>
  </div>
</template>

<script>

import navBar from "@/components/common/nav-bar/NavBar";
import cartList from "@/views/shopcart/chlidrenComponents/CartList";
import Scroll from "@/components/common/Scroll/Scroll";
import { mapGetters } from "vuex";

export default {
  name: 'Cart',
  data() {
    return {
      cartList: []
    }
  },
  components: {
    navBar,
    cartList,
    Scroll
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  computed: {
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style scoped>
  #cart {
    height: 100vh;
    position: relative;
    background-color: #fff;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .cart-nav {
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
  }
</style>
