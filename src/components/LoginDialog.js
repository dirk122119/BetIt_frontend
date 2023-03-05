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
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import useSWR from "swr";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomizedSnackbars from "@/components/snackbar"

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

export default function LoginDialog(props) {
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [textAccount, setTextAccount] = React.useState(true);
  const [textPassword, setTextPassword] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarState,setSnackBarState]= React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleAccount = (event) => {
    setAccount(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = () => {
    if (account === "") {
      setTextAccount(false);
    }
    if (password === "") {
      setTextPassword(false);
    }
    if (account !== "") {
      setTextAccount(true);
    }
    if (password !== "") {
      setTextPassword(true);
    }
    let url = "https://www.betit.online/login";
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        email: account,
        password: password,
      }),
    };
    fetch(url, requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          let data = await response.json();
          let err = new Error("HTTP status code: " + response.status);
          err.response = data;
          err.status = response.status;
          throw err;
        }
        return response.json();
      })
      .then((response) => {
        props.login(response["data"]["account"]);
        localStorage.setItem("betitJwt", response["data"]["token"]);
        setAccount("");
        setPassword("");
        setTextAccount(true);
        setTextPassword(true);
        setMessage("登入成功")
        setSnackBarState("success")
        handleSnackBarOpen()
        props.clickClose();
      })
      .catch((error) => {
        console.log(error);
        switch (error.status) {
          case 400:
            setMessage(error.response["data"]["message"]);
            setSnackBarState("error")
            handleSnackBarOpen()
            break;
          case 500:
            console.log(error.response["data"]["message"], error.status);
            setMessage(error.response["data"]["message"]);
            setSnackBarState("error")
            handleSnackBarOpen()
            break;
        }
      });
  };

  const handleSnackBarOpen=()=>{
    setSnackBarOpen(true)
  }

  const handleSnackBarClose=()=>{
    setSnackBarOpen(false)
  }

  return (
    <div>
      <BootstrapDialog
        onClose={props.clickClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={props.clickClose}
        >
          Login
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              {textAccount && (
                <TextField
                  required
                  id="outlined-required"
                  label="註冊信箱"
                  onChange={handleAccount}
                />
              )}
              {!textAccount && (
                <TextField
                  error
                  id="outlined-required"
                  label="請輸入信箱"
                  onChange={handleAccount}
                />
              )}
            </div>
            <div>
              {textPassword && (
                <FormControl
                  sx={{ m: 1, width: "25ch" }}
                  required
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    onChange={handlePassword}
                  />
                </FormControl>
              )}
              {!textPassword && (
                <FormControl
                  sx={{ m: 1, width: "25ch" }}
                  error
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    請輸入密碼
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="請輸入密碼"
                    onChange={handlePassword}
                  />
                </FormControl>
              )}
            </div>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleLogin}>
            登入
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <CustomizedSnackbars open={snackBarOpen} close={handleSnackBarClose} state={snackBarState} message={message}/>
    </div>
  );
}
