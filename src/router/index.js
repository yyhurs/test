import Vue from 'vue';
import VueRouter from 'vue-router';
// frontend
import Index from '@/views/frontend/Index.vue';
import Home from '@/views/frontend/Home.vue';
import Products from '@/views/frontend/Products.vue';
import Product from '@/views/frontend/Product.vue';
import Carts from '@/views/frontend/Carts.vue';
// backend
import Login from '@/views/backend/Login';
import DashboardAdmin from '@/views/backend/DashboardAdmin';
import ProductsAdmin from '@/views/backend/ProductsAdmin';
import OrdersAdmin from '@/views/backend/OrdersAdmin';
import CouponsAdmin from '@/views/backend/CouponsAdmin';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '',
    component: Index,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: 'Apocalyptic EC｜末日電商',
        },
      },
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: {
          title: '商品列表',
        },
      },
      {
        path: 'product/:productId',
        name: 'Product',
        component: Product,
        meta: {
          title: '商品詳情',
        },
      },
      {
        path: 'carts',
        name: 'Carts',
        component: Carts,
        meta: {
          title: '購物車',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '後臺管理',
    },
  },
  {
    path: '/admin',
    name: 'DashboardAdmin',
    component: DashboardAdmin,
    children: [
      {
        path: 'products',
        name: 'ProductsAdmin',
        component: ProductsAdmin,
        meta: {
          requiresAuth: true,
          title: '商品列表',
        },
      },
      {
        path: 'orders',
        name: 'OrdersAdmin',
        component: OrdersAdmin,
        meta: {
          requiresAuth: true,
          title: '訂單列表',
        },
      },
      {
        path: 'coupons',
        name: 'CouponsAdmin',
        component: CouponsAdmin,
        meta: {
          requiresAuth: true,
          title: '優惠券列表',
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
