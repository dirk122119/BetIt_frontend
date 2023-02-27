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

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleAccount = (event) => setAccount(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleCheckPassword = (event) => setCheckPassword(event.target.value);

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
      setTextPassword(false);
      setTextCheckPassword(false);
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
        .then((response) => response.json())
        .catch((error) => {
          console.log(error)
          switch (error.status) {
            case 400:
              console.log(error.response['data']["message"], error.status);
              break;
            case 500:
              console.log(error.response['data']["message"], error.status);
              break;
          }
        })
        .then((response) => {
          setMessage(response['data']['message'])
         
            setAccount(null);
            setEmail(null);
            setPassword(null);
            setCheckPassword(null);
            setMessage("");
            // props.clickClose();
          
        });
    }
  };

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
            {message && (
              <div>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "red",
                  }}
                >
                  {message}
                </Typography>
              </div>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSignup}>
            登入
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
