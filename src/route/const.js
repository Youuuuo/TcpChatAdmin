export const menus = [
  {
    title: '首页',
    icon: 'home',
    key: '/home'
  },
  {
    title: '普通用户',
    icon: 'user',
    key: '/home/user',
    subs: [
      {key: '/home/user/statistics', title: '用户统计', icon: 'area-chart',},
      {key: '/home/user/edit', title: '用户管理', icon: 'edit',},
    ]
  },
  {
    title: '群组',
    icon: 'team',
    key: '/home/group',
    subs: [
      {key: '/home/group/statistics', title: '查看群组', icon: ''},
      // {key: '/home/group/edit', title: '群组管理', icon: ''},
    ]
  },
  {
    title: '消息管理',
    icon: 'android',
    key: '/home/message',
    subs: [
      {key: '/home/message/sensitive', title: '查看敏感词消息', icon: ''},
      {key: '/home/message/feedback', title: '查看反馈记录', icon: ''},
    ]
  },
  {
    title: '静态资源',
    icon: 'wallet',
    key: '/home/statics',
    subs: [
      {key: '/home/statics/avatars', title: '头像', icon: ''},
    ]
  },
]
