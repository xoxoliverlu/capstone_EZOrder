import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import React, { useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import NewCategoryModal from '../components/NewCategoryModal';
import EditCategoryModal from '../components/EditCategoryModal';
import DeleteCategoryModal from '../components/DeleteCategoryModal';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ReorderIcon from '@mui/icons-material/Reorder';

  const CategoryButton = styled(Button)(({ theme, selected }) => ({
    backgroundColor: selected ? '#83AE0B' : '#FBFBF2',
    color: selected ? '#FBFBF2': '#83AE0B',
    borderRadius: '0.5rem',
    borderColor: '#83AE0B',
    padding: theme.spacing(1.25, 3.25), 
    textTransform: 'none',
    boxShadow: 'none', 
    '&:hover': {
      backgroundColor: '#83AE0B', 
      boxShadow: 'none',
      color: '#FFFFFF',
      borderColor: '#83AE0B'
    },
  }));

  const EditButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#FBFBF2',
    color: '#83AE0B',
    borderRadius: '0.5rem',
    borderColor: '#83AE0B',
    padding: theme.spacing(0.5), 
    textTransform: 'none',
    boxShadow: 'none', 
    marginLeft: '0.75rem',
    '&:hover': {
      backgroundColor: '#83AE0B', 
      boxShadow: 'none',
      color: '#FFFFFF',
      borderColor: '#83AE0B'
    },
  }));

  const CategoriesBar = ({restaurantId, userInfo, onCategorySelected}) => {
    const theme = useTheme();
    const [menuCategories, setMenuCategories] = useState([]); 
    const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
    const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
    const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [lastUpdatedCategory, setLastUpdatedCategory] = useState('');
    const isManager = userInfo.role === 'manager';

    const handleCategoryClick = (categoryId) => {
      setSelectedCategoryId(categoryId);
      if(onCategorySelected) {
        onCategorySelected(categoryId);
      }
    };

    const handleOpenNewCategoryModal = () => {
        setNewCategoryModalOpen(true);
    };
    
    const handleCloseNewCategoryModal = () => {
      setNewCategoryModalOpen(false);
      refreshMenuCategories();
    };

    const handleOpenEditCategoryModal = () => {
      setEditCategoryModalOpen(true);
    };

    const handleCloseEditCategoryModal = () => {
      setEditCategoryModalOpen(false);
      refreshMenuCategories();
    };
  
    const handleOpenDeleteCategoryModal = () => {
      setDeleteCategoryModalOpen(true);
    };

    const handleCloseDeleteCategoryModal = () => {
      setDeleteCategoryModalOpen(false);
      refreshMenuCategories();
    };

    const addCategories = (newCategoryId) => {
      setLastUpdatedCategory(newCategoryId);
    }

    const editCategories = (updatedCategoryId) => {
      setLastUpdatedCategory(updatedCategoryId);
    }

    const refreshMenuCategories = () => {
      fetchMenuCategories();
    };

    const fetchMenuCategories = useCallback(async () => {
      try {
        const url = `http://localhost:5000/menus/${restaurantId}/menu/categories`;
  
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `${userInfo.token}`, 
          },
        });
  
        setMenuCategories(data); 
      } catch (error) {
        console.error('There was an error fetching the categories:', error.response?.data || error.message);
      }
    }, [restaurantId, userInfo.token]);
    
    useEffect(() => {
      fetchMenuCategories();
    }, []);

    useEffect(() => {
      fetchMenuCategories();
    }, [fetchMenuCategories]);

    useEffect(() => {
      if (menuCategories.length > 0) {
        setSelectedCategoryId(menuCategories[0]._id);
        handleCategoryClick(menuCategories[0]._id);
      } else {
        setSelectedCategoryId('');
        handleCategoryClick('');
      }
    }, [menuCategories]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          '& > *': {},
        }}
      >
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <ButtonGroup variant="outlined" aria-label="category button group">
            {menuCategories.map((category, index) => (
              <CategoryButton theme={theme} selected={category._id === selectedCategoryId} key={category._id} onClick={() => handleCategoryClick(category._id)}>
                  {category.name}
              </CategoryButton>
            ))}
          </ButtonGroup>
        </ButtonGroup>
        {isManager && (<>
          <EditButton
            variant='outlined'
            theme={theme}
            onClick={handleOpenEditCategoryModal}
            disabled={menuCategories.length === 0}
          >
            <ReorderIcon/>
          </EditButton>
          <EditButton
            variant='outlined'
            theme={theme}
            onClick={handleOpenNewCategoryModal}
          >
            <AddIcon/>
          </EditButton>
          <EditButton
            variant='outlined'
            theme={theme}
            onClick={handleOpenDeleteCategoryModal}
            disabled={menuCategories.length === 0}
          >
            <DeleteIcon/>
          </EditButton>
        </>)}
      </Box>
      <NewCategoryModal
          open={newCategoryModalOpen}
          handleClose={handleCloseNewCategoryModal}
          refreshItems={refreshMenuCategories}
          restaurantId={restaurantId} 
      />
      <EditCategoryModal
          open={editCategoryModalOpen}
          handleClose={handleCloseEditCategoryModal}
          refreshItems={refreshMenuCategories}
          restaurantId={restaurantId} 
          categories={menuCategories}
      />      
      <DeleteCategoryModal
          open={deleteCategoryModalOpen}
          handleClose={handleCloseDeleteCategoryModal}
          refreshItems={refreshMenuCategories}
          restaurantId={restaurantId} 
          categories={menuCategories}
      />   
    </>
  );
}

export default CategoriesBar;