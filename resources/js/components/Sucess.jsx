import React from "react";
import Navigation from "./Navigation";
import { Link } from 'react-router-dom';
export default function Success(){
    return (
        <>
            <Navigation/>
            <div className="container">
                <div className="d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
                    <div className="col-5">
                       <img src="https://img.freepik.com/free-vector/order-confirmed-concept-illustration_114360-6599.jpg" alt="" />
                    </div>

                    <div className="col-7 text-center">
                        <div className="mt-5">
                            <h3 style={{fontSize:"50px"}} className="fw-semibold text-danger">Thanh Toán Khóa Thi Chứng Chỉ Thành Công!</h3>
                            <p style={{color:"#77838F", fontWeight:"500", fontSize:"16px"}}>Chúc mừng bạn đã hoàn tất thanh toán lệ phí thi chứng chỉ. <br />
                            Bạn vui lòng nhấn vào nút bên dưới để đi đến khoá thi của mình <br />
                            và chinh phục chứng chỉ của mình. Hãy bấm nút bên dưới để có thể thi ngay bây giờ
                            
                            </p>
                            <Link to="/exam" className="button mt-3">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}