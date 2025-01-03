import React, { useEffect, useState, useRef, useCallback} from "react";
import Navigation from "./Navigation";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
export default function QuestionExam (){
    const {id} = useParams();
    const [questions, setQuestions] = useState([]);
    const [chooseAnswer, setChooseAnswer] = useState([]);
    const [duration, setDuration] = useState(0);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
    const [imgSrcs, setImgSrcs] = useState([]);
    const webRef = useRef(null);
    const [imgUserPath, setImgUserPath] = useState(null);
    const [isLoad, setIsLoad] = useState(false);    
    const [checkWarning, setCheckWarning] = useState(0);
    const urlPathFaceId = 'http://127.0.0.1:8000/storage/faceid/'
    const fetchImgPath = () => {
        fetch('/getuser')
            .then(response => response.json())
            .then(data => {
                setImgUserPath(`${urlPathFaceId}${data.user.face_id_image}`);
        })
    }

    const CompareMulFace = async () => {
        try {
            const image1 = await loadImage(imgUserPath);
            const detections1 = await faceapi
                .detectSingleFace(image1)
                .withFaceLandmarks()
                .withFaceDescriptor();
    
            if (!detections1) {
                console.error("Không thể phát hiện khuôn mặt người dùng từ hình ảnh chuẩn");
                return;
            }
            
            if (imgSrcs.length === 0) {
                console.error("Không có hình ảnh nào để so sánh");
                return;
            }
            console.log(imgSrcs);
            
            for (let i = 0; i < imgSrcs.length; i++) {
                const img = await loadImage(imgSrcs[i]);
                const detect = await faceapi
                    .detectSingleFace(img)
                    .withFaceLandmarks()
                    .withFaceDescriptor();
    
                if (!detect) {
                    console.error(`Không thể phát hiện khuôn mặt trong ảnh thứ ${i + 1}`);
                    imgSrcs.splice(i, 1);
                }

                const distance = faceapi.euclideanDistance(detections1.descriptor, detect.descriptor);
                const threshold = 0.6; 
                
                imgSrcs.splice(i, 1);

                if (distance < threshold) {
                    console.log(`Ảnh ${i + 1}: Khuôn mặt giống nhau (distance: ${distance})`);
                } else {
                    console.warn(`Ảnh ${i + 1}: Khuôn mặt khác nhau (distance: ${distance})`);
                    setCheckWarning((prev) => prev + 1);
                }
            }
        } catch (error) {
            console.error('Lỗi trong quá trình so sánh khuôn mặt:', error);
            setCheckWarning((prev)=>prev + 1);
        }
    };
    
    console.log(checkWarning);

    useEffect(()=>{
        fetchImgPath();
    }, []);


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (imgUserPath) {
                capture();
            }
        }, 120000);
    
        return () => clearInterval(intervalId); 
    }, [imgUserPath]); 
    
    

    useEffect(()=>{
        loadModels();
    }, []);

    

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

    const capture = useCallback(() => {
        if (webRef.current) {
            const img = webRef.current.getScreenshot();
            if (img) {
                setImgSrcs((prevImgSrcs) => [...prevImgSrcs, img]);
                console.log("Ảnh chụp:", img);
            } else {
                console.log("Không thể chụp ảnh từ webcam");
            }
        }
    }, []);
    
    

    useEffect(() => {
        if (imgUserPath && imgSrcs.length > 0) {
            CompareMulFace();
        }
    }, [imgSrcs, imgUserPath]);
    


    const AddAnswer = (id, questionId) => {
        setChooseAnswer((prev) => {
            if (prev.includes(id)) {
                return prev.filter((answerId) => answerId !== id);
            } else {
                return [...prev, id];
            }
        });
    }

    const StartExam = () => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch(`/question/${id}`, {
            method : "POST",
            headers : {
                'X-CSRF-TOKEN' : csrfTokenMeta.content
            }
        })
        .then(response => response.json())
        .then(data => {
            setQuestions(data.message[0].question);
            setDuration(data.message[0].duration);
            setTimeLeft(data.message[0].duration * 60);
          
        })
        .catch(err => console.error(err));
    }

    const SendAnswers = () => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        const formattedAnswers = chooseAnswer.map((answerId) => {
            const question = questions.find((q) => 
                q.answer.some((a) => a.id === answerId)
            );
            return {
                question_id: question?.id,
                answer_id: answerId,
            };
        });
    
        fetch('/useranswers', {
            method: "POST",
            body: JSON.stringify({ useranswers: formattedAnswers, id_exam: id, warning: checkWarning }),
            headers: {
                'X-CSRF-TOKEN': csrfTokenMeta.content,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = `/exam/done?id=${id}`;
        })
        .catch(err => console.error(err));
    }
    

    const formatSecond = (seconds) => {
        const minutes = Math.floor(seconds / 60); 
        const remainingSeconds = seconds % 60;   
        return `${minutes} phút ${remainingSeconds} giây`;
    }


    useEffect(()=>{
        StartExam();
    }, []);

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            SendAnswers(); 
        }
        return () => clearTimeout(timer);
    }, [timeLeft]);

    useEffect(() => {
        const webcamStatus = localStorage.getItem('isWebcamEnabled');
        if (webcamStatus === 'true') {
            setIsWebcamEnabled(true);
        }
    }, []);

    return (
        <>
            <Navigation/>
            <div className="container mt-3">
                <div className="d-flex justify-content-end align-items-center">
                    <p style={{fontSize:"18px", fontWeight:"700"}}>Thời Gian: {formatSecond(timeLeft)} Phút</p>
                </div>

                {questions.length > 0 ? (
                    questions.map((item) => <div className="border shadow mt-4" style={{borderRadius:"30px"}}>
                    <div style={{padding:"10px"}}>
                        <div className="question">
                            <p style={{fontSize:"20px", fontWeight:"700"}}>{item.questiton_text}</p>
                        </div>

                        <div className="answers">
                            {item.answer.map((answer) => 
                                <div
                                onClick={()=>AddAnswer(answer.id)} key={answer.id} 
                                className={`m-3 p-2 answer-text border-bottom  ${chooseAnswer.some((prevId) => prevId == answer.id) ? 'active' : ''}`}
                                style={{fontWeight:"600"}}>
                                    <a  onClick={(e) => e.preventDefault()} href="#">{answer.answer_text}</a>
                                </div>    
                            )}
                                      
                        </div>
                    </div>
                </div>)
                ):(
                    <p>Đang Tải Dữ Liệu</p>
                )}  

                <div className="mt-3 d-flex justify-content-end align-items-center">
                    <button onClick={() => {SendAnswers() ; SubmitVideo()}} className="button">NỘP BÀI</button>
                </div>          
            </div>
            {isWebcamEnabled && (<Webcam className="web-camera" style={{width:"150px", height:"150px"}} ref={webRef}/>)}
            
            {checkWarning === 3 ? (
            <div className="alert alert-danger" style={{position:"absolute", top:"120px", left: "0"}}>
                <strong>Cảnh Báo</strong> Bạn Gian Lận Trong Bài Thi, Một Lần Nữa Chúng Tôi Sẽ Khoá Bài
            </div>
            ):(
                <p></p>
            )}
        </>
    )
}