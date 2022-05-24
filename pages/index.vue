<template>
  <section class="page">
    <form class="filling-form">
      <section class="card">
        <section class="card__side card__side_front">
          <header class="card__header">
            <figure class="card__chip"></figure>
            <figure class="card__payment-system">
              <img :src="'/icons/' + gettingPaymentSystem + '.svg'"
                   alt="Payment system"
                   class="card__payment-system_icon"
                   width="80"
                   height="40"
              >
            </figure>
          </header>
          <div class="card__number-wrap">
            <p class="card__number"
               :class="{'card__number_active': isFocusOnCardNumber}">
              {{ gettingCardNumber }}
            </p>
          </div>
          <footer class="card__footer">
            <div class="card__holder">
              <p class="card__subtitle">Card Holder</p>
              <p class="card__full-name medium-text"
                 :class="{'card__full-name_active': isFocusOnCardHolder}">
                {{ gettingCardHolder }}
              </p>
            </div>
            <div class="card__expires">
              <p class="card__subtitle">Expires</p>
              <time class="card__life-time medium-text" :class="{'card__life-time_active': isFocusOnExpiresDate}">{{ gettingMonth }} / {{ gettingYear }}</time>
            </div>
          </footer>
        </section>
        <section class="card__side card__side_back">
          <div class="card__line"></div>
          <div class="card__cvv-wrap" :class="{'card__cvv-wrap_active': isShowCVV}">
            <p class="card__cvv">{{ gettingCardCVV }}</p>
          </div>
        </section>
      </section>
      <label for="" class="filling-form__label label-text">Card Number
        <input type="text"
               placeholder="0000 0000 0000 0000"
               maxlength="16"
               v-model="cardNumber"
               class="filling-form__reply reply reply_focus reply_hover reply_active"
               @focus="isFocusOnCardNumber = true"
               @blur="isFocusOnCardNumber = false">
      </label>
      <label for="" class="filling-form__label label-text">Card Holders
        <input type="text"
               placeholder="Josh Smith"
               maxlength="40"
               class="filling-form__reply reply reply_focus reply_hover reply_active"
               v-model="cardHolder"
               @focus="isFocusOnCardHolder = true"
               @blur="isFocusOnCardHolder = false">
      </label>
      <div class="filling-form__expiration-wrap">
        <label for=""
               class="filling-form__label filling-form__label_row label-text">
          Expiration Date
        </label>
        <select class="filling-form__select select select_focus select_hover select_active"
                v-model="month"
                @focus="isFocusOnExpiresDate = true"
                @blur="isFocusOnExpiresDate = false">
          <option value=""
                  disabled
                  selected>Month
          </option>
          <option v-for="month in 12"
                  :key="month"
                  :value="month < 10 ? '0' + month : month">
            {{ month < 10 ? "0" + month : month }}
          </option>
        </select>
        <select class="filling-form__select select select_focus select_hover select_active"
                v-model="year"
                @focus="isFocusOnExpiresDate = true"
                @blur="isFocusOnExpiresDate = false">
          <option value=""
                  disabled
                  selected>Year
          </option>
          <option v-for="(year, index) in 30"
                  :key="year"
                  :value="index + currentYear">
            {{ index + currentYear }}
          </option>
        </select>
      </div>
      <label for="" class="filling-form__label label-text">CVV
        <input type="number"
               placeholder="123"
               class="filling-form__reply reply reply_focus reply_hover reply_active"
               v-model="cardCVV"
               v-maxlength="3"
               @focus="isShowCVV = true"
               @blur="isShowCVV = false">
      </label>
      <button type="submit" class="filling-form__submit submit submit_focus submit_active submit_hover">Submit</button>
    </form>
  </section>
</template>

<script>
export default {
  data: () => ({
    currentYear: new Date().getFullYear(),
    cardNumber: null,
    cardCVV: null,
    cardHolder: null
  }),
  computed: {
    gettingPaymentSystem() {
      let re = new RegExp('^4')
      if (this.cardNumber.match(re) !== null) return 'visa'
      re = new RegExp('^5[1-5]')
      if (this.cardNumber.match(re) !== null) return 'mastercard'
      re = new RegExp('^2[1-5]')
      if (this.cardNumber.match(re) !== null) return 'mir'
      return 'visa'
      // let typeCard = ''
      // let patterns = [
      //   {pattern: '^4', title: 'visa'},
      //   {pattern: '^5[1-5]', title: 'mastercard'},
      //   {pattern: '^3', title: 'amex'},
      //   {pattern: '^2[1-5]', title: 'mir'}
      // ]
      // patterns.forEach((element) => {
      //   let re = new RegExp(`${element.pattern}`)
      //   if (this.cardNumber.match(re) != null) return typeCard = element.title
      // })
      // return this.cardNumber === '' ? 'visa' : typeCard
    }
  }
}
</script>

<style lang="stylus">
@import "@/assets/stylus/base.styl"

.page {
  display grid
  place-items center
  width 100%
  min-height 100vh
}

.filling-form {
  display grid
  grid-template-columns repeat(2, 1fr)
  grid-template-rows 1fr
  gap 20px 10px
  position relative
  width max-content
  height auto
  padding 30px
  border solid 1px #000000
  border-radius 10px

  &__label {
    display flex
    flex-direction column
  }

  &__submit {
    grid-column 1 / 3
    justify-self center
  }

  .card {
    display flex
    position relative
    width 450px
    height 250px
    cursor pointer
    grid-column 1 / 3

    &__side {
      display flex
      flex-direction column
      justify-content space-between
      position absolute
      width inherit
      height inherit
      border-radius 20px
      background url("@/static/img/background.png") no-repeat center / cover
      transform perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg)
      transform-style preserve-3d
      backface-visibility hidden
      transition all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85)

      &_front {
        padding 30px
      }

      &_back {
        transform rotateY(180deg)
      }
    }

    /*Test animation*/

    &:hover {
      .card__side_front {
        transform perspective(1000px) rotateY(180deg)
      }

      .card__side_back {
        transform perspective(1000px) rotateY(0)
      }
    }

    &__header {
      display flex
      justify-content space-between
      width 100%
      height auto
    }

    &__chip {
      width 55px
      height 40px
      background no-repeat center / 100% url("@/static/img/chip.png")
    }

    &__payment-system {
      width 80px
      height 40px
      background no-repeat center / contain url("@/static/icons/mastercard.svg")
    }

    &__number-wrap {
      display flex
      justify-content center
      width 100%
      height auto
    }

    &__number {
      font-style(normal, 1.7rem, sans-serif, #fff)
      letter-spacing 3px
    }

    &__footer {
      display flex
      justify-content space-between
      width 100%
      height auto
    }

    &__subtitle {
      font-style(normal, 1rem, false, #838383)
      letter-spacing 2px
    }

    &__line {
      position relative
      top 30px
      width 100%
      height 40px
      background-color #000
      opacity .7
    }

    &__cvv-wrap {
      display flex
      align-self flex-end
      position relative
      right 20px
      bottom 20px
      width 60px
      height 40px
      border-radius 5px
      background-color #fff
    }

    &__cvv {
      margin auto
      font-style(normal, 1.7rem, false, #838383)
    }

    &__number_active,
    &__full-name_active,
    &__life-time_active,
    &__cvv-wrap_active {
      transition box-shadow .2s linear
      box-shadow 0 0 0 2px var(--accent-color)
    }
  }
}
</style>
