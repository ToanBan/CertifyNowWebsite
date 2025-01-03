import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";
export default function ExamDone(){
    const [score, setScore] = useState(null);
    const location = useLocation();
    const [warning, setWarning] = useState(null);
    const getQueryParams = (param) => {
        const searchParams = new URLSearchParams(location.search); 
        return searchParams.get(param);
    };

    const examId = getQueryParams('id');

    const fetchScore = () => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch(`/score/${examId}`, {
            method : "POST", 
            headers : {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
            }
        })
            .then(response => response.json())
            .then(data => {
                setScore(data.score);
                setWarning(data.warning.count_violate);
                console.log(data.warning.count_violate);
            })
            .catch(err => console.error(err));
    }

    const FetchCertificate = () => {
        window.location.href = `/certificate/${examId}`;
    }

    useEffect(()=>{
        fetchScore();
    }, []);
    return (
        <>
            <Navigation/>
            <div className="container mt-4 d-flex justify-content-center align-items-center gap-3" style={{height:"60vh"}}>
                {score >= 5 && warning < 2 ? (
                    <img style={{width:"500px", height:"500px", objectFit:"contain", mixBlendMode:"multiply"}} 
                    src="https://img.freepik.com/free-vector/leadership-reach-business-success-trophy-global-business-companies-corporate-employees-are-always-competing-higher-better-positions-business-concept-goals-success_1150-55454.jpg?t=st=1735534409~exp=1735538009~hmac=48af2891e63b291dca7c639b1cf19d350e7997b2b9ec178c455045c548954b3d&w=1060" alt="" />
                ):(
                    <img style={{width:"500px", height:"500px", objectFit:"contain", mixBlendMode:"multiply"}} 
                    src="https://img.freepik.com/free-vector/financial-crisis-business-failure-down-arrow-pressure-shareholder_88138-506.jpg?t=st=1735534606~exp=1735538206~hmac=0a5a831b40ae64d4f94fb3b49b71cac7584dd97d32d8caec39dc88490540cd28&w=1060" alt="" />
                )}
                <div >
                    {score >= 5  && warning < 2? (
                        <h1 className="text-center" style={{fontWeight:"400"}}>Bạn Đã Hoàn Thành Chứng Chỉ Này <br />Điểm Của Bạn: {score}</h1>
                    ):(
                        <div>
                            <h1 className="text-center" style={{fontWeight:"400"}}>Bạn Không Hoàn Thành Chứng Chỉ Này</h1>
                            <p>{warning >= 2 ? (<p className="text-center" style={{fontWeight:"400"}}>Có Hành Vi Gian Lận Trong Thi Cử</p>):(<p></p>)}</p>
                        </div>
                        
                    )}
                    {score>=5 && warning< 2 ? (
                        <div className="d-flex justify-content-center align-items-center mt-3">
                            <button onClick={FetchCertificate} className="button">Xem Chứng Chỉ</button>
                        </div>
                    ):(
                        <div className="d-flex justify-content-center align-items-center mt-3">
                        <a href="/" className="button">Trang Chủ</a>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}