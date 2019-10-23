import { put, call, takeLatest } from 'redux-saga/effects';
import {
    ACTUAL_UPDATE,
    actualError,
    ActualUpdateAction,
    actualUpdated,
} from '../actions/extraActions';
import model from '../views/Olap/OlapComponents/olapModelView';

const ACTUALITY_URL = '/api/olap/actuality';

export function* handleActualityUpdate(action: ActualUpdateAction) {
    try {
        const data = yield call(() => {
            return model.getData(ACTUALITY_URL);
        });
        const value = data.rows[0][1].label;
        yield put(actualUpdated(value));
    } catch (error) {
        yield put(actualError());
    }
}

export default function* watchActuality() {
    // @ts-ignore
    yield takeLatest(ACTUAL_UPDATE, handleActualityUpdate);
}
