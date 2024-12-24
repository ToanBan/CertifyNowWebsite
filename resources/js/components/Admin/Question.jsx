import React, { useEffect, useState } from 'react'
import Toolbar from './Toolbar';
export default function Question (){
    const [exams, setExams] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [editQuestion, setEditQuestion] = useState(null);

    const EditQuestion = (item) => {
        setEditQuestion(item)
    }

    const fetchQuestion = () => {
        fetch('/question')
            .then(response => response.json())
            .then(data => {
                console.log(data.questions);
                setQuestions(data.questions);
            })
    }

    const fetchExams = () => {
        fetch('/question')
            .then(response => response.json())
            .then(data => setExams(data.exams))
            .catch(err => console.error(err));
    }


    const AddQuestion = (e) => {
        e.preventDefault();
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        const formData = new FormData(e.target);
        fetch('/question', {
            method :"POST",
            body: formData,
            headers : {
                'X-CSRF-TOKEN': csrfTokenMeta.content,
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("Thêm Câu Hỏi Thành Công");
        })
        .catch(err => console.error(err))
    }

    const DeleteQuestion = (id) => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch(`/question/${id}`, {
            method : "DELETE",
            headers : {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
            }
        })
        .then(response => response.json())
        .then(data => {
            alert("xoá câu hỏi thành công");
            fetchQuestion();
        })
        .catch(err => console.error(err));
    }

    const UpdateQuestion = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch(`/question/${editQuestion.id}`, {
            method : "POST", 
            body: formData,
            headers: {
                'X-CSRF-TOKEN' : csrfTokenMeta.content,
                'X-HTTP-Method-Override' : "PUT"
            }
        })
        .then(response => response.json())
        .then(data => {
            alert("Cập nhật câu hỏi thành công");
            fetchQuestion();
        })
        .catch(err => console.error(err));
    }


    useEffect(()=>{
        fetchExams();
        fetchQuestion();
    }, []);


    return (
        <>
            <div className="container mt-4 ms-full">
                <Toolbar/>
                <div className="shadow mt-5 p-2" style={{width:"100%", height:"500px", borderRadius:"30px"}}>
                        <div className="border-bottom">
                            <p style={{padding:"20px 12px", fontSize:"20px", color:"brown"}} className="m-0">Quản Lý Câu Hỏi</p>
                        </div>

                        <div style={{overflow:"hidden"}}>
                            <form onSubmit={AddQuestion} style={{backgroundColor:"#f2f8fc"}}>
                                <div className='d-flex w-100 justify-content-center align-items-center'>
                                    <label className='col-3' htmlFor="exam_id">Bộ Chứng Chỉ</label>
                                    <select name="exam_id" id="exam_id" className='col-9 form-control'>
                                        <option value="">Chọn Chứng Chỉ</option>
                                        {exams.map((item) => (
                                            <option value={item.id}>{item.name_exam}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='d-flex w-100 justify-content-center align-items-center'>
                                    <label className='col-3' htmlFor="question_text">Câu Hỏi</label>
                                    <input className='col-9 form-control' type="text" placeholder='Nhập Câu Hỏi ' name="question_text" id="question_text" />
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
                                <th>Câu Hỏi</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.length > 0 ? (
                                questions.map((item) => 
                                <tr>
                                    <td>{item.exam.name_exam}</td>
                                    <td>{item.questiton_text}</td>
                                    <td><button className='btn btn-danger' onClick={()=>DeleteQuestion(item.id)}>XOÁ</button></td>
                                    <td>
                                        <button className='btn btn-primary' 
                                        onClick={()=>EditQuestion(item)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#editQuestion"
                                        >SỬA</button>
                                    </td>
                                </tr>)
                            ):(
                                <p>Đang Tải Dữ Liệu</p>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="modal fade" id="editQuestion">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="moda-header">
                                <h4>EDIT QUESTION</h4>
                            </div>

                            <div className="modal-body">
                                {editQuestion && (
                                    <form onSubmit={UpdateQuestion} style={{backgroundColor:"#f2f8fc"}}>
                                    <div className='d-flex w-100 justify-content-center align-items-center'>
                                        <label className='col-3' htmlFor="exam_id">Bộ Chứng Chỉ</label>
                                        <select onChange={(e)=>setEditQuestion({...editQuestion, exam_id:e.target.value})} value={editQuestion.exam_id} name="exam_id" id="exam_id" className='col-9 form-control'>
                                            <option value="">Chọn Chứng Chỉ</option>
                                            {exams.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name_exam}</option>
                                            ))}
                                        </select>
                                    </div>
    
                                    <div className='d-flex w-100 justify-content-center align-items-center'>
                                        <label className='col-3' htmlFor="question_text">Câu Hỏi</label>
                                        <input onChange={(e)=>setEditQuestion({...editQuestion, questiton_text:e.target.value})} value={editQuestion.questiton_text} className='col-9 form-control' type="text" placeholder='Nhập Câu Hỏi ' name="question_text" id="question_text" />
                                    </div>
    
                                    <div className='d-flex justify-content-end mt-3 w-100 align-items-center'>
                                        <button className='btn btn-dark'>SEND</button>
                                    </div>
    
                                </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}