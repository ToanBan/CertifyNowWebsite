import React, { useEffect, useState } from "react";

export default function WhyChoose(){
    const [isVisible, setIsVisible] = useState(false);


    return (
        <>
            <div>
                <h2 style={{fontSize:"52px", fontWeight:"700", marginTop:"8rem"}}>Why Choose Us?</h2>
                <div className="why-item mt-5">
                    <div className="why-list d-flex justify-content-center gap-5">
                        <div className="gradient1 position-relative">
                            <img className="position-absolute" style={{height:"300px", height:"280px", left:"160px"}} src="https://s3.us-south.cloud-object-storage.appdomain.cloud/sn-portals-cc-dev/images/ccai-img1.png" alt="" />

                        </div>
                        <div className="col-4" style={{width:"20%"}}>
                            <p className="p-w-title">Đội ngũ giảng viên chuyên gia</p>
                            <p className="p-w-des">Chúng tôi tự hào sở hữu đội ngũ giảng viên giàu kinh nghiệm trong lĩnh vực phát triển phần mềm, khoa học dữ liệu, và thiết kế khóa học.</p>
                        </div>
                    </div>

                    <div className="why-list d-flex justify-content-center gap-5 mt-5">
                        <div style={{width:"20%"}}>
                            <p className="p-w-title">Học liệu và bài thi thực tế</p>
                            <p className="p-w-des">Mỗi khóa học đi kèm với các bài thi thử giúp bạn chuẩn bị tốt nhất để đạt được chứng chỉ quốc tế.</p>
                        </div>
                        <div className="gradient2 position-relative ms-5">
                            <img  className="position-absolute" style={{height:"300px", height:"280px", left:"70px", top:"30px"}} src="https://s3.us-south.cloud-object-storage.appdomain.cloud/sn-portals-cc-dev/images/ccai-img2.png" alt="" />
                        </div>
                    </div>


                    <div className="why-list d-flex justify-content-center gap-5 mt-5">
                        <div className="gradient3 position-relative">
                            <img style={{height:"300px", height:"280px", left:"100px"}} className="position-absolute" src="https://s3.us-south.cloud-object-storage.appdomain.cloud/sn-portals-cc-dev/images/ccai-img3.png" alt="" />
                        </div>
                        <div style={{width:"20%"}}>
                            <p className="p-w-title">Phát triển kỹ năng chuyên môn</p>
                            <p className="p-w-des">Đạt được những kỹ năng cần thiết để thăng tiến sự nghiệp, từ công nghệ đến quản lý.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}