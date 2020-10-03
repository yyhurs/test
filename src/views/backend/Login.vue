<template>
  <div class="form-container l-flex-col l-flex-center-expand">
    <form class="form-signin" @submit.prevent="signIn">
      <h1 class="h3 mb-3 font-weight-normal text-center">登入</h1>
      <label for="inputEmail" class="sr-only">信箱</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
        v-model="user.username"
      />
      <label for="inputPassword" class="sr-only">密碼</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="user.password"
      />
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        登入
      </button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2020</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async signIn() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      try {
        const res = await vm.$http.post(url, vm.user);
        if (res.data.success) vm.$router.push('/admin/products');
      } catch (err) {
        vm.$bus.$emit('msg:push', `出錯了：${err}`, 'danger');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-container {
  min-height: 100vh;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  padding-bottom: 30vh;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
