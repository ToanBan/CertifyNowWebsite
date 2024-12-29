import React, { useEffect, useState } from 'react'
import Toolbar from './Toolbar';
import { data } from 'autoprefixer';
export default function Profiles (){
    const [profiles, setProfiles] = useState([]);
    const FetchProfiles = () => {
        fetch('/profiles')
            .then(response => response.json())
            .then(data => {
                setProfiles(data);
                console.log(data);
            })
            .catch(err => console.error(err));
    }

    const DeleteProfile = (id) => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch(`/profile/${id}`, {
            method:"DELETE",
            headers:{
                'X-CSRF-TOKEN' : csrfTokenMeta.content
            }

        })
        .then(response => response.json())
        .then(data => {
            alert("ĐÃ XOÁ HỒ SƠ THÀNH CÔNG");
            FetchProfiles();
        })
        .catch(err => console.error(err));
    }

    useEffect(()=>{
        FetchProfiles();
    }, []);

    

    return (
        <>
            <div className="container mt-4 ms-full">
                <Toolbar/>
                <div className="shadow mt-5 p-2" style={{width:"100%", height:"500px", borderRadius:"30px"}}>
                        <div className="border-bottom">
                            <p style={{padding:"20px 12px", fontSize:"20px", color:"brown"}} className="m-0">Quản Lý Hồ Sơ</p>
                        </div>

                        <div className='mt-4'>
                    <table className='table table-hovred'>
                        <thead>
                            <tr>
                                <th>Tên Người Dùng</th>
                                <th>Số Điện Thoại</th>
                                <th>Tuổi</th>
                                <th>Địa Chỉ</th>
                                <th>CCCD</th>
                                <th></th>
            
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.length > 0 ? (
                                profiles.map((item) => 
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.age}</td>
                                    <td>{item.address}</td>
                                    <td>{item.cccd}</td>
                                    <td><button className='btn btn-danger' onClick={()=>DeleteProfile(item.id)}>XOÁ</button></td>    
                                </tr>)
                            ):(
                                <p>Đang Tải Dữ Liệu</p>
                            )}
                        </tbody>
                    </table>
                </div> 
                </div>
            </div>
        </>
    )
}