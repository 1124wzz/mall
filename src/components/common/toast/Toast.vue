<template>
  <div id="toast" v-if="isShow">
    {{message}}
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    show(message, duration) {
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = message
      },duration)
    }
  }
}
</script>

<style scoped>
  #toast {
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    height: 30px;
    line-height: 15px;
    padding: 8px 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    text-align: center;
    z-index: 10;
  }
</style>
