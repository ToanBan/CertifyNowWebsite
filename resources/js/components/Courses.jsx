import React, { useEffect, useState } from "react";
import * as faceapi from 'face-api.js';

export default function Courses() {
    const [result, setResult] = useState(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);

    const loadModels = async () => {
        try {
            await faceapi.nets.ssdMobilenetv1.loadFromUri('/models/ssd_mobilenetv1');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models/face_landmark_68');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models/face_recognition');
            console.log('✅ Mô hình đã tải thành công');
            setModelsLoaded(true);
        } catch (error) {
            console.error('Lỗi khi tải mô hình:', error);
        }
    };

    const CompareFace = async () => {
        try {
            const image1 = await loadImage("http://127.0.0.1:8000/storage/faceid/faceid_1735645930.webp");
            const image2 = await loadImage("http://127.0.0.1:8000/storage/faceid/faceid_1735645930.webp");
            const detections1 = await faceapi.detectSingleFace(image1).withFaceLandmarks().withFaceDescriptor();
            const detections2 = await faceapi.detectSingleFace(image2).withFaceLandmarks().withFaceDescriptor();

            if (!detections1 || !detections2) {
                setResult('Không phát hiện khuôn mặt trong một hoặc cả hai hình ảnh.');
                return;
            }

            const distance = faceapi.euclideanDistance(detections1.descriptor, detections2.descriptor);
            const threshold = 0.6; 

            if (distance < threshold) {
                setResult('Khuôn mặt giống nhau');
            } else {
                setResult('Khuôn mặt khác nhau');
            }
        } catch (error) {
            console.error('Lỗi khi so sánh khuôn mặt:', error);
            setResult('Lỗi khi so sánh khuôn mặt');
        }
    };

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous"; 
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
        });
    };

    useEffect(() => {
        loadModels();
    }, []);

    useEffect(() => {
        if (modelsLoaded) {
            CompareFace();
        }
    }, [modelsLoaded]);

    return (
        <>
            <p className="text-danger fs-1">Kết Quả: {result}</p>
        </>
    );
}
