import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function ModalFaceIdRegister() {
    const videoRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);

    const capture = useCallback(()=>{
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        const imageSrc = videoRef.current.getScreenshot();
        fetch('/register-faceid', {
            method:"POST", 
            body: JSON.stringify({imageSrc}),
            headers: {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            alert("Nhận Diện Khuôn Mặt Thành Công");
        })
        .catch(err => console.error(err));
    }, [videoRef]);

   

    return (
        <>
            <div className="modal fade" id="faceid" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content" style={{width:"675px"}}>
                        <div className="modal-header">
                            <h4>Thiết Lập FaceID</h4>
                        </div>
                        <div className="modal-body">
                            <Webcam ref={videoRef}/>
                            <div>
                                <button onClick={capture} className="button">Chụp Ảnh</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
