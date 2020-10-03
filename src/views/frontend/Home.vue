<template>
  <div class="home">
    <div class="hero l-flex-row pos-rel">
      <video
        loop
        muted
        autoplay
        preload="auto"
        class="hero__bg hero__bg--vid pos-abs"
      >
        <source :src="['./media/hero.mp4']" type="video/mp4" />
      </video>
      <img
        class="hero__bg hero__bg--img pos-abs"
        :src="['./media/hero.jpg']"
        alt=""
      />
      <div class="hero__info l-flex-row l-flex-expand">
        <div
          class="hero__over-hero-btn link-pointer pos-rel"
          @click="scrollOver"
        >
          <div class="hero__over-hero-icon"></div>
        </div>
        <div class="hero__caption pos-rel">
          <h1 class="hero__title">
            愛蔬購<span class="hero__subtitle"
              >嚴選優秀果農與菜農的當令蔬果，提供免運宅配到府服務，讓您在家就可享用健康美味的蔬果。</span
            >
          </h1>
        </div>
      </div>
    </div>
    <div class="main-container pos-rel">
      <main class="main-container__content">
        <div
          class="main-container__inner"
          :class="{ 'main-container__inner--is-hero': hasHero }"
        >
          <h2
            class="home__headline home__headline--first l-gap-x-sm l-space-y-sm"
          >
            關於我們
          </h2>
          <section class="home__section l-space-b-sm">
            <div class="home__panel l-gap-sm">
              <p class="home__panel__text">
                我們致力於提供健康的有機蔬果給每一個顧客，以最嚴謹的態度，珍惜每一份土地的恩惠。
              </p>
            </div>
            <div class="home__gallery">
              <div
                class="home__gallery__item home__gallery__item--check l-gap-x-sm"
              >
                <figure class="home__figure">
                  <img class="home__img" :src="['./media/check.jpg']" alt="" />
                </figure>
                <figcaption class="home__figcaption">
                  <h3 class="home__title">綠盾農藥檢驗</h3>
                </figcaption>
              </div>
              <div
                class="home__gallery__item home__gallery__item--grow l-gap-x-sm"
              >
                <figure class="home__figure">
                  <img class="home__img" :src="['./media/grow.jpg']" alt="" />
                </figure>
                <figcaption class="home__figcaption">
                  <h3 class="home__title">定期產地親訪</h3>
                </figcaption>
              </div>
              <div
                class="home__gallery__item home__gallery__item--trans l-gap-x-sm"
              >
                <figure class="home__figure">
                  <img class="home__img" :src="['./media/trans.jpg']" alt="" />
                </figure>
                <figcaption class="home__figcaption">
                  <h3 class="home__title">快速分裝出貨</h3>
                </figcaption>
              </div>
              <div
                class="home__gallery__item home__gallery__item--service l-gap-x-sm"
              >
                <figure class="home__figure">
                  <img
                    class="home__img"
                    :src="['./media/service.jpg']"
                    alt=""
                  />
                </figure>
                <figcaption class="home__figcaption">
                  <h3 class="home__title">完善客服諮詢</h3>
                </figcaption>
              </div>
            </div>
          </section>

          <h2 class="home__headline l-gap-x-sm l-space-y-sm">限時折扣</h2>
          <section
            class="home__section home__section--flexbox l-flex-row l-space-b-sm"
          >
            <div class="home__primary l-gap-sm">
              <figure class="home__figure">
                <img
                  class="home__img"
                  :src="['./media/anniversary.jpg']"
                  alt=""
                />
              </figure>
              <figcaption class="home__figcaption">
                <h3 class="home__title">愛蔬購周年慶</h3>
                <h4 class="home__subtitle">所有商品享九折優惠</h4>
              </figcaption>
            </div>
            <div class="home__secondary l-gap-sm">
              <figure class="home__figure">
                <img class="home__img" :src="['./media/lovegan.jpg']" alt="" />
              </figure>
              <figcaption class="home__figcaption">
                <h3 class="home__title">慶祝下單人數破百萬</h3>
                <h4 class="home__subtitle">使用折扣碼 lovegan 再享七折優惠</h4>
              </figcaption>
            </div>
          </section>

          <h2 class="home__headline l-gap-x-sm l-space-y-sm">商品概覽</h2>
          <section
            class="home__section home__section--flexbox l-flex-row"
            :class="{ 'l-flex-row-reverse': (idx + 1) % 2 === 0 }"
            v-for="(item, idx) in galleryArr"
            :key="`galleryArr${idx}`"
          >
            <div class="home__primary l-gap-sm pos-rel">
              <figure class="home__figure">
                <img class="home__img" :src="item.imgUrl" alt="" />
              </figure>
              <figcaption class="home__figcaption">
                <h4 class="home__subtitle">{{ item.title }}</h4>
                <h3 class="home__title">{{ item.content }}</h3>
              </figcaption>
              <router-link
                class="home__link pos-abs"
                to="/products"
              ></router-link>
            </div>
            <div class="home__secondary l-flex-row l-gap-sm">
              <div
                class="home__secondary__item"
                :class="{
                  'l-space-r-sm': idx2 === 0,
                  'l-space-l-sm': idx2 === 1,
                }"
                v-for="(item2, idx2) in item.dataArr"
                :key="`[dataArr${idx2}]`"
              >
                <router-link class="home__link" :to="`/product/${item2.id}`">
                  <figure class="home__figure">
                    <img class="home__img" :src="item2.imageUrl" alt="" />
                  </figure>
                  <figcaption class="home__figcaption">
                    <h4 class="home__subtitle">{{ item2.category }}</h4>
                    <h3 class="home__title">
                      {{ item2.title }}
                    </h3>
                  </figcaption>
                </router-link>
              </div>
            </div>
          </section>

          <h2 class="home__headline l-gap-x-sm l-space-y-sm">常見問題</h2>
          <Carousel :carousel-arr="newsArr" :is-caption="true" />
        </div>
      </main>
      <div class="main-container__line"></div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/frontend/Carousel';

