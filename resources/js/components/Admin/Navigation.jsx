import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navigation(){
    const [clickNav, setClickNav] = useState(false);
    const [transition, setTransition] = useState(false);

    const hanldeClick = (id) => {
        setClickNav(id)
    }


    
    return (
        <>
            <nav className="navbar bg-light me-3 shadow"
             style={{height:"100vh", width:"300px", position:"fixed", margin: "16px 0 0 16px", maxWidth:"270px", borderRadius:"30px"}}>
                <div style={{ height: "calc(100vh - 50px)", overflowY: "auto", paddingRight: "8px" }}>
                <ul className="navbar-nav">
                    <li className="nav-item mb-2 nav-div m-0">
                        <Link to="/admin" className="navbar-brand mb-3">
                            <div className="d-flex align-items-center justify-content-center">
                            <img style={{width:"100px", height:"auto", mixBlendMode:"multiply", color:"white"}}
                             src="https://img.freepik.com/free-vector/award-medal-with-red-ribbon_1284-42828.jpg?t=st=1734617225~exp=1734620825~hmac=d1682278adc1ea1c96fec6f90a23abc4953f7ae58c93f8710de2509f373d0a19&w=740" alt="" />
                            <p className="m-0">CertifyNow</p>
                            </div>
                        </Link>
                    </li>

                    <li className={`nav-item mb-2 nav-div m-0 ${clickNav == 'dashboard' ? 'active' : ''}`} onClick={()=>hanldeClick('dashboard')}>
                        <Link to="/admin" className="nav-link m-1 text-dark">
                            Dashboard
                        </Link>
                    </li>
                    
                    <li className={`nav-item mb-2 nav-div m-0 ${clickNav == 'profiles' ? 'active' : ''}`} onClick={()=>hanldeClick('profiles')} >
                        <Link to="/admin/profiles" className="nav-link m-1 text-dark">
                            Quản Lý Hồ Sơ
                        </Link>
                    </li>

                    <li className={`nav-item mb-2 nav-div m-0 ${clickNav == 'exam' ? 'active' : ''}`} onClick={()=>hanldeClick('exam')} >
                        <Link to="/admin/exam" className="nav-link m-1 text-dark">
                            Quản Lý Bài Thi
                        </Link>
                    </li>

                    <li className={`nav-item mb-2 nav-div m-0 ${clickNav == 'question' ? 'active' : ''}`} onClick={()=>hanldeClick('question')} >
                        <Link to="/admin/question" className="nav-link m-1 text-dark">
                            Quản Lý Câu Hỏi
                        </Link>
                    </li>

                    <li className={`nav-item mb-2 nav-div m-0 ${clickNav == 'answer' ? 'active' : ''}`} onClick={()=>hanldeClick('answer')} >
                        <Link to="/admin/answer" className="nav-link m-1 text-dark">
                            Quản Lý Câu Trả Lời
                        </Link>
                    </li>


                    <li className="nav-item mb-2 nav-div m-0" >
                        <a href="/" className="nav-link m-1 text-dark">Thoát</a>
                    </li>
                
                </ul>
                </div>
            </nav>
        </>
    )
}