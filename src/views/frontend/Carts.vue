<template>
  <div class="main-container pos-rel">
    <loading :active.sync="isLoading"></loading>
    <main class="main-container__content">
      <div class="main-container__inner">
        <!-- cart empty -->
        <div class="carts l-flex-col l-flex-center" v-if="!cartsArr.length">
          <div class="carts__error">
            <div class="carts__err-msg">購物車目前沒有商品</div>
            <div class="carts__err-redirect text-center">
              <router-link class="carts__err-btn" to="/products"
                >來去逛逛</router-link
              >
            </div>
          </div>
        </div>
        <keep-alive>
          <transition name="fade">
            <!-- setp-1 -->
            <CartList
              v-if="cartsArr.length > 0 && currentStep === 1"
              :carts-arr="cartsArr"
              :carts="carts"
              @pass-counter="updCarts"
              @give-coupon="applyCoupon"
              @click-rmbtn="rmCarts"
              @next="goNext"
            />
            <!-- step-2 -->
            <CheckoutForm
              v-if="currentStep === 2"
              @submit-order="createOrder"
              @back="goBack"
            />
            <!-- step-3 -->
            <PaidOrder
              v-if="currentStep === 3"
              :order-id="orderId"
              :carts="carts"
              @loading-page="handleLoading"
            />
          </transition>
        </keep-alive>
        <!-- carousel -->
        <div class="product__carousel">
          <h3 class="product__title l-gap-l-sm">熱銷商品</h3>
          <Carousel :carousel-arr="carouselArr" />
        </div>
      </div>
    </main>
    <div class="main-container__line"></div>
  </div>
</template>

<script>
import CartList from '@/components/frontend/CartList';
import CheckoutForm from '@/components/frontend/CheckoutForm';
import PaidOrder from '@/components/frontend/PaidOrder';
import Carousel from '@/components/frontend/Carousel';

export default {
  name: 'Carts',
  components: {
    CartList,
    CheckoutForm,
    PaidOrder,
    Carousel,
  },
  data() {
    return {
      carts: {},
      cartsArr: [],
      tempCart: {},
      carouselArr: [],
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      currentStep: 1,
      orderId: '',
      hasHero: false,
      finalTotal: 0,
      isLoading: false,
      errMsg: '出錯了QQ',
      errDetails: '',
    };
  },
  methods: {
    async getCarts() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      try {
        const res = await vm.$http.get(url);
        if (!res.data.success)
          vm.$bus.$emit(
            'msg:push',
            `${vm.errMsg}：${res.data.message || '再試一次'}`,
            'danger',
          );
        vm.cartsArr = res.data.data.carts;
        vm.carts = res.data.data;
        vm.isLoading = false;
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
    async rmCarts(id) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      try {
        let alertTheme = 'success';
        const res = await vm.$http.delete(url);
        if (!res.data.success) alertTheme = 'danger';
        vm.getCarts();
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', res.data.message || vm.errMsg, alertTheme);
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
    async updCarts(qty, item) {
      const vm = this;
      vm.isLoading = true;
      const rmUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
      const addUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.tempCart = {
        product_id: item.product_id,
        qty,
      };
      try {
        const rmRes = await vm.$http.delete(rmUrl);
        if (rmRes.data.success) {
          const addRes = await vm.$http.post(addUrl, { data: vm.tempCart });
          if (addRes.data.success) {
            vm.$bus.$emit('msg:push', `修改數量成功`, 'success');
            vm.getCarts();
          } else {
            vm.$bus.$emit(
              'msg:push',
              `${vm.errMsg}：updCarts Failed(add)`,
              'succedangerss',
            );
          }
        } else {
          vm.$bus.$emit(
            'msg:push',
            `${vm.errMsg}：updCarts Failed(rm)`,
            'danger',
          );
        }
        vm.isLoading = false;
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
    async applyCoupon(code) {
      const vm = this;
      vm.isLoading = true;
      const tempData = {
        code,
      };
      let alertTheme = 'danger';
      try {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
        const res = await vm.$http.post(url, { data: tempData });
        if (res.data.success) alertTheme = 'success';
        vm.getCarts();
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${res.data.message}`, alertTheme);
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, alertTheme);
      }
    },
    async createOrder(form) {
      const vm = this;
      vm.form = form;
      try {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
        const res = await vm.$http.post(url, { data: form });
        if (!res.data.success)
          vm.$bus.$emit('msg:push', `${res.data.message}`, 'danger');
        else {
          vm.orderId = res.data.orderId;
          vm.goNext();
        }
      } catch (err) {
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
    goNext() {
      this.currentStep += 1;
    },
    goBack() {
      this.currentStep -= 1;
    },
    async getProducts() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      try {
        const res = await vm.$http.get(url);
        vm.productsArr = res.data.products;
        const cat = 'hot';
        vm.carouselArr = vm.productsArr.filter(
          (item) => item.description === cat,
        );
        vm.isLoading = false;
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
    handleLoading(isLoading) {
      this.isLoading = isLoading;
    },
  },
  created() {
    this.getCarts();
    this.getProducts();
  },
  mounted() {
    this.$emit('pass-hashero', this.hasHero);
  },
};
</script>