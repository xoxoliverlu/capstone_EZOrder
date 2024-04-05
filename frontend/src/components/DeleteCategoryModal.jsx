import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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


const DeleteCategoryModal = ({ open, handleClose, restaurantId, categories }) => {
  const [categoryId, setCategoryId] = useState('');

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); 

    try {
      await axios.delete(`http://localhost:5000/menus/${restaurantId}/menu/categories/${categoryId}/remove`, 
      {
        headers: {
          Authorization: `${userInfo.token}`,
        }
      });
      handleClose();
      setCategoryId('');
    } catch (error) {
      console.error('There was an error deleting the category:', error.response?.data || error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="order-category-modal-title"
      aria-describedby="order-category-modal-description"
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
          Delete Category
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryId}
                onChange={handleCategoryChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem value={category._id} key={category._id}>
                    {category.name}
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

export default DeleteCategoryModal;
