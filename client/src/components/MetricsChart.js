// src/components/MetricsChart.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchMetrics } from '../services/api';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

const MetricsChart = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchMetrics();
        console.log('Fetched metrics:', data);
        setMetrics(data);
      } catch (err) {
        console.error('Error fetching metrics:', err);
      }
    };

    loadMetrics();
    const interval = setInterval(loadMetrics, 5000); // Fetch metrics every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const chartData = {
    labels: metrics.map(m => new Date(m.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Metric Value',
        data: metrics.map(m => Number(m.value)),
        fill: false,
        backgroundColor: 'rgba(0, 123, 255, 0.6)',
        borderColor: 'rgba(0, 123, 255, 1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'System Metrics Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '90%', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MetricsChart;
