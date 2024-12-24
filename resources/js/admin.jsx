import React from "react";
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/app.css";
import Navigation from "./components/Admin/Navigation";
import Dashboard from "./components/Admin/Dashboard";
import Profiles from "./components/Admin/Profiles";
import Exam from "./components/Admin/Exam";
import Answer from "./components/Admin/Answer";
import Question from "./components/Admin/Question";
function Admin(){
    return (
        <>
            <Router>
                <Navigation/>
                <Routes>
                <Route path="/admin" element={<Dashboard/>}></Route>
                <Route path="/admin/profiles" element={<Profiles/>}></Route>
                <Route path="/admin/exam" element={<Exam/>}></Route>
                <Route path="/admin/answer" element={<Answer/>}></Route>
                <Route path="/admin/question" element={<Question/>}></Route>

                </Routes>
            </Router>
        </>
    )
}

const container = document.querySelector('.root-admin');
const root = ReactDOM.createRoot(container);
root.render(<Admin/>)