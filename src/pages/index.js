import Layout from "@/components/layout";
import useSWR from "swr";
import Head from "next/head";
import {
  Container,
  Grid,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Card from "@/components/DashboardCard";
import * as React from "react";
export default function DashboardIndex({ Component, pageProps }) {
  const [BackdropOpen, setBackdropOpen] = React.useState(true);
  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };
  const handleBackdropToggle = () => {
    setBackdropOpen(!open);
  };

  return (
    <>
      <Head><title>Homepage</title></Head>
      <h1>Welcome Bet It</h1>
      <div>You can observe the latest information and trends of US stocks, Taiwan stocks, and cryptocurrencies with this web.</div>
      <div>Please predict future prices, we will automatically help you record and calculate the outcome </div>
      <h1 style={{marginTop:"50px"}}>How to use</h1>
      <img src="/introduction.gif" width="600px"></img>
    </>
  );
}
