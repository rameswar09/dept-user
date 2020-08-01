import * as actionsTypes from './actionTypes'
import axios from '../../axios'
const _ = require('lodash')

export const setLoginUserDetails = (data) => {
    return {
        type: actionsTypes.USER_LOGIN,
        data
    }
}


export const loginUser = (userDetails) => {
    return dispatch => {
        axios.post('/user/login', userDetails)
            .then((res) => {
                let resp = res.data
                dispatch(setLoginUserDetails(resp))
            }).catch((err) => {
                console.log("error occor while in login user actions" + err)
                dispatch(setLoginUserDetails({}))
            })

    }
}

export const signUpUser = (userDetails) => {
    return dispatch => {
        axios.post('/user/sign_up', userDetails)
            .then((res) => {
                let resp = res.data
                dispatch(setLoginUserDetails(resp))
            }).catch((err) => {
                console.log("error occor while in login user actions" + err)
                dispatch(setLoginUserDetails({}))
            })
    }
}

export const setAllDeptDetails = (data) => {
    return {
        type: actionsTypes.GET_ALL_DEPT,
        data: data
    }
}
export const setUserLoginErrorDetails = (data) => {
    return {
        type: actionsTypes.SET_USER_LOGIN_ERROR_DETAILS,
        data: data
    }
}
export const getAllDept = () => {
    return dispatch => {
        axios.get('/dept/get_all_dept')
            .then((res) => {
                console.log("===============================getAll dept" + res.data)
                dispatch(setAllDeptDetails(res.data))
            })
            .catch((e) => {
                console.log("===========" + e)
                dispatch(setAllDeptDetails())
            })
    }
}