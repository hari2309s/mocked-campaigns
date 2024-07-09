import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getOverview, selectOverview } from '../store/features/overviewSlice';
import { AppDispatch } from '../store/store';
import {
  CartesianGrid,
  Legend,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts';
import {
  getCampaigns,
  selectCampaigns,
} from '../store/features/campaignsSlice';

export const Overview = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const overview = useAppSelector(selectOverview);
  const campaigns = useAppSelector(selectCampaigns);

  useEffect(() => {
    dispatch(getOverview());

    if (campaigns.length === 0) {
      dispatch(getCampaigns());
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ padding: '20px', margin: '20px', textAlign: 'left' }}>
        <Typography variant="h5">Installs</Typography>
        <LineChart
          width={600}
          height={300}
          data={overview.installs}
          style={{ padding: '20px 0' }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </Box>
      <Box sx={{ padding: '20px', margin: '20px', textAlign: 'left' }}>
        <Typography variant="h5">Revenue</Typography>
        <LineChart
          width={600}
          height={300}
          data={overview.revenue}
          style={{ padding: '20px 0' }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </Box>
    </Box>
  );
};
