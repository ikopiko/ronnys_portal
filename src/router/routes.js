import store from '@/state/store'

export default [
  {
    path: '/',
    name: 'default',
    meta: {
      authRequired: true,
    },
    component: () => import('./views/dashboards/default'),
  },
  {
    path: '/reports/discounts',
    name: 'Discounts',
    meta: { authRequired: true },
    component: () => import('./views/reports/discounts')
  },
  {
    path: '/reports/orders',
    name: 'Orders',
    meta: { authRequired: true },
    component: () => import('./views/reports/orders')
  },
  {
    path: '/reports/banks',
    name: 'Banks',
    meta: { authRequired: true },
    component: () => import('./views/reports/banks')
  },
  {
    path: '/reports/safe',
    name: 'Safe',
    meta: { authRequired: true },
    component: () => import('./views/reports/safe')
  },
  {
    path: '/reports/closed',
    name: 'Closed',
    meta: { authRequired: true },
    component: () => import('./views/reports/closed')
  },
  {
    path: '/reports/invoices',
    name: 'Closed',
    meta: { authRequired: true },
    component: () => import('./views/reports/invoices')
  },
  {
    path: '/warehouse/products',
    name: 'Products',
    meta: { authRequired: true },
    component: () => import('./views/warehouse/products')
  },
  {
    path: '/warehouse/supplies',
    name: 'Request Supply',
    meta: { authRequired: true },
    component: () => import('./views/warehouse/supplies')
  },
  {
    path: '/warehouse/suppliesList',
    name: 'Supply Requests',
    meta: { authRequired: true },
    component: () => import('./views/warehouse/manageSupplies')
  },
  {
    path: '/warehouse/warehouse',
    name: 'Warehouses',
    meta: { authRequired: true },
    component: () => import('./views/warehouse/warehouse')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/account/login'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./views/account/register'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/forgot-password',
    name: 'Forgot password',
    component: () => import('./views/account/forgot-password'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          store.dispatch('auth/logOut')
        } else {
          store.dispatch('authfack/logout')
        }
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.push('/login')
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { name: 'default' } : { ...routeFrom })
      },
    },
  },
 
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
 
]
