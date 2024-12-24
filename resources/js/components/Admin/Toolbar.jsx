import React from "react";

export default function Toolbar(){
    return (
        <>
            <div className="d-flex toolbar shadow justify-content-between align-items-center">
                    <img className="ms-4" style={{width:'50px', height:"50px"}} src="https://img.freepik.com/free-vector/award-medal-with-red-ribbon_1284-42828.jpg?t=st=1734617225~exp=1734620825~hmac=d1682278adc1ea1c96fec6f90a23abc4953f7ae58c93f8710de2509f373d0a19&w=740" alt="" />
                    <p style={{color: 'dimgray'}} className="m-0 me-4 fst-italic">CetifyNow</p>
            </div>
        </>
    )
}