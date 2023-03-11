import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { DialogContentText } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import useSWR from "swr";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function GameDialog(props) {
  const [market, setMarket] = React.useState("us_stock");
  const [direct, setDirect] = React.useState("up");
  const [symbol, setSymbol] = React.useState("");
  const [dataUrl, setDataUrl] = React.useState(
    "https://www.betit.online/us_stock/get_us_all_symbol"
  );
  const [date, setDate] = React.useState(null);
  const [target, setTarget] = React.useState(null);
  const [priceLabel,setPriceLabel] = React.useState("USD");
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(dataUrl, fetcher);
  if (!data) {
    return <div>loading</div>;
  }
  if(data){
    console.log(data)
  }
  const handleMarketChange = (event) => {
    setMarket(event.target.value);
    if (event.target.value === "us_stock") {
      setDataUrl("https://www.betit.online/us_stock/get_us_all_symbol");
      setPriceLabel("USD")
    }
    if (event.target.value === "tw_stock") {
      setDataUrl("https://www.betit.online/tw_stock/get_tw_all_symbol");
      setPriceLabel("TWD")
    }
    if (event.target.value === "crypto") {
      setDataUrl("https://www.betit.online/redis_crypto_symbol");
      setPriceLabel("USD")
    }
  };
  const handleDirectChange = (event) => {
    setDirect(event.target.value);
  };

  const handleSymbolChange = (event, value) => {
    setSymbol(value);
  };
  const handleTarget = (event) => {
    setTarget(event.target.value);
  };
  const handleClose=()=>{
          setMarket("us_stock")
          setDirect("")
          setSymbol("")
          setDate(null)
          setTarget("")
          props.clickClose();
  }
  const handleFormSubmit = () => {
    let url="https://betit.online/create_game/"
    
    fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        market: market,
        symbol: symbol,
        date: date,
        target: target,
        direction: direct,
        createrEmail:props.email
      }),
      method: "POST",
      mode:"cors"
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        props.clickClose();
        console.log(response)
        if(response["message"]==="create finish"){
          setMarket("us_stock")
          setDirect("")
          setSymbol("")
          setDate(null)
          setTarget("")
        }
      });
      
  };
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.symbol,
  });
  const isWeekend = (date) => {
    const day = date.day();
  
    return day === 0 || day === 6;
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          開一局
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            在下列表格選擇你要打賭的標的、目標價格、時間
          </DialogContentText>
          <br></br>
          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    選擇市場
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={market}
                    label="Market"
                    onChange={handleMarketChange}
                  >
                    <MenuItem value={"crypto"}>加密貨幣</MenuItem>
                    <MenuItem value={"us_stock"}>美股</MenuItem>
                    <MenuItem value={"tw_stock"}>台股</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={data["symbol"]}
                  getOptionLabel={(option) => option.symbol}
                  sx={{ width: "100%" }}
                  filterOptions={filterOptions}
                  onInputChange={handleSymbolChange}
                  renderInput={(params) => (
                    <TextField {...params} label="標的" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="選擇日期"
                    value={date}
                    views={["year", "month", "day"]}
                    shouldDisableDate={isWeekend}
                    disablePast={true}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ width: "100%" }} />
                    )}
                   
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={3}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="component-outlined">目標價</InputLabel>
                  <OutlinedInput
                    endAdornment={
                      <InputAdornment position="end">{priceLabel}</InputAdornment>
                    }
                    label="目標價"
                    onChange={handleTarget}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    選擇趨勢
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={direct}
                    label="Market"
                    onChange={handleDirectChange}
                  >
                    <MenuItem value={"up"}>向上</MenuItem>
                    <MenuItem value={"down"}>向下</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleFormSubmit}>
            確認
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
