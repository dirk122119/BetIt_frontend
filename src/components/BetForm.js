import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import useSWR from "swr";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function BetForm() {
  const [market, setMarket] = React.useState("us_stock");
  const [direct, setDirect] = React.useState("up");
  const [symbol, setSymbol] = React.useState("");
  const [dataUrl, setDataUrl] = React.useState(
    "https://www.betit.online/us_stock/get_us_all_symbol"
  );
  const [dateValue, setDateValue] = React.useState(null);
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(dataUrl, fetcher);
  if (!data) {
    return <div>loading</div>;
  }
  const handleMarketChange = (event) => {
    setMarket(event.target.value);
    if (event.target.value === "us_stock") {
      setDataUrl("https://www.betit.online/us_stock/get_us_all_symbol");
    }
    if (event.target.value === "tw_stock") {
      setDataUrl("https://www.betit.online/tw_stock/get_us_all_symbol");
    }
    if (event.target.value === "crypto") {
      setDataUrl("https://www.betit.online/crypto/top250_market_symbol");
    }
  };
  const handleDirectChange=(event)=>{
    setDirect(event.target.value);
  }

  const handleSymbolChange = (event, value) => {
    setSymbol(value);
  };
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">選擇市場</InputLabel>
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
            onInputChange={handleSymbolChange}
            renderInput={(params) => <TextField {...params} label="標的" />}
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker
              label="選擇日期"
              value={dateValue}
              views={['year', 'month', 'day']}
              onChange={(newValue) => {
                setDateValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} sx={{width:"100%"}} />}
              disablePast={true}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">目標價</InputLabel>
          <OutlinedInput
            endAdornment={<InputAdornment position="end">USD</InputAdornment>}
            label="目標價"
          />
        </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">選擇趨勢</InputLabel>
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
  );
}
