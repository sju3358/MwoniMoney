import React from "react";
import { PieChart } from "@mui/x-charts";
import { Liquid } from "@ant-design/plots";

interface ChartProps {
  value: number; // Add this line to explicitly type the value prop
}

function Chart({ value, color }: any) {
  return (
    <PieChart
      sx={{
        width: "80%",
        height: "80%",
        // border: "1px solid red",
        boxSizing: "border-box",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      series={[
        {
          data: [
            { value, color }, // Use color property
          ],
          innerRadius: 30,
          outerRadius: 80, // 변경된 부분 (전체 크기의 80%)
          paddingAngle: 5,
          cornerRadius: 0,
          startAngle: -90,
          endAngle: 180,
          cx: 180,
          cy: 82,
        },
      ]}
    />
  );
}

interface LiquidProps {
  percent: number;
}

const DemoLiquid: React.FC<LiquidProps> = ({ percent }) => {
  const config = {
    percent: percent,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
  };

  return <Liquid {...config} percent={percent} />;
};

export { DemoLiquid, Chart };
