export const ACTUAL_UPDATE = 'RD/ACTUAL_UPDATE';

export interface ActualUpdateAction {
    readonly type: typeof ACTUAL_UPDATE;
}

export const actualUpdate = (): ActualUpdateAction => ({ type: ACTUAL_UPDATE });

export const ACTUAL_UPDATED = 'RD/ACTUAL_UPDATED';

export interface ActualUpdatedAction {
    readonly type: typeof ACTUAL_UPDATED;
    readonly payload: { data?: any };
}

export const actualUpdated = (data): ActualUpdatedAction => ({
    type: ACTUAL_UPDATED,
    payload: { data: data },
});

export const ACTUAL_ERROR = 'RD/ACTUAL_ERROR';
export interface ActualErrorAction {
    readonly type: typeof ACTUAL_ERROR;
}
export const actualError = (): ActualErrorAction => ({ type: ACTUAL_ERROR });

export const ACTUAL_SHOW = 'RD/ACTUAL_SHOW';
export interface ActualShowAction {
    readonly type: typeof ACTUAL_SHOW;
}
export const actualShow = (): ActualShowAction => ({ type: ACTUAL_SHOW });

export const ACTUAL_HIDE = 'RD/ACTUAL_HIDE';
export interface ActualHideAction {
    readonly type: typeof ACTUAL_HIDE;
}
export const actualHide = (): ActualHideAction => ({ type: ACTUAL_HIDE });
