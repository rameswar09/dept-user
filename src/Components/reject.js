import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as homeAction from '../store/actions/home_action'
import * as userAction from '../store/actions/user_login_action'
const _ = require('lodash')


class RejectPage extends Component {


  state = {
    selectDept: "",
    users: [],
    loggedInUser: {},
    selectUser: "",
    mgsValue: "",
    errorMgs: ""

  }


  componentDidMount() {
    this.setState({
      loggedInUser: JSON.parse(window.localStorage.getItem('userDetails'))
    })
    this.props.getDeptVsUsers()
    this.props.getAllDeptDetails()
    let body = {
      code: "reject",
      dept_code: this.state.selectDept,
      assigned_to: this.state.selectUser
    }
    this.props.getRequestData(body)
  }
  handleChangeDeptInputs = (e) => {
    let createdBy = this.state.loggedInUser
    let deptCode = e.target.value
    let deptDetails = _.find(this.props.deptVsUser, { id: deptCode })
    let deptUsers = _.get(deptDetails, 'users', [])
    this.setState({
      selectDept: deptCode,
      users: deptUsers,
      selectUser: ""
    })
  }
  handleChangeUserInputs = (e) => {
    this.setState({
      selectUser: e.target.value
    })
  }
  handleShowReuest = () => {
    let body = {
      code: "reject",
      dept_code: this.state.selectDept,
      assigned_to: this.state.selectUser
    }
    this.props.getRequestData(body)
  }
  render() {
    let dropDownForDept = _.map(this.props.deptDetails, (eachDept) => <option value={eachDept.id}>{eachDept.name}</option>)
    let dropDownForUser = _.map(this.state.users, (eachUser) => <option value={eachUser.code}>{eachUser.name}</option>)
    let requests = !_.isEmpty(this.props.requestDetails) ? _.map(this.props.requestDetails, (eachReq) => <p>{eachReq.msg}</p>) : null
    return (
      <div className="form-wrapper">
        <div className="form">
          <select value={this.state.selectDept} onChange={(e) => this.handleChangeDeptInputs(e)} >
            <option value="">Select Department</option>
            {dropDownForDept}
          </select>
          <select value={this.state.selectUser} onChange={(e) => this.handleChangeUserInputs(e)} >
            <option value="">Select Users</option>
            {dropDownForUser}
          </select>
          <button onClick={this.handleShowReuest}>Show</button>
          {requests}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    deptDetails: state.user.deptDetails,
    deptVsUser: state.app.deptVsUser,
    userDetails: state.user.userDetails,
    requestDetails: state.app.getRequestDetails
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getAllDeptDetails: () => dispatch(userAction.getAllDept()),
    getDeptVsUsers: () => dispatch(homeAction.getDeptVsUser()),
    getRequestData: (data) => dispatch(homeAction.getRequestDetails(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RejectPage)

