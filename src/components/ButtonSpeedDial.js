import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import GameDialog from "@/components/GameDialog"

export default function ButtonSpeedDials(){
    const [SpeedDialopen, setSpeedDialOpen] = React.useState(false);
    const handleSpeedDialOpen = () => setSpeedDialOpen(true);
    const handleSpeedDialClose = () => setSpeedDialOpen(false);

    const [GameDialogsClickOpen, setGameDialogsClickOpen] = React.useState(false);
    const handleGameDialogsClickClose = () => setGameDialogsClickOpen(false);
    const handleGameDialogsClickOpen = () => setGameDialogsClickOpen(true);
    return(
        <>
        <SpeedDial
            ariaLabel="SpeedDial controlled open example"
            sx={{
              position: "fixed",
              bottom: "16px",
              right: "16px",
              "& .MuiFab-primary": {
                backgroundColor: "rgba(238,238,238,0.3)",
                color: "blue",
                "&:hover": { backgroundColor: "rgba(238,238,238,1)" },
              },
            
            }}
            icon={<SpeedDialIcon />}
            onClose={handleSpeedDialClose}
            onOpen={handleSpeedDialOpen}
            open={SpeedDialopen}
          >
              <SpeedDialAction
              sx={{marginBottom: "0px",backgroundColor: "rgba(238,238,238,0.3)"}}
                key={"add a game"}
                icon={<SpeedDialIcon />}
                tooltipTitle={"start Bet"}
                onClick={handleGameDialogsClickOpen}
                
              />

          </SpeedDial>
          <GameDialog open={GameDialogsClickOpen} clickClose={handleGameDialogsClickClose}/>
          </>
    )
}