export default [
  {
    name: '商户首页',
    path: 'index',
    icon: ''
  },
  {
    name: '商品管理',
    path: 'food',
    icon: '',
    children: [
      {
        name: '商品列表',
        path: 'list'
      }
    ]
  },
  {
    name: '订单管理',
    path: 'order',
    icon: '',
    children: [
      {
        name: '订单处理',
        path: 'waiting'
      },
      {
        name: '历史订单',
        path: 'history'
      }
    ]
  }
]