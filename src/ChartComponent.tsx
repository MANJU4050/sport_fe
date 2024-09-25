import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const SleepChart = () => {
  // Sample data for 7 days with null values
  const sleepData = [7, 6.5, null, 8, null, 5.5, 6];

  // Prepare the data for the chart
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Sleep Hours',
        data: sleepData,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        spanGaps: true // Enable line span for null values
      }
    ]
  };

  // Chart options
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Hours of Sleep'
        },
        beginAtZero: true
      },
      x: {
        title: {
          display: true,
          text: 'Days'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + (context.raw !== null ? context.raw : 'No Data');
          }
        }
      }
    }
  };

  return (
    <div>
      <h2>Sleep Data Over 7 Days</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SleepChart;