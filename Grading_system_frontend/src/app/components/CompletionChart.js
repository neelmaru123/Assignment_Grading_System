import { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const CompletionChart = ({ pendingStudentsCount, totalStudents }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const completedCount = totalStudents - pendingStudentsCount;
    const chartData = {
      labels: ["Completed", "Pending"],
      datasets: [
        {
          data: [completedCount, pendingStudentsCount],
          backgroundColor: ["#514DEC", "#e0e0e0"],
        },
      ],
    };

    const config = {
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) =>
                `${tooltipItem.label}: ${tooltipItem.raw} students`,
            },
          },
        },
      },
    };

    const chartInstance = new Chart(chartRef.current, config);

    // Cleanup on unmount
    return () => {
      chartInstance.destroy();
    };
  }, [pendingStudentsCount, totalStudents]);

  return (
    <div className="w-72 mx-auto">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CompletionChart;
