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
        name:'dashboard',
        icon:'area-chart',
        component: './dashBoard/index'
      },
      {
        path: '/users',
        name:'users',
        icon:'user',
        component: './users/index'
      },
      {
        path: '/setting',
        name:'setting',
        icon:'setting',
        routes: [{
            path: '/setting/user',
            fatherKey: '/setting',
            icon:'team',
            name:'user-setting',
            component: './setting/user',
            role:['admin']
          },
          {
            path: '/setting/theme',
            fatherKey: '/setting',
            icon:'fire',
            name:'theme-setting',
            component: './setting/theme'
          }
        ]
      },
      {
        path: '/blog',
        name:'blog',
        icon:'appstore',
        routes: [{
            path: '/blog/admin',
            fatherKey: '/blog',
            icon:'file-search',
            name:'blog-admin',
            component: './blogs/admin'
          },
          {
            path: '/blog/classify',
            fatherKey: '/blog',
            icon:'read',
            name:'blog-classify',
            component: './blogs/classify'
          }
        ]
      }
    ]
  }
]
module.exports = routes
