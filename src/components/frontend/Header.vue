<template>
  <header
    class="header"
    :class="{ 'header--invert': invertHeader && !scrollChange }"
  >
    <h1
      class="header__logo link-pointer"
      :class="{ 'header__logo--invert': invertHeader && !scrollChange }"
    >
      <router-link to="/" @click.native="handleNowPage" class="l-flex-row">
        <span class="logo__decor header__logo__decor"></span>IShouldGo
      </router-link>
    </h1>
    <h2 class="header__title l-gap-x-sm" v-if="currentPage !== 'Home'">
      {{ currentTitle }}
    </h2>
    <div class="header__content-box l-gap-x-sm" v-else>
      <h2
        class="header__content-box__item"
        :class="`header__content-box__item--${idx}`"
        v-for="(item, idx) in heroTextArr"
        :key="`heroTextArr[${idx}]`"
      >
        {{ item }}
      </h2>
    </div>
    <div
      class="header__navbtn pos-fix link-pointer"
      :class="[navbtnActive, navbtnInvert]"
      @click="toggleNav"
    >
      <div class="header__navbtn__line"></div>
    </div>
    <div class="header__nav" :class="{ 'header__nav--active': showNav }">
      <div class="header__nav__overlay" @click="toggleNav"></div>
      <nav class="header__nav__sidemenu l-flex-col l-flex-center-expand">
        <div class="l-flex-col">
          <router-link
            to="/"
            @click.native="toggleNav"
            class="header__nav__link link-pointer"
            :class="{ 'header__nav__link--active': currentPage === 'Home' }"
          >
            首頁
          </router-link>
          <router-link
            to="/products"
            @click.native="toggleNav"
            class="header__nav__link link-pointer"
            :class="{ 'header__nav__link--active': currentPage === 'Products' }"
          >
            商品列表
          </router-link>
          <router-link
            to="/carts"
            @click.native="toggleNav"
            class="header__nav__link link-pointer"
            :class="{ 'header__nav__link--active': currentPage === 'Carts' }"
          >
            購物車({{ cartsLen }})
          </router-link>
        </div>
        <div class="footer__follow footer__follow--isheader">
          <div class="footer__title l-gap-b-sm">Follow Us</div>
          <div class="footer__link l-flex-row l-flex-expand">
            <a href="#" class="footer__icon">
              <font-awesome-icon :icon="['fab', 'instagram']" size="2x" />
            </a>
            <a href="#" class="footer__icon">
              <font-awesome-icon :icon="['fab', 'facebook-f']" size="2x" />
            </a>
            <a href="#" class="footer__icon">
              <font-awesome-icon :icon="['fab', 'twitter']" size="2x" />
            </a>
            <a href="#" class="footer__icon">
              <font-awesome-icon :icon="['fab', 'youtube']" size="2x" />
            </a>
            <a href="#" class="footer__icon">
              <font-awesome-icon :icon="['fab', 'github']" size="2x" />
            </a>
          </div>
        </div>
      </nav>
    </div>
    <div
      class="header__go-top-btn link-pointer l-flex-row l-flex-align-center"
      :class="{ 'header__go-top-btn--show': scrollChange }"
      @click="scrollToTop()"
    >
      <span class="logo__decor header__logo__decor"></span>I
    </div>
  </header>
</template>-

<script>
export default {
  props: {
    scrollOverHero: Boolean,
  },
  data() {
    return {
      showNav: false,
      currentPage: this.$route.name,
      currentTitle: '',
      invertHeader: false,
      scrollChange: this.scrollOverHero,
      cartsLen: 0,
      heroTextArr: [
        '愛蔬購三大品質保證',
        '嚴選各地當令蔬果',
        '產品品質嚴格把關',
        '全程冷藏宅配到家',
      ],
    };
  },
  watch: {
    scrollOverHero() {
      this.scrollChange = this.scrollOverHero;
    },
    '$route.name': {
      handler() {
        const vm = this;
        const { name } = vm.$route;
        vm.currentPage = name;
      },
    },
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    handleNowPage() {
      const vm = this;
      vm.currentPage = vm.$route.name;
      switch (vm.currentPage) {
        case 'Home':
          vm.invertHeader = true;
          vm.currentTitle = '末日電商';
          break;
        case 'Products':
          vm.invertHeader = false;
          vm.currentTitle = '商品列表';
          break;
        case 'Product':
          vm.invertHeader = false;
          vm.currentTitle = '商品詳情';
          break;
        case 'Carts':
          vm.invertHeader = false;
          vm.currentTitle = '購物車';
          break;
        default:
          vm.invertHeader = false;
          vm.currentTitle = vm.currentPage;
      }
    },
    async getCarts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      try {
        const res = await vm.$http.get(url);
        if (!res.data.success)
          vm.$bus.$emit(
            'msg:push',
            `${vm.errMsg}：${res.data.message || '再試一次'}`,
            'danger',
          );
        vm.cartsLen = res.data.data.carts.length;
      } catch (err) {
        vm.$bus.$emit('msg:push', `出錯了QQ：${err}`, 'danger');
      }
    },
  },
  computed: {
    navbtnActive() {
      return this.showNav ? 'header__navbtn--active' : '';
    },
    navbtnInvert() {
      if (this.scrollChange) return '';
      if (this.invertHeader) return 'header__navbtn--invert';
      return '';
    },
  },
  mounted() {
    this.handleNowPage();
    this.getCarts();
  },
  updated() {
    this.handleNowPage();
    this.getCarts();
  },
};
</script>