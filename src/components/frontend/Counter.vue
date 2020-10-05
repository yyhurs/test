<template>
  <div class="counter">
    <button
      class="counter__decrement button"
      :class="{ 'button--lg': sizeLg, 'button--disabled': count === 1 }"
      @click="passCounter(-1, true)"
      :disabled="count === 1"
    >
      <font-awesome-icon :icon="['fas', 'minus']" size="xs" />
    </button>
    <input
      class="counter__input input text-center"
      :class="{ ' input--lg': sizeLg }"
      type="text"
      :min="1"
      v-model.number="verifiedCounter"
      @change="passCounter(count)"
    />
    <button
      class="counter__increment button"
      :class="{ 'button--lg': sizeLg }"
      @click="passCounter(1, true)"
    >
      <font-awesome-icon :icon="['fas', 'plus']" size="xs" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    sizeLg: Boolean,
    qty: Number,
    dataObj: Object,
  },
  data() {
    return {
      count: this.qty || 1,
    };
  },
  watch: {
    qty() {
      this.count = this.qty;
    },
  },
  methods: {
    passCounter(num = 1, isClick = false) {
      const vm = this;
      if (isClick) vm.count += num;
      else vm.count = num;
      if (vm.count < 1) vm.count = 1;
      if (vm.dataObj) vm.$emit('pass-counter', vm.count, vm.dataObj);
      else vm.$emit('pass-counter', vm.count);
    },
  },
  computed: {
    verifiedCounter: {
      get() {
        return this.count;
      },
      set(val) {
        if (!val || typeof val === 'string') return;
        this.count = val < 1 ? 1 : val;
      },
    },
  },
};
</script>