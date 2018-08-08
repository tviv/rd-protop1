'use strict'

import {getJsonAnswer, getJsonFromOlapApi} from '../../../models/response-handle';
import dateformat from 'dateformat';

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

let GOOD_COLUMN = 0;
let KUP_COLUMN = 2;

let salesConeModel = {
  data : {},
  dynamicCUPdata : {},

  filterShopOptions: {},
  filters:{
    segmentFilter: process.env.NODE_ENV === 'development' ? '[Товары].[Товары].&[135639]' : '[Товары].[Товары].[All].UNKNOWNMEMBER',
    dateFilter: process.env.NODE_ENV === 'development' ? '2018-06-17' : dateformat(addDays(new Date(), - 1), 'yyyy-mm-dd'),
    shopFilter: ['[Подразделения].[Подразделение].[All]']
  },

  //---------------MODEL----------------------
  getData: function() {
    let model = this;

    return new Promise((resolve, reject) => {
      getJsonFromOlapApi('/api/olap/sales-cone', {segmentFilter: model.filters.segmentFilter, periodFilter: {date: this.filters.dateFilter, days: -6}, shopFilter: this.filters.shopFilter}).then((response) => {
        response.data.headerColumns.forEach((x)=>{
          x[0].Caption = x[0].Caption.replace(/^.*[- ]/g, ''); //move names, remain only number
        })

        //set cellId
          response.data.rows.forEach((row, yInd)=> {
            row.forEach((cell, xInd) => {
              cell.cellId = `c_${xInd}_${yInd}`
              cell.x = xInd;
              cell.y = yInd;
              model.cellMap.set(cell.cellId, cell)
            })
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

  },

  getDynamicCUPData: function(filters) {
    let model = this;

    return new Promise((resolve, reject) => {
      getJsonFromOlapApi('/api/olap/sales-cone/dynamic-cup', filters).then((response) => {

          model.dynamicCUPdata = this.convertTableDataToChartData(response.data); //for the furture, and storing filter inside
          resolve(model.dynamicCUPdata);
        }
      ).catch((e) => reject(e));
    });
  },

  //--------------VIEW MODEL----------------
  cellMap: new Map(),

  getDataCellPropertyById: function (cellId)  {
    let cell = this.getCellById(cellId);


    let property = {};

    if (!cell) return property;

    let good = this.data.rows[cell.y][GOOD_COLUMN];
    let shop = this.data.headerColumns[cell.x][0];

    let filter = {periodFilter: {date: this.filters.dateFilter, days: -60}};
    filter.shopFilter = shop.UName && shop.UName.includes('&') > 0 ? shop.UName : this.filters.shopFilter;
    filter.goodFilter = good.UName;

    property.filter = filter;
    property.goodName = good.Caption;
    property.cell = cell;
    property.КУП = (cell.x > KUP_COLUMN ? cell.FmtValue : this.data.rows[cell.y][KUP_COLUMN].FmtValue);

    return property;
  },

  getCellById: function (cellId) {
    return this.cellMap.get(cellId)
  },


  //now only for col to labels
  convertTableDataToChartData: function (data) {
    let result = {
      labels: [],
      datasets: []
    };
    data.headerColumns.forEach((item, index) =>
    {if (index > 0) result.labels.push(item[0].Caption)}
    );

    data.rows.map((item, index) => {
      let dataset = {
        data: []
      };
      result.datasets.push(dataset);
      item.map((col, index) => {
          if (index === 0) dataset.label = col.Caption;
          else dataset.data.push(col.Value);
        }
      );
    });


    console.log(result);
    return result;
  },

  convertDimFilterOptionsToMulti: function (options) {
    return options.map((item) => {return {value: item.UName, label: item.Caption}});
  }


};

export default salesConeModel;
