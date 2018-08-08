let menu = {
  items: [
    {
      name: 'Chart',
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
          name: 'Настройки',
          url: '/olap/settings',
          icon: 'icon-puzzle',
        }
      ]
    }
  ]
};

if (process.env.NODE_ENV !== 'development') {
  menu.items =
    [
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

        ]
      }
    ];
}


export default menu;
