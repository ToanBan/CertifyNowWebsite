import React, { useEffect, useState } from "react";
import {Link, data} from 'react-router-dom'


export default function Navigation(){
    const [isUser, setIsUser] = useState(null);

    const fetchUser = () => {
        fetch('/auth/check')
            .then(response => response.json())
            .then(data => {setIsUser(data)})
            .catch(err => console.error(err));
    }

   const handleLogOut = () => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch('/logout', {
            method: "POST",
            headers: {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
            }
        })
        .then(response => response.json())
        .then(data => {
            setIsUser(null);
            window.location.href = '/login'
        })
        .catch(err => console.error(err));
   }
    useEffect(()=>{
        fetchUser();
    }, []);

    return (
        <>
            <div className="header">
                <div className="alert  m-0 d-flex justify-content-center align-items-center" style={{height:"42px", width:"100%"}}>
                    <p className="fst-italic m-0" style={{fontWeight:"500"}}>WELCOME CERTIFY NOW!</p>
                </div>

                <nav className="navbar navbar-expand-sm bg-light shadow-lg" style={{height:"80px"}}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar" aria-controls="collapsibleNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav w-100 d-flex align-items-center">
                            <li className="nav-item me-3">
                                <Link to='/' className="nav-link fs-logo fst-italic">CertifyNow</Link>
                            </li>

                            <li className="nav-item me-3">
                                <Link to='/coursesandprojects' className="nav-link fs-nav">Courses & Projects</Link>
                            </li>

                            <li className="nav-item me-3">
                                <Link to='/exam' className="nav-link fs-nav">certificate exam</Link>
                            </li>


                        </ul>
                    </div>

                    
                    {isUser ? (
                        <div className="dropdown d-flex justify-content-center align-items-center">
                            <div className="">
                                <button className="dropdown-toggle btn btn-light" data-bs-toggle="dropdown">{isUser.user.name}</button>
                                <ul className="dropdown-menu">
                                    <Link to="/myprofile" className="dropdown-item">My Profile</Link>
                                    <li><a onClick={handleLogOut} href="#" className="dropdown-item">Logout</a></li>
                                </ul>

                            </div>
                            <img className="ms-3" src="https://cognitiveclass.ai/assets/user-dac44c15e5f337629da17a1cc93b37fb16bead76247c3cc3c7e05dc56c4ce7f4.svg" alt="" />
                        </div>
                    ):(
                        <div className="nav-item me-4 d-flex">
                            <Link to='/login' className="nav-link fs-nav">Đăng Nhập</Link>
                        </div>
                    )}
                </div>
                </nav>

            </div>
        </>
    )
}