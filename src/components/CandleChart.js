import dynamic from "next/dynamic";
import * as React from "react";
import dayjs from "dayjs";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function CandleChart(props) {
  let series = [
    {
      data: props.data,
    },
  ];
  let options
  if (props.market === "crypto") {
    options = {
      chart: {
        type: "candlestick",
        height: 600,
      },
      xaxis: {
        // type: 'datetime',
        type: "category",
        labels: {
          formatter: function (val) {
            return dayjs(val).format("MMM DD HH:mm");
          },
        },
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    };
  }
  else {
    options = {
        chart: {
          type: "candlestick",
          height: 600,
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      };
  }
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type={options.chart.type}
        height={options.chart.height}
      />
    </div>
  );
}
