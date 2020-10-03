<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right my-4">
      <button type="button" class="btn btn-primary" @click="openModal(true)">
        新增商品
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">分類</th>
          <th scope="col">名稱</th>
          <th scope="col">原價</th>
          <th scope="col">售價</th>
          <th scope="col">是否啟用</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in productsArr" :key="item.id">
          <td v-text="item.category"></td>
          <td v-text="item.title"></td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td>
            <span v-if="item.is_enabled === 1">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
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
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <Page :page-obj="pagination" @change-page="getProducts" />

    <!-- upd-modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
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
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i
                      class="fas fa-spinner fa-pulse"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-3">
                    <label for="price">數量</label>
                    <input
                      type="number"
                      class="form-control"
                      id="num"
                      :min="numMin"
                      v-model.number="verifiedNum"
                      placeholder="請輸入數量"
                    />
                  </div>
                  <div class="form-group col-md-3">
                    <label for="price">單位</label>
                    <input
                      type="text"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="content">商品內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入商品內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="description">商品細節</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入商品細節"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled"
                      >是否啟用</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
              @click="resetImg"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updProduct">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- del-confirm -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
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
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delProduct">
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
  name: 'ProductsAdmin',
  components: {
    Page,
  },
  data() {
    return {
      productsArr: [],
      tempProduct: {
        num: 1,
      },
      isNew: false,
      pagination: {},
      isLoading: false,
      status: {
        fileUploading: false,
      },
      errMsg: '出錯了QQ',
      numMin: 1,
    };
  },
  methods: {
    async getProducts(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      try {
        const res = await vm.$http.get(url);
        vm.productsArr = res.data.products;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
    openModal(isNew, item) {
      const vm = this;
      vm.tempProduct = !isNew ? { ...item } : {};
      vm.isNew = isNew;
      $('#productModal').modal('show');
    },
    closeModal() {
      $('#productModal').modal('hide');
    },
    async updProduct() {
      const vm = this;
      vm.isLoading = true;
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      try {
        const res = await vm.$http[httpMethod](url, { data: vm.tempProduct });
        let alertTheme = 'success';
        if (!res.data.success) alertTheme = 'danger';
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', res.data.message, alertTheme);
      } catch (err) {
        vm.isLoading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
      vm.closeModal();
      vm.resetImg();
      vm.getProducts();
    },
    delConfirm(item) {
      const vm = this;
      vm.tempProduct = { ...item };
      $('#delProductModal').modal('show');
    },
    closeConfirm() {
      $('#delProductModal').modal('hide');
    },
    async delProduct() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
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
      vm.getProducts();
    },
    async uploadFile() {
      const vm = this;
      vm.status.fileUploading = true;
      const file = vm.$refs.files.files[0];
      const formData = new FormData();
      formData.append('file-to-update', file);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      try {
        const res = await vm.$http.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        let alertTheme = 'danger';
        let msgText = res.data.message;
        if (res.data.success) {
          alertTheme = 'success';
          msgText = '圖片上傳成功';
          vm.$set(vm.tempProduct, 'imageUrl', res.data.imageUrl);
        }
        vm.status.fileUploading = false;
        vm.$bus.$emit('msg:push', msgText, alertTheme);
      } catch (err) {
        vm.status.fileUploading = false;
        vm.$bus.$emit('msg:push', `${vm.errMsg}：${err}`, 'danger');
      }
    },
    resetImg() {
      const vm = this;
      vm.$refs.files.value = null;
    },
  },
  computed: {
    verifiedNum: {
      get() {
        return this.tempProduct.num;
      },
      set(value) {
        if (!value || typeof value === 'string') return;
        if (value >= this.numMin) this.tempProduct.num = value;
      },
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
