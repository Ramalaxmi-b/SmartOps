import React, { useEffect, useState } from 'react';
import { fetchMetrics, createMetric, detectAnomaly, fetchSyntheticData } from '../services/api';
import { Container, Typography, Paper, Grid, TextField, Button, CircularProgress } from '@mui/material';
import MetricsChart from '../components/MetricsChart';

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [anomalyResult, setAnomalyResult] = useState(null);

  useEffect(() => { getAll(); }, []);
  const getAll = async () => {
    setLoading(true);
    try {
      const real = await fetchMetrics();
      const csv = await fetchSyntheticData();
      const synth = csv
        .split("\n").slice(1)
        .filter(r => r.trim())
        .map((r,i) => {
          const [n,v] = r.split(",");
          return { name: n.trim(), value: +v.trim(), timestamp: Date.now()+i };
        });
      setMetrics([...(Array.isArray(real)?real:[]), ...synth]);
    } catch { setMetrics([]); }
    setLoading(false);
  };

  const add = async e => {
    e.preventDefault();
    if(!name||!value) return;
    await createMetric({ name, value: +value });
    setName(''); setValue('');
    getAll();
  };
  const check = async () => {
    const res = await detectAnomaly({ value: +value });
    setAnomalyResult({ ...res, value });
  };

  return (
    <Container sx={{ mt:4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        SmartOps Dashboard
      </Typography>

      <Paper sx={{ p:2, mb:3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField label="Metric Name" fullWidth value={name} onChange={e=>setName(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Value" type="number" fullWidth value={value} onChange={e=>setValue(e.target.value)} />
          </Grid>
          <Grid item xs={6} md={2}>
            <Button variant="contained" fullWidth onClick={add}>Add Metric</Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button variant="outlined" fullWidth onClick={check}>Check Anomaly</Button>
          </Grid>
        </Grid>
        {anomalyResult && (
          <Typography color="error" sx={{ mt:2 }}>
            {anomalyResult.message} (Value: {anomalyResult.value})
          </Typography>
        )}
      </Paper>

      {loading ? (
        <Grid container justifyContent="center"><CircularProgress /></Grid>
      ) : (
        <>  
          <MetricsChart metrics={metrics} />
          <Grid container spacing={2}>
            {metrics.length ? metrics.map((m,i)=>(
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper sx={{ p:2 }}>
                  <Typography variant="h6">{m.name}</Typography>
                  <Typography>Value: {m.value}</Typography>
                  <Typography variant="caption">{new Date(m.timestamp).toLocaleString()}</Typography>
                </Paper>
              </Grid>
            )) : <Typography>No metrics available.</Typography>}
          </Grid>
        </>
      )}
    </Container>
  );
}