export default {
  name: 'Home',
  components: {
    Carousel,
  },
  data() {
    return {
      hasHero: true,
      productsArr: [],
      galleryArr: [],
      newsArr: [
        {
          isShow: false,
          title: '所有的蔬果都是有機的嗎？',
          details: '沒錯，我們只提供有機產品！',
        },
        {
          isShow: false,
          title: '會有發票隨貨附送嗎？',
          details: '不會唷，我們採用電子發票。',
        },
        {
          isShow: false,
          title: '運費如何計算？',
          details: '不限地區，不限金額，愛蔬購完全免運！',
        },
        {
          isShow: false,
          title: '配送時間有固定星期幾嗎？',
          details: '固定星期二、三、四、五、六配送到府。',
        },
        {
          isShow: false,
          title: '可以指定送貨時段嗎？',
          details: '可以，請洽客服電話：+000 123456789 預約',
        },
        {
          isShow: false,
          title: '我想問的問題在「常見問題」中找不到解答。',
          details: '請洽客服電話：+000 123456789，將有專人替您解惑。',
        },
      ],
    };
  },
  methods: {
    async getProducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      try {
        const res = await vm.$http.get(url);
        vm.productsArr = await res.data.products;
        if (!vm.productsArr) return;
        const dailyArr = vm.productsArr
          .filter((item) => item.category === '有機水果')
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
        const dailyObj = {
          imgUrl: './media/groceries.jpg',
          title: '有機水果',
          dataArr: dailyArr,
        };

        const protectArr = vm.productsArr
          .filter((item) => item.category === '有機蔬食')
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
        const protectObj = {
          imgUrl: './media/protection.jpg',
          title: '有機蔬食',
          dataArr: protectArr,
        };
        const entertainArr = vm.productsArr
          .filter((item) => item.category === '蔬果組合')
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
        const entertainObj = {
          imgUrl: './media/entertainment.jpg',
          title: '蔬果組合',
          dataArr: entertainArr,
        };
        vm.galleryArr.push(dailyObj, protectObj, entertainObj);
      } catch (err) {
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
    scrollOver() {
      window.scrollTo(0, window.innerHeight);
    },
  },
  created() {
    this.getProducts();
  },
  mounted() {
    this.$emit('pass-hashero', this.hasHero);
  },
};
</script>