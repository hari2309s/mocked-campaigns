import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Overview } from './Overview';
import { Campaigns } from './Campaigns';
import { CreateCampaign } from './CreateCampaign';

export const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ padding: '40px 30px 30px' }}>
      <Stack
        direction="row"
        sx={{
          height: '70px',
          padding: '10px',
          border: '2px solid black',
          borderRadius: '5px',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Typography variant="h5">Mocked Campaigns</Typography>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="Campaigns" />
          <Tab label="Create" />
        </Tabs>
      </Stack>
      {currentTab === 0 && <Overview />}
      {currentTab === 1 && <Campaigns />}
      {currentTab === 2 && <CreateCampaign />}
    </Box>
  );
};
