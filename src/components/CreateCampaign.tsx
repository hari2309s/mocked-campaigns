import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AppDispatch } from '../store/store';
import { useAppDispatch } from '../store/hooks';
import { addCampaign } from '../store/features/campaignsSlice';

export const CreateCampaign = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const [campaginName, setCampaginName] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampaginName(e.target.value);
  };

  const handleButtonClick = () => {
    if (campaginName.trim()) {
      dispatch(addCampaign(campaginName));
    }

    setCampaginName('');
  };

  return (
    <Box sx={{ padding: '60px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6">Create new Campaign</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '20px',
        }}
      >
        <TextField
          label="Name"
          value={campaginName}
          onChange={handleNameChange}
          placeholder="Enter campaign name"
        />
        <Button
          variant="contained"
          sx={{ height: '40px', marginLeft: '20px' }}
          onClick={handleButtonClick}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
