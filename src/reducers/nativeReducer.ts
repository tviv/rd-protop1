import { Reducer } from 'redux';
import {
    ACTUAL_ERROR,
    ACTUAL_HIDE,
    ACTUAL_SHOW,
    ACTUAL_UPDATED,
} from '../actions/extraActions';
import moment from 'moment';

export declare type KPIColor = 'primary' | 'warning' | 'danger';
type State = {
    actualDate: string;
    actualColor: KPIColor;
    actualSmallVisible: boolean;
};

const setActualColor = (strDate: string): KPIColor => {
    const date = moment(strDate, 'DD.MM.YYYY');
    const dayDiff = moment()
        .startOf('day')
        .diff(date, 'days');
    switch (dayDiff) {
        case 0:
            return 'primary';
        case 1:
            return 'warning';
        default:
            return 'danger';
    }
};

const nativeReducer: Reducer<State> = (
    previousState = {
        actualDate: '-',
        actualColor: 'primary',
        actualSmallVisible: false,
    },
    { type, payload }
) => {
    switch (type) {
        case ACTUAL_UPDATED:
            return {
                ...previousState,
                actualDate: payload.data.slice(0, 10),
                actualColor: setActualColor(payload.data),
            };
        case ACTUAL_ERROR:
            return {
                ...previousState,
                actualDate: 'N/A',
                actualColor: 'danger',
            };
        case ACTUAL_SHOW:
        case ACTUAL_HIDE:
            return {
                ...previousState,
                actualSmallVisible: type === ACTUAL_SHOW,
            };
        default:
            return previousState;
    }
};

export default nativeReducer;
