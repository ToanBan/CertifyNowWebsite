import React from "react";
import Navigation from "./Navigation";
export default function Success(){
    return (
        <>
            <Navigation/>
            <div className="container">
                <div className="d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
                    <div className="col-5">
                        <img src="https://img.freepik.com/premium-vector/successful-purchase-by-card-concept-vector-illustration_929545-175.jpg?w=740" 
                        alt="" />
                    </div>

                    <div className="col-7 text-center">
                        <div className="mt-5">
                            <h3 className="fw-semibold text-danger">Chúc Mừng, Bạn Đã Sở Hữu Khoá Thi Thành Công</h3>
                            <p style={{color:"#77838F", fontWeight:"500"}}>Bạn đã mua thành công khoá học/ chứng chỉ <br />
                            Hãy sẵn sàng để bắt đầu hành trình học tập <br />
                            và chinh phục chứng chỉ của mình. Chúc bạn học tập hiệu quả và đạt kết quả xuất sắc
                            
                            </p>
                            <a href="/exam" className="button mt-3">Continue Shopping</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}