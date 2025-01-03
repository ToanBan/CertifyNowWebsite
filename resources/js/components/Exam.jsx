import React, { useCallback, useEffect, useRef, useState } from "react";
import Navigation from "./Navigation";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
export default function Exam() {
    const [exams, setExams] = useState([]);
    const [ordered, setOrdered] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const urlPath = 'http://127.0.0.1:8000/storage/image_exam/';
    const urlPathFaceId = 'http://127.0.0.1:8000/storage/faceid/'
    const urlPathVerifyId = 'http://127.0.0.1:8000/storage/faceidverify/'
    const [isExam, setIsExam] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const videoRef = useRef();
    const [verifyCurrent, setVerifyCurrent] = useState(null);
    const [imageUser, SetImageUser] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    const [imgVerify, setImgVerify] = useState(null);
    const [imgUserPath, setImgUserPath] = useState(null);
    const [examId, setExamId] = useState(null);
    const fetchUserCurrent = () => {
        fetch('/getuser')
            .then(response => response.json())
            .then(data => {
                setCurrentUser(data.user.id);
                setImgUserPath(`${urlPathFaceId}${data.user.face_id_image}`);
            })
    }

   const loadModels = async () => {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models/ssd_mobilenetv1');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models/face_landmark_68');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models/face_recognition');
        setIsLoad(true);
   }

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous"; 
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = (err) => {
                console.error('Lỗi tải hình ảnh:', src, err);
                reject(new Error(`Không thể tải hình ảnh từ: ${src}`));
            };
        });
    };
    const Compareface = async() => {
        try{
            const image1 = await loadImage(imgUserPath);
            const image2 = await loadImage(imgVerify);
            console.log(image1);
            console.log(image2);
            const detections1 = await faceapi.detectSingleFace(image1).withFaceLandmarks().withFaceDescriptor();
            const detections2 = await faceapi.detectSingleFace(image2).withFaceLandmarks().withFaceDescriptor();
            if (!detections1 || !detections2) {
                setResult('Không phát hiện khuôn mặt trong một hoặc cả hai hình ảnh.');
                return;
            }

            const distance = faceapi.euclideanDistance(detections1.descriptor, detections2.descriptor);
            const threshold = 0.6; 

            if (distance < threshold) {
                setResult(true);
            } else {
                setResult(false);
            }
        }catch(err){
            console.error('Lỗi khi so sánh khuôn mặt:', err);
            setResult('Lỗi khi so sánh khuôn mặt');
        }
    }
   
    useEffect(()=>{
        if(isLoad && imgVerify !== null && imgUserPath !== null){
            Compareface();
        }
    }, [isLoad, imgVerify, imgUserPath]);

   useEffect(()=>{
    loadModels();
   }, []);

    const fetchCheckExam = () => {
        fetch('/examresult')
            .then(response => response.json())
            .then(data => {
                setIsExam(data);
            })
            .catch(err => console.error(err));
    };

    const fetchExams = () => {
        fetch('/exam')
            .then(response => response.json())
            .then(data => setExams(data))
            .catch(err => console.error(err));
    };

    const fetchOrdered = () => {
        fetch('/orderexam')
            .then(response => response.json())
            .then(data => {
                setOrdered(data);
            })
            .catch(err => console.error(err));
    };

    const SelectedOrder = (value1, value2, value3) => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch('/session', {
            method: "POST",
            body: JSON.stringify({ price: value1, name: value2, exam_id: value3 }),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfTokenMeta.content,
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                window.location.href = data.url;
            })
            .catch(err => console.error('Error:', err));
    };


    const VerifyCamera = (id) => {
        setExamId(id);
        const confirm = window.confirm("Bạn Vui Lòng Xác Minh Hình Ảnh");
        if(confirm){
            setVerifyCurrent(true);
        }
    }


    useEffect(()=>{
        if(result === true){
            window.location.href = `/exam/${examId}`;
        }
    }, [result]);

    const capture = useCallback(() => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        const imgSrc = videoRef.current.getScreenshot();
        fetch('/verify-faceid', {
            method : "POST", 
            body : JSON.stringify({imgSrc}),
            headers : {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            setImgVerify(`${urlPathVerifyId}${data.image}`);
            console.log(data);
            
        })
        .catch(err => console.error(err));
    }, [videoRef]);
    
    console.log(imgVerify)
    useEffect(() => {
        fetchExams();
    }, []);

    useEffect(() => {
        fetchOrdered();
    }, []);

    useEffect(() => {
        fetchCheckExam();
    }, []);

    useEffect(()=> {
        fetchUserCurrent();
    }, []);

   console.log(result);
    return (
        <>
            <Navigation />
            <div className="container position-relative">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-6">
                        <h1 style={{ fontSize: "48px", fontWeight: "700" }}>Các Chứng Chỉ Nổi Bật</h1>
                        <p style={{ color: "#627b80", fontWeight: "700", lineHeight: "1.4" }}>
                            Khám phá các chứng chỉ quốc tế với lộ trình học tập chi tiết và bài thi thử.
                            Chọn chứng chỉ phù hợp và bắt đầu chinh phục mục tiêu của bạn ngay hôm nay!
                        </p>
                    </div>
                    <div className="col-6">
                        <img src="https://cognitiveclass.ai/assets/content_learning_path_heading-a2dc344e096d10ad2fd94caf571b6c94f176038bec0541b2735f4e19f3603b61.svg" alt="" />
                    </div>
                </div>

                {/* Danh sách khóa học */}
                <div className="exam-list">
                    {exams.length > 0 ? (
                        exams.map((item) => (
                            <div className="border shadow mt-4" style={{ borderRadius: "30px", overflow: "hidden" }} key={item.id}>
                                <div className="exam-item d-flex gap-3 rounded">
                                    <div>
                                        <img style={{ height: "224px", width: "298px" }} src={`${urlPath}${item.image}`} alt="" />
                                    </div>

                                    <div>
                                        <p style={{ fontWeight: "600" }} className="name-exam-item">{item.name_exam}</p>
                                        <p style={{ fontWeight: "400" }} className="des-exam-item">{item.description_exam}</p>
                                        <p style={{ fontWeight: "400" }}>Price: <strong>{item.price}</strong></p>

                                        {isExam.some((prev) => prev.exam_id === item.id && prev.user_id === currentUser) ? (
                                            <button className="btn btn-success mb-2" disabled>
                                                Đã Thi
                                            </button>
                                        ) : ordered.some((prev) => prev.exam_id === item.id) ? (
                                            <button
                                                style={{ borderRadius: "30px" }}
                                                className="button mb-4"
                                                onClick={()=>VerifyCamera(item.id)}
                                            >
                                                Bắt Đầu Thi
                                            </button>
                                        ) : (
                                            // Người dùng chưa mua khóa học
                                            <button
                                                onClick={() => SelectedOrder(item.price, item.name_exam, item.id)}
                                                className="button mb-2"
                                            >
                                                Mua
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Đang Tải Dữ Liệu...</p>
                    )}
                </div>
            </div>

            {verifyCurrent && (
                <div className="border shadow bg-dark" style={{position:"absolute", top:"30%", left:"10%", borderRadius:"30px"}}>
                    <div className="p-4">
                        <Webcam ref={videoRef}/>
                        <button style={{display:"inherit"}} className="button" onClick={capture}>CHỤP ẢNH</button>
                    </div>
                </div>
            )}
        </>
    );
}
