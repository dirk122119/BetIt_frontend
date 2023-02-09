import Layout from '@/components/Layout'
import useSWR from 'swr'
import Head from 'next/head'
import { Container, Grid, Box } from '@mui/material'
import Card from '@/components/DashboardCard'

export default function DashboardIndex({ Component, pageProps }) {

  const fetcher = (url) => fetch(url).then(r => r.json());
  const { data, error, isLoading } = useSWR(`http://54.64.173.185/redis`, fetcher, {
    refreshInterval: 60000
  })
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log(data)
  return (
    <>
      <Head>Dashboard</Head>
      <Box sx={{ width: "100%" }}>
        <Grid container justifyContent="space-between" direction="row" spacing={{ xs: 2, md: 3}} columns={{ sm: 12, md: 12,lg:12,xl:12 }}>
          <Grid item xs={11} sm={11} md={6} lg={4} xl={4} key={0}>
            <Card data={data["BTC/USDT"]}/>
          </Grid>
          <Grid item xs={11} sm={11} md={6} lg={4} xl={4} key={1}>
            <Card data={data["ETH/USDT"]}/>
          </Grid>
          <Grid item xs={11} sm={11} md={6} lg={4} xl={4} key={2}>
            <Card data={data["BNB/USDT"]}/>
          </Grid>
        </Grid>
        </Box>
    </>
  
  )
  
}