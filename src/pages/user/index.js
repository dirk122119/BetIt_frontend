import * as React from "react";
import UserBetTable from "@/components/user/userBetTable"
import {Backdrop,CircularProgress} from "@mui/material";
export default function User() {

  const [user,setUser]=React.useState("")
  const [email,setEmail]=React.useState("")
  const [win,setWin]=React.useState("")
  const [lose,setLose]=React.useState("")
  const [games,setGames]=React.useState("")
  const [BackdropOpen, setBackdropOpen] = React.useState(true);

  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };

  if (typeof window !== "undefined") {
    const jwt = localStorage.getItem("betitJwt");
    if (jwt) {
      let token = "Bearer " + jwt;
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      }
      let url = "http://127.0.0.1:8000/profile";
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          if(response["data"]){
            setUser(response["data"][0]["user_name"])
            setEmail(response["data"][0]["user_email"])
            setWin(response["data"][0]["user_win"])
            setLose(response["data"][0]["user_lose"])
            setGames(response["data"])
            setBackdropOpen(false)
          }
        })
    }
  }
  if (BackdropOpen){
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={BackdropOpen}
          onClick={handleBackdropClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
  return (
    <div>
      <h1>{user}</h1>
      <h3>{email}</h3>
      <span>勝:{win}次  敗:{lose}次 勝率{(win/(win+lose))*100}%</span>
      <br></br>

      <UserBetTable games={games}/>

    </div>
  );
}


