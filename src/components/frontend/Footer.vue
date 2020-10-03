<template>
  <footer class="footer">
    <div class="footer__content l-flex-row l-flex-align-start l-flex-expand">
      <div class="footer__logo l-flex-row l-flex-align-center l-gap-x-sm">
        <span class="logo__decor footer__logo__decor"></span>IShouldGo
      </div>
      <div class="footer__contact l-gap-x-sm">
        <div class="footer__title l-gap-b-sm">Contact Us</div>
        <p class="footer__tel">tel：+000 123456789</p>
        <p class="footer__email">email：ishouldgo@ishouldgo.com</p>
      </div>
      <div class="footer__follow l-gap-x-sm">
        <div class="footer__title l-gap-b-sm">Follow Us</div>
        <div class="footer__link l-flex-row l-flex-expand">
          <a href="https://github.com/yyhurs/IShouldGo" class="footer__icon">
            <font-awesome-icon :icon="['fab', 'instagram']" size="2x" />
          </a>
          <a href="https://github.com/yyhurs/IShouldGo" class="footer__icon">
            <font-awesome-icon :icon="['fab', 'facebook-f']" size="2x" />
          </a>
          <a href="https://github.com/yyhurs/IShouldGo" class="footer__icon">
            <font-awesome-icon :icon="['fab', 'twitter']" size="2x" />
          </a>
          <a href="https://github.com/yyhurs/IShouldGo" class="footer__icon">
            <font-awesome-icon :icon="['fab', 'youtube']" size="2x" />
          </a>
          <a href="https://github.com/yyhurs/IShouldGo" class="footer__icon">
            <font-awesome-icon :icon="['fab', 'github']" size="2x" />
          </a>
        </div>
      </div>
    </div>
    <div class="footer__comment l-flex-row l-flex-expand">
      <p class="footer__copyright l-gap-x-sm">
        © 2020 IShouldGo All Rights Reserved
      </p>
      <p class="footer__declare l-gap-x-sm">本網站模擬電商，無任何商業行為。</p>
      <p class="footer__declare l-gap-x-sm">
        本網站介面模仿
        <a class="footer__declare__link" href="https://www.viguier.com/en">
          VIGUIER </a
        >，文案取自<a
          class="footer__declare__link"
          href="https://fruitpay.com.tw/"
          >果物配</a
        >與<a
          class="footer__declare__link"
          href="https://zh.wikipedia.org/wiki/Wiki"
          >維基百科 </a
        >。
      </p>
    </div>
  </footer>
</template>;

<script>
export default {
  name: 'Footer',
  data() {
    return {};
  },
};
</script>