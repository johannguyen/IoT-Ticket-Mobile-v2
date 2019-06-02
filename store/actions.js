import { login, check, logout } from "../api/AuthenticationAPI";
import {fetchResource, fetchDashboards} from "../api/ResourceAPI";
//action types
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';
export const CHECK_LOGIN_REQUEST = 'CHECK_LOGIN_REQUEST';
export const CHECK_LOGIN_SUCCESS = 'CHECK_LOGIN_SUCCESS';
export const CHECK_LOGIN_FAIL = 'CHECK_LOGIN_FAIL';
export const FETCH_RESOURCE_REQUEST = 'FETCH_RESOURCE_REQUEST';
export const FETCH_RESOURCE_SUCCESS = 'FETCH_RESOURCE_SUCCESS';
export const FETCH_RESOURCE_FAIL = 'FETCH_RESOURCE_FAIL';
export const FETCH_DASHBOARD_REQUEST = 'FETCH_DASHBOARD_REQUEST';
export const FETCH_DASHBOARD_SUCCESS = 'FETCH_DASHBOARD_SUCCESS';
export const FETCH_DASHBOARD_FAIL = 'FETCH_DASHBOARD_FAIL';
export const LOGOUT = 'LOGOUT';

//action creator
export const updateUser = update => ({
    type: UPDATE_USER,
    payload: update
})

export const addContact = newContact => ({
    type: UPDATE_CONTACT,
    payload: newContact
})

export const loginUser = (opts) => async dispatch => {
    dispatch({type: LOG_IN_REQUEST})
    try{
        const loginSuccess = await login(opts)
        dispatch({type: LOG_IN_SUCCESS, payload: loginSuccess})
    }
    catch(err){        
        dispatch({type: LOG_IN_FAIL, payload: err.message})
    }
}

export const checkLogin = () => async dispatch => {
    dispatch({type: CHECK_LOGIN_REQUEST})
    try{
        const logedIn = await check()
        if(logedIn){
            dispatch({type: CHECK_LOGIN_SUCCESS, payload: logedIn})
        } else{            
            dispatch({type: CHECK_LOGIN_FAIL, payload: false})
        }
    }catch(err){
    }
}

export const getResources = (force, resources) => async dispatch => {
    dispatch({type: FETCH_RESOURCE_REQUEST})
    try{
        const resourcesResponse = await fetchResource(force, resources)
        dispatch({type: FETCH_RESOURCE_SUCCESS, payload: resourcesResponse})
    }
    catch(err){
        dispatch({type: FETCH_RESOURCE_FAIL, payload: err.message})
    }
}

export const getDashboards = (resourceId) => async dispatch => {
    dispatch({type: FETCH_DASHBOARD_REQUEST})
    try{
        const dashboardsResponse = await fetchDashboards(resourceId);
        dispatch({type: FETCH_DASHBOARD_SUCCESS, payload: dashboardsResponse})
    }catch(err){
        dispatch({type: FETCH_DASHBOARD_FAIL, payload: err.message})
    }
}

export const logoutAction = () => async dispatch => {
    dispatch({type:LOGOUT})
    await logout();
}