import React, {PureComponent} from 'react';
import model from "./salesConeModel";
import OlapTableContainer from "../OlapComponents/OlapTableContainer";

class SalesConeTableContainer extends PureComponent {

  //todo move to filter block
  checkFilters = (filters) => {
    let res = false;
    res = res
      || SalesConeTableContainer.checkFilter(filters, '[Товары].[Товары]')
      || SalesConeTableContainer.checkFilter(filters, '[Товары].[Поставщик]')
      || SalesConeTableContainer.checkFilter(filters, '[Товары].[Производитель]')
      || SalesConeTableContainer.checkFilter(filters, '[Признаки товара].[Категории]');

    if (res)
      return undefined;
    else
      return 'Не заполнен ни один из основных фильтров';
  };

  static checkFilter (filters, filterName) {
    let vals = (new Map(filters.filterArray)).get(filterName);
    return (vals && vals.length > 0 && !vals.includes('0'));
  }

  render() {
    return (<OlapTableContainer title = "Данные по КУП за три полных недели" model={model} checkFilters={this.checkFilters} {...this.props}/>);
  }
}

export default SalesConeTableContainer;
