<template>
  <div class="cart-list">
    <cart-list-item v-for="(item, index) in list" :key="index" :cart-product="item"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import cartListItem from "@/views/shopcart/chlidrenComponents/CartListItem";
export default {
  name: "CartList",
  components: {
    cartListItem
  },
  computed: {
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>

<style scoped>

</style>
