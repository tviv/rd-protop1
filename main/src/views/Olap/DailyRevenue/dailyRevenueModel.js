import { getJsonFromOlapApi } from '../../../api/response-handle';
import dateformat from 'dateformat';
import olapModelView from '../OlapComponents/olapModelView';

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

let DAY_COLUMN = 0;
let ORDER_COLUMN_START = 17;
let NOCASH_COLUMN_START = ORDER_COLUMN_START + 7;
let NIGHT_TIME_COLUMN_START = NOCASH_COLUMN_START + 6;
let CERTIFICATE_COLUMN_START = NIGHT_TIME_COLUMN_START + 4;

let dailyRevenueModel = Object.assign(Object.create(olapModelView), {
    MAIN_URL: '/api/olap/daily-revenue',

    data: {},

    filters: {
        filterArray: [
            [
                '[Даты].[Месяцы]',
                [
                    process.env.NODE_ENV === 'development'
                        ? '2019-09-01T00:00:00'
                        : '2019-09-01T00:00:00',
                ],
            ],
        ],
    },

    getDetailData: function(rowIndex, filters = this.filters) {
        let model = this;

        let day = model.data.rows[rowIndex][DAY_COLUMN].UName;

        //todo move to filter class
        let filterArray = [...filters.filterArray];
        filterArray.push(day);
        console.dir(filterArray);

        return new Promise((resolve, reject) => {
            getJsonFromOlapApi('/api/olap/daily-revenue-day-shop', {
                filterArray: filterArray,
            })
                .then(response => {
                    //set cellId
                    response.data.rows.forEach((row, yInd) => {
                        row.forEach((cell, xInd) => {
                            Object.assign(cell, {
                                cellId: `dc_${xInd}_${yInd}`,
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

                    resolve(response.data);
                })
                .catch(e => reject(e));
        });
    },

    cellMap: new Map(),

    getBackgroundColorOfCell: function(cell) {
        let res = null;

        if (!cell) return res;

        if (
            cell.headerCell &&
            (cell.headerCell.UName ===
                '[Measures].[Выполнение плана выручки без НДС]' ||
                cell.headerCell.UName ===
                    '[Measures].[Выполнение плана маржи без НДС]')
        ) {
            if (cell.Value >= 1.05) return '#BEFCBA';
            if (cell.Value > 0 && cell.Value <= 0.97) return '#FCBFBF';
        }

        if (cell.x > CERTIFICATE_COLUMN_START) return '#EFF3DE';
        if (cell.x > NIGHT_TIME_COLUMN_START) return '#DEEFF7';
        if (cell.x > NOCASH_COLUMN_START) return '#E7DFEF';
        if (cell.x > ORDER_COLUMN_START) return '#DEF7E0';

        return res;
    },

    convertDataToDisplay: function(data) {
        if (data.rows.length > 0 && data.rows[0][0].label === 'All') {
            //data.rows[0][0].label = 'Итого';
            data.rows[0].forEach((col, index) => {
                if (index === 0) col.label = 'Итого';
                //col.bold = true;
            });

            data.rows[0].isTotal = true;
            data.rows.push(data.rows[0]);
            data.rows.shift();
        }
    },

    convertDataToExcelFormat: function(data) {
        let widths = [80, 80];
        //let headerRow = data.headerColumns.map((x, ind) =>{return {value: x.label, style: {font: {sz: "10"}}, width: {wpx: ind < widths.length ? widths[ind] : widths[widths.length-1]}}});
        let res = [
            {
                columns: data.headerColumns.map((x, ind) => {
                    return {
                        title: x.label,
                        style: {
                            font: { sz: '10', bold: true },
                            alignment: {
                                vertical: 'center',
                                horizontal: 'center',
                                wrapText: 'true',
                            },
                            border: {
                                bottom: {
                                    style: 'medium',
                                    color: { rgb: '888888' },
                                },
                            },
                            fill: x.background && {
                                patternType: 'solid',
                                fgColor: {
                                    rgb: 'FF' + x.background.replace('#', ''),
                                },
                            },
                        },
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
                                    ? parseFloat(
                                          Math.round(col.Value * 10000) / 10000
                                      ) || col.label
                                    : col.label) || '',
                            style: {
                                font: {
                                    sz: '10',
                                    bold: row.isTotal,
                                },
                                border: {
                                    top: row.isTotal && {
                                        style: 'thin',
                                        color: { rgb: '888888' },
                                    },
                                },
                                alignment: {
                                    horizontal:
                                        index > 0 ? 'center' : undefined,
                                },
                                numFmt: col.label
                                    ? col.label.charAt(col.label.length - 1) ===
                                      '%'
                                        ? '#,##0.00%'
                                        : '#,##0.00'
                                    : undefined,
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
});

export default dailyRevenueModel;
