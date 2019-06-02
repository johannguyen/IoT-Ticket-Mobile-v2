import {combineReducers} from 'redux'
import {UPDATE_USER, UPDATE_CONTACT, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAIL, FETCH_RESOURCE_REQUEST, FETCH_RESOURCE_SUCCESS, FETCH_RESOURCE_FAIL, LOGOUT, CHECK_LOGIN_SUCCESS, CHECK_LOGIN_FAIL, CHECK_LOGIN_REQUEST, FETCH_DASHBOARD_REQUEST, FETCH_DASHBOARD_FAIL, FETCH_DASHBOARD_SUCCESS} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next);

const contactReducer = (state = [], action) => {
    if(action.type === UPDATE_CONTACT){
        return [...state, action.payload]
    }
    return state;
}
const userReducer = (state = {}, action) => {
    switch(action.type){
        case UPDATE_USER:
            return merge(state,action.payload)
        case UPDATE_CONTACT:
            return merge(state, {recenAdded: action.payload})
        case LOG_IN_REQUEST:
            return merge(state,{loading: true, logedIn: false, loginErr: ""})
        case LOG_IN_SUCCESS:
            return merge(state, {logedIn: action.payload, loading: false, loginErr: ""})
        case LOG_IN_FAIL:
            return merge(state, {loginErr: action.payload, loading: false, logedIn: false});
        case CHECK_LOGIN_SUCCESS:
            return merge(state, {logedIn: true, loading: false, loginErr: ""})
        case CHECK_LOGIN_REQUEST:
            return merge(state, {loading: true, logedIn: false, loginErr: ""})
        case CHECK_LOGIN_FAIL:
            return merge(state, {logedIn: false, loading: false, loginErr: ""})
        default:
            return state
    }
}

const resourceReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_RESOURCE_REQUEST:
            return merge(state, {loading:true, data:null, loadResourceErr: null})
        case FETCH_RESOURCE_SUCCESS:
            return merge(state, {loading: false, data: action.payload, loadResourceErr:null})
        case FETCH_RESOURCE_FAIL:
            return merge(state, {loading: false, loadResourceErr: action.payload, data: null})
        default:
            return state
    }
}

const dashboardReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_DASHBOARD_REQUEST:
            return merge(state, {loading:true, data:null, loadDashboardErr: null})
        case FETCH_DASHBOARD_SUCCESS:
            return merge(state, {loading:false, data:action.payload, loadDashboardErr: null})
        case FETCH_DASHBOARD_FAIL:
            return merge(state, {loading:false, loadDashboardErr: action.payload, data:null})
        default:
            return state
    }
}

const appReducer = combineReducers({
    user: userReducer,
    contacts: contactReducer,
    resources: resourceReducer,
    dashboards: dashboardReducer
})

export default rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }
    return appReducer(state, action);
  }