import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Загрузка...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const OlapSalesCone = Loadable({
  loader: () => import('./views/Olap/SalesCone'),
  loading: Loading,
});

const OlapSettings = Loadable({
  loader: () => import('./views/Olap/Settings'),
  loading: Loading,
});

const OlapSalesConeChart = Loadable({
  loader: () => import('./views/Olap/SalesCone/CompaireShopConesChart'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Начало', component: DefaultLayout },
  { path: '/dashboard', name: 'Общая панель аналитики', component: Dashboard },
  { path: '/olap/sales-cone/compaire-conechart', name: 'Диаграмма сравения КУП', component: OlapSalesConeChart },
  { path: '/olap/sales-cone', name: 'Воронка продаж', component: OlapSalesCone },
  { path: '/olap/settings', name: 'Настройки', component: OlapSettings },
];

export default routes;
