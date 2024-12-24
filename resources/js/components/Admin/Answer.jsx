import React, { useEffect, useState } from 'react'
import Toolbar from './Toolbar';
export default function Answer (){
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const fetchQuestion = () => {
        fetch('/answer')
            .then(response => response.json())
            .then(data => {
                setAnswers(data.answers);
                setQuestions(data.questions);
                console.log(data.answers);
            })
            .catch(err => console.error(err));
    }


    const AddAnswer = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch('/answer', {
            method : "POST",
            body : formData,
            headers : {
                'X-CSRF-TOKEN' : csrfTokenMeta.content
            }
        })
        .then(response => response.json())
        .then(data => {
            alert("Thêm Câu Trả Lời Thành Công");
            fetchQuestion();
        })
        .catch(err => console.error(err));
    }

    useEffect(()=> {
        fetchQuestion();
    }, []);


    return (
        <>
            <div className="container mt-4 ms-full">
                <Toolbar/>
                <div className="shadow mt-5 p-2" style={{width:"100%", height:"500px", borderRadius:"30px"}}>
                        <div className="border-bottom">
                            <p style={{padding:"20px 12px", fontSize:"20px", color:"brown"}} className="m-0">Quản Lý Câu Trả Lời</p>
                        </div>

                        <div style={{overflow:"hidden"}}>
                            <form onSubmit={AddAnswer} style={{backgroundColor:"#f2f8fc"}}>
                                <div className='d-flex w-100 justify-content-center align-items-center'>
                                    <label className='col-3' htmlFor="question_id">Chọn</label>
                                    <select name="question_id" id="question_id" className='col-9 form-control'>
                                        <option value="">Chọn Câu Hỏi</option>
                                        {questions.map((item) => (
                                            <option key={item.id} value={item.id}>{item.questiton_text}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='d-flex w-100 justify-content-center align-items-center mt-3'>
                                    <label className='col-3' htmlFor="answer_text">Answer</label>
                                    <input className='col-9 form-control' type="text" placeholder='Nhập Câu Trả Lời' name="answer_text" id="answer_text" />
                                </div>

                                <div className='d-flex w-100 justify-content-center align-items-center mt-3'>
                                <label className='col-3' htmlFor="is_correct">Chọn</label>
                                    <select name="is_correct" id="is_correct" className='col-9 form-control'>
                                        <option value="">Đúng Hay Sai</option>
                                        <option value="1">TRUE</option>
                                        <option value="0">FALSE</option>
                                    </select>
                                </div>

                                <div className='d-flex justify-content-end mt-3 w-100 align-items-center'>
                                    <button className='btn btn-dark'>SEND</button>
                                </div>
                            </form>
                        </div>
                        
                </div>

                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>Câu Hỏi</th>
                            <th>Câu Trả Lời</th>
                            <th>Kết Quả</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {answers.length > 0 ? (
                            answers.map((item) => 
                            <tr>
                                <td>{item.question.questiton_text}</td>
                                <td>{item.answer_text}</td>
                                <td>{item.is_correct}</td>
                                <td><button className='btn btn-danger'>XOÁ</button></td>
                                <td><button className='btn btn-primary'>SỬA</button></td>
                            </tr>)
                        ):(
                            <p>Không Có Dữ Liệu</p>
                        )}
                    </tbody>
                </table>
                
            </div>
        </>
    )
}