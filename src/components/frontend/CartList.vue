<template>
  <div class="carts">
    <ul class="carts__list">
      <li
        class="carts__item l-flex-row l-gap-md l-space-y-sm"
        v-for="(item, idx) in cartsArr"
        :key="`cartsArr[${idx}]`"
      >
        <figure class="carts__figure l-gap-x-sm">
          <img :src="item.product.imageUrl" alt="" class="carts__img" />
        </figure>
        <figcaption
          class="carts__figcaption l-flex-col l-flex-center-expand l-gap-x-sm"
        >
          <div
            class="carts__details carts__details--primary l-flex-row l-flex-center-expand"
          >
            <h3 class="carts__title">{{ item.product.title }}</h3>
            <div class="carts__del">
              <button
                class="carts__del-btn button pos-rel"
                @click.prevent="clickRmbtn(item.id)"
              >
                <font-awesome-icon
                  class="carts__del-icon"
                  :icon="['fas', 'times']"
                />
                <font-awesome-icon
                  class="carts__del-icon carts__del-icon--scale pos-abs"
                  :icon="['fas', 'times']"
                />
              </button>
            </div>
          </div>
          <div
            class="carts__details carts__details--secondary l-flex-row l-flex-center-expand"
          >
            <div class="carts__counter">
              <Counter
                v-on="$listeners"
                :size-lg="sizeLg"
                :qty="item.qty"
                :data-obj="item"
              />
            </div>
            <div class="carts__price text-right">
              <div class="">
                {{ item.product.price | currency }}/{{ item.product.unit }}
              </div>
              <div class="">總計：{{ item.total | currency }}</div>
            </div>
          </div>
        </figcaption>
      </li>
    </ul>
    <div class="carts__secondary-block l-gap-x-sm l-gap-t-md">
      <div class="carts__secondary-block-inner">
        <div
          class="carts__secondary-block-details l-flex-row l-flex-center-expand l-flex-text-align l-gap-b-sm"
        >
          <div class="carts__secondary-block-subtitle">商品總額</div>
          <div class="carts__secondary-block-subtitle">
            {{ carts.total | currency }}
          </div>
        </div>
        <div class="carts__coupon-action l-flex-row l-gap-b-sm">
          <input
            type="text"
            class="input input--lg carts__coupon__input"
            placeholder="輸入優惠券"
            v-model="couponCode"
          />
          <button
            class="button button--lg carts__coupon__btn"
            @click.prevent="giveCoupon"
          >
            套用
          </button>
        </div>
        <div
          class="carts__secondary-block-details l-flex-row l-flex-center-expand l-flex-text-align l-gap-b-sm"
        >
          <div
            class="carts__secondary-block-subtitle carts__secondary-block-subtitle--em"
          >
            折扣
          </div>
          <div class="carts__secondary-block-subtitle">
            - {{ (carts.total - carts.final_total) | currency }}
          </div>
        </div>
        <div
          class="carts__secondary-block-details l-flex-row l-flex-center-expand l-flex-text-align l-gap-b-sm"
        >
          <div class="carts__secondary-block-subtitle">應付金額</div>
          <div class="carts__secondary-block-subtitle">
            {{ carts.final_total | currency }}
          </div>
        </div>
        <div class="carts__secondary-block-details">
          <button class="button button--lg carts__btn" @click.prevent="next">
            結帳去
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from '@/components/frontend/Counter';

export default {
  name: 'CartList',
  components: {
    Counter,
  },
  props: {
    cartsArr: Array,
    carts: Object,
  },
  data() {
    return {
      couponCode: '',
      sizeLg: false,
    };
  },
  methods: {
    clickRmbtn(id) {
      this.$emit('click-rmbtn', id);
    },
    giveCoupon() {
      const vm = this;
      this.$emit('give-coupon', vm.couponCode);
    },
    next() {
      this.$emit('next');
    },
  },
};
</script>