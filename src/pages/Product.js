import { Card, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';
import Detail from './Detail';

export default function Product() {
  const history = useHistory()

  const [products, setProducts] = useState([]);
  const [formType, setFormType] = useState('');
  const [deleteId, setDeleteId] = useState(false);
  const [editId, setEditId] = useState('')
  const [id, setId] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    onGetProducts()
  }, [])

  useEffect(() => {
    if (deleteId && formType === 'DELETE') {
      onDelete(deleteId)
    }
  }, [deleteId, formType])

  useEffect(() => {
    console.log('edit id', editId)
    if (editId && formType === 'EDIT') {
      onUpdate(editId);
    }
  }, [editId, formType])

  useEffect(() => {
    console.log('formtype', formType)
  }, [formType])

  const onGetProducts = () => {
    fetch('http://localhost:8000/message')
      .then(res => res.json())
      .then(data => setProducts(data))
  }

  const onDelete = async (id) => {
    if (quantity == '0') {
      await fetch('http://localhost:8000/message/' + id, {
        method: 'DELETE',
      })
    } else {
      alert("Product quantity is greater than 0!!");
      return
    }
    const newProducts = products.filter(p => p.id != id);
    setProducts(newProducts);
  }

  const onUpdate = (id) => {
    history.push({
      pathname: '/detail/' + id
    });

    // const newProducts = products.filter(p => p.id != id);
    // setProducts(newProducts);
  }

  const deleteIcon = (
    <IconButton 
      onClick={() => {
        setDeleteId(id);
        setFormType('DELETE');
      }}
    >
      <DeleteIcon color="grey" />
    </IconButton>
  );

  const editIcon = (
    <IconButton 
      onClick={() => {
        setEditId(id);
        setFormType('EDIT');
        console.log('edit id first', editId)
      }}
    >
      <EditIcon color="grey" />
    </IconButton>
  );

  const addIcon = (
    <IconButton onClick={() => history.push('/detail')}>
      <AddIcon color="grey" />
    </IconButton>
  );

  return (
    <Container style={{ height: 900 }}>
      <Card style={{ padding: 10, marginBottom: 20, marginTop: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography variant='h5' style={{ fontWeight: '700', marginLeft: 10 }}>
            Products
          </Typography>
        </div>
      </Card>

      <Card style={{ padding: 10, marginBottom: 20, marginTop: 20 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">{addIcon}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow
                  key={p.id}
                  onClick={() => {
                    setDeleteId(p.id);
                    setEditId(p.id);
                    setQuantity(p.qty);
                  }}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {p.name}
                  </TableCell>
                  <TableCell align="right">{p.qty}</TableCell>
                  <TableCell style={{}} align="right" onClick={() => setId(p.id)}>
                    {editIcon}
                    {deleteIcon}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  )
}
