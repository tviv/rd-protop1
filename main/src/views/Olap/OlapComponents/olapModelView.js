import { getJsonFromOlapApi } from '../../../api/response-handle';
import { FETCH_ERROR } from 'ra-core';
import { connect } from 'react-redux';

const fetchError = error => ({
    type: FETCH_ERROR,
    error,
});

let olapModelView = {
    MAIN_URL: '/api/olap/...',
    HIDDEN_COLS: [],
    EXCELCOLWIDTHS: [],

    data: {},
    dynamicCUPdata: {},

    filters: {
        filterArray: [],
    },

    //---------------MODEL VIEW----------------------
    getData: function(filters = this.filters) {
        let model = this;

        return new Promise((resolve, reject) => {
            getJsonFromOlapApi(this.MAIN_URL, filters)
                .then(response => {
                    //set cellId
                    response.data.rows.forEach((row, yInd) => {
                        row.forEach((cell, xInd) => {
                            Object.assign(cell, {
                                cellId: `c_${xInd}_${yInd}`,
                                label: cell.FmtValue
                                    ? cell.FmtValue
                                    : cell.Caption,
                                x: xInd,
                                y: yInd,
                                row: row,
                                headerCell:
                                    response.data.headerColumns[xInd][0],
                                hidden: this.HIDDEN_COLS.includes(xInd),
                            });
                            cell.background = this.getBackgroundColorOfCell(
                                cell
                            );
                            model.cellMap.set(cell.cellId, cell);
                        });
                    });

                    //refine header objects
                    this.convertDataToDisplay(response.data);
                    this.convertHeaderToDisplay(response.data);

                    model.data = response.data;
                    resolve(model.data);
                })
                .catch(e => {
                    reject(e);
                });
        });
    },

    convertHeaderToDisplay: function(data) {
        data.headerColumns = data.headerColumns.map((item, index) => {
            let cell = {
                label: item[0].Caption,
                x: index,
                y: 0,
                hidden: this.HIDDEN_COLS.includes(index),
            };
            cell.background = this.getBackgroundColorOfCell(cell);
            return cell;
        });
    },

    convertDataToDisplay: function(data) {},

    getFilterOption: function(dimension) {
        let model = this;

        return new Promise((resolve, reject) => {
            getJsonFromOlapApi('/api/olap/dim', { dim: dimension })
                .then(response => {
                    let options = response.data.rows.map(x => ({
                        value: x[0].UName,
                        label: x[0].Caption,
                        ...x[0],
                    }));

                    resolve(options);
                })
                .catch((descr, e) => reject(descr, e));
        });
    },

    cellMap: new Map(),

    getCellById: function(cellId) {
        return this.cellMap.get(cellId);
    },

    // getCellColor: function (cellId) {
    //   return this.getBackgroundColorOfCell(this.getCellById(cellId));
    // },

    getBackgroundColorOfCell: function(cell) {
        let res = null;

        return res;
    },

    //now only for col to labels
    convertTableDataToChartData: function(data) {
        let result = {
            labels: [],
            datasets: [],
        };
        data.headerColumns.forEach((item, index) => {
            if (index > 0) result.labels.push(item[0].Caption);
        });

        data.rows.map((item, index) => {
            let dataset = {
                data: [],
            };
            result.datasets.push(dataset);
            item.map((col, index) => {
                if (index === 0) dataset.label = col.Caption;
                else dataset.data.push(col.Value);
            });
        });

        return result;
    },

    convertDataToExcelFormat: function(data) {
        let widths = this.EXCELCOLWIDTHS;
        let res = [
            {
                columns: data.headerColumns.map((x, ind) => {
                    return {
                        title: x.label,
                        width: {
                            wpx:
                                ind < widths.length
                                    ? widths[ind]
                                    : widths[widths.length - 1],
                        },
                    };
                }),
                data: data.rows.map((row, rowIndex) =>
                    row.map((col, index) => {
                        return {
                            value:
                                (col.Value
                                    ? parseFloat(col.Value) || col.label
                                    : col.label) || '',
                            style: {
                                font: { sz: '10' },
                                fill: col.background && {
                                    patternType: 'solid',
                                    fgColor: {
                                        rgb:
                                            'FF' +
                                            col.background.replace('#', ''),
                                    },
                                },
                            },
                        };
                    })
                ),
            },
        ];
        return res;
    },

    convertFilterArrayToOptions(options, filter, onlyTrailNumbers = false) {
        let res =
            filter &&
            filter.map(x => {
                let opt = this.getOptionByValue(options, x);
                console.dir(opt);
                let label =
                    opt &&
                    (onlyTrailNumbers
                        ? this.extractOnlyTrailNumber(opt.label)
                        : opt.label);
                return {
                    value: x,
                    label: label,
                };
            });
        console.dir(res);
        return res;
    },

    getOptionByValue(options, value) {
        return options.find(x => x.value === value);
    },

    extractOnlyTrailNumber(value) {
        return value && value.replace(/^.*[- ]/g, '');
    },
};

export default olapModelView;
