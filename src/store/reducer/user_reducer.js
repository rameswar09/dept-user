import * as actionsTypes from '../actions/actionTypes'
const _ = require('lodash')
const initialState = {
    userDetails: null,
    deptDetails: [],
    error: "",
    redirect: "",
    isErrorWhileLogin: false,
}

const setUserDetails = (state, userData) => {
    let finalState = { ...state }
    console.log("=====================" + userData.error)
    if (_.isEmpty(userData.error)) {
        finalState.userDetails = userData.data
        finalState.redirect = '/home'
        window.localStorage.setItem('userDetails', JSON.stringify(finalState.userDetails))
    } else {
        finalState.userDetails = userData.data
        finalState.error = userData.error
        finalState.isErrorWhileLogin = true
    }
    return finalState
}

const setUserLoginError = (state, data) => {
    let finalState = { ...state }
    finalState.isErrorWhileLogin = data.isErrorWhileLogin
    finalState.error = data.errorText
    return finalState
}
const setDeptDetails = (state, data) => {
    let finalState = { ...state }
    if (_.isEmpty(data.error)) {
        finalState.deptDetails = data.data
    }
    return finalState
}
const reducer = (state = initialState, action) => {

    if (actionsTypes.USER_LOGIN === action.type) {
        return setUserDetails(state, action.data)
    }
    if (actionsTypes.GET_ALL_DEPT === action.type) {
        return setDeptDetails(state, action.data)
    }
    if (actionsTypes.SET_USER_LOGIN_ERROR_DETAILS === action.type) {
        return setUserLoginError(state, action.data)
    }
    return state
}

export default reducer;