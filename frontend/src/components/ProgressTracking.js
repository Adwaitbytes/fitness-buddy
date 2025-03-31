import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ProgressTracking() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/progress', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => setLogs(res.data));
  }, []);

  const data = {
    labels: logs.map(log => new Date(log.date).toLocaleDateString()),
    datasets: [{
      label: 'Workout Frequency',
      data: logs.map((_, index) => index + 1),
      borderColor: '#1976d2',
      fill: false,
    }],
  };

  return (
    <Container>
      <Typography variant="h4">Progress Tracking</Typography>
      <Line data={data} />
      {/* Add form to log workouts */}
    </Container>
  );
}

export default ProgressTracking;