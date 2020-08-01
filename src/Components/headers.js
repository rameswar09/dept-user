import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/header.css'
function AppHeader() {
    return (
        <div className="app-header-wrapper">
            <div className="title-wrapper">
                <h4>Hr Management</h4>
            </div>
            <div className="menu-wrapper">
                <div>
                    <NavLink to="/home">Send Request</NavLink>
                </div>
                <div>
                    <NavLink to="/pending_req"> Pending Request</NavLink>
                </div>
                <div>
                    <NavLink to="/approved_req">Approved Request</NavLink>
                </div>
                <div>
                    <NavLink to="/reject_req">Rejected Request</NavLink>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;