<template>
  <div class="wrap">
    <AlertMsg />
    <Header @scroll="handleScroll" :scroll-over-hero="scrollOverHero" />
    <router-view @pass-hashero="handleGotop" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/frontend/Header.vue';
import Footer from '@/components/frontend/Footer.vue';
import AlertMsg from '@/components/AlertMsg';

export default {
  name: 'Index',
  components: {
    Header,
    Footer,
    AlertMsg,
  },
  data() {
    return {
      scrollOverHero: false,
      hasHero: true,
    };
  },
  methods: {
    handleScroll() {
      let height = window.innerHeight;
      if (!this.hasHero) height = 80;
      this.scrollOverHero = window.scrollY >= height;
    },
    handleGotop(hasHero = true) {
      this.hasHero = hasHero;
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>