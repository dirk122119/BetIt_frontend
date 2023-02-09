import * as React from 'react';
import { Card, CardActionArea, Box, CardContent, Typography, CardMedia } from '@mui/material';
import Sparkline from './Sparkline';
export default function CrryptoDashbordCard(props){
    return (
        <Card sx={{ display: "flex",height:"200px" }}>
            <CardActionArea sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", flexDirection: "column", width:"40%"}}>
                    <CardContent>
                        <Typography component="h5" variant="h5">
                            {props.data.symbol}
                            <span style={props.data.latest_price.toFixed(3)-props.data.previouse_close_price.toFixed(3) > 0 ? {fontSize:"15px",color:"green"}:{fontSize:"20px",color:"red"}}>{((props.data.latest_price-props.data.previouse_close_price)*100/props.data.previouse_close_price).toFixed(1)}%</span>
                        </Typography>
                        <Typography component="h6" variant="h6" sx={{display: "flex",alignItems: "flex-end",paddingTop:"5px"}}>
                            {props.data.latest_price.toFixed(2)} USD
                        </Typography>
                    </CardContent>

                </Box>
                <Box sx={{ display: "flex",width:"50%", justifyContent:"flex-end" }}>
                    <Sparkline priceList={props.data.price_close}/>
                </Box>
                
            </CardActionArea>

        </Card>
    )
}