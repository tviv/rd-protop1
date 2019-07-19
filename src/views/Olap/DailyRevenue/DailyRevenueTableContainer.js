'use strict'

import React, { PureComponent } from 'react';
import model from "./dailyRevenueModel";
import OlapTableContainer from "../OlapComponents/OlapTableContainer";


class DailyRevenueTableContainer extends PureComponent {
//todo move to filter block
  checkFilters = (filters) => {
    let vals = (new Map(filters.filterArray)).get('[Даты].[Месяцы]');
    let res = (vals && vals.length > 0 && !vals.includes('0'));
    if (res)
      return undefined;
    else
      return 'Нет ограничения по дате';
  };

  onExpand = (rowIndex) => {
    return model.getDetailData(rowIndex, this.props.filters);
  };

  render() {
    return (<OlapTableContainer title = "Ежедневная выручка за месяц" model={model} frozenCols={2} checkFilters={this.checkFilters} onExpand={this.onExpand} {...this.props}/>);
  }
}

export default DailyRevenueTableContainer;
