import React from "react";
import Toolbar from "./Toolbar";
export default function Dashboard(){
    return (
        <>
            <div className="container mt-4 ms-full" style={{backgroundColor: "#f2f8fc"}}>
                <Toolbar/>
                <div className="shadow mt-5" style={{width:"100%", height:"500px", borderRadius:"30px"}}>
                        <div className="border-bottom">
                            <p style={{padding:"20px 12px", fontSize:"20px", color:"brown"}} className="m-0">Profit & Expenses</p>
                        </div>
                        
                </div>
            </div>
        </>
    )
}