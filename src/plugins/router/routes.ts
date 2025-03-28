export const routes = [
  { path: "/", redirect: "/carrier" },
  {
    path: "/admin",

    component: () => import("@/pages/admin/default.vue"),
    children: [
      {
        path: "algorithm",
        component: () => import("@/pages/admin/func/algorithm.vue"),
      },
      {
        path: "",
      },
      {
        path: "statistic",
        component: () => import("@/pages/admin/func/statistic.vue"),
      },
    ],
  },
  {
    path: "/carrier",

    component: () => import("@/pages/carrier/default.vue"),
    children: [
      {
        path: "supplier-info/:id",
        component: () => import("@/pages/carrier/func/supplier-info.vue"),
        props:true,
      },
      {
        path: "product-info/:id",
        component: () => import("@/pages/carrier/func/product-info.vue"),
        props:true,
      },
      {
        path: "warehouse-info/:id",
        component: () => import("@/pages/carrier/func/warehouse-info.vue"),
        props:true,
      },
      {
        path: "order-info/:id",
        component: () => import("@/pages/carrier/func/order-info.vue"),
        props:true,
      },
      {
        path: "supplier-list",
        component: () => import("@/pages/carrier/func/supplier-list.vue"),
      },
      {
        path: "supplier-pending-list",
        component: () =>
          import("@/pages/carrier/func/supplier-pending-list.vue"),
      },
      {
        path: "warehouse",
        component: () => import("@/pages/carrier/func/warehouse.vue"),
      },
      {
        path: "truck",
        component: () => import("@/pages/carrier/func/truck.vue"),
      },
      {
        path: "order",
        component: () => import("@/pages/carrier/func/order.vue"),
      },
      {
        path: "plan",
        component: () => import("@/pages/carrier/func/plan.vue"),
      },
      {
        path: "statistic-order",
        component: () => import("@/pages/carrier/func/statistic-order.vue"),
      },
      {
        path: "statistic-truck",
        component: () => import("@/pages/carrier/func/statistic-truck.vue"),
      },
    ],
  },
  {
    path: "/customer",

    component: () => import("@/pages/customer/default.vue"),
    children: [
      {
        path: "shopping",
        component: () => import("@/pages/customer/func/shopping.vue"),
      },
      {
        path: "cart",
        component: () => import("@/pages/customer/func/cart.vue"),
      },
      {
        path: "status",
        component: () => import("@/pages/customer/func/status.vue"),
      },
    ],
  },

  {
    path: "/dropshipper",

    component: () => import("@/pages/dropshipper/default.vue"),
    children: [
      {
        path: "product",
        component: () => import("@/pages/dropshipper/func/product.vue"),
      },
      {
        path: "register",
        component: () => import("@/pages/dropshipper/func/register.vue"),
      },
      {
        path: "statistic",
        component: () => import("@/pages/dropshipper/func/statistic.vue"),
      },
      {
        path: "supplier",
        component: () => import("@/pages/dropshipper/func/supplier.vue"),
      },
    ],
  },
  {
    path: "/supplier",

    component: () => import("@/pages/supplier/default.vue"),
    children: [
      {
        path: "product",
        component: () => import("@/pages/supplier/func/product.vue"),
      },
      {
        path: "statistic",
        component: () => import("@/pages/supplier/func/statistic.vue"),
      },
      {
        path: "warehouse",
        component: () => import("@/pages/supplier/func/warehouse.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/blank.vue"),
    children: [
      {
        path: "login",
        component: () => import("@/pages/login.vue"),
      },
      {
        path: "register",
        component: () => import("@/pages/register.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        component: () => import("@/pages/[...error].vue"),
      },
    ],
  },
];
