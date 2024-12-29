import React, { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import {Line} from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard(){
    const [dataY, setDataY] = useState(null);




    const data = {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12],
        datasets: [
          {
            label: 'Doanh Số Theo Tháng',
            data: dataY,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };

    const options = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
    };


    const FetchCostForMonth = () => {
        fetch('/calculated_month', {
            method: "GET",
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            const Ydata = Array(12).fill(0);
            data.map((item) => {
                const index = item.month - 1;
                Ydata[index] =  item.total_price;
            })
            setDataY(Ydata);
        })
        .catch(err => console.error(err));
    }


    useEffect(()=>{
        FetchCostForMonth();
    }, []);
    return (
        <>
            <div className="container mt-4 ms-full" style={{backgroundColor: "#f2f8fc"}}>
                <Toolbar/>
                <div className="shadow mt-5" style={{width:"100%", height:"500px", borderRadius:"30px"}}>
                        <div className="border-bottom">
                            <p style={{padding:"20px 12px", fontSize:"20px", color:"brown"}} className="m-0">Profit & Expenses</p>
                        </div>
                        <Line style={{padding:"10px 12px"}} data={data} options={options}/>
                </div>
            </div>
        </>
    )
}