import React from "react";
import WhyChoose from "./WhyChoose";
import Footer from './Footer';
export default function LatestCertification(){
    
    return(
        <>
            <div className="position-absolute w-100" style={{top:"90%"}}> 
                <h2 style={{fontSize:"52px", fontWeight:"700"}}>Latest Trending Certifications</h2>
                <div className="mt-5">
                    <div className="cer-list d-flex justify-content-center align-items-center gap-5">
                        <div className="cer-item shadow border" style={{height:"470px", width:"340px", borderRadius:"10px", overflow:"hidden"}}>
                            <img style={{width:"340px", height:"200px", objectFit:"cover"}} src="https://s3.us-south.cloud-object-storage.appdomain.cloud/sn-portals-cognitiveclass/images/gen-ai.png" alt="" />
                            <div style={{padding:"0 30px"}}>
                                <p style={{color:"#4b5563", fontSize:"14px", fontWeight:"500"}} className="m-0 mt-4">1 COURSE AND 9 MOCK TESTS</p>
                                <p style={{lineHeight:"1.4", fontSize:"22px", fontWeight:"700"}} className="m-0 mt-3">Chứng Chỉ AI Tổng Quát</p>
                                <p className="m-0 mt-3" style={{fontWeight:"600"}}>Chứng chỉ AI giúp bạn làm chủ công nghệ trí tuệ nhân tạo, 
                                    bao gồm các khái niệm cơ bản và nâng cao như học máy, sáng tạo nội dung,
                                    và ứng dụng thực tiễn trong nhiều lĩnh vực.</p>
                            </div>
                        </div>

                        <div className="cer-item shadow border" style={{height:"470px", width:"340px", borderRadius:"10px", overflow:"hidden"}}>
                            <img style={{width:"340px", height:"200px", objectFit:"cover"}} src="https://s3.us-south.cloud-object-storage.appdomain.cloud/sn-portals-cognitiveclass/images/time-series.png" alt="" />
                            <div style={{padding:"0 30px"}}>
                                <p style={{color:"#4b5563", fontSize:"14px", fontWeight:"500"}} className="m-0 mt-4">4 MOCK TESTS</p>
                                <p style={{lineHeight:"1.4", fontSize:"22px", fontWeight:"700"}} className="m-0 mt-3">Chứng Chỉ Phân Tích Chuỗi Thời Gian</p>
                                <p className="m-0 mt-3" style={{fontWeight:"600"}}>Học cách phân tích và dự báo dữ liệu chuỗi thời gian để hiểu và đưa ra quyết định theo thời gian thực, 
                                áp dụng trong tài chính, vận tải, và nhiều ngành nghề khác.</p>
                            </div>
                        </div>


                        <div className="cer-item shadow border" style={{height:"470px", width:"340px", borderRadius:"10px", overflow:"hidden"}}>
                            <img style={{width:"340px", height:"200px", objectFit:"cover"}} src="https://s3.us-south.cloud-object-storage.appdomain.cloud/sn-portals-cognitiveclass/images/reinforce.png" alt="" />
                            <div style={{padding:"0 30px"}}>
                                <p style={{color:"#4b5563", fontSize:"14px", fontWeight:"500"}} className="m-0 mt-4">4 MOCK TESTS</p>
                                <p style={{lineHeight:"1.4", fontSize:"22px", fontWeight:"700"}} className="m-0 mt-3">Chứng Chỉ Học Tăng Cường</p>
                                <p className="m-0 mt-3" style={{fontWeight:"600"}}>Khóa học và bài thi chứng chỉ chuyên sâu về học tăng cường, một kỹ thuật học máy quan trọng được ứng dụng trong robotics, 
                                game, và các hệ thống tự động hóa.</p>
                            </div>
                        </div>

                        
                    </div>
                </div>

                <WhyChoose/>
                <Footer/>
            </div>            
        </>
    )
}