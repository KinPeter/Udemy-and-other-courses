import * as actionTypes from './actionsTypes';
import axios from 'axios';
import { firebaseApiKey } from '../../apiKey';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expirationTime * 1000)
    }
};

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + firebaseApiKey;

        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + firebaseApiKey;
        }

        axios.post(url, authData)
        .then((response) => {
            // console.log(response);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            const expirationDate = new Date( new Date().getTime() + (response.data.expiresIn * 1000) );
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch((error) => {
            // console.log(error.response);
            dispatch(authFail(error.response.data.error));
        })
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logOut());
            }
        }
    };
};