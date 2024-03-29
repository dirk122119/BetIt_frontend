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

export default function SignupDialog(props) {
  const [account, setAccount] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [checkPassword, setCheckPassword] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [textAccount, setTextAccount] = React.useState(true);
  const [textEmail, setTextEmail] = React.useState(true);
  const [textPassword, setTextPassword] = React.useState(true);
  const [textCheckPassword, setTextCheckPassword] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarState,setSnackBarState]= React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleAccount = (event) => setAccount(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleCheckPassword = (event) => setCheckPassword(event.target.value);
  const handlModalclose = () => {
    setTextAccount(true);
    setTextEmail(true);
    setTextPassword(true);
    setTextCheckPassword(true);
    setMessage("");
    props.clickClose();
  };
  const handleSignup = () => {
    setMessage("");
    if (account === "") {
      setTextAccount(false);
    }
    if (email === "") {
      setTextEmail(false);
    }
    if (password === "") {
      setTextPassword(false);
    }
    if (checkPassword === "") {
      setTextCheckPassword(false);
    }
    if (account != "") {
      setTextAccount(true);
    }
    if (email != "") {
      setTextEmail(true);
    }
    if (password != "") {
      setTextPassword(true);
    }
    if (checkPassword != "") {
      setTextCheckPassword(true);
    }
    if (password != checkPassword) {
      setMessage("密碼不一置");
      setSnackBarState("error")
      setTextPassword(false);
      setTextCheckPassword(false);
      handleSnackBarOpen()
    } else if (account && email && password && checkPassword) {
      let url = "https://www.betit.online/regist";
      const myHeaders = new Headers();
      myHeaders.append("content-type", "application/json");
      fetch(url, {
        headers: myHeaders,
        body: JSON.stringify({
          account: account,
          email: email,
          password: password,
          check_password: checkPassword,
        }),
        method: "POST",
      })
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
          setMessage("註冊成功");
          setSnackBarOpen(true)
          setAccount(null);
          setEmail(null);
          setSnackBarState("success")
          handleSnackBarOpen()
          props.clickClose();
        })
        .catch((error) => {
          console.log(error);
          switch (error.status) {
            case 400:
              if (error.response["data"]["message"] === "重複的email") {
                setTextEmail(false);
              }
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
    }
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
        onClose={handlModalclose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handlModalclose}
        >
          使用者註冊
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
                <TextField required label="account" onChange={handleAccount} />
              )}
              {!textAccount && (
                <TextField error label="請輸入帳號" onChange={handleAccount} />
              )}
            </div>
            <div>
              {textEmail && (
                <TextField required label="email" onChange={handleEmail} />
              )}
              {!textEmail && (
                <TextField error label="請輸入email" onChange={handleEmail} />
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
            <div>
              {textCheckPassword && (
                <FormControl
                  sx={{ m: 1, width: "25ch" }}
                  required
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    再次確認密碼
                  </InputLabel>
                  <OutlinedInput
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
                    onChange={handleCheckPassword}
                  />
                </FormControl>
              )}
              {!textCheckPassword && (
                <FormControl
                  sx={{ m: 1, width: "25ch" }}
                  error
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    再次確認密碼
                  </InputLabel>
                  <OutlinedInput
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
                    label="再次確認密碼"
                    onChange={handleCheckPassword}
                  />
                </FormControl>
              )}
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSignup}>
            註冊
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <CustomizedSnackbars open={snackBarOpen} close={handleSnackBarClose} state={snackBarState} message={message}/>
    </div>
  );
}
