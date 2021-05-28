<template>
  <div>
    <section class="card" :class="{'animate' : isShowCVV}">
      <div class="front">
        <div class="card__inner front" v-if="isShowCVV !== true">
          <figure class="card__chip">
            <img class="card__chip-img" src="@/assets/images/chip.png" alt="chip" width="55" height="42">
          </figure>
          <div class="card__number number">
              <span v-if="cardNumber">{{ cardNumber }}</span>
              <span v-else> {{ defaultNumber }}</span>
          </div>
          <div class="card__type-card">
            <svg style="fill: #0072FF" width="80px" height="80px" version="1.1" viewBox="0 0 64 64" xml:space="preserve"
                 xmlns="http://www.w3.org/2000/svg">
          <g id="GUIDES_64"/>
              <g id="Layer_3"/>
              <g id="Layer_2"><polygon class="st0" points="27.1,24.1 24.5,39.9 28.6,39.9 31.2,24.1 27.1,24.1  "/>
                <path class="st0"
                      d="M50.8,24.1L50.8,24.1c-1,0-1.7,0.3-2.1,1.3L42.6,40h4.3c0,0,0.7-2,0.9-2.4c0.5,0,4.6,0,5.2,0   c0.1,0.6,0.5,2.4,0.5,2.4h3.8L54,24.1H50.8z M48.9,34.3c0.3-0.9,1.6-4.4,1.6-4.4c0,0,0.3-0.9,0.5-1.5l0,0l0.3,1.4   c0,0,0.8,3.8,1,4.6H48.9z"/>
                <path class="st0"
                      d="M39.4,30.5c-1.4-0.7-2.3-1.2-2.3-2c0-0.7,0.7-1.4,2.3-1.4c1.3,0,2.3,0.3,3.1,0.6l0.4,0.2l0.6-3.4   c-0.8-0.3-2.1-0.7-3.7-0.7l0,0c-4,0-6.9,2.2-6.9,5.2c0,2.3,2,3.6,3.6,4.3c1.6,0.8,2.1,1.3,2.1,2c0,1.1-1.3,1.5-2.5,1.5   c-1.6,0-2.5-0.2-3.9-0.8l-0.5-0.3l-0.6,3.5c1,0.4,2.7,0.8,4.6,0.8c4.3,0,7.1-2.1,7.1-5.4C42.9,33,41.8,31.6,39.4,30.5z"/>
                <path class="st0"
                      d="M21.1,24.1L21.1,24.1l-4,10.8l-0.4-2.2c0,0,0,0,0,0l-1.4-7.3c-0.2-1-1-1.3-1.9-1.3H6.9c-0.1,0-0.1,0.1-0.2,0.1   c0,0.1,0,0.2,0.1,0.2c1,0.3,1.9,0.6,2.7,1c0.9,0.4,1.5,1.2,1.8,2.1l3.3,12.4l4.3,0l6.4-15.8H21.1z"/></g>
        </svg>
          </div>
          <div class="user-data">
            <div class="user-data__username">
              <header class="user-data__header">
                <p class="header">Card Holder</p>
              </header>
              <p class="username">{{ defaultUserName }}</p>
            </div>
            <div class="user-data__date">
              <header class="user-data__header">
                <p class="header">Expires</p>
              </header>
              <p class="date">{{ cardMonth }} / {{ cardYear }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="back">
        <div class="card__inner" v-if="isShowCVV === true" :class="{'show-back' : isShowCVV}">
          <div class="card__line"></div>
          <div class="card__cvv-block">
            <p class="cvv">170</p>
          </div>
        </div>
      </div>
    </section>
    <section class="block">
      <div class="block__inner">
        <div class="block__content">
          <div class="block__form-card">
            <p class="block__form-header form-header">Card Number</p>
            <input id="cardNumber" type="text" min="0" v-mask="cardNumberMask" class="form-card form-card-number"
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
            <input id="cvv" maxlength="3" type="text" class="form-card form-card-cvv" v-model="cvv" placeholder="123"
                   @click="isShowCVV = true" @blur="isShowCVV = false">
          </div>
          <div class="block__submit-btn">
            <button class="submit-btn">Submit</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

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
    isShowCVV: false,
    defaultNumber: '#### #### #### ####',
    defaultUserName: 'Full Name',
    defaultDate: 'MM/YY',
    defaultCvv: '',
  }),
  computed: {
    cardNumberMask() {
      return this.cardMask;
    }
  },
}
</script>

<style scoped lang="stylus">
.card {
  display flex
  justify-content center
  align-items center
  position absolute
  top 50%
  left 25%
  transform translate(-50%, -50%)
  transform-style: preserve-3d;
  width 450px
  height 250px
  border-radius 20px
  background url("https://ethnomir.ru/upload/medialibrary/2d9/meduza.jpg") no-repeat center bottom
  cursor pointer
  transition all .5s ease

  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }

  &__inner {
    position relative
    width 400px
    height 200px

    .card__line {
      position absolute
      top 30%
      left 50%
      transform translate(-50%, -50%)
      width 112%
      height 40px
      opacity 0.5
      background-color #fff
    }

    .card__cvv-block {
      display flex
      justify-content center
      align-items center
      position absolute
      bottom 0
      right 0
      width 60px
      height 40px
      border-radius 10px
      background-color #fff
    }

    .cvv {
      font normal 1.7em sans-serif
      color #838383
    }

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

      .username, .date {
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
      top 0
      right 0
    }
  }

  .front, .back {
    display block
    position relative
  }
}

.card.animate {
  transition all .5s ease
  transform rotateY(180deg)
}

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
