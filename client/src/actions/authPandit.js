import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_DOCTOR_SUCCESS,
    REGISTER_DOCTOR_FAIL,
    DOCTOR_LOADED,
    AUTH_DOCTOR_ERROR,
    LOGIN_DOCTOR_SUCCESS,
    LOGIN_DOCTOR_FAIL,
    LOGOUT_DOCTOR,
    CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load Pandits
export const loadPandit = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/authPandit');

        dispatch({
            type: DOCTOR_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_DOCTOR_ERROR
        });
    }
};

// Register Pandit
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post('/api/pandits', body, config);
        console.log(res);
        
        dispatch({
            type: REGISTER_DOCTOR_SUCCESS,
            payload: res.data
        });
        dispatch(loadPandit());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_DOCTOR_FAIL
        });
    }
};

// Login Pandit
export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('/api/authPandit', body, config);
        
        dispatch({
            type: LOGIN_DOCTOR_SUCCESS,
            payload: res.data
        });
        dispatch(loadPandit());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({ 
            type: LOGIN_DOCTOR_FAIL
        });
    }
};

// Logout/ clear Profile
export const logout_pandit = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });
    dispatch({
        type: LOGOUT_DOCTOR
    });
}