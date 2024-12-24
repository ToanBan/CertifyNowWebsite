import React, { useEffect, useRef, useState } from "react";
import Navigation from "./Navigation";
import Webcam from "react-webcam";
export default function MyProfile(){
    const [myProfile, setMyProfile] = useState('');
    const [editProfile, setEditProfile] = useState('');
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const imageUrl = "http://127.0.0.1:8000/storage/profiles/";
    const urlDefault = "https://cognitiveclass.ai/assets/user-dac44c15e5f337629da17a1cc93b37fb16bead76247c3cc3c7e05dc56c4ce7f4.svg";


    const EditProfile = (item) => {
        setEditProfile(item);
    }

    const fetchMyProfile = () => {
        fetch('/profile')
            .then(response => response.json())
            .then(data => {
                setMyProfile(data[0]);
            })
            .catch(err => console.error(err));
    }


    const UpdateProfile = (e) => {
        e.preventDefault();
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        const formData = new FormData(e.target);
        console.log([...formData]);
        fetch(`/profile/${editProfile.id}`, {
            method : "POST", 
            body : formData,
            headers: {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
                'X-HTTP-Method-Override' : "PUT",
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Cập Nhật Thành Công');
            fetchMyProfile();
        })
        .catch(err => console.error(err));
    }

    const ScanFace = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch('/profile/setup-faceid', {
            method:"POST",
            body: JSON.stringify({'image_faceid': imageSrc}),
            headers : {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            }
        })
        .then(resposne => resposne.json())
        .then(data => {
            console.log(data);
            alert("Thiết Lập FaceID Thành Công");
        })
        .catch(err => console.error(err));
    }

   

    useEffect(()=> {
        fetchMyProfile();
    }, []);

    return (
        <>
            <Navigation/>
            <div className="container mt-5">
                <div className="d-flex align-items-center gap-4">
                <img
                style={{ width: "208px", height:"208px", objectFit:"cover", borderRadius:"30px" }}
                src={`${imageUrl}${myProfile.image}`} 
                onError={(e) => {
                    e.target.src = urlDefault
                }}
                alt="" />

                    {myProfile && (
                        <div className="profile">
                        <p className="name" style={{fontSize:"30px", fontWeight:"500"}}>{myProfile.name}</p>
                        <p style={{fontSize:"18px", fontWeight:"400"}} className="age"><strong>Tuổi: </strong>{myProfile.age}</p>
                        <p style={{fontSize:"18px", fontWeight:"400"}} className="cccd"><strong>CCCD: </strong>{myProfile.cccd}</p>
                        <p style={{fontSize:"18px", fontWeight:"400"}} className="address"><strong>Quê Quán: </strong>{myProfile.address}</p>

                        <div className="d-flex gap-4">
                            <div>
                                <button onClick={()=>EditProfile(myProfile)} data-bs-toggle="modal" data-bs-target="#editprofile" className="button">Edit Profile</button>
                            </div>

                            <div>
                                <button 
                                data-bs-toggle="modal"
                                data-bs-target="#faceid"
                                className="button">Thiết Lập FACEID
                                </button>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>

            <div style={{marginLeft:"16rem"}}>
                <p className="text-header-modal">About</p>
                <p style={{fontSize:"17px", fontWeight:"400"}}>{myProfile ? myProfile.description : 'This user is shy, no bio available'}</p>
            </div>

            <div className="modal modal-xl fade" id="editprofile">
                <div className="modal-dialog">
                    <div className="modal-content" style={{overflow:"hidden"}}>
                        <div className="modal-header">
                            <p className="text-header-modal">Edit Profile</p>
                        </div>

                        <div className="modal-body">
                            {editProfile && (
                                <form onSubmit={UpdateProfile}>
                                <div className="w-100 d-flex justify-content-start align-items-center">
                                    <label className="col-2" htmlFor="name">Name</label>
                                    <input value={editProfile.name} onChange={(e)=>setEditProfile({...editProfile, name: e.target.value})} className="form-control col-10" type="text" placeholder="Tên Của Bạn?" name="name" id="name"/>
                                </div>

                                <div className="w-100 d-flex justify-content-start align-items-center">
                                    <label className="col-2" htmlFor="age">Age</label>
                                    <input value={editProfile.age} onChange={(e)=>setEditProfile({...editProfile, age: e.target.value})} className="form-control col-10" type="text" placeholder="Tuổi Của Bạn?" name="age" id="age"/>
                                </div>

                                <div className="w-100 d-flex justify-content-start align-items-center">
                                    <label className="col-2" htmlFor="phone">Phone</label>
                                    <input value={editProfile.phone} onChange={(e)=>setEditProfile({...editProfile, phone: e.target.value})} className="form-control col-10" type="text" placeholder="SĐT Của Bạn?" name="phone" id="phone"/>
                                </div>

                                <div className="w-100 d-flex justify-content-start align-items-center">
                                    <label className="col-2" htmlFor="address">HomeTown</label>
                                    <input value={editProfile.address} onChange={(e)=>setEditProfile({...editProfile, address: e.target.value})} className="form-control col-10" type="text" placeholder="Quê Quán Của Bạn?" name="address" id="address"/>
                                </div>

                                <div className="w-100 d-flex justify-content-start align-items-center">
                                    <label className="col-2" htmlFor="description">About you</label>
                                    <textarea  value={editProfile.description} onChange={(e)=>setEditProfile({...editProfile, description: e.target.value})} placeholder="Giới Thiệu" className="form-control col-10" name="description" id="description" cols="30" rows="5"></textarea>
                                </div>

                                <div className="w-100 d-flex justify-content-start align-items-center">
                                    <label className="col-2" htmlFor="cccd">CCCD</label>
                                    <input  value={editProfile.cccd} onChange={(e)=>setEditProfile({...editProfile, cccd: e.target.value})} placeholder="Căn Cước Công Dân" className="form-control col-10" name="cccd" id="cccd" cols="30" rows="5"></input>
                                </div>

                                
                                <div className="w-100 d-flex justify-content-start align-items-center">
                                    <label className="col-2" htmlFor="image">Image</label>
                                    <input type="file"  onChange={(e)=>setEditProfile({...editProfile, image: e.target.files})} placeholder="Hình Ảnh" name="image" id="image"/>
                                </div>
                            

                                <div className="d-flex justify-content-end w-100 mt-3">
                                    <button className="button">UPDATE</button>
                                </div>
                            </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Thiết Lập FaceID */}
            <div className="modal" id="faceid">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Thiết Lập FaceID</h4>
                        </div>

                        <div className="modal-body">
                            <Webcam  style={{ width: 400, height: 300 }} ref={webcamRef} screenshotFormat="image/png"/>
                            <div>
                                <button className="button" onClick={ScanFace}>Chụp Ảnh</button>
                            </div>
                        </div>
                    </div>

                                
                </div>
            </div>

        </>
    )
}