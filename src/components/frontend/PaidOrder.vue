<template>
  <div class="carts__order l-flex-row l-flex-center-expand">
    <div class="carts__order__block l-gap-x-sm">
      <h2 class="carts__order__title text-center l-space-b-md">訂單明細</h2>
      <ul class="carts__order__list">
        <li
          class="carts__order__item l-flex-row l-flex-center-expand l-space-b-sm"
          v-for="(item, idx) in carts.carts"
          :key="`cartsArr[${idx}]`"
        >
          <figure class="carts__order__figure l-gap-r-sm">
            <img
              class="carts__order__img"
              :src="item.product.imageUrl"
              alt=""
            />
          </figure>
          <figcaption
            class="carts__order__figcaption l-flex-col l-flex-center-expand l-gap-l-sm"
          >
            <h4 class="carts__order__item-title">
              {{ item.product.title }}
            </h4>
            <div class="carts__order__item-price text-right">
              {{ item.total | currency }}
            </div>
            <div class="carts__order__item-qty text-right">
              {{ item.qty }} {{ item.product.unit }}
            </div>
            <div class="carts__order__item-coupon text-right">
              {{ item.coupon ? `已套用折扣碼「${item.coupon.code}」` : '' }}
            </div>
          </figcaption>
        </li>
        <li
          class="carts__order__item l-flex-row l-flex-center-expand l-space-t-md"
        >
          <h4 class="carts__order__item-title">折扣：</h4>
          <div class="carts__order__item-price text-right">
            - {{ (carts.total - carts.final_total) | currency }}
          </div>
        </li>
        <li class="carts__order__item l-flex-row l-flex-center-expand">
          <h4 class="carts__order__item-title">總計：</h4>
          <div class="carts__order__item-price text-right">
            {{ carts.total | currency }}
          </div>
        </li>
      </ul>
    </div>
    <div class="carts__order__customer l-gap-x-sm">
      <h2 class="carts__order__title text-center l-space-b-md">買家資料</h2>
      <ul class="carts__customer__info">
        <li class="carts__customer__item l-flex-row l-flex-center-expand">
          <span class="carts__customer__text">姓名</span>
          <span class="carts__customer__text">{{ order.user.name }}</span>
        </li>
        <li class="carts__customer__item l-flex-row l-flex-center-expand">
          <span class="carts__customer__text">電子信箱</span>
          <span class="carts__customer__text">{{ order.user.email }}</span>
        </li>
        <li class="carts__customer__item l-flex-row l-flex-center-expand">
          <span class="carts__customer__text">電話</span>
          <span class="carts__customer__text">{{ order.user.tel }}</span>
        </li>
        <li class="carts__customer__item l-flex-row l-flex-center-expand">
          <span class="carts__customer__text">地址</span>
          <span class="carts__customer__text">{{ order.user.address }}</span>
        </li>
        <li class="carts__customer__item l-flex-row l-flex-center-expand">
          <span class="carts__customer__text">是否付款</span>
          <span class="carts__customer__text">{{
            order.is_paid ? '是' : '否'
          }}</span>
        </li>
        <li class="carts__customer__item">
          <button class="button button--lg" @click.prevent="payOrder">
            確認付款
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaidOrder',
  props: {
    orderId: String,
    carts: Object,
  },
  data() {
    return {
      order: {
        user: {},
      },
    };
  },
  methods: {
    async getOrder() {
      const vm = this;
      try {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
        const res = await vm.$http.get(url);
        vm.order = res.data.order;
      } catch (err) {
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
    async payOrder() {
      const vm = this;
      let isLoading = true;
      vm.$emit('loading-page', isLoading);
      try {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
        const res = await vm.$http.post(url);
        if (res.data.success) {
          vm.getOrder();
        }
        isLoading = false;
        vm.$emit('loading-page', isLoading);
        vm.$bus.$emit('msg:push', `${res.data.message}`, 'success');
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
  },
  created() {
    this.getOrder();
  },
};
</script>