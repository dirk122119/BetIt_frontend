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
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `https://www.betit.online/redis_dashboard`,
    fetcher,
    {
      refreshInterval: 60000,
    }
  );
  const [BackdropOpen, setBackdropOpen] = React.useState(true);
  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };
  const handleBackdropToggle = () => {
    setBackdropOpen(!open);
  };
  if (error) return <div>failed to load</div>;
  if (!data)
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
  return (
    <>
      <Head>Dashboard</Head>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          justifyContent="space-between"
          spacing={{ xs: 2, md: 3 }}
          columns={{ sm: 12, md: 12, lg: 12, xl: 12 }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={"us_title"}>
            <Typography
              component="h4"
              variant="h4"
              sx={{
                color: "black",
                display: "flex",
                alignItems: "flex-end",
                paddingTop: "5px",
              }}
            >
              美股
            </Typography>
          </Grid>
          <Grid
            item
            xs={11}
            sm={11}
            md={6}
            lg={4}
            xl={4}
            key={"Dow Jones Industrial Average"}
          >
            <Card data={data["Dow Jones Industrial Average"]} pricelabel="USD"/>
          </Grid>
          <Grid item xs={11} sm={11} md={6} lg={4} xl={4} key={"S&P 500"}>
            <Card data={data["S&P 500"]} pricelabel="USD"/>
          </Grid>
          <Grid
            item
            xs={11}
            sm={11}
            md={6}
            lg={4}
            xl={4}
            key={"NASDAQ Composite"}
          >
            <Card data={data["NASDAQ Composite"]} pricelabel="USD"/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={"tw_title"}>
            <Typography
              component="h4"
              variant="h4"
              sx={{
                color: "black",
                display: "flex",
                alignItems: "flex-end",
                paddingTop: "5px",
              }}
            >
              台股
            </Typography>
          </Grid>

          <Grid item xs={11} sm={11} md={6} lg={4} xl={4} key={"tw_index"}>
            <Card data={data["tw_index"]} pricelabel="TWD"/>
          </Grid>
          <Grid item xs={11} sm={11} md={6} lg={4} xl={4} key={"0050"}>
            <Card data={data["0050"]} pricelabel="TWD" />
          </Grid>
          <Grid item xs={11} sm={11} md={6} lg={4} xl={4} key={"0051"}>
            {/* <Card data={data["0051"]} /> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            key={"Crypto_title"}
          >
            <Typography
              component="h4"
              variant="h4"
              sx={{
                color: "black",
                display: "flex",
                alignItems: "flex-end",
                paddingTop: "5px",
              }}
            >
              加密貨幣
            </Typography>
          </Grid>
          <Grid item xs={11} sm={11} md={6} lg={4} xl={4} key={"BTC/USDT"}>
            <Card data={data["BTC/USDT"]} pricelabel="USD"/>
          </Grid>
          <Grid item xs={11} sm={11} md={6} lg={4} xl={4} key={"ETH/USDT"}>
            <Card data={data["ETH/USDT"]} pricelabel="USD"/>
          </Grid>
          <Grid item xs={11} sm={11} md={6} lg={4} xl={4} key={"BNB/USDT"}>
            <Card data={data["BNB/USDT"]} pricelabel="USD"/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
