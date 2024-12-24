import React from "react";
import LatestCertification from "./LatestCertification";
export default function Title(){
    return (
        <>
            <div className="position-relative">
                <img className="img-title" src="https://s3.us-south.cloud-object-storage.appdomain.cloud/sn-portals-cognitiveclass/images/bg.png" alt="" />
                <div className="content-title">
                    <h1 className="h1-title">Nền Tảng Thi Chứng Chỉ Online - Dễ Dàng, Nhanh Chóng</h1>
                    <p className="p-title">Nền tảng thi chứng chỉ trực tuyến giúp bạn kiểm tra và nâng cao kỹ năng một cách dễ dàng, nhanh chóng. 
                    Đa dạng chứng chỉ, giao diện thân thiện, hỗ trợ 24/7 – đồng hành cùng bạn trên hành trình phát triển sự nghiệp.</p>
                    <button className="button">Start Exam</button>
                </div>

                <div className="card-list d-flex" style={{marginTop:"12rem"}}>
                        <div>
                            <div className="cart-item d-flex justify-content-center align-items-center gap-4 me-5">
                                <img style={{width:"56px"}} src="https://e7.pngegg.com/pngimages/193/15/png-clipart-computer-icons-users-group-icon-design-joining-miscellaneous-orange.png" alt="" />
                                <div className="cart-item-content">
                                    <p className="text-cart-title mb-3">100+ Chứng chỉ</p>
                                    <p className="text-cart-des">Chinh phục các chứng chỉ trực tuyến, khẳng định kỹ năng của bạn.</p>
                                </div>
                        </div>
                        </div>

                       <div className="cart-item d-flex justify-content-center align-items-center gap-4 me-5">
                            <img style={{width:"56px"}} src="https://icones.pro/wp-content/uploads/2021/06/icone-de-l-education-jaune.png" alt="" />
                            <div className="cart-item-content">
                                <p className="text-cart-title mb-3">20+ Lộ trình học tập</p>
                                <p  className="text-cart-des">Luyện thi và đạt chứng chỉ với các lộ trình học tập được thiết kế bài bản.</p>
                            </div>
                       </div>

                       <div className="cart-item d-flex justify-content-center align-items-center gap-4 me-5">
                            <img style={{width:"56px"}} src="https://e7.pngegg.com/pngimages/193/15/png-clipart-computer-icons-users-group-icon-design-joining-miscellaneous-orange.png" alt="" />
                            <div className="cart-item-content">
                                <p className="text-cart-title mb-3">300+ Bài thi</p>
                                <p  className="text-cart-des">Thực hành và hoàn thành các bài thi để chứng minh năng lực của bạn.</p>
                            </div>
                       </div>
                </div>

                <LatestCertification/>
            </div>
          

        </>
    )
}