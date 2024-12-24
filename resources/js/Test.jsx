import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import "../css/test.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Navigation from "./components/Navigation";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function Test(){

  

    

    return (
        <>
            <Navigation/>
        </>
    )
}

const container = document.querySelector('.test');
const root = ReactDOM.createRoot(container);
root.render(<Test/>)