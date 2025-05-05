import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const FeedbackChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('/api/feedbacks/analysis') // Adjust if your base URL is different
      .then(response => {
        const data = response.data;
        setChartData({
          labels: ['Positive', 'Neutral', 'Negative'],
          datasets: [
            {
              label: 'Sentiment Count',
              data: [data.Positive, data.Neutral, data.Negative],
              backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => {
        console.error("Error fetching chart data:", error);
      });
  }, []);

  if (!chartData) return <p>Loading sentiment chart...</p>;

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Pie data={chartData} />
    </div>
  );
};

export default FeedbackChart;
