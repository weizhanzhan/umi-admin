const routes = [{
    path: '/login',
    component: './Login'
  },
  {
    path: '/',
    component: './index',
    routes: [{
        path: '/',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        component: './dashBoard/index'
      },
      {
        path: '/users',
        component: './users/index'
      },
      {
        path: '/setting',
        routes: [{
            path: '/setting/user',
            fatherKey: '/setting',
            component: './setting/user'
          },
          {
            path: '/setting/theme',
            fatherKey: '/setting',
            component: './setting/theme'
          }
        ]
      },
      {
        path: '/blog',
        routes: [{
            path: '/blog/admin',
            fatherKey: '/blog',
            component: './blogs/admin'
          },
          {
            path: '/blog/classify',
            fatherKey: '/blog',
            component: './blogs/classify'
          }
        ]
      }
    ]
  }
]
module.exports = routes
