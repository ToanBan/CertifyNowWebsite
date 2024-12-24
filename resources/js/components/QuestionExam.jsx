import React, { useEffect, useState, useRef} from "react";
import Navigation from "./Navigation";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
export default function QuestionExam (){
    const {id} = useParams();
    const [questions, setQuestions] = useState([]);
    const [chooseAnswer, setChooseAnswer] = useState([]);
    const [duration, setDuration] = useState(0);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
    const webRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const dataVideo = useRef([]);
    const [isRecording, setIsRecording] = useState(false);


    const StartRecording = () => {
        const stream = webRef.current.stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                dataVideo.current.push(event.data);
            }
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
    }


    useEffect(() => {
        if (webRef.current && webRef.current.stream) {
            StartRecording();
        }
    }, []);
    

    const SubmitVideo = () => {
        if(mediaRecorderRef.current){
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(dataVideo.current, {type:'video/webm'});
            UploadVideo(blob);
        }
    }

    
    const UploadVideo = (blob) => {
        const formData = new FormData();
        formData.append('video', blob, 'user_video.webm'); 

        fetch('/upload-video', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Upload thành công:', data);
            })
            .catch((err) => {
                console.error('Lỗi khi nộp video:', err);
                alert('Nộp bài thất bại!');
            });
    };



    const AddAnswer = (id) => {
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
        fetch('/useranswers', {
            method : "POST", 
            body : JSON.stringify({'useranswers' : chooseAnswer, 'question_id' : id}),
            headers: {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = "/exam/done";
        })
        .catch(err => console.error(err));
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
                    <p style={{fontSize:"18px", fontWeight:"700"}}>Thời Gian: {timeLeft} Phút</p>
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

            {isWebcamEnabled && (<Webcam className="web-camera" style={{width:"200px", height:"200px"}} ref={webRef}/>)}
        
        </>
    )
}