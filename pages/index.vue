<template>
  <div class="container">
    <div class="container__inner">
      <section class="card" :class="{'active': isShowCVV}">
        <div class="card__side front">
          <div class="card__inner">
            <figure class="card__chip">
              <img class="card__chip-img" src="@/assets/images/chip.png" alt="chip" width="55" height="42">
            </figure>
            <div class="card__number number">
              <p v-if="cardNumber">{{ cardNumber }}</p>
              <p v-else> {{ defaultNumber }}</p>
            </div>
            <div class="card__type-card">
              <img :src="'/icons/' + getCardType + '.svg'" alt="type-bank" :key="getCardType">
            </div>
            <div class="user-data">
              <div class="user-data__username">
                <header class="user-data__header">
                  <p class="header">Card Holder</p>
                </header>
                <transition name="slide-fade-up">
                  <p v-if="cardHolders" class="username">{{ cardHolders }}</p>
                  <p v-else class="username">{{ defaultUserName }}</p>
                </transition>
              </div>
              <div class="user-data__date">
                <header class="user-data__header">
                  <p class="header">Expires</p>
                </header>
                <label>
                  <span class="month" v-if="cardMonth" :key="cardMonth">
                    {{ cardMonth }}
                  </span>
                  <span v-else class="month" key="2">MM</span>
                </label>
                <span class="slash">/</span>
                <label>
                  <span class="year" v-if="cardYear" :key="cardYear">
                    {{ String(cardYear).slice(2, 4) }}
                  </span>
                  <span v-else class="year" key="2">YY</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="card__side back">
          <div class="card__line"></div>
          <div class="card__cvv-block">
            <p class="cvv" v-if="cardCVV">{{ cardCVV }}</p>
            <p class="cvv" v-else>{{ defaultCvv }}</p>
          </div>
        </div>
      </section>
      <section class="block">
        <div class="block__inner">
          <div class="block__content">
            <div class="block__form-card">
              <p class="block__form-header form-header">Card Number</p>
              <input id="cardNumber" type="text" v-mask="cardNumberMask" class="form-card form-card-number"
                     v-model="cardNumber"
                     placeholder="0000 0000 0000 0000">
            </div>
            <div class="block__form-card">
              <p class="block__form-header form-header">Card Holders</p>
              <input id="userName" type="text" class="form-card form-card-username" v-model="cardHolders"
                     placeholder="Josh Smith">
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
              <input id="cvv" maxlength="3" type="text" class="form-card form-card-cvv" v-model="cardCVV"
                     placeholder="123"
                     @click="isShowCVV = true" @blur="isShowCVV = false" @focus="isShowCVV = true">
            </div>
            <div class="block__submit-btn">
              <button class="submit-btn">Submit</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
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
    animate: true,
  }),
  computed: {
    cardNumberMask() {
      return this.cardMask;
    },
    getCardType() {
      let typeCard = ''
      let patterns = [
        {pattern: '^4', title: 'visa'},
        {pattern: '^5[1-5]', title: 'mastercard'},
        {pattern: '^3', title: 'amex'},
        {pattern: '^2[1-5]', title: 'mir'}
      ]
      patterns.forEach((element) => {
        let re = new RegExp(`${element.pattern}`)
        if (this.cardNumber.match(re) != null) return typeCard = element.title
      })
      return this.cardNumber === '' ? 'visa' : typeCard
    }
  }
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.container {
  display flex
  justify-content center
  align-items center
  width 100%
  height 100vh
  background-color #fff

  &__inner {
    display flex
    justify-content space-between
    align-items center
    width 100%
    height 100%
    margin 0 80px

    .card {
      display flex
      justify-content center
      align-items center
      width 450px
      height 250px
      position relative

      &__side {
        position absolute
        width 100%
        height 100%
        background url("https://i.pinimg.com/originals/ec/eb/79/eceb7990b39fa62d4189f57f2076712f.png") no-repeat center center
        background-size cover
        border-radius 20px
        cursor pointer
        transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);
        transform-style: preserve-3d;
        transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        backface-visibility: hidden;

        &:hover {
          box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        }

        .card__inner {
          position relative
          width 400px
          height 200px

          .user-data {
            display flex
            justify-content space-between
            align-items center
            position absolute
            bottom 0
            left 0
            width 100%
            height auto

            &__header {
              position relative
            }

            .header {
              font normal 1em sans-serif
              color #838383
              letter-spacing 2px
            }

            .username, .month, .year, .slash {
              font normal 1.4em sans-serif
              color #fff
            }
          }

          .card__chip {
            position absolute
            top 20px
            left 0
          }

          .card__number {
            display flex
            justify-content center
            align-items center
            position absolute
            top 55%
            left 50%
            transform translate(-50%, -50%)
            width 100%

            &:focus {
              border solid 1px red
            }
          }

          .number {
            font normal 1.7em sans-serif
            color #fff
            letter-spacing 3px
          }

          .card__type-card {
            position absolute
            top 20px
            right 0
            width 80px
            height 40px

            img {
              position absolute
              width 100%
              height 100%
            }
          }
        }

        .card__line {
          position absolute
          top 30%
          left 0
          width 100%
          height 40px
          opacity 0.5
          background-color #000
        }

        .card__cvv-block {
          display flex
          justify-content center
          align-items center
          position absolute
          bottom 20px
          right 20px
          width 60px
          height 40px
          border-radius 5px
          background-color #fff
        }

        .cvv {
          font normal 1.7em sans-serif
          color #838383
        }
      }

      .front, .back {
        display flex
        justify-content center
        align-items center
        position absolute
        width 100%
        height 100%
      }

      &__side.back {
        transform: rotateY(180deg);
      }
    }

    .active {
      .front {
        transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotateZ(0deg);
      }

      .back {
        transform: perspective(1000px) rotateY(0) rotateX(0deg) rotateZ(0deg);
      }
    }

    .block {
      display flex
      justify-content center
      align-items center
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
  }

  @media screen and (max-width 1920px ) {
    .container__inner {
      margin 0 300px
    }
  }

  @media screen and (max-width 1440px ) {
    .container__inner {
      margin 0 80px
    }
  }
}
</style>
