<template>
  <section class="container">
    <div class="container__inner">
      <div class="container__form-card-number">
        <label for="cardNumber">Card Number
            <input id="cardNumber">
        </label>
      </div>
      <div class="container__form-card-username">
        <label for="userName">Card Holders
          <input id="userName">
        </label>
      </div>
      <div class="container__form-card-number">
        <label for="cardNumber">Card Number
          <select>
            <option value="" disabled selected>Month</option>
            <option :value="n < 10 ? '0' + n : n" v-for="n in 12" v-bind:key="n">
              {{n < 10 ? '0' + n : n}}
            </option>
          </select>
        </label>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "v-table"
}
</script>

<style scoped>

</style>
