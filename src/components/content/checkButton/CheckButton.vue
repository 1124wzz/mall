<template>
  <div id="check" :class="{ check: value }" @click="checkClick">
    <img src="@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    value: Boolean,
    default: true
  },
  methods: {
    checkClick() {
      this.$emit('checkClick')
    }
  }
}
</script>

<style scoped>
  #check {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }
  .check {
    background-color: red;
    border-color: #cccccc;
  }
</style>
