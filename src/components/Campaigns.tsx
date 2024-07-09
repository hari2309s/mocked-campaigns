import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { AppDispatch } from '../store/store';
import {
  selectCampaign,
  selectCampaigns,
  setCampaign,
} from '../store/features/campaignsSlice';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const Campaigns = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const campaigns = useAppSelector(selectCampaigns);
  const campaign = useAppSelector(selectCampaign);

  const handleCampaignChange = (e: SelectChangeEvent) => {
    dispatch(setCampaign(e.target.value as string));
  };

  return (
    <Box sx={{ padding: '20px', margin: '20px', textAlign: 'left' }}>
      <FormControl>
        <InputLabel id="campaign-label">Campaigns</InputLabel>
        <Select
          label="Campaigns"
          labelId="campaign-label"
          value={campaign}
          onChange={handleCampaignChange}
          sx={{ marginBottom: '20px', width: '200px' }}
        >
          {campaigns.map(campaign => (
            <MenuItem key={campaign.id} value={campaign.name}>
              {campaign.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h5">Installs</Typography>
      <LineChart
        width={600}
        height={300}
        data={campaigns.find(entry => entry.name === campaign)?.installs}
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
  );
};
