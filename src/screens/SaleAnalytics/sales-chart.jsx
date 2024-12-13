'use client'

import { useState } from "react";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

export default function SalesChart(){
    const[data,setData]=useState([""])

    const chartOptions={
          resizeDelay:2,
          responsive:true,
          aspectRatio:3,

          plugins: {
            filler: {
              propagate: false,
            },
            title: {
              display: false,
            },
            legend:{
              display:false,
            },
            chartAreaBorder: {
              display:false,
            }
          },
          scales:{
            x:{
              grid:{
               display:false 
              },
              border:{
                display:false,
              }
            },
            y:{
              grid:{
                color:"rgba(0, 128, 128, 0.1)"
              }
            }
          },
          interaction: {
            intersect: false,
          },
          tooltip:{
            enabled: false,
          },
          hover:{
            mode: null,
            animationDuration: 0
          },
          elements: {
            point: {
              radius:0, 
              hoverRadius:0,
            },
            line: {
              borderWidth:1, 
            }
          }
    }

    return(
        <Line
            options={chartOptions}
            data={{
                labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                datasets:[
                    {
                        label: "Sales",
                        fill:"start",
                        borderJoinStyle:"round",
                        capBezierPoints:false,
                        data:[100,364,162,244,120,184,124,122,124,202,300,450]
                    }
                ]
            }}          
        />
    )
}


// export default function SalesChart(){
//   const graphOptions = {
//     Jan: 2,
//     Feb: 5,
//     Mar: 3,
//     Apr: 5,
//     May: 8,
//     Jun: 9,
//     Aug: 8,
//     Sep: 10,
//     Oct: 6,
//     Nov: 8,
//     Dec: 2,
//   };

//   return(
//     <AreaChart 
//       data={graphOptions}
//       legend={false}
//       // min={1000}
//       // max={5000}
//     />
//   )
// }

