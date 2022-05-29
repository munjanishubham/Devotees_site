import {combineReducers} from 'redux';
import alert from './alert';
import authPandit from './authPandit';
import authUser from './authUser';
import profile from './profile';
import appointment from './appointment';

export default combineReducers({
    alert,
    authPandit,
    authUser,
    profile,
    appointment
});
