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
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import useSWR from "swr";
import CandleChart from "@/components/CandleChart";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
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

export default function CandleChartDialog(props) {
  const [symbol, setSymbol] = React.useState(props.symbol);
  const [companyName, setCompanyName] = React.useState("");
  const [BackdropOpen, setBackdropOpen] = React.useState(true);
  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };

  const handleClose = () => {
    props.close();
  };
  if(props.data && props.market=="crypto"){
    let OHLCData = props.data
  
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        fullScreen
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
        {props.name}
         ({props.symbol})
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <CandleChart data={OHLCData} market={props.market}/>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
  }
  else if (props.data && props.market!="crypto") {
    let OHLCData = props.data["data"].map((item) => {
      return {
        x: new Date(item["date"]),
        y: [item["open"], item["high"], item["low"], item["close"]],
      };
    });
  
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        fullScreen
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
        {props.name}
         ({props.symbol})
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <CandleChart data={OHLCData}/>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
  }

}
