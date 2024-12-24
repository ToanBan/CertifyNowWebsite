import React, { useEffect, useState } from 'react'
import Toolbar from './Toolbar';
export default function Exam (){
    const [exams, setExams] = useState([]);
    const [editExam, setEditExam] = useState(null);





    const EditExam = (item) => {
        setEditExam(item)
    }

    const fetchExams = () => {
        fetch('/exam')
            .then(response => response.json())
            .then(data => setExams(data))
            .catch(err => console.error(err));
    }

    const AddExam = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch('/exam', {
            method : "POST", 
            body: formData,
            headers : {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Thêm Bài Thi Chứng Chỉ Thành Công');
            fetchExams();
        })
        .catch(err => console.error(err));
    }

    const DeleteExam = (id) => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch(`/exam/${id}`, {
            method : "DELETE", 
            headers: {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
            }
        })
        .then(response => response.json())
        .then(data =>{ alert("Xoá Bài Chứng Thành Công"); fetchExams()})
        .catch(err => console.error(err));
    }

    if(editExam){
        console.log(editExam.id);

    }

    const UpdateExam = (e) => {
        e.preventDefault();
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        const formData = new FormData(e.target);
        fetch(`/exam/${editExam.id}`, {
            method :"POST",
            body: formData,
            headers: {
                'X-CSRF-TOKEN' :csrfTokenMeta.content,
                'X-HTTP-Method-Override' : 'PUT',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fetchExams();
            alert("Cập Nhật Chứng Chỉ Thành Công");
        })
        .catch(err => console.error(err));
    }

    useEffect(()=>{
        fetchExams();
    }, []);
    return (
        <>
            <div className="container mt-4 ms-full">
                <Toolbar/>
                <div className="shadow mt-5 p-2" style={{width:"100%", height:"500px", borderRadius:"30px"}}>
                        <div className="border-bottom">
                            <p style={{padding:"20px 12px", fontSize:"20px", color:"brown"}} className="m-0">Quản Lý Các Chứng Chỉ</p>
                        </div>

                        <div style={{overflow:"hidden"}}>
                            <form onSubmit={AddExam} style={{backgroundColor:"#f2f8fc"}}>
                                <div className='d-flex w-100 justify-content-center align-items-center'>
                                    <label className='col-3' htmlFor="name_exam">Tên Chứng Chỉ</label>
                                    <input className='col-9 form-control' type="text" placeholder='Nhập Tên Chứng Chỉ' name="name_exam" id="name_exam" />
                                </div>

                                <div className='d-flex w-100 justify-content-center align-items-center'>
                                    <label className='col-3' htmlFor="des_exam">Mô Tả</label>
                                    <input className='col-9 form-control' type="text" placeholder='Nhập Mô Tả Chứng Chỉ' name="des_exam" id="des_exam" />
                                </div>

                                <div className='d-flex w-100 justify-content-center align-items-center'>
                                    <label className='col-3' htmlFor="duration_exam">Thời Gian Thi</label>
                                    <input className='col-9 form-control' type="number" placeholder='Nhập Thời Gian Chứng Chỉ' name="duration_exam" id="duration_exam" />
                                </div>

                                <div className='d-flex w-100 justify-content-center align-items-center'>
                                    <label className='col-3' htmlFor="price">Giá</label>
                                    <input className='col-9 form-control' type="text" placeholder='Nhập Giá Thành' name="price" id="price" />
                                </div>


                                <div className='d-flex w-100 justify-content-center align-items-center'>
                                    <label className='col-3' htmlFor="image">Hình Ảnh</label>
                                    <input className='col-9 form-control' type="file"  name="image" id="image" />
                                </div>

                                <div className='d-flex justify-content-end mt-3 w-100 align-items-center'>
                                    <button className='btn btn-dark'>SEND</button>
                                </div>
                            </form>
                        </div>
                        
                </div>

                <div className='mt-4'>
                    <table className='table table-hovred'>
                        <thead>
                            <tr>
                                <th>Tên Chứng Chỉ</th>
                                <th>Mô Tả Chứng Chỉ</th>
                                <th>Thời Gian Thi</th>
                                <th>Giá</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.length > 0 ? (
                                exams.map((item) => 
                                <tr>
                                    <td>{item.name_exam}</td>
                                    <td>{item.description_exam}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.price}</td>
                                    <td><button className='btn btn-danger' onClick={()=>DeleteExam(item.id)}>XOÁ</button></td>
                                    <td>
                                        <button className='btn btn-primary' 
                                        onClick={()=>EditExam(item)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#editExam"
                                        >SỬA</button>
                                    </td>
                                </tr>)
                            ):(
                                <p>Đang Tải Dữ Liệu</p>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="modal" id='editExam'>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4>EDIT EXAM</h4>
                            </div>

                            <div className="modal-body">
                                {editExam && (
                                    <div style={{overflow:"hidden"}}>
                                    <form  onSubmit={UpdateExam} style={{backgroundColor:"#f2f8fc"}}>
                                        <div className='d-flex w-100 justify-content-center align-items-center'>
                                            <label className='col-3' htmlFor="name_exam">Tên Chứng Chỉ</label>
                                            <input onChange={(e) => setEditExam({...editExam, name_exam:e.target.value})} value={editExam.name_exam} className='col-9 form-control' type="text" placeholder='Nhập Tên Chứng Chỉ' name="name_exam" id="name_exam" />
                                        </div>
        
                                        <div className='d-flex w-100 justify-content-center align-items-center'>
                                            <label className='col-3' htmlFor="des_exam">Mô Tả</label>
                                            <input onChange={(e) => setEditExam({...editExam, description_exam:e.target.value})} value={editExam.description_exam} className='col-9 form-control' type="text" placeholder='Nhập Mô Tả Chứng Chỉ' name="des_exam" id="des_exam" />
                                        </div>
        
                                        <div className='d-flex w-100 justify-content-center align-items-center'>
                                            <label className='col-3' htmlFor="duration_exam">Thời Gian Thi</label>
                                            <input onChange={(e) => setEditExam({...editExam, duration:e.target.value})} value={editExam.duration} className='col-9 form-control' type="number" placeholder='Nhập Thời Gian Chứng Chỉ' name="duration_exam" id="duration_exam" />
                                        </div>

                                        <div className='d-flex w-100 justify-content-center align-items-center'>
                                            <label className='col-3' htmlFor="price">Giá</label>
                                            <input onChange={(e) => setEditExam({...editExam, price:e.target.value})} value={editExam.price} className='col-9 form-control' type="text" placeholder='Nhập Giá Thành' name="price" id="price" />
                                        </div>

                                        <div className='d-flex w-100 justify-content-center align-items-center'>
                                            <label className='col-3' htmlFor="image">Hình Ảnh</label>
                                            <input v onChange={(e)=>setEditExam({...editExam, image: e.target.files})} className='col-9 form-control' type="file"  name="image" id="image" />
                                        </div>

                                        <div className='d-flex justify-content-end mt-3 w-100 align-items-center'>
                                            <button className='btn btn-dark'>SEND</button>
                                        </div>
                                    </form>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}