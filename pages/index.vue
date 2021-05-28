<template>
  <div class="container">
    <v-table />
  </div>
</template>

<script>
export default {
  data: () => ({
    defaultNumber: '#### #### #### ####',
    defaultUserName: 'Full Name',
    defaultDate: 'MM/YY',
    defaultCvv: '',
    showBackSize: false
  }),
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.container {
  width 100%
  height 100vh
  background-color #fff
}
</style>
