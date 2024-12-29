import React, { useState } from "react";
import { data } from "react-router-dom";

export default function Verify(){
    const [redirect, setRedirect] = useState(null);

    const [numberOTP, setNumberOTP] = useState([]);
    const SendNumberOTP = numberOTP.join('');
    const GetNumberOTP = (input) => {
        setNumberOTP((prevNumber) => {
            return [...prevNumber, input];
        })
    }

    const SendOTP = (e) => {
        e.preventDefault();
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch('/verify', {
            method: "POST",
            body : JSON.stringify({'numberotp':SendNumberOTP}),
            headers : {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.message){
                if(data.role = 'admin'){
                    window.location.href = "/admin"
                }else{
                    window.location.href = "/"
                }
            }else{
                window.location.href = "/login";
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <>
            <div>

                <div className="w-100 d-flex justify-content-center align-items-center" 
                style={{height:"100vh", backgroundColor:"#4070f4"}}>
                    <div className="bg-white" style={{height:"400px", width:"495px", borderRadius:"30px"}}>
                        <div className="d-flex justify-content-center align-items-center mt-4">
                            <img style={{width:"75px"}} src="https://cdn-icons-png.flaticon.com/512/4314/4314696.png" alt="" />
                        </div>

                        <p  className="text-center" style={{fontSize:"24px", color:"#333333", fontWeight:"500"}}>Enter OTP Code</p>
                        <div>
                            <form onSubmit={SendOTP}>
                                <div className="d-flex justify-content-center gap-3">
                                    <div>
                                        <input onInput={(e) => GetNumberOTP(e.target.value)} className="border" style={{width:"60px", height:"64px", borderRadius:"10px"}} type="number" name="otp1" />
                                    </div>

                                    <div>
                                        <input onInput={(e) => GetNumberOTP(e.target.value)} className="border" style={{width:"60px", height:"64px", borderRadius:"10px"}} type="number" name="otp2" />
                                    </div>

                                    <div>
                                        <input onInput={(e) => GetNumberOTP(e.target.value)} className="border" style={{width:"60px", height:"64px", borderRadius:"10px"}} type="number" name="otp3" />
                                    </div>

                                    <div>
                                        <input onInput={(e) => GetNumberOTP(e.target.value)} className="border" style={{width:"60px", height:"64px", borderRadius:"10px"}} type="number" name="otp4" />
                                    </div>

                                    <div>
                                        <input onInput={(e) => GetNumberOTP(e.target.value)} className="border" style={{width:"60px", height:"64px", borderRadius:"10px"}} type="number" name="otp5" />
                                    </div>

                                    <div>
                                        <input onInput={(e) => GetNumberOTP(e.target.value)} className="border" style={{width:"60px", height:"64px", borderRadius:"10px"}} type="number" name="otp6" />
                                    </div>
                                    
                                </div>

                                <div className="d-flex justify-content-center align-items-center mt-5">
                                <button className="button-2">Verify OTP</button>
                            </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}