export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-drop',
    },
    {
      name: 'Olap',
      url: '/olap',
      //icon: 'icon-puzzle',
      children: [
        {
          name: 'Воронка продаж',
          url: '/olap/sales-cone',
          icon: 'icon-drop',
        },
        {
          name: 'Settings',
          url: '/olap/settings',
          icon: 'icon-puzzle',
        }
    ]
    }
  ],
};
