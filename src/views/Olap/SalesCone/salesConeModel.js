'use strict'

import {getJsonAnswer, getJsonFromOlapApi} from '../../../models/response-handle';
import dateformat from 'dateformat';

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

let salesConeModel = {
  data : {},
  filterShopOptions: {},
  filters:{
    segmentFilter: '[Товары].[Товары].[All].UNKNOWNMEMBER',
    dateFilter: dateformat(addDays(new Date(), - 1), 'yyyy-mm-dd')
  },

  getData: function() {
    let model = this;

    return new Promise((resolve, reject) => {
      getJsonFromOlapApi('/api/olap/sales-cone', model.filters).then((response) => {
        response.data.headerColumns.forEach((x)=>{
          x[0].Caption = x[0].Caption.replace(/All/g, 'КИП').replace(/Минимаркет /g, '');
        })
        model.data = response.data;
        resolve(model.data);
        }
      ).catch((e) => reject(e));
    });


  },


  getFilterOption: function(dimension) {
    let model = this;

    return new Promise((resolve, reject) => {
      getJsonFromOlapApi('/api/olap/dim', {dim: dimension}).then((response) => {
        resolve(response.data.rows.map((x) => x[0]));
        }
      ).catch((e) => reject(e));
    });

  }

};

export default salesConeModel;
