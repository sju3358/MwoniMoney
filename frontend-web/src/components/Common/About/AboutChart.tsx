import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface ChartValueProps {
  value: any;
}

function GaugeChart({ value }: ChartValueProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current!);
    const option: echarts.EChartsOption = {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          name: "Pressure",
          type: "gauge",
          progress: {
            show: true,
          },
          detail: {
            valueAnimation: true,
            formatter: "{value}",
          },
          data: [
            {
              value: value,
            },
          ],
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: "200%", height: "128%", marginTop: "5%" }}
    />
  );
}

export default GaugeChart;
