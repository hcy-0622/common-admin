const useMenus = () => {
  const menus = [
    {
      label: '用户管理',
      path: '',
      icon: 'el-icon-setting',
      children: [
        {
          label: '用户列表',
          path: '/user',
          icon: 'el-icon-user',
          children: [],
        },
      ],
    },
    {
      label: '权限管理',
      path: '',
      icon: 'el-icon-collection',
      children: [
        {
          label: '角色列表',
          path: '/role',
          icon: 'el-icon-view',
          children: [],
        },
        {
          label: '权限列表',
          path: '/auth',
          icon: 'el-icon-unlock',
          children: [],
        },
      ],
    },
  ]

  return menus
}

export default useMenus
