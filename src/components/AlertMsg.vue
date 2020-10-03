<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible alert-custom"
      :class="`alert-custom--${item.status}`"
      v-for="(item, i) in messages"
      :key="i"
    >
      <font-awesome-icon
        :icon="['fas', 'check']"
        v-if="item.status === 'success'"
      />
      <font-awesome-icon :icon="['fas', 'exclamation']" v-else />
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(i)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertMsg',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on('msg:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
};
</script>

<style scope lang="scss">
.message-alert {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1100;
}

.alert-custom {
  border: none;
  border-radius: 0;
  margin-bottom: 1px;
  &--success {
    background-color: rgba(#e6e6e6, 0.8);
    color: #000;
    box-shadow: 0 4px 6px -6px #333133;
    &:hover {
      background-color: rgba(#e6e6e6, 1);
    }
  }
  &--danger {
    background-color: rgba(#333133, 0.8);
    color: #fff;
    box-shadow: 0 4px 6px -6px #e6e6e6;
    &:hover {
      background-color: rgba(#333133, 1);
    }
  }
}
</style>