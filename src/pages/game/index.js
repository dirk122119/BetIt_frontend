import Head from "next/head";
import useSWR from "swr";
import Grid from '@mui/material/Grid';
import RoomCard from "@/components/game/RoomCard";
export default function CryptoIndex() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    "http://127.0.0.1:8000/get_game/",
    fetcher,
    {
      refreshInterval: 60000,
    }
  );
  if(!data){
    return(<div>loading</div>)
  }
  return (
    <div>
      <Head>
        <title>Game</title>
      </Head>

      <br />

      <div>
      </div>
      <Grid container spacing={2}>
      {data["data"].map((game,index) => {
        return (
          <Grid key={index} item xs={6} md={3}>
            <RoomCard  market={game["market"]} symbol={game["symbol"]} date={game["date"]} price={game["price"]} direct={game["direct"]} />
          </Grid>
        );
      })}
      </Grid>
    </div>
  );
}
