<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
      IShouldGo
    </router-link>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" @click.prevent="signOut">登出</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    async signOut() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/logout`;
      try {
        const res = await vm.$http.post(url);
        if (res.data.success) vm.$router.push('/login');
      } catch (err) {
        vm.$bus.$emit('msg:push', `出錯了：${err}`, 'danger');
      }
    },
  },
};
</script>
