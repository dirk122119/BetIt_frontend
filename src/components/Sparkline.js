import dynamic from "next/dynamic";
import * as React from 'react';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: true });

export default function Sparkline(props){
    let series = [{ data:props.priceList }]
    let options = {
        chart: {
            type: "area",
            width: "100%",
            height: 130,
            sparkline: {
                enabled: true
            }
        },
        stroke: {
            width: 2,
            curve: 'smooth'
        },
        colors: [(props.priceList[props.priceList.length-1]-props.priceList[0]>0)?'#4CBB17':'#F44336'],
        tooltip: {
            fixed: {
                enabled: false
            },
            x:{
                show: false
            },
            y: {
                title: {
                    formatter: function (seriesName) {
                        return 'USD'
                    }
                }
            },
            marker: {
                show: false
            }
        },
    }
    return (
        <div>
            <Chart
                options={options}
                series={series}
                type={options.chart.type}
                width={options.chart.width}
                height={options.chart.height}
            />
        </div>
    );
}