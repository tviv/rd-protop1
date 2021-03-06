import {
    AUTH_GET_PERMISSIONS,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_ERROR,
    AUTH_CHECK,
} from 'ra-core';
import { getJsonFromOlapApi } from '../api/response-handle'; // eslint-disable-line import/no-unresolved

const clearUserData = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
};

// Authenticatd by default
export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        if (username === 'login' && password === 'password') {
            localStorage.removeItem('role');
            return Promise.resolve();
        }
        if (username && password) {
            clearUserData();
            return new Promise((resolve, reject) => {
                getJsonFromOlapApi('/api/auth', {}, username, password)
                    .then(response => {
                        const { success, token } = response;
                        if (success) {
                            localStorage.setItem('role', 'user');
                            localStorage.setItem('token', token);
                            resolve();
                        } else {
                            if (
                                response.reason &&
                                response.reason.status === 401
                            ) {
                                reject();
                            } else {
                                reject('Ошибка сервера');
                            }
                        }
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        }
    }

    if (type === AUTH_LOGOUT) {
        clearUserData();
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const { status } = params || {};
        return status === 401 || status === 403
            ? Promise.reject()
            : Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        //return localStorage.getItem('not_authenticated') === null ||
        return !localStorage.getItem('token')
            ? Promise.reject()
            : Promise.resolve();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');
        return Promise.resolve(role);
    }

    return Promise.reject('Unknown method');
};
