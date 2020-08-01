import * as actionsTypes from '../actions/actionTypes'
const _ = require('lodash')

var initialState = {
    deptVsUser: [],
    reqDetails: [],
    getRequestDetails: []
}

const setDeptVsUserDetails = (state, details) => {
    let finalState = { ...state }
    finalState.deptVsUser = details.data || []
    return finalState
}

const sendRequestDetails = (state, data) => {
    let finalState = { ...state }
    finalState.reqDetails.push(data)
    return finalState
}

const setRequestDetails = (state, res) => {
    let finalState = { ...state }
    finalState.getRequestDetails = res.data
    return finalState
}

const updateRequestDetails = (state, res) => {
    let data = res.data
    let getDetails = {...state.getRequestDetails}
    let reqDetails = _.find(getDetails, { id: data.id })
    reqDetails.status = data.status
    reqDetails.active = data.active
    reqDetails.approved = data.approved
    let finalState = { ...state, getRequestDetails: getDetails }
    return finalState
}
const reducer = (state = initialState, action) => {

    if (actionsTypes.GET_USER_AND_DEPT_DETAILS === action.type) {
        return setDeptVsUserDetails(state, action.data)
    }
    if (actionsTypes.SEND_REQUEST === action.type) {
        return sendRequestDetails(state, action.data)
    }
    if (actionsTypes.GET_REQUEST_DETAILS === action.type) {
        return setRequestDetails(state, action.data)
    }
    if (actionsTypes.UPDATE_REQ === action.type) {
        return updateRequestDetails(state, action.data)
    }
    return state
}

export default reducer;