import axios from '../../axios'
import * as actionsTypes from './actionTypes'

export const setDeptVsUsers = (data) => {
    return {
        type: actionsTypes.GET_USER_AND_DEPT_DETAILS,
        data
    }
}

export const getDeptVsUser = () => {
    return dispatch => {
        axios.get('/api/getDeptVsUsers')
            .then((res) => {
                dispatch(setDeptVsUsers(res.data))
            })
    }
}
export const insertSendRequest = (data) => {
    return {
        type: actionsTypes.SEND_REQUEST,
        data
    }
}
export const setRequestDetails = (data) => {
    return {
        type: actionsTypes.GET_REQUEST_DETAILS,
        data
    }
}
export const getRequestDetails = (body) => {
    console.log("=========================" + JSON.stringify(body))
    return dispatch => {
        axios.post('/api/getFormReqs', body)
            .then((res) => {
                dispatch(setRequestDetails(res.data))
            })
    }
}
export const sendRequestDetails = (body) => {
    console.log("=========================" + JSON.stringify(body))
    return dispatch => {
        axios.post('/form_req/new_form_req', body)
            .then((res) => {
                dispatch(insertSendRequest(res.data))
            })
    }
}
export const updateRequest = (data) => {
    return {
        type: actionsTypes.UPDATE_REQ,
        data
    }
}
export const submit = (body) => {
    return dispatch => {
        axios.post('/api/updateReq', body)
            .then((res) => {
                dispatch(updateRequest(res.data))
            })
    }
}