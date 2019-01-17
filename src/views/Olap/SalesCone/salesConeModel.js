'use strict'

import {getJsonFromOlapApi} from '../../../api/response-handle';
import dateformat from 'dateformat';

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

let GOOD_COLUMN = 0;
let HIDDEN_COLS = [1];
let KUP_COLUMN = 3;
let coneDaysForView =  -21;
let conedaysForDynamicCUP =  -26*7;

//let coneResultMultiplier =  3;

let salesConeModel = {


  data : {},
  dynamicCUPdata : {},

  filterShopOptions: {},
  filters:{
    segmentFilter: process.env.NODE_ENV === 'development' ? '[Товары].[Товары].&[99841]' : '[Товары].[Товары].&[213571]', //  '[Товары].[Товары].[All].UNKNOWNMEMBER',
    //dateFilter: process.env.NODE_ENV === 'development' ? '2018-06-17' : dateformat(addDays(new Date(), - 1), 'yyyy-mm-dd'),
    periodFilter: {date: (process.env.NODE_ENV === 'development' ? '2018-06-11' : dateformat(addDays(new Date(), 0), 'yyyy-mm-dd')), days: coneDaysForView + 1},
    //shopFilter: ['[Подразделения].[Подразделение].[All]']
    filterArray: [['[Товары].[Товары]', [process.env.NODE_ENV === 'development' ? '99841' : '99841']]]
  },


  //---------------MODEL VIEW----------------------
  getData: function(filters = this.filters) {
    let model = this;

    return new Promise((resolve, reject) => {

      getJsonFromOlapApi('/api/olap/sales-cone', filters).then((response) => {
        //set cellId
        response.data.rows.forEach((row, yInd)=> {
            row.forEach((cell, xInd) => {
              Object.assign(cell, {
                cellId: `c_${xInd}_${yInd}`,
                label: cell.FmtValue ? cell.FmtValue : cell.Caption,
                x: xInd,
                y: yInd,
                row: row,
                headerCell: response.data.headerColumns[xInd][0],
                hidden: HIDDEN_COLS.includes(xInd)
              });
              cell.background = this.getBackgroundColorOfCell(cell),
              model.cellMap.set(cell.cellId, cell)
            });
          });

        //refine header objects
        this.convertDataToDisplay(response.data);

        model.data = response.data;
        resolve(model.data);
        }
      ).catch((e) => reject(e));
    });
  },

  convertDataToDisplay: function(data) {
    data.headerColumns.forEach((x)=>{
      x[0].Caption = x[0].Caption.replace(/^.*[- ]/g, ''); //move names, remain only number
    });
    data.headerColumns = data.headerColumns.map((item, index) =>{return {label:item[0].Caption, hidden: HIDDEN_COLS.includes(index)}});
    //return data;
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
    if (!cellId) return;
    let model = this;
    let cell = this.getCellById(cellId);


    let property = {};

   // if (!cell) return property;

    try {
      let good = this.data.rows[cell.y][GOOD_COLUMN];
      let shop = cell.headerCell;
      property.filter = {
        periodFilter: this.filters.periodFilter,
        shopFilter: shop.UName && shop.UName.includes('&') > 0 ? shop.UName : this.filters.shopFilter,
        goodFilter: good.UName
      };
      Object.assign(property, {
        dynamicCUPdataFilter: {...property.filter, periodFilter: {date: this.filters.periodFilter.date, days: conedaysForDynamicCUP}},
        goodName:             good.Caption,
        cell:                 cell,
        КУП:                  (cell.x > KUP_COLUMN ? cell.FmtValue : this.data.rows[cell.y][KUP_COLUMN].FmtValue),
        'Отклонение %':       Math.round(this.getDeviationOfCell(cell) * 10000)/100
      });


    } catch (e) {
      throw e;
    }

    //get additional values from server
      property.serverValuesPromise = new Promise((resolve, reject) => {
        console.log("prop0")
        if (!property.filter) { resolve(null); return}

          getJsonFromOlapApi('/api/olap/sales-cone/cell-property', property.filter).then((response) => {
              console.log("prop")

              let values = {};
              if (response.data && response.data.rows.length) {
                response.data.headerColumns.forEach((x, index) => {
//                console.dir(response.data.rows[0][index]);
                  values[x[0].Caption] = response.data.rows[0][index].Caption || response.data.rows[0][index].FmtValue
                });
              } else {
                reject('no result');
              }

              //console.dir(values);
              resolve(values);
            }
          ).catch((e) => reject(e));
      });

    return property;
  },

  getCellById: function (cellId) {
    return this.cellMap.get(cellId)
  },

  // getDeviation: function(cellId) {
  //   return  getDeviationOfCell(this.getCellById(cellId));
  // },

  getDeviationOfCell: function(cell) {
    let cellCommonCup = cell.row[KUP_COLUMN];
    let commonCUP = cellCommonCup.Value;

    return  (commonCUP > 0 ? ((cell.Value - commonCUP)/commonCUP).toPrecision(4) : null);
  },

  // getCellColor: function (cellId) {
  //   return this.getBackgroundColorOfCell(this.getCellById(cellId));
  // },

  getBackgroundColorOfCell: function (cell) {
    let res = null;
    if (cell.row[1].Value == 'Нет') res = "#FFCC99";

    if (!cell || cell.x < KUP_COLUMN) return res;

    let deviation =  this.getDeviationOfCell(cell);
    if (deviation > 0.2) {
      return '#A6CAF0';
    }
    if (deviation < -0.2 && deviation > -1) {
      return '#FFC0CB'
    }

    return res;
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

  convertDataToExcelFormat: function (data) {
    let widths = [300, 50, 50, 30];
    //let headerRow = data.headerColumns.map((x, ind) =>{return {value: x.label, style: {font: {sz: "10"}}, width: {wpx: ind < widths.length ? widths[ind] : widths[widths.length-1]}}});
    let res = [{
      columns: data.headerColumns.map((x, ind) =>{return {title: x.label, style: {font: {sz: "10"}}, width: {wpx: ind < widths.length ? widths[ind] : widths[widths.length-1]}}}),
      data: data.rows.map((row, rowIndex) =>
          row.map((col, index)=> {return {value: (col.Value ? parseFloat(col.Value) || col.label : col.label) || '', style: {font: {sz: "10"}, fill: col.background && {patternType: "solid", fgColor: {rgb: 'FF'+col.background.replace('#','')}}}} }))
    }];
    return res;
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
