import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled, useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import axios from 'axios';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};


const EditCategoryModal = ({ open, handleClose, restaurantId, categoryId, menuItems }) => {
  const [selectedItem, setselectedItem] = useState('');
  const [newPosition, setNewPosition] = useState('');

  const handleItemChange = (event) => {
    setselectedItem(event.target.value);
  };

  const handlePositionChange = (event) => {
    setNewPosition(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); 

    try {
      console.log('Sending the following data:', selectedItem, newPosition);
      const response = await axios.put(
        `http://localhost:5000/menus/${restaurantId}/menu/categories/${categoryId}/items/order`, 
        {
          itemName: selectedItem,
          newPosition: newPosition
        },
        {
          headers: {
            Authorization: `${userInfo.token}`,
          },
        }
      );
      console.log('Item moved:', response.data); 
      handleClose(); 
    } catch (error) {
      console.error('There was an error moving the item:', error.response?.data || error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="order-item-modal-title"
      aria-describedby="order-item-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="new-item-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
          Edit Category
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedItem}
                onChange={handleItemChange}
                label="Category"
              >
                {menuItems.map((item) => (
                  <MenuItem key={item._id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>New Position</InputLabel>
              <Select
                value={newPosition}
                onChange={handlePositionChange}
                label="New Position"
              >
                {/* Adjust the range as necessary */}
                {Array.from({ length: menuItems.length }, (_, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              fullWidth
            >
              Confirm
            </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditCategoryModal;
