import { Button, Card, Container, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import { useHistory, useParams } from 'react-router-dom';
import Colors from '../constants/Colors';
import { color } from '@mui/system';

const useStyles = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block',
    },
    width: {
      width: '50%',
    }
})

export default function Detail({}) {
  const classes = useStyles();
  const history = useHistory();
  const {id: prodId} = useParams();

  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [qtyErr, setQtyErr] = useState(false);
  const [detail, setDetail] = useState([])

  useEffect(() => {
    console.log('id', Number(prodId));

    if (prodId) {
      onGetProducts(prodId)
    }
    console.log('detail', detail)
  }, [])

  useEffect(() => {
    initData();
  }, [detail])

  const onGetProducts = (id) => {
    fetch(`http://localhost:8000/message/${id}`)
      .then(res => res.json())
      .then(data => setDetail(data))
  }

  const onSubmit = (_) => {
    _.preventDefault();

    setNameErr(false);
    setQtyErr(false);

    if (name === '') {
      setNameErr(true)
    }

    if (qty === '' || 0) {
      setQtyErr(true)
    }
  
    if (name && qty && prodId) {
      fetch(`http://localhost:8000/message/${prodId}`, {
        method: 'PUT',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ name, qty })
      }).then(() => history.push('/'))
    } else {
      fetch('http://localhost:8000/message', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ name, qty })
      }).then(() => history.push('/'))
    }
  }

  function initData() {
    setName(detail.name);
    setQty(detail.qty);
}

  return (
    <Container style={{ height: 900 }}>
      <Card style={{ padding: 10, marginBottom: 20, marginTop: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {/* <InfoIcon /> */}
          <Typography variant='h5' style={{ fontWeight: '700', marginLeft: 10 }}>
            Details
          </Typography>
        </div>
      </Card>

      <Card style={{ padding: 10 }}>
        <div style={{ width: '100%' }}>
          <form noValidate autoComplete='off' onSubmit={onSubmit}>
            <TextField 
              className={[classes.field, classes.width]}
              onChange={(_) => setName(_.target.value)}
              value={name}
              label='Name'
              variant='outlined'
              color='primary'
              fullWidth
              required
              error={nameErr}
            />
            <TextField 
              className={[classes.field, classes.width]}
              onChange={(_) => setQty(parseInt(_.target.value))}
              value={qty}
              label='Quantity'
              type='number'
              variant='outlined'
              color='primary'
              InputProps={{
                inputProps: { 
                  min: 0,
                }
              }}
              fullWidth
              required
              error={qtyErr}
            />
            <div>
              <Button 
                type='submit' 
                // color={Colors.primaryColor}
                variant='outlined'
                style={{
                  paddingLeft: 50,
                  paddingRight: 50,
                  marginRight: 20,
                  color: Colors.yellow,
                  borderColor: Colors.primaryColor
                }}
              >
                Save
              </Button>
              <Button 
                onClick={() => history.push('/')}
                // color='grey' 
                variant='outlined'
                style={{
                  paddingLeft: 50,
                  paddingRight: 50,
                  color: Colors.hint,
                  borderColor: Colors.gray2
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
        
      </Card>
    </Container>
  )
}
