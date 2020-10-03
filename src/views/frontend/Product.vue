<template>
  <div class="main-container pos-rel">
    <loading :active.sync="isLoading"></loading>
    <main class="main-container__content">
      <div class="main-container__inner">
        <div class="product l-flex-row" v-if="productObj">
          <div class="product__inner l-flex-row">
            <figure class="product__figure l-gap-x-sm">
              <img :src="productObj.imageUrl" class="product__img" alt="" />
            </figure>
            <figcaption
              class="product__info l-gap-x-sm l-flex-col l-flex-center-expand"
            >
              <h2 class="product__title l-gap-b-md">{{ productObj.title }}</h2>
              <div
                class="product__content l-flex-row l-flex-align-text l-gap-b-sm"
              >
                <h5 class="product__subtitle">內容</h5>
                <div class="product__details">
                  {{ productObj.content }}
                </div>
              </div>
              <div
                class="product__category l-flex-row l-flex-align-text l-gap-b-sm"
              >
                <h5 class="product__subtitle">類別</h5>
                <div class="product__details">
                  {{ productObj.category }}
                </div>
              </div>
              <div
                class="product__price-block l-flex-row l-flex-align-text l-gap-b-sm"
              >
                <h5 class="product__subtitle">售價</h5>
                <div
                  class="product__o-price product__subtitle"
                  v-if="productObj.origin__price"
                >
                  {{ productObj.origin_price | currency }}
                </div>
                <div class="product__price">
                  {{ productObj.price | currency }}
                </div>
              </div>
              <div class="product__action-block l-flex-row l-flex-center-div">
                <div class="product__counter l-gap-r-sm">
                  <Counter @pass-counter="handleCounter" :size-lg="sizeLg" />
                </div>
                <div class="product__add-cart l-gap-l-sm">
                  <button
                    class="product__cart-btn button button--lg"
                    @click.prevent="addToCart"
                  >
                    <font-awesome-icon :icon="['fas', 'cart-plus']" />
                    加到購物車
                  </button>
                </div>
              </div>
            </figcaption>
          </div>
        </div>
        <div class="product l-flex-col l-flex-center" v-else>
          <div class="product__error err-page">
            <div class="product__err-msg">找不到商品 QQ</div>
            <div class="product_err-redirect err-page__redirect text-center">
              <router-link class="err-page__btn" to="/products"
                >看看其他商品</router-link
              >
            </div>
          </div>
        </div>
        <div class="product__carousel">
          <h3 class="product__title l-gap-l-sm">
            {{ !productObj ? '熱銷商品' : '同類型商品' }}
          </h3>
          <Carousel :carousel-arr="carouselArr" />
        </div>
      </div>
    </main>
    <div class="main-container__line"></div>
  </div>
</template>

<script>
import Counter from '@/components/frontend/Counter';
import Carousel from '@/components/frontend/Carousel';

export default {
  name: 'Product',
  components: {
    Counter,
    Carousel,
  },
  data() {
    return {
      productObj: {},
      productId: this.$route.params.productId,
      productsArr: [],
      tempCart: {},
      cartsArr: [],
      carouselArr: [],
      count: 1,
      hasHero: false,
      sizeLg: true,
      isLoading: false,
      errMsg: '出錯了QQ',
      errDetails: '',
    };
  },
  watch: {
    '$route.params.productId': {
      handler() {
        const vm = this;
        const id = vm.$route.params.productId;
        vm.productId = id;
        vm.productObj = vm.productsArr.find((item) => item.id === id);
      },
    },
  },
  methods: {
    async getProduct() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`;
      try {
        const res = await vm.$http.get(url);
        if (!res.data.success) vm.errDetails = res.data.message;
        vm.productObj = res.data.product;
        vm.isLoading = false;
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
    handleCounter(num = 1) {
      const vm = this;
      vm.count = num;
      if (vm.count < 1) vm.count = 1;
    },
    async addToCart() {
      const vm = this;
      vm.isLoading = true;
      vm.tempCart = {
        product_id: vm.productId,
        qty: vm.count,
      };
      let alertTheme = 'danger';
      const addUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      try {
        const isRepeat = vm.cartsArr.findIndex(
          (item) => item.product_id === vm.productId,
        );
        if (isRepeat === -1) {
          const addRes = await vm.$http.post(addUrl, { data: vm.tempCart });
          if (addRes.data.success) alertTheme = 'success';
          vm.getCarts();
          vm.isLoading = false;
          vm.$bus.$emit('msg:push', addRes.data.message, alertTheme);
        } else {
          const repeatCartId = vm.cartsArr.find(
            (item) => item.product_id === vm.productId,
          ).id;
          const rmUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${repeatCartId}`;
          const currentQty = vm.cartsArr.find(
            (item) => item.product_id === vm.productId,
          ).qty;
          vm.tempCart.qty += currentQty;
          const rmRes = await vm.$http.delete(rmUrl);
          if (rmRes.data.success) {
            const addRes = await vm.$http.post(addUrl, { data: vm.tempCart });
            if (addRes.data.success) {
              alertTheme = 'success';
              vm.$bus.$emit('msg:push', addRes.data.message, alertTheme);
              vm.getCarts();
            } else {
              vm.$bus.$emit(
                'msg:push',
                `${vm.errMsg}：updCarts Failed(add)`,
                alertTheme,
              );
            }
          } else {
            vm.$bus.$emit(
              'msg:push',
              `${vm.errMsg}：updCarts Failed(rm)`,
              alertTheme,
            );
          }
        }
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, alertTheme);
      }
    },
    async getCarts() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      try {
        const res = await vm.$http.get(url);
        vm.cartsArr = res.data.data.carts;
        vm.isLoading = false;
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
    async getProducts() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      try {
        const res = await vm.$http.get(url);
        vm.productsArr = res.data.products;
        const productsArr = [...res.data.products];
        const cat = !vm.productObj ? 'hot' : vm.productObj.category;
        vm.carouselArr = !vm.productObj
          ? productsArr.filter((item) => item.description === cat)
          : productsArr.filter(
              (item) => item.category === cat && item.id !== vm.productId,
            );
        vm.isLoading = false;
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
  },
  async created() {
    await this.getProduct();
    this.getProducts();
    this.getCarts();
  },
  mounted() {
    this.$emit('pass-hashero', this.hasHero);
  },
};
</script>