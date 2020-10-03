<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">訂單成立時間</th>
          <th scope="col">Email</th>
          <th scope="col">應付金額</th>
          <th scope="col">是否付款</th>
          <th scope="col">付款時間</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in ordersArr" :key="item.id">
          <td>{{ item.create_at | formatDate }}</td>
          <td>{{ item.user.email }}</td>
          <td>{{ item.total }}</td>
          <td>{{ !item.is_paid ? '否' : '是' }}</td>
          <td v-if="!item.is_paid">尚未付款</td>
          <td v-else>{{ item.paid_date | formatDate }}</td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <Page :page-obj="pagination" @change-page="getOrders" />
  </div>
</template>

<script>
import Page from '@/components/Page';

export default {
  name: '',
  components: {
    Page,
  },
  data() {
    return {
      ordersArr: [],
      pagination: {},
      isLoading: false,
      errMsg: '出錯了QQ',
    };
  },
  methods: {
    async getOrders(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      try {
        const res = await vm.$http.get(url);
        vm.ordersArr = res.data.orders;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
