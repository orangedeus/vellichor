import React, { useState, useRef } from "react";


const DropdownButton = ({ label, children }) => {
    return(
        <div className="dropdown-button-container">
            <button className="nav-button" >{label}</button>
            <div className="dropdown-content">
                <div className="dropdown-pointer" />
                {children}
            </div>
        </div>
    );
}

export default DropdownButton;