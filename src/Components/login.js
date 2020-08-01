import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import * as userAction from '../store/actions/user_login_action'
import '../css/login.css'
const _ = require('lodash')
class LoginPage extends Component {
    state = {
        userEmail: "",
        userPassword: "",
        userName: "",
        isSignUp: false,
        loginButtonText: "Login",
        loginButtonCode: "login",
        userLoginOption: "Create A New Account",
        dept:""
    }

    handleChangeEmail = (e) => {
        this.setState({
            userEmail: e.target.value
        })
    }
    handleChangePassword = (e) => {
        this.setState({
            userPassword: e.target.value
        })
    }

    getUserDetails = () => {
        let obj = {
            email: this.state.userEmail,
            password: this.state.userPassword
        }
        this.props.checkUser(obj)
        console.log("======" + JSON.stringify(this.props.userDetails))
    }

    handleUserLoginOrSignup = () => {
        let loginButtonText = !this.state.isSignUp ? "Sign Up" : "Login"
        let loginButtonCode = !this.state.isSignUp ? "sign_up" : "login"
        let userLoginOption = !this.state.isSignUp ? "Login With Existing User" : "Create A New Account"
        this.setState({
            isSignUp: !this.state.isSignUp,
            loginButtonText,
            loginButtonCode,
            userLoginOption,
            userName: "",
            userEmail: "",
            userPassword: "",
            dept:""
        })
        let errorObj={
            errorText: "",
            isErrorWhileLogin: false,
        }
        this.props.setUserLoginErrorDetails(errorObj)
    }
    handleChangeInputs = (e, code) => {
        console.log(e.target.value)
        console.log("===================" + code)
         let errorObj={
            errorText: "",
            isErrorWhileLogin: false,
        }
        this.props.setUserLoginErrorDetails(errorObj)

        if (code === "userName") {
            this.setState({
                userName: e.target.value
            })
        } else if (code === "userEmail") {
            this.setState({
                userEmail: e.target.value
            })
        } else if (code === "userPassword") {
            this.setState({
                userPassword: e.target.value
            })
        }else if (code==="dept"){
            this.setState({
                dept:e.target.value
            })
        }
    }
    userSubmit = (e, loginButtonCode) => {
        let userName = _.trim(this.state.userName)
        let userEmail = _.trim(this.state.userEmail)
        let userPass = _.trim(this.state.userPassword)
        if (loginButtonCode === "sign_up") {
            if (_.isEmpty(userName) || _.isEmpty(userEmail) || _.isEmpty(userPass)) {
                let errorText = "All fields require"
                let errorObj={
                    errorText,
                    isErrorWhileLogin: true,
                }
                this.props.setUserLoginErrorDetails(errorObj)
            } else {
                let userSignBody={
                    email: _.trim(this.state.userEmail),
                    password:_.trim(this.state.userPassword),
                    name:_.trim(this.state.userName),
                    department:_.trim(this.state.dept),
                    dept_name:_.get(_.find(this.props.deptDetails,{id:_.trim(this.state.dept)}),'name',"")
                }
                this.props.createNewUser(userSignBody)
                this.props.setUserLoginErrorDetails({
                    isErrorWhileLogin: false,
                    errorText: ""
                })
            }
        } else if (loginButtonCode = "login") {
            if (_.isEmpty(userEmail) || _.isEmpty(userPass)) {
                let errorText = "All fields require"
                this.props.setUserLoginErrorDetails({
                    isErrorWhileLogin: true,
                    errorText
                })
            } else {
                this.props.setUserLoginErrorDetails({
                    isErrorWhileLogin: false,
                    errorText: ""
                })
                let userBody={
                    email:_.trim(this.state.userEmail),
                    password:_.trim(this.state.userPassword)
                }
                this.props.loginUser(userBody)
            }
        }
    }
    componentDidMount() {
        this.props.getAllDeptDetails()
    }

    render() {
       

        let dropDownForDept = _.map(this.props.deptDetails, (eachDept) => <option value={eachDept.id}>{eachDept.name}</option>) 
        return (
            <div>
                { !_.isEmpty(this.props.redirect)? <Redirect to='/home' />:null}
                <div className="login-box-wrapper">
                    <div className="login-box">
                        <div className="user-logo-wrapper">
                            <img src={require('../asserts/user-log.png')} className="user-log-in-login-page" />
                        </div>
                        {this.state.isSignUp ? <div className="login-details-wrapper">
                            <input type="text" className="user-login-inputs" placeholder="User Name" value={this.state.userName} required onChange={(e) => this.handleChangeInputs(e, "userName")} />
                        </div> : null}
                        <div className="login-details-wrapper">
                            <input type="text" className="user-login-inputs" placeholder="Email" required value={this.state.userEmail} onChange={(e) => this.handleChangeInputs(e, "userEmail")} />
                        </div>
                        <div className="login-details-wrapper">
                            <input type="password" className="user-login-inputs" placeholder="Password" required value={this.state.userPassword} onChange={(e) => this.handleChangeInputs(e, "userPassword")} />
                        </div>
                        {this.state.isSignUp ? <div className="login-details-wrapper">
                            <select onChange={(e) => this.handleChangeInputs(e, "dept")} className="dept-select">
                                <option value="">Select Department</option>
                                {dropDownForDept}
                            </select>
                        </div> : null}
                        {this.props.isErrorWhileLogin ? <div className="login-details-wrapper">
                            <p className="error-text-box">{this.props.error}</p>
                        </div> : null}
                        <div className="login-sign-up-botton-wrapper">
                            <button className="login-sign-up-button" type="button" onClick={(e) => this.userSubmit(e, this.state.loginButtonCode)}>{this.state.loginButtonText}</button>
                        </div>
                        <div className="login-details-wrapper">
                            <button className="login-sign-up-check" type="button" onClick={this.handleUserLoginOrSignup}>{this.state.userLoginOption}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        deptDetails: state.user.deptDetails,
        userDetails: state.user.userDetails,
        error: state.user.error,
        redirect: state.user.redirect,
        isErrorWhileLogin:state.user.isErrorWhileLogin
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAllDeptDetails: () => dispatch(userAction.getAllDept()),
        createNewUser: (userData) => dispatch(userAction.signUpUser(userData)),
        loginUser:(userBody)=>dispatch(userAction.loginUser(userBody)),
        setUserLoginErrorDetails:(details)=>dispatch(userAction.setUserLoginErrorDetails(details))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)