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
let coneDaysToView =  -6;

let salesConeModel = {


  data : {},
  dynamicCUPdata : {},

  filterShopOptions: {},
  filters:{
    segmentFilter: process.env.NODE_ENV === 'development' ? '[Товары].[Товары].&[135639]' : '[Товары].[Товары].&[213571]', //  '[Товары].[Товары].[All].UNKNOWNMEMBER',
    //dateFilter: process.env.NODE_ENV === 'development' ? '2018-06-17' : dateformat(addDays(new Date(), - 1), 'yyyy-mm-dd'),
    periodFilter: {date: (process.env.NODE_ENV === 'development' ? '2018-06-17' : dateformat(addDays(new Date(), - 1), 'yyyy-mm-dd')), days: coneDaysToView},
    //shopFilter: ['[Подразделения].[Подразделение].[All]']
  },

  //---------------MODEL----------------------
  getData: function() {
    let model = this;

    return new Promise((resolve, reject) => {

      getJsonFromOlapApi('/api/olap/sales-cone', model.filters).then((response) => {
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
        let options = response.data.rows.map((x) => ({value: x[0].UName, label: x[0].Caption, ...x[0]}));

        resolve(options);
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
    let model = this;
    let cell = this.getCellById(cellId);


    let property = {};

   // if (!cell) return property;

    try {
      let good = this.data.rows[cell.y][GOOD_COLUMN];
      let shop = this.data.headerColumns[cell.x][0];
      property.filter = {
        periodFilter: this.filters.periodFilter,
        shopFilter: shop.UName && shop.UName.includes('&') > 0 ? shop.UName : this.filters.shopFilter,
        goodFilter: good.UName
      }

      property.dynamicCUPdataFilter = {...property.filter} ;
      property.dynamicCUPdataFilter.periodFilter = {date: this.filters.periodFilter.date, days: -60};
      property.goodName = good.Caption;
      property.cell = cell;
      property.КУП = (cell.x > KUP_COLUMN ? cell.FmtValue : this.data.rows[cell.y][KUP_COLUMN].FmtValue);

    } catch (e) {
    }

    //get additional values from server
      property.serverValuesPromise = new Promise((resolve, reject) => {
        console.log("prop0")
        if (!property.filter) { resolve(null); return}

          getJsonFromOlapApi('/api/olap/sales-cone/cell-property', property.filter).then((response) => {
              console.log("prop")

              let values = {};
              response.data.headerColumns.forEach((x, index) => {
//                console.dir(response.data.rows[0][index]);
                values[x[0].Caption] = response.data.rows[0][index].Caption || response.data.rows[0][index].FmtValue
              });

              console.dir(values);
              resolve(values);
            }
          ).catch((e) => reject(e));
      });

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

  convertFilterArrayToOptions(options, filter, onlyTrailNumbers = false) {
    let res = filter && filter.map(x => {

      let opt = this.getOptionByValue(options, x);
      console.dir(opt);
      let label = opt && (onlyTrailNumbers ? this.extractOnlyTrailNumber(opt.label) : opt.label);
      return {
        value: x,
        label: label
      }
    });
    console.dir(res);
    return res;
  },

  getOptionByValue(options, value) {
    return options.find(x => x.value === value);
  },

  extractOnlyTrailNumber(value) {
    return value && value.replace(/^.*[- ]/g, '');
  }

};

export default salesConeModel;
