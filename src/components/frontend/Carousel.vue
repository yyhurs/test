<template>
  <swiper class="swiper carousel" :options="swiperOption">
    <swiper-slide
      v-for="(item, idx) in carouselArr"
      :key="`carouselArr[${idx}]`"
      class="carousel__item l-gap-x-sm"
    >
      <router-link
        class="carousel__link"
        :to="`/product/${item.id}`"
        v-if="item.id"
      >
        <figure class="carousel__figure">
          <img class="carousel__img" :src="item.imageUrl" alt="" />
        </figure>
        <figcaption class="carousel__figcaption">
          <h3 class="carousel__title text-ellipsis">{{ item.title }}</h3>
        </figcaption>
      </router-link>
      <div class="carousel__caption" @click="item.isShow = !item.isShow" v-else>
        <h3 class="carousel__subtitle">
          {{ item.title }}
        </h3>
        <p
          class="carousel__details"
          :class="{ 'carousel__details--active': item.isShow }"
        >
          {{ item.details }}
        </p>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import Vue from 'vue';
import { Swiper as SwiperClass, Mousewheel, Autoplay } from 'swiper/swiper.esm';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
import 'swiper/swiper-bundle.css';

SwiperClass.use([Mousewheel, Autoplay]);
Vue.use(getAwesomeSwiper(SwiperClass));
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass);

export default {
  name: 'Carousel',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    carouselArr: Array,
    isCaption: Boolean,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        loop: !this.isCaption,
        autoplay: !this.isCaption
          ? {
              delay: 5000,
              stopOnLastSlide: false,
              disableOnInteraction: false,
            }
          : false,
        breakpoints: {
          768: {
            slidesPerView: 4,
          },
          480: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 2,
          },
        },
      },
    };
  },
};
</script>