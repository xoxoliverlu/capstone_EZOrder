import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SideNav from '../components/SideNav';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material';
import StyledButton from '../components/StyledButton';

const TableScreen = () => {
  const [tables, setTables] = useState([]);
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const restaurantId = userInfo.restaurant;
 
  const theme = useTheme();

  const fetchTables = async () => {
    try {
      const url = `http://localhost:5000/tables/${restaurantId}/tables`
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `${userInfo.token}`
        },
      });
      setTables(data);
    } catch (error) {
      console.error('There was an error adding the table:', error.response?.data || error.message);  
    }
  };

  const handleAddTable = async () => {
    try {
      const url = `http://localhost:5000/tables/${restaurantId}/add`
      await axios.post(url);
      fetchTables();
    } catch (error) {
      console.error('There was an error adding the table:', error.response?.data || error.message);
    }
  };

  const handleRemove = async () => {
    try {
      const url = `http://localhost:5000/tables/${restaurantId}/remove`
      await axios.delete(url);
      fetchTables();
    } catch (error) {
      console.error('There was an error adding the table:', error.response?.data || error.message);
    }
  }

  useEffect(() => {
    fetchTables()
  }, []);

  return (
    <>
      <SideNav />
      <Grid
        container
        style={{ flexGrow: 1, padding: theme.spacing(3), marginLeft: '200px' }}
      >
        <div style={{ height: 400, width: 'auto' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 150 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell align='left'>Occupied</TableCell>
                </TableRow>
              </TableHead>
              {tables && (
                <TableBody>
                  {tables.map((table) => (
                    <TableRow
                      key={table._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>{table.number}</TableCell>
                      <TableCell align='left'>{table.occupied.toString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>  
              )}
            </Table>
          </TableContainer>
          <StyledButton sx={{mt: 2}} onClick={handleAddTable}>
            Add Table
          </StyledButton>
          <StyledButton sx={{mt: 2, ml: 2}} bgcolor='#E60000' hovercolor='#FF3333' variant='text' color='primary' onClick={() => handleRemove()}>
            Delete table
          </StyledButton>
        </div>
      </Grid>
    </>
  );
}

export default TableScreen;
