import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function RoomCard(props) {
    let url
    if(props.market==="us_stock"){
        url="/450px-NYC_NYSE.jpeg"
    }
    else if(props.market==="tw_stock"){
        url="/welcome.png"
    }
    else{
        url="/stacked-cryptocurrency-coins-bitcoin-ethereum-litecoin-stacked-cryptocurrency-coins-111116684.jpeg"
    }

  return (
    <Card sx={{ maxWidth: 400,backgroundColor:"rgba(155,152,151,0.4)" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {props.symbol}
          </Typography>
          <Typography variant="body1" color="text.first">
            {props.price} $ {props.direct}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
