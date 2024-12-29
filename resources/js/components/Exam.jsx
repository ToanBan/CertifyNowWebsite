import React, { useEffect , useState, useRef} from "react";
import Navigation from "./Navigation";
export default function Exam(){
    const [exams, setExams] = useState([]);
    const [ordered, setOrdered] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const urlPath = 'http://127.0.0.1:8000/storage/image_exam/';
    const fetchExams = () => {
        fetch('/exam')
            .then(response => response.json())
            .then(data => {setExams(data)})
            .catch(err => console.error(err));
    }

    const fetchOrdered = () => {
        fetch('/orderexam')
            .then(response => response.json())
            .then(data => {setOrdered(data); console.log(data)})
            .catch(err => console.error(err));
    }

    const SelectedOrder = (value1, value2, value3) => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        fetch('/session', {
            method: "POST",
            body: JSON.stringify({ price: value1, name:value2, exam_id : value3 }),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfTokenMeta.content,
                'Accept' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = data.url;
        })
        .catch(err => console.error('Error:', err));
    }


    const OpenCamera = () => {
        const confirm = window.confirm("Bạn Vui Lòng Bật Camera Mới Có Thể Làm Bài Thi");
        if(confirm){
            setIsOpen(true);
        }
       
        localStorage.setItem('isWebcamEnabled', 'true');  
    }

    useEffect(()=>{
        fetchExams();
    }, []);

    useEffect(()=>{
        fetchOrdered();
    }, []);
    return (
        <>
            <Navigation/>
            <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-6">
                        <h1 style={{fontSize:"48px", fontWeight:"700"}}>Các Chứng Chỉ Nổi Bật</h1>
                        <p style={{color:"#627b80", fontWeight:"700", lineHeight:"1.4"}}>Khám phá các chứng chỉ quốc tế với lộ trình học tập chi tiết và bài thi thử. 
                            Chọn chứng chỉ phù hợp và bắt đầu chinh phục mục tiêu của bạn ngay hôm nay!</p>
                    </div>
                    <div className="col-6">
                        <img src="https://cognitiveclass.ai/assets/content_learning_path_heading-a2dc344e096d10ad2fd94caf571b6c94f176038bec0541b2735f4e19f3603b61.svg" alt="" />
                    </div>
                </div>

                <div className="exam-list">
                    {exams.length > 0 ? (
                        exams.map((item) => <div className="border shadow mt-4" style={{borderRadius:"30px", overflow:"hidden"}}>
                        <div className="exam-item d-flex gap-3 rounded">
                            <div>
                                <img style={{height:"224px", width:"298px"}} src={`${urlPath}${item.image}`} alt="" />
                            </div>

                            <div>
                                <p style={{fontWeight:"600"}} className="name-exam-item">{item.name_exam}</p>
                                <p style={{fontWeight:"400"}} className="des-exam-item">{item.description_exam}</p>
                                <p style={{fontWeight:"400"}}>Price: <strong>{item.price}</strong></p>

                                {ordered.some((prev) => prev.exam_id === item.id) ? (
                                    <a  style={{borderRadius:"30px"}} 
                                    className="btn btn-primary mb-4"
                                    onClick={OpenCamera}
                                    href={isOpen ? `/exam/${item.id}` : "#"} >Bắt Đầu Thi</a>
                                ):(
                                    <button
                                        onClick={()=>SelectedOrder(item.price, item.name_exam, item.id)}
                                        className="button mb-2"
                                    >
                                        Mua
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>)
                    ):(
                        <p>Đang Tải Dữ Liệu</p>
                    )}

                </div>
            </div>

            
        </>
    )
}