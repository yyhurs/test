<template>
  <div class="home">
    <div class="hero l-flex-row pos-rel">
      <video loop muted autoplay preload="auto" class="hero__bg pos-abs">
        <source :src="['./media/hero.mp4']" type="video/mp4" />
      </video>
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
          <section class="home__section">
            <div class="home__panel l-gap-sm">
              <p>
                我們致力於提供有機的蔬果給每一個顧客，以最嚴謹的態度，珍惜每一份土地的恩惠。
              </p>
            </div>
          </section>
          <!-- 
          <section
            class="home__section l-flex-row"
            :class="{ 'l-flex-row-reverse': (idx + 1) % 2 === 0 }"
            v-for="(item, idx) in infoArr"
            :key="`infoArr[${idx}]`"
          >
            <div class="home__primary l-gap-sm">
              <figure class="home__figure">
                <img class="home__img" :src="item.imgUrl" alt="" />
              </figure>
              <figcaption class="home__figcaption">
                <h4 class="home__subtitle">{{ item.subtitle }}</h4>
                <h3 class="home__title">
                  {{ item.title }}
                </h3>
              </figcaption>
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
                <figure class="home__figure">
                  <img class="home__img" :src="item2.imgUrl" alt="" />
                </figure>
                <figcaption class="home__figcaption">
                  <h4 class="home__subtitle">{{ item2.subtitle }}</h4>
                  <h3 class="home__title">
                    {{ item2.title }}
                  </h3>
                </figcaption>
              </div>
            </div>
          </section>
 -->
          <section
            class="home__section l-flex-row"
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
        </div>
      </main>
      <div class="main-container__line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      hasHero: true,
      productsArr: [],
      galleryArr: [],
      infoArr: [
        {
          subtitle: '關於我們',
          title: 'Apocalyptic EC 提供您最優質的網購服務',
          imgUrl: './media/aboutus.jpg',
          dataArr: [
            {
              subtitle: '12 小時迅速到貨',
              title:
                '不論您身在何處，我們會在您下單後 12 小時內，指派物流機器人送貨到府',
              imgUrl: './media/transportation.jpg',
            },
            {
              subtitle: '365 天無償退貨',
              title:
                '購買後 365 天內，只要您對商品不滿意，不論任何理由，都可以申請退貨',
              imgUrl: './media/returned.jpg',
            },
          ],
        },
        {
          subtitle: '優惠券',
          title:
            '優惠券、消費券、振興券，管它叫什麼，總之就是用了會有折扣的東西',
          imgUrl: './media/discount.jpg',
          dataArr: [
            {
              subtitle: '愛蔬購開幕慶',
              title: '全站商品享九折優惠',
              imgUrl: './media/correct.jpg',
            },
            {
              subtitle: 'ValueOfTaiwan817',
              title: '即日起至 2024/01/11，使用以上優惠碼，所有商品享 87% 折扣',
              imgUrl: './media/couponcode.jpg',
            },
          ],
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