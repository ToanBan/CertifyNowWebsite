import React, { useEffect, useRef } from "react";
import * as faceapi from 'face-api.js';

export default function ModalFaceIdRegister() {
    const videoRef = useRef(null);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(err => {
                console.error("Lỗi truy cập camera: ", err);
                alert("Không thể truy cập camera. Hãy kiểm tra quyền camera.");
            });
    };

    const loadModels = async () => {
        try {
            await faceapi.nets.ssdMobilenetv1.loadFromUri('/models/ssd_mobilenetv1');
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models/tiny_face_detector');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models/face_landmark_68');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models/face_recognition');
            console.log('Tất cả models đã tải thành công!');
        } catch (error) {
            console.error("Lỗi tải model FaceAPI: ", error);
        }
    };

    const handleCapture = async () => {
        const detections = await faceapi.detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceDescriptor();

        if (detections) {
            const faceDescriptor = Array.from(detections.descriptor);
            const response = await fetch('http://localhost:8000/register-faceid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ face_id_token: JSON.stringify(faceDescriptor) }),
            });

            const data = await response.json();
            alert(data.message);
        } else {
            alert('Không phát hiện khuôn mặt, vui lòng thử lại.');
        }
    };

    useEffect(() => {
        loadModels();
        startVideo();
    }, []);

   

    return (
        <>
            <div className="modal fade" id="faceid" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Thiết Lập FaceID</h4>
                        </div>
                        <div className="modal-body">
                            <video ref={videoRef} autoPlay muted width="482" height="560"></video>
                            <div>
                                <button className="button" onClick={handleCapture}>Chụp Ảnh</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
