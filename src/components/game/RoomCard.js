import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box"
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function RoomCard(props) {
  let url;
  let priceLabel = "USD";
  if (props.market === "us_stock") {
    url = "/450px-NYC_NYSE.jpeg";
  } else if (props.market === "tw_stock") {
    url = "/welcome.png";
    priceLabel = "NTD";
  } else {
    url =
      "/stacked-cryptocurrency-coins-bitcoin-ethereum-litecoin-stacked-cryptocurrency-coins-111116684.jpeg";
  }

  return (
    <Card sx={{ maxWidth: 400, backgroundColor: "rgba(155,152,151,0.4)" }}>
        <CardMedia component="img" height="150" image={url} />
        <CardContent sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography gutterBottom variant="h5" component="div">
              {props.symbol}
            </Typography>
            <Typography variant="h6" color="text.first">
            {props.creater}
            </Typography>
            <Typography variant="body1" color="text.first">
              {props.price} {priceLabel}{" "}
              {props.direct == "up" ? "以上" : "以下"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {props.date}
            </Typography>
          </Box>
        </CardContent>
    </Card>
  );
}
