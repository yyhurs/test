<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right my-4">
      <button type="button" class="btn btn-primary" @click="openModal(true)">
        新增優惠券
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">名稱</th>
          <th scope="col">折扣百分比</th>
          <th scope="col">到期日</th>
          <th scope="col">是否啟用</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in couponsArr" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.due_date | formatDate }}</td>
          <td>{{ !item.is_enabled ? '否' : '是' }}</td>
          <td>
            <button
              type="button"
              class="btn btn-outline-warning"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="delConfirm(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <Page :page-obj="pagination" @change-page="getCoupons" />
    <!-- upd-modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ !isNew ? '編輯' : '新增' }}優惠券
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="coupon_title" class="col-form-label">標題</label>
              <input
                type="text"
                class="form-control"
                id="coupon_title"
                v-model="tempCoupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code" class="col-form-label">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="coupon_due_date" class="col-form-label">到期日</label>
              <input
                type="date"
                class="form-control"
                id="coupon_due_date"
                v-model="tempCoupon.due_date"
                placeholder="請輸入到期日"
              />
            </div>
            <div class="form-group">
              <label for="coupon_percent" class="col-form-label"
                >折扣百分比</label
              >
              <input
                type="text"
                class="form-control"
                id="coupon_percent"
                v-model="tempCoupon.percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_enabled"
                  v-model="tempCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label class="form-check-label" for="is_enabled"
                  >是否啟用</label
                >
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updCoupon">
              {{ !isNew ? '更新' : '新增' }}優惠券
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- del-confirm -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong>
            優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delCoupon">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Page from '@/components/Page';

export default {
  name: 'couponsAdmin',
  components: {
    Page,
  },
  data() {
    return {
      couponsArr: [],
      tempCoupon: {},
      postCoupon: {},
      pagination: {},
      isNew: false,
      isLoading: false,
      errMsg: '出錯了QQ',
    };
  },
  methods: {
    async getCoupons(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      try {
        const res = await vm.$http.get(url);
        vm.couponsArr = res.data.coupons;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
    openModal(isNew, item) {
      const vm = this;
      vm.tempCoupon = !isNew ? { ...item } : {};
      if (
        !!vm.tempCoupon.due_date &&
        typeof vm.tempCoupon.due_date === 'number'
      )
        vm.tempCoupon.due_date = vm.$root.$options.filters.formatDate(
          vm.tempCoupon.due_date,
        );
      vm.isNew = isNew;
      $('#couponModal').modal('show');
    },
    closeModal() {
      $('#couponModal').modal('hide');
    },
    async updCoupon() {
      const vm = this;
      vm.isLoading = true;
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      try {
        let alertTheme = 'success';
        vm.convertToUnix(vm.tempCoupon.due_date);
        const res = await vm.$http[httpMethod](url, { data: vm.postCoupon });
        if (!res.data.success) alertTheme = 'danger';
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', res.data.message, alertTheme);
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
      vm.closeModal();
      vm.getCoupons();
    },
    delConfirm(item) {
      const vm = this;
      vm.tempCoupon = { ...item };
      $('#delCouponModal').modal('show');
    },
    closeConfirm() {
      $('#delCouponModal').modal('hide');
    },
    async delCoupon() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      try {
        const res = await vm.$http.delete(url);
        let alertTheme = 'success';
        if (!res.data.success) alertTheme = 'danger';
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', res.data.message, alertTheme);
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
      vm.closeConfirm();
      vm.getCoupons();
    },
    convertToUnix(time) {
      const vm = this;
      const unixTimestamp = new Date(`${time}`).getTime() / 1000;
      vm.postCoupon = {
        ...vm.tempCoupon,
        due_date: unixTimestamp,
      };
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
