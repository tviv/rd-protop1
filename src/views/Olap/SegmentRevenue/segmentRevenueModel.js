import olapModelView from '../OlapComponents/olapModelView';
import moment from 'moment';

let INCOME_COLUMN_START = 1;
let PROFIT_COLUMN_START = INCOME_COLUMN_START + 3;
let CLIENT_COLUMN_START = PROFIT_COLUMN_START + 7;
let ARTICLE_COLUMN_START = CLIENT_COLUMN_START + 3;
let KOB_COLUMN_START = ARTICLE_COLUMN_START + 9;
let OTHER_COLUMN_START = KOB_COLUMN_START + 3;

let segmentRevenueModel = Object.assign(Object.create(olapModelView), {
    MAIN_URL: '/api/olap/segment-revenue',
    //HIDDEN_COLS: [1, 3],
    FROZEN_COLUMN_COUNT: 2,
    data: {},

    filters: {
        periodFilter: { date: '2020-04-01', endDate: '2020-04-30'
            // date: moment()
            //     .add(-1, 'day')
            //     .startOf('month')
            //     .format('YYYY-MM-DD'),
            // endDate: moment()
            //     .add(-1, 'day')
            //     .endOf('month')
            //     .format('YYYY-MM-DD'),
        },
        filterArray: [
            // [
            //     '[Даты].[Месяцы]',
            //     [
            //         process.env.NODE_ENV === 'development'
            //             ? '2019-09-01T00:00:00'
            //             : '2019-09-01T00:00:00',
            //     ],
            // ],
        ],
    },

    getDetailData: function(rowIndex, filters = this.filters) {
        let model = this;
        let isSegment2DataView = true;

        let key = model.data.rows[rowIndex][0].UName;

        //todo move to filter class
        let _filter = {};

        if (model.data.rows[rowIndex].isTotal) {
            _filter = this.filters;
        } else {
            if (isSegment2DataView) {
                _filter.periodFilter = this.filters.periodFilter;
            } else {
            }
            _filter.filterArray = [...filters.filterArray];
            _filter.filterArray.push(key);
        }

        return this.getData(
            '/api/olap/segment-revenue-detail',
            _filter,
            `dc_${rowIndex}`
        );
    },

    //1.	В колонках: «Отклонение выполнение по ВМ от выполнение по ТО», «Отклонение УВМ от плана», «Отклонение от плана Ср ст-ть артикула», «Отклонение от плана Кол артикулов на 1 клиента» - значения меньше нуля выделить красным цветом
    // 2.	В колонке «Отклонение от плана Коэф оборачиваемости» - значения больше нуля выделить красным цветом
    // 3.	В колонках: «Выполнение план сегмент Выручка без НДС», «Выполнение план сегмент Маржа без НДС», «Выполнение плана Кол клиентов», «Выполнение плана Кол артикулов» - значение меньше 95% выделять красным цветом, значения больше 103% выделить зеленым цветом

    getBackgroundColorOfCell: function(cell) {
        let res = null;

        if (!cell) return res;

        let forNegativVal = ["Отклонение выполнение по ВМ от выполнение по ТО", "Отклонение УВМ от плана", "Отклонение от плана Ср. ст-ть артикула", "Отклонение от плана Кол артикулов на 1 клиента"];
        let forNegativeValIfPos = ["Отклонение от плана Коэф оборачиваемости"];
        let kpi1 = ["Выполнение план сегмент Выручка без НДС", "Выполнение план сегмент Маржа без НДС", "Выполнение плана Кол клиентов", "Выполнение плана Кол артикулов"];

        if (cell.headerCell) {
            if (forNegativVal.includes(cell.headerCell.Caption)) {
                if (cell.Value < 0) return '#FCBFBF';
            } else if (forNegativeValIfPos.includes(cell.headerCell.Caption)) {
                if (cell.Value > 0) return '#FCBFBF';
            } else if (kpi1.includes(cell.headerCell.Caption)) {
                if (cell.Value >= 1.03) return '#BEFCBA';
                if (cell.Value < 0.95) return '#FCBFBF';
            }
        }

        //if (cell.x >= CLIENT_COLUMN_START) return null;
        if (cell.x >= OTHER_COLUMN_START) return null;
        if (cell.x >= KOB_COLUMN_START) return '#EFF3DE';
        if (cell.x >= ARTICLE_COLUMN_START) return '#DEEFF7';
        if (cell.x >= CLIENT_COLUMN_START) return '#E7DFEF';
        if (cell.x >= PROFIT_COLUMN_START) return '#dfebf7';
        if (cell.x >= INCOME_COLUMN_START) return '#f7eddd';

        return res;
    },

    convertDataToDisplay: function(data) {
        if (data.rows.length > 0 && data.rows[0][0].label === 'All') {
            data.rows[0].forEach((col, index) => {
                if (index === 0) col.label = 'Итого';
                if (index === 1 && col.label === 'All') col.label = null; //the detail columns is added to table
                //col.bold = true;
            });

            data.rows[0].isTotal = true;
            data.rows.push(data.rows[0]);
            data.rows.shift();
        }

        data.rows.forEach(row =>
            row.forEach(col => {
                if (col.label === 'All') col.label = 'Все';
                if (col.index === 0) col.maxWidth = '300px';
            })
        );
    },
});

export default segmentRevenueModel;
