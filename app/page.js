"use client";
import { useEffect, useState } from 'react';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '@/firebase';
import { collection, addDoc, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";

const StyledContainer = styled(Container)({
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem',
  backgroundColor: '#fafafa',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const InventoryManager = () => {
  const [item, setItem] = useState({ name: '', quantity: '', price: '' });
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "inventory"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setInventory(items);
    });

    return () => unsubscribe();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (item.name !== '' && item.quantity !== '' && item.price !== '') {
      try {
        await addDoc(collection(db, "inventory"), {
          name: item.name,
          quantity: item.quantity,
          price: item.price
        });
        setItem({ name: '', quantity: '', price: '' });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "inventory", id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <form onSubmit={handleAddItem}>
        <TextField
          label="Item Name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
          fullWidth
          margin="normal"
        />
        <StyledButton type="submit">Add Item</StyledButton>
      </form>
      <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  );
};

export default InventoryManager;