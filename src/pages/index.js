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
      <Head>homepage</Head>
      <h1>Welcome Bet It</h1>
    </>
  );
}
