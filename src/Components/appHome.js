import React, { Component } from 'react'
import { connect } from 'react-redux';
import io from "socket.io-client";
import * as homeAction from '../store/actions/home_action'
import * as userAction from '../store/actions/user_login_action'
import '../css/home.css'
const _ = require('lodash')
// let ENDPOINT = "http://localhost:3030/"
// let socket
// socket = io(ENDPOINT);
class AppHomePage extends Component {

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
    // socket.emit('homePageRender', () => {
    //   console.log("heloo this is home .js ")
    // })
    // socket.on('firstTime', (count) => {
    //   console.log("hello this is firsttime====>" + count)
    // })
  }
  // checkSocket=()=>{
  //   socket.emit('homePageRender')

  // }
  // makeZero=()=>{
  //   socket.emit('makeItZero')
  // }
  handleChangeDeptInputs = (e) => {
    let createdBy = this.state.loggedInUser
    let deptCode = e.target.value
    let deptDetails = _.find(this.props.deptVsUser, { id: deptCode })
    let deptUsers = _.get(deptDetails, 'users', [])
    _.remove(deptUsers, { code: createdBy.code })
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
  handleChangeMsg = (e) => {
    this.setState({
      mgsValue: e.target.value
    })
  }

  checkForSendRequest = () => {
    if (_.isEmpty(this.state.selectDept)) {
      return false
    }
    console.log("heiiii============" + this.state.selectUser)
    if (_.isEmpty(this.state.selectUser)) {
      return false
    }
    if (_.isEmpty(this.state.mgsValue)) {
      return false
    }
    return true
  }
  handleSendReuest = () => {
    let createdBy = this.state.loggedInUser
    let check = this.checkForSendRequest()
    console.log("hello this is ================" + check)
    if (!check) {
      this.setState({
        errorMgs: "ALl fields are required"
      })
      return
    } else {
      this.setState({
        errorMgs: ""
      })
    }
    console.log("hello this createBy===================" + JSON.stringify(createdBy))
    let body = {
      assigned_user_code: this.state.selectUser,
      assigned_user_name: _.find(this.state.users, { code: this.state.selectUser }).name,
      user_code: createdBy.code,
      user_name: createdBy.name,
      department_id: this.state.selectDept,
      dept_name: _.find(this.props.deptDetails, { id: this.state.selectDept }).name,
      msg: this.state.mgsValue
    }
    this.setState({
      selectDept: "",
      selectUser: "",
      mgsValue: ""
    })
    console.log("hello this sd===================" + JSON.stringify(body))
    this.props.sendRequest(body)
  }
  render() {
    let dropDownForDept = _.map(this.props.deptDetails, (eachDept) => <option value={eachDept.id}>{eachDept.name}</option>)
    let dropDownForUser = _.map(this.state.users, (eachUser) => <option value={eachUser.code}>{eachUser.name}</option>)
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
          <textarea value={this.state.mgsValue} onChange={this.handleChangeMsg} />
          <button onClick={this.handleSendReuest}>Request</button>
          {!_.isEmpty(this.state.errorMgs) ? <p>{this.state.errorMgs}</p> : null}
        </div>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    deptDetails: state.user.deptDetails,
    deptVsUser: state.app.deptVsUser,
    userDetails: state.user.userDetails
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getAllDeptDetails: () => dispatch(userAction.getAllDept()),
    getDeptVsUsers: () => dispatch(homeAction.getDeptVsUser()),
    sendRequest: (data) => dispatch(homeAction.sendRequestDetails(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppHomePage)