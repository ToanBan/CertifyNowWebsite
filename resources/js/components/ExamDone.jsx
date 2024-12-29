import React from "react";
import Navigation from "./Navigation";
export default function ExamDone(){
    return (
        <>
            <Navigation/>
            <div className="container mt-4 d-flex justify-content-center align-items-center gap-3" style={{height:"60vh"}}>
                <img style={{width:"500px", height:"500px", objectFit:"contain"}} src="https://img.lovepik.com/element/45009/1937.png_860.png" alt="" />
                <div >
                    <h1 style={{fontWeight:"400"}}>Bạn Đã Gửi Bài Thi Thành Công</h1>
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <a href="/" className="button">Trang Chủ</a>
                    </div>
                </div>
            </div>
        </>
    )
}