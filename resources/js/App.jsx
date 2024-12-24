import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "../css/app.css"
import Login from './components/Login';
import Home from './components/Home';
import Verify from './components/Mail/Verify';
import MyProfile from './components/MyProfile';
import Exam from './components/Exam';
import Success from './components/Sucess';
import QuestionExam from './components/QuestionExam';
import ExamDone from './components/ExamDone';
function App(){
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/verify' element={<Verify/>}></Route>
                    <Route path='/myprofile' element={<MyProfile/>}></Route>
                    <Route path='/exam' element={<Exam/>}></Route>
                    <Route path='/exam/done' element={<ExamDone/>}></Route>
                    <Route path='/exam/:id' element={<QuestionExam/>}></Route>
                    <Route path='/success' element={<Success/>}></Route>
                </Routes>
            </Router>
        </>
    )
}

const container= document.querySelector('.root');
const root = ReactDOM.createRoot(container);
root.render(<App/>)

