<template>
  <div class="carts">
    <div class="carts__preview l-gap-x-sm l-space-b-md">
      <a class="carts__preview__btn" href="#" @click.prevent="back">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
        <span class="l-gap-l-sm">上一步</span>
      </a>
    </div>
    <div class="carts__form l-flex-row l-flex-center-expand l-gap-x-sm">
      <ValidationObserver
        tag="form"
        class="carts__form__inner"
        v-slot="{ invalid }"
        @submit.prevent="submitOrder"
      >
        <ValidationProvider
          name="姓名"
          class="carts__form__block carts__form__block--name"
          rules="required"
          v-slot="{ failed, errors }"
          tag="div"
        >
          <label class="carts__form__label" for="username">姓名</label>
          <input
            type="text"
            class="carts__form__input input input--lg"
            :class="{ 'is-invalid': failed }"
            name="name"
            id="username"
            v-model="form.user.name"
            placeholder="輸入姓名"
          />
          <span class="text-disabled">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          name="電子信箱"
          rules="required|email"
          v-slot="{ failed, errors }"
          class="carts__form__block carts__form__block--enail"
          tag="div"
        >
          <label class="carts__form__label" for="useremail">電子信箱</label>
          <input
            type="email"
            class="carts__form__input input input--lg"
            :class="{ 'is-invalid': failed }"
            name="email"
            id="useremail"
            v-model="form.user.email"
            placeholder="請輸入 Email"
            required
          />
          <span class="text-disabled">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          name="電話"
          class="carts__form__block carts__form__block--tel"
          rules="required|numeric"
          v-slot="{ failed, errors }"
          tag="div"
        >
          <label class="carts__form__label" for="usertel">電話</label>
          <input
            type="tel"
            class="carts__form__input input input--lg"
            :class="{ 'is-invalid': failed }"
            id="usertel"
            v-model="form.user.tel"
            placeholder="請輸入電話"
          />
          <span class="text-disabled">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          name="地址"
          class="carts__form__block carts__form__block--addr"
          rules="required"
          v-slot="{ failed, errors }"
          tag="div"
        >
          <label class="carts__form__label" for="useraddress">地址</label>
          <input
            type="text"
            class="carts__form__input input input--lg"
            :class="{ 'is-invalid': failed }"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            placeholder="請輸入地址"
          />
          <span class="text-disabled">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          class="form__block carts__form__block--comment"
          v-slot="{ errors }"
          tag="div"
        >
          <label class="carts__form__label" for="comment">留言</label>
          <textarea
            name="comment"
            id="comment"
            class="carts__form__input input input--lg"
            v-model="form.message"
          ></textarea>
          <span class="text-disabled">{{ errors[0] }}</span>
        </ValidationProvider>
        <div class="carts__form__button carts__form__block--submit">
          <button
            class="button button--lg"
            :class="{ 'button--disabled': invalid }"
            :disabled="invalid"
          >
            送出訂單
          </button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutForm',
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    submitOrder() {
      this.$emit('submit-order', this.form);
    },
    back() {
      this.$emit('back');
    },
  },
};
</script>