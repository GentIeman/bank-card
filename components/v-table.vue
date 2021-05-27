<template>
  <section class="block">
    <div class="block__inner">
      <div class="block__content">
        <div class="block__form-card">
          <p class="block__form-header form-header">Card Number</p>
          <input id="cardNumber" type="text" min="0" v-mask="cardNumberMask" class="form-card form-card-number" v-model="cardNumber"
                 placeholder="0000 0000 0000 0000">
        </div>
        <div class="block__form-card">
          <p class="block__form-header form-header">Card Holders</p>
          <input id="userName" type="text" class="form-card form-card-username" v-model="cardHolders"
                 placeholder="Josh Smith" :onkeyup="this.cardHolders = this.cardHolders.replace(/[0-9]/g,'')" @click="showCVV">
        </div>
        <div class="block__form-card form-card-date">
          <p class="block__form-header form-header">Expiration Date</p>
          <div class="block__form-date">
            <select class="form-card form-card-month" v-model="cardMonth">
              <option value="" disabled selected>Month</option>
              <option :value="n < 10 ? '0' + n : n" v-for="n in 12" :key="n">
                {{ n < 10 ? '0' + n : n }}
              </option>
            </select>
            <select class="form-card form-card-year" v-model="cardYear">
              <option value="" disabled selected>Year</option>
              <option :value="$index + minCardYear" v-for="(n, $index) in 12" :key="n">
                {{ $index + minCardYear }}
              </option>
            </select>
          </div>
        </div>
        <div class="block__form-card form-card-min">
          <p class="block__form-header form-header">CVV</p>
          <input id="cvv" maxlength="3" type="text" class="form-card form-card-cvv" v-model="cvv" placeholder="123" :onkeyup="this.cvv = this.cvv.replace(/[^\d]/g,'')">
        </div>
        <div class="block__submit-btn">
          <button class="submit-btn" @click="addData">Submit</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: "v-table",
  data: () => ({
    minCardYear: new Date().getFullYear(),
    cardNumber: '',
    cardHolders: '',
    cardMonth: '',
    cardYear: '',
    cvv: '',
    cardMask: "#### #### #### ####",
    isShowCVV: false
  }),
  computed: {
    ...mapGetters(['getData']),
    cardNumberMask() {
      return this.cardMask;
    }
  },
  methods: {
    ...mapActions({addNewData: 'addNewData'}),
    addData() {
      this.addNewData({
        number: this.cardNumber,
        holder: this.cardHolders,
        year: this.cardYear,
        month: this.cardMonth,
        cvv: this.cvv
      })
      this.cardNumber = '';
      this.cardHolders = '';
      this.cardYear = '';
      this.cardMonth = '';
      this.cvv = '';

      console.log(this.getData)
    },
    showCVV() {
      return this.isShowCVV = true
    }
  },
}
</script>

<style scoped lang="stylus">
.block {
  display flex
  justify-content center
  align-items center
  position absolute
  top 50%
  left 70%
  transform translate(-50%, -50%)
  width 500px
  height 500px
  border solid 1px #000
  border-radius 10px

  &__inner {
    display flex
    justify-content center
    align-items center
    position relative
    width 90%
    height 90%

    .block__content {
      position absolute
      display flex
      justify-content center
      flex-wrap wrap
      width 100%
      height 60%

      .block__submit-btn {
        position relative
        top 20px

        &:active {
          top: 23px;
        }
      }

      .submit-btn {
        padding 15px 40px
        color #fff
        background-color #0072FF
        border none
        border-radius 5px
        cursor pointer
        font-size 1.1em
      }

      .block__form-card {
        display flex
        align-items flex-start
        flex-direction column
        width 100%
        cursor pointer

        .form-card-cvv {
          width 100%
          height 30px
        }

        .block__form-date {
          position relative

          .form-card-month, .form-card-year {
            width 100px
          }
        }

        .form-card {
          width 100%
          height 30px
          color #838383
          outline none
          padding 0 10px

          &:focus {
            border solid 2px #0072FF
          }
        }

        .block__form-header {
          position relative
        }

        .form-header {
          font normal 1.3em 'Open Sans', sans-serif
          color #7c7c7c
        }
      }

      .form-card-date {
        display flex
        flex-direction column
        width 50%
      }

      .form-card-min {
        width 50%
      }
    }
  }
}
</style>
