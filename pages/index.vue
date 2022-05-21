<template>
  <section class="card">
    <section class="card__side card__side_front">
      <header class="card__header">
        <figure class="card__chip"></figure>
        <figure class="card__payment-system"></figure>
      </header>
      <div class="card__number-wrap">
        <p class="card__number">#### #### #### ####</p>
      </div>
      <footer class="card__footer">
        <div class="card__holder">
          <p class="card__subtitle">Card Holder</p>
          <p class="card__full-name medium-text">Full Name</p>
        </div>
        <div class="card__expires">
          <p class="card__subtitle">Expires</p>
          <time class="card__life-time medium-text">MM/YY</time>
        </div>
      </footer>
    </section>
    <section class="card__side card__side_back">
      <div class="card__line"></div>
      <div class="card__cvv-wrap">
        <p class="card__cvv">CVV</p>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data: () => ({
    minCardYear: new Date().getFullYear(),
    cardNumber: '',
    cardHolders: '',
    cardMonth: '',
    cardYear: '',
    cardCVV: '',
    cardMask: "#### #### #### ####",
    isShowCVV: false,
    defaultNumber: '#### #### #### ####',
    defaultUserName: 'Full Name',
    defaultDate: 'MM/YY',
    defaultCvv: '***',
    focusCardNumber: false,
    focusCardHolders: false,
    focusCardDate: false
  }),
  computed: {
    cardNumberMask() {
      return this.cardMask;
    },
    getCardType() {
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
@import "@/assets/stylus/mixins.styl"
.card {
  position relative
  display flex
  width 450px
  height 250px
  cursor pointer

  &__side {
    display flex
    flex-direction column
    justify-content space-between
    position absolute
    width inherit
    height inherit
    border-radius 20px
    background url("https://habrastorage.org/files/161/60c/b34/16160cb34a7342ae84ffa48a39b8a298.png") no-repeat center/cover
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
    background no-repeat center/100% url("@/static/img/chip.png")
  }

  &__payment-system {
    width 80px
    height 40px
    background no-repeat center/contain url("@/static/icons/mastercard.svg")
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
}

.medium-text {
  font-style(normal, 1.4rem, false, #fff)
}
</style>
