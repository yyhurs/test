<template>
  <div class="main-container">
    <loading :active.sync="isLoading"></loading>
    <main class="main-container__content">
      <div
        class="products main-container__inner l-flex-row l-flex-center-expand"
      >
        <nav class="products__nav l-gap-x-sm">
          <ul class="products__nav-sticky">
            <li class="products__nav__item">
              <a
                to="/products/all"
                href="#"
                class="products__nav__link"
                :class="{
                  'products__nav__link--active': nowCategory === '全部商品',
                }"
                @click.prevent="getProducts(1, '全部商品', isHighFirst)"
                >全部商品</a
              >
            </li>
            <li
              class="products__nav__item"
              v-for="(item, index) in navArr"
              :key="`navArr[${index}]`"
            >
              <a
                href="#"
                class="products__nav__link"
                :class="{
                  'products__nav__link--active': nowCategory === item,
                }"
                @click.prevent="getProducts(1, item, isHighFirst)"
                >{{ item }}</a
              >
            </li>
            <li class="products__nav__item">
              <input
                type="text"
                placeholder="搜尋商品"
                class="products__nav__search"
                v-model="searchText"
                @keyup.enter="handleSearch"
              />
            </li>
            <li class="products__nav__item">
              <a
                href="#"
                class="products__nav__link products__nav__link--active"
                @click.prevent="sortBy"
                >{{ isHighFirst ? '價格高 → 低' : '價格低 → 高' }}</a
              >
            </li>
            <li
              class="products__nav__item l-gap-y-sm"
              v-if="pagination.total_pages > 1"
            >
              <Page :page-obj="pagination" @change-page="getProducts" />
            </li>
          </ul>
        </nav>
        <div class="products__selection">
          <h2 class="products__title l-space-b-sm">
            {{ nowCategory }}
            <sup class="products__subtitle">
              \{{ productsArrFilter.length }}
            </sup>
          </h2>
          <ul class="products__list" v-if="filterProducts.length > 0">
            <li
              class="products__list__item"
              v-for="item in filterProducts"
              :key="item.id"
            >
              <router-link
                :to="`/product/${item.id}`"
                class="products__list__link"
              >
                <figure class="products__list__figure">
                  <img class="products__list__img" :src="item.imageUrl" alt />
                </figure>
                <figcaption class="products__list__info">
                  <h3 class="products__list__title text-ellipsis">
                    {{ item.title }}
                  </h3>
                  <div class="products__list__o-price" v-if="item.origin_price">
                    {{ item.origin_price | currency }}
                  </div>
                  <div
                    class="products__list__footer l-flex-row l-flex-center-expand l-flex-align-text"
                    :class="{
                      'products__list__footer--expand': !item.origin_price,
                    }"
                  >
                    <h4 class="products__list__price">
                      {{ item.price | currency }}
                    </h4>
                    <div
                      class="products__list__amount text-ellipsis text-ellipsis--reverse"
                    >
                      剩餘 {{ item.num }} {{ item.unit }}
                    </div>
                  </div>
                </figcaption>
              </router-link>
            </li>
          </ul>
          <div class="products__caption" v-else>
            「
            <em class="products__caption__em">{{ nowCategory }}</em>
            」的類別中找不到關於「
            <em class="products__caption__em">{{ searchTextCp }}</em>
            」的商品
          </div>
        </div>
      </div>
    </main>
    <div class="main-container__line"></div>
  </div>
</template>

<script>
import Page from '@/components/Page';

export default {
  name: 'Products',
  components: {
    Page,
  },
  data() {
    return {
      navArr: [],
      nowCategory: '全部商品',
      productsArr: [],
      productsArrFilter: [],
      productsSearchArr: [],
      isSubmit: false,
      hasHero: false,
      isHighFirst: true,
      pagination: {},
      pageInfo: {},
      searchText: '',
      searchTextCp: '',
      isLoading: false,
      errMsg: '出錯了 QQ',
    };
  },
  methods: {
    async getProducts(page = 1, cat = '全部商品', isHighFirst = true) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      try {
        const res = await vm.$http.get(url);
        const productsArr = [...res.data.products];
        vm.productsArr = isHighFirst
          ? res.data.products.sort((a, b) => b.price - a.price)
          : res.data.products.sort((a, b) => a.price - b.price);
        const productsSearchArr = vm.isSubmit
          ? vm.productsSearchArr
          : res.data.products;
        vm.nowCategory = cat;
        vm.productsArrFilter =
          cat === '全部商品'
            ? productsSearchArr
            : productsSearchArr.filter((item) => item.category === cat);
        vm.creatCategory(productsArr);
        vm.handlePage(page);
        vm.isLoading = false;
        vm.isSubmit = false;
        vm.searchText = '';
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
    passHero() {
      this.$emit('pass-hashero', this.hasHero);
    },
    creatCategory(rowData) {
      const vm = this;
      const category = rowData.reduce((acc, item) => {
        const hasCategory = acc.findIndex((cat) => cat === item.category);
        if (hasCategory === -1) acc.push(item.category);
        return acc;
      }, []);
      vm.navArr = category;
    },
    handlePage(page = 1) {
      const vm = this;
      const dataLength = vm.productsArrFilter.length;
      const dataPerPage = 9;
      const pageLength = Math.ceil(dataLength / dataPerPage);
      const currentPage = page > pageLength ? pageLength : page;
      const idxStart = currentPage * dataPerPage - dataPerPage;
      const idxEnd = currentPage * dataPerPage - 1;
      const hasPre = currentPage - 1 > 0;
      const hasNext = currentPage < pageLength;
      const category = vm.nowCategory;
      const { isHighFirst } = vm;
      const pagination = {
        total_pages: pageLength,
        current_page: currentPage,
        has_pre: hasPre,
        has_next: hasNext,
        category,
        is_high_first: isHighFirst,
      };
      vm.pageInfo = {
        dataLength,
        dataPerPage,
        pageLength,
        currentPage,
        idxStart,
        idxEnd,
        hasPre,
        hasNext,
      };
      vm.pagination = pagination;
    },
    handleSearch() {
      const vm = this;
      vm.searchTextCp = vm.searchText;
      // 篩選範圍 title, category, content
      const searchText = vm.searchText.toLowerCase();
      const resultArr = vm.productsArrFilter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          const isRepeat = acc.findIndex((item) => item.id === obj.id);
          if (key !== 'title' && key !== 'category' && key !== 'content')
            return;
          if (typeof obj[key] !== 'string') return;
          if (obj[key].match(searchText) && isRepeat === -1) acc.push(obj);
        });
        return acc;
      }, []);

      vm.productsSearchArr = resultArr;
      vm.isSubmit = true;
      vm.getProducts(1, vm.nowCategory, vm.isHighFirst);
    },
    sortBy() {
      const vm = this;
      vm.isHighFirst = !vm.isHighFirst;
      vm.getProducts(1, vm.nowCategory, vm.isHighFirst);
    },
  },
  computed: {
    filterProducts() {
      const vm = this;
      const arr = vm.productsArrFilter
        ? vm.productsArrFilter.filter(
            (item, idx) =>
              idx >= vm.pageInfo.idxStart && idx <= vm.pageInfo.idxEnd,
          )
        : [];
      return arr;
    },
  },
  created() {
    this.getProducts();
  },
  mounted() {
    this.passHero();
  },
};
</script>