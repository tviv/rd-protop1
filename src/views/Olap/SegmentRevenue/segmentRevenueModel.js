import olapModelView from '../OlapComponents/olapModelView';
import moment from 'moment';

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
